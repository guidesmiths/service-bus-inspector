const currentMemoryUsage = require('./lib/memory');

module.exports = () => {
	const start = async () => {
		const status = async () => ({
			general: 'ok',
			dependencies: {},
		});
		const metrics = () => ({
			memory_mb: currentMemoryUsage(),
		});

		const healthcheck = async () => ({
			status: await status(),
			metrics: metrics(),
		});

		return { healthcheck };
	};

	return { start };
};
