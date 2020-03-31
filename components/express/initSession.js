const session = require('express-session');

module.exports = () => {
	const start = async ({ app }) => {
		app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
	};

	return { start };
};
