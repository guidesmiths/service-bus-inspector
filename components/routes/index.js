const System = require('systemic');
const adminRoutes = require('./admin-routes');
const contentRoutes = require('./content-routes');
const apiRoutes = require('./api-routes');
const authRoutes = require('./auth-routes');
const errorRoutes = require('./error-router');

module.exports = new System({ name: 'routes' })
	.add('routes.admin', adminRoutes())
	.dependsOn(
		'config',
		'logger',
		'app',
		'middleware.prepper',
		'manifest',
		'healthcheck',
	)
	.add('routes.auth', authRoutes())
	.dependsOn('app', 'auth')
	.add('routes.api', apiRoutes())
	.dependsOn('app', 'auth', 'config', 'controller')
	.add('routes.content', contentRoutes())
	.dependsOn('app')
	.add('routes.error', errorRoutes())
	.dependsOn('app', 'logger')
	.add('routes')
	.dependsOn('routes.admin', 'routes.api', 'routes.auth', 'routes.content', 'routes.error');
