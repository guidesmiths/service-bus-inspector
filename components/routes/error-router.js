const { createNotFoundError } = require('../../utils/errors-creator');

module.exports = () => {
	const start = async ({ app }) => {
		app.use((req, res, next) => {
			next(createNotFoundError(`${req.method} - ${req.path} not found`));
		});

		// eslint-disable-next-line no-unused-vars
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.json(err);
		});
	};

	return { start };
};
