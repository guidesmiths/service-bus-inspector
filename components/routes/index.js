const System = require('systemic');
const adminRoutes = require('./admin-routes');
const contentRoutes = require('./content-routes');
const apiRoutes = require('./api-routes.js');
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
	.add('api.routes', apiRoutes())
	.dependsOn('config', 'app', 'controller')
	.add('error.routes', errorRoutes())
	.dependsOn('app', 'logger')
	.add('routes.content', contentRoutes())
	.dependsOn('app')
	.add('routes')
	.dependsOn('routes.admin', 'api.routes', 'routes.content', 'error.routes');
