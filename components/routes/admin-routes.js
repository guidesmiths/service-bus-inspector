const expressSwaggerGenerator = require('express-swagger-generator');

module.exports = () => {
	const start = async ({ manifest = {}, app, healthcheck, logger, config }) => {
		const { swaggerOptions } = config;
		const expressSwagger = expressSwaggerGenerator(app);
		const options = {
			swaggerDefinition: {
				...swaggerOptions.swaggerDefinition,
			},
			basedir: __dirname,
			files: ['./**/**-routes.js'],
		};
		expressSwagger(options);

		/**
		 * This endpoint serves the manifest
		 * @route GET /__/manifest
		 * @group Admin - Everything about admin routes
		 * @returns 200 - Sucessful response
		 */
		app.get('/__/manifest', (req, res) => res.json(manifest));

		app.get('/__/health', (req, res) =>
			healthcheck
				.healthcheck()
				.then(health => res.json(health))
				.catch(err => {
					logger.error(`Health  check error: ${err.message}`);
					res.status(503).json({ status: { general: 'error' } });
				}),
		);

		return Promise.resolve();
	};

	return { start };
};
