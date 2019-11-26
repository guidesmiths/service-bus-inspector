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

		app.get('/tokenhealth', async (req, res, next) => {
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
			controller
				.authorize(clientId, clientSecret, appTenantId, subscriptionId)
				.then(token => res.json({ token }))
				.catch(err => next(err));
		});

		app.get('/namespaces', isTokenValid, (req, res, next) => {
			const { authorization } = req.headers;
			controller
				.getNamespaces(authorization)
				.then(response => res.json(response))
				.catch(err => next(err));
		});

		app.post('/namespace', isTokenValid, (req, res, next) => {
			const { authorization } = req.headers;
			const { namespace, resourceGroup } = req.body;
			controller
				.getAllTopicsWithSubs(namespace, resourceGroup, authorization)
				.then(response => res.json(response))
				.catch(err => next(err));
		});

		app.post('/peekdlq', isTokenValid, (req, res, next) => {
			const { topic, subscription, numMessages } = req.body;
			controller
				.peekDlq(topic, subscription, numMessages)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/processdlq', isTokenValid, (req, res, next) => {
			const { topic, subscription } = req.body;

			controller
				.purgeDlq(topic, subscription)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/peekactive', isTokenValid, (req, res, next) => {
			const { topic, subscription, numMessages } = req.body;

			controller
				.peekActive(topic, subscription, numMessages)
				.then(result => res.json(result))
				.catch(next);
		});

		app.post('/deleteActive', isTokenValid, (req, res, next) => {
			const { topic, subscription } = req.body;

			controller
				.purgeActive(topic, subscription)
				.then(result => res.json(result))
				.catch(next);
		});
	};

	return { start };
};
