
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
				const apiToken = response.data.access_token;
				return apiToken;
			} catch (error) {
				logger.error(`Something bad happend: ${error.message}`);
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
				logger.error(`Something bad happend: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getTopics = async (namespaceId, resourceGroup, azureToken, subscriptionId) => {
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
				const topics = axiosTopicsRes.data.value.map(topic => topic.name);
				return topics;
			} catch (error) {
				logger.error(`Something bad happend: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getTopicSubscriptions = async (namespaceId, resourceGroup, azureToken, topic, subscriptionId) => {
			try {
				const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.ServiceBus/namespaces/${namespaceId}/topics/${topic}/subscriptions?api-version=2017-04-01`;
				const axiosSubsRes = await axios.get(
					url,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${azureToken}`,
						},
					},
				);
				return { topic, subscriptions: axiosSubsRes.data.value };
			} catch (error) {
				logger.error(`Something bad happend: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};

		const getAllTopicsWithSubs = async (namespaceId, resourceGroup, azureToken, subscriptionId) => {
			try {
				const topics = await getTopics(namespaceId, resourceGroup, azureToken, subscriptionId);

				const requestsArray = [];
				topics.forEach(topic => {
					requestsArray.push(getTopicSubscriptions(namespaceId, resourceGroup, azureToken, topic, subscriptionId));
				});
				const topicsAndSubscriptions = await Promise.all(requestsArray);
				return topicsAndSubscriptions;
			} catch (error) {
				logger.error(`Something bad happend: ${error.message}`);
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
				logger.error(`Something bad happend: ${error.message}`);
				throw createBadRequest(error.message);
			}
		};


		return { authorize, getAllTopicsWithSubs, getNamespaces, getConnectionString };
	};

	return { start };
};

