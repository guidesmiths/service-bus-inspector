const express = require('express');

module.exports = () => {
	const start = async ({ app }) => {
		app.use(express.static(`${process.cwd()}/react-app/build`));
		app.get('/*', (req, res) =>
			res.sendFile(`${process.cwd()}/react-app/build/index.html`),
		);
		return Promise.resolve();
	};

	return { start };
};
