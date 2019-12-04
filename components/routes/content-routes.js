const path = require('path');
const express = require('express');

module.exports = () => {
	const start = async ({ app }) => {
		app.get('/', (req, res) =>
			res.sendFile(
				`${process.cwd()}/react-app/build/index.html`,
			),
		);

		app.use(
			express.static(`${process.cwd()}/react-app/build`),
		);

		return Promise.resolve();
	};

	return { start };
};
