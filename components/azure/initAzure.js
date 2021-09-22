
const axios = require('axios');
const qs = require('qs');
const { createBadRequest } = require('../../utils/errors-creator');

module.exports = () => {
	const start = async ({ logger }) => {
		const authorize = async (clientId, clientSecret, appTenantId) => {
			try {
				const url = `https://login.microsoftonline.com/${appTenantId}/oauth2/token`;
				const response = await axios.post(
					url,
					qs.stringify({ grant_type: 'client_credentials', resource: 'https://management.core.windows.net/', client_id: clientId, client_secret: clientSecret }),
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Authorization: 'Basic xxxx',
						},
					},
				);
				return response.data.access_token;
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getNamespaces = async (azureToken, subscriptionId) => {
			try {
				const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2015-08-01`;
				const response = await axios.get(
					url,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${azureToken}`,
						},
					},
				);
				return response.data.value;
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getTopicsData = async (namespaceId, resourceGroup, azureToken, subscriptionId) => {
			try {
				const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ServiceBus/namespaces/${namespaceId}/topics?api-version=2017-04-01`;
				const axiosTopicsRes = await axios.get(
					url,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${azureToken}`,
						},
					},
				);

				return axiosTopicsRes.data.value.map(topic => ({
					name: topic.name,
					subsCount: topic.properties.subscriptionCount,
				}));
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getTopicSubscriptions = async (namespaceId, resourceGroup, azureToken, topic, subscriptionId) => {
			try {
				const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ServiceBus/namespaces/${namespaceId}/topics/${topic.name}/subscriptions?api-version=2017-04-01`;
				const axiosSubsRes = await axios.get(
					url,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${azureToken}`,
						},
					},
				);

				return { topic: topic.name, subsCount: topic.subsCount, subscriptions: axiosSubsRes.data.value };
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getAllTopicsWithSubs = async (namespaceId, resourceGroup, azureToken, subscriptionId) => {
			try {
				const topics = await getTopicsData(namespaceId, resourceGroup, azureToken, subscriptionId);

				const requestsArray = [];
				topics.forEach(topic => {
					requestsArray.push(getTopicSubscriptions(namespaceId, resourceGroup, azureToken, topic, subscriptionId));
				});

				return await Promise.all(requestsArray);
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getConnectionString = async (azureToken, subscriptionId, resourceGroup, namespaceId) => {
			try {
				const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ServiceBus/namespaces/${namespaceId}/AuthorizationRules/RootManageSharedAccessKey/listKeys?api-version=2017-04-01`;
				const axiosResponse = await axios
					.post(url, null,
						{
							headers: {
								Accept: '*/*',
								Authorization: `Bearer ${azureToken}`,
							},
						},
					);

				return axiosResponse.data.primaryConnectionString;
			} catch (error) {
				logger.error(`Something bad happened: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getSubscriptionDetail = async (azureToken, subscriptionId, resourceGroupName, namespaceName, topicName, subscriptionName) => {
			const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}?api-version=2017-04-01`;
			const response = await axios.get(
				url,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${azureToken}`,
					},
				},
			);
			return response.data;
		};

		return { authorize, getAllTopicsWithSubs, getNamespaces, getConnectionString, getSubscriptionDetail };
	};

	return { start };
};

