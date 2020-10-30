const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { createBadRequest } = require('../../utils/errors-creator');

module.exports = () => {
	const start = async ({ app, controller }) => {
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(cors());

		const isTokenValid = async (req, res, next) => {
			try {
				const { authorization } = req.headers;
				const decodedToken = jwt.decode(authorization, { complete: true });
				const { kid } = decodedToken.header;
				const azureKeysResponse = await axios.get('https://login.microsoftonline.com/common/discovery/v2.0/keys');
				const azureKeys = azureKeysResponse.data.keys;
				const azureX5C = azureKeys.filter(key => key.kid === kid)[0].x5c[0];
				const key = `-----BEGIN CERTIFICATE-----\n${azureX5C}\n-----END CERTIFICATE-----`;
				jwt.verify(authorization, key);
				return next();
			} catch (error) {
				return next(createBadRequest('Authentication failed: invalid token'));
			}
		};

		app.get('/token-health', async (req, res, next) => {
			try {
				const { authorization } = req.headers;
				const decodedToken = jwt.decode(authorization, { complete: true });
				const { kid } = decodedToken.header;
				const azureKeysResponse = await axios.get('https://login.microsoftonline.com/common/discovery/v2.0/keys');
				const azureKeys = azureKeysResponse.data.keys;
				const azureX5C = azureKeys.filter(key => key.kid === kid)[0].x5c[0];
				const key = `-----BEGIN CERTIFICATE-----\n${azureX5C}\n-----END CERTIFICATE-----`;
				jwt.verify(authorization, key);
				res.json(true);
			} catch (error) {
				res.json(false);
				next(error);
			}
		});

		app.post('/auth', (req, res, next) => {
			const { clientId, clientSecret, appTenantId, subscriptionId } = req.body;
			req.session.credentials = { clientId, clientSecret, appTenantId, subscriptionId };
			controller
				.authorize(clientId, clientSecret, appTenantId)
				.then(token => res.json({ token }))
				.catch(err => next(err));
		});

		app.get('/namespaces', isTokenValid, (req, res, next) => {
			const { authorization } = req.headers;
			controller
				.getNamespaces(authorization, req.session.credentials.subscriptionId)
				.then(response => res.json(response))
				.catch(err => next(err));
		});

		app.post('/namespace', isTokenValid, (req, res, next) => {
			const { authorization } = req.headers;
			const { namespace, resourceGroup } = req.body;
			controller
				.getAllTopicsWithSubs(namespace, resourceGroup, authorization, req.session.credentials.subscriptionId)
				.then(response => {
					req.session.currentNamespaceConnectionString = response.currentNamespaceConnectionString;
					return res.json(response.topicsAndSubscriptions);
				})
				.catch(err => next(err));
		});

		app.post('/peek-dlq', isTokenValid, (req, res, next) => {
			const { topic, subscription, numMessages } = req.body;
			controller
				.peekDlq(topic, subscription, numMessages, req.session.currentNamespaceConnectionString)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/process-dlq', isTokenValid, (req, res, next) => {
			const { topic, subscription } = req.body;

			controller
				.purgeDlq(topic, subscription, req.session.currentNamespaceConnectionString)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/peek-active', isTokenValid, (req, res, next) => {
			const { topic, subscription, numMessages } = req.body;
			controller
				.peekActive(topic, subscription, numMessages, req.session.currentNamespaceConnectionString)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/delete-active', isTokenValid, (req, res, next) => {
			const { topic, subscription } = req.body;
			controller
				.purgeActive(topic, subscription, req.session.currentNamespaceConnectionString)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/subscription-detail', isTokenValid, (req, res, next) => {
			const { authorization } = req.headers;
			const { resourcegroup, namespace, topic, subscription } = req.body;
			controller
				.getSubscriptionDetail(authorization, req.session.credentials.subscriptionId, resourcegroup, namespace, topic, subscription)
				.then(response => res.json(response))
				.catch(err => next(err));
		});

		app.post('/publish-message', isTokenValid, async (req, res, next) => {
			const { topic, subscription, message } = req.body;
			try {
				const publication = await controller.republishMessage(topic, subscription, req.session.currentNamespaceConnectionString, message);
				return res.json(publication);
			} catch (err) {
				return next(createBadRequest(err.message));
			}
		});
	};

	return { start };
};
