const initBus = require('systemic-azure-bus');
const { createBadRequest } = require('../../utils/errors-creator');

module.exports = () => {
	const start = async ({ logger, azure, config }) => {
		let currentTokenCredentials;
		let currentNamespaceConnectionString;

		const getBusConfig = (topic, subscription, connectionString) => {
			const subscriptions = {};
			subscriptions[config.subscriptionToAnalyzeId] = {
				topic,
				subscription,
			};
			const res = {
				connection: {
					connectionString,
				},
				subscriptions,
			};
			return res;
		};

		const authorize = async (clientId, clientSecret, appTenantId, subscriptionId) => {
			try {
				const authToken = await azure.authorize(clientId, clientSecret, appTenantId);
				logger.info('Authorizing user');
				currentTokenCredentials = { clientId, clientSecret, appTenantId, subscriptionId };
				return authToken;
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const getNamespaces = async azureToken => {
			try {
				const namespaces = await azure.getNamespaces(azureToken, currentTokenCredentials.subscriptionId);
				logger.info('Retrieving namespaces');
				return namespaces;
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const getAllTopicsWithSubs = async (namespaceId, resourceGroup, azureToken) => {
			try {
				const topicsAndSubscriptions = await azure.getAllTopicsWithSubs(namespaceId, resourceGroup, azureToken, currentTokenCredentials.subscriptionId);
				currentNamespaceConnectionString = await azure.getConnectionString(azureToken, currentTokenCredentials.subscriptionId, resourceGroup, namespaceId);
				logger.info('Topic and subscriptions info retrieving');
				return topicsAndSubscriptions;
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const peekDlq = async (topic, subscription, numMessages) => {
			try {
				const busConfig = getBusConfig(topic, subscription, currentNamespaceConnectionString);
				const { start: startBus, stop: stopBus } = initBus();
				const bus = await startBus({ config: busConfig });
				const count = parseInt(numMessages, 10);
				const deadMessages = await bus.peekDlq(config.subscriptionToAnalyzeId, count);
				await stopBus();
				logger.info('Peek DLQ read properly');
				return deadMessages;
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const purgeDlq = async (topic, subscription) => {
			try {
				const busConfig = getBusConfig(topic, subscription, currentNamespaceConnectionString);
				const { start: startBus, stop: stopBus } = initBus();
				const bus = await startBus({ config: busConfig });
				const messageHandler = async message => {
					message.complete();
				};
				await bus.processDlq(config.subscriptionToAnalyzeId, messageHandler);
				await stopBus();
				logger.info('Delete DLQ processed properly');
				return 'Delete DLQ processed properly';
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const peekActive = async (topic, subscription, numMessages) => {
			try {
				const busConfig = getBusConfig(topic, subscription, currentNamespaceConnectionString);
				const { start: startBus, stop: stopBus } = initBus();
				const bus = await startBus({ config: busConfig });
				const count = parseInt(numMessages, 10);
				const activeMessages = await bus.peek(config.subscriptionToAnalyzeId, count);
				await stopBus();
				logger.info('Peek DLQ read properly');
				return activeMessages;
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		const purgeActive = async (topic, subscription) => {
			try {
				const busConfig = getBusConfig(topic, subscription, currentNamespaceConnectionString);
				const { start: startBus, stop: stopBus } = initBus();
				const bus = await startBus({ config: busConfig });
				const subscribe = () => {
					const onError = logger.error;
					const onStop = logger.warn;
					return bus.subscribe(onError, onStop);
				};
				const onMessageHanlder = async () => {
					const activeMessages = await bus.peekActive(config.subscriptionToAnalyzeId, 1);
					if (activeMessages.length < 1) await stopBus();
				};
				subscribe()(config.subscriptionToAnalyzeId, onMessageHanlder);
				logger.info('Deleted Active Messages properly');
				return 'Deleted all Active Messages properly';
			} catch (err) {
				logger.error(err);
				throw createBadRequest(err.message);
			}
		};

		return { authorize, getNamespaces, getAllTopicsWithSubs, peekDlq, purgeDlq, peekActive, purgeActive };
	};

	return { start };
};
