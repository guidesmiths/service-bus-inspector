const System = require('systemic');
const { defaultMiddleware, app, server } = require('systemic-express');
const sessionMiddleware = require('./initSession');

module.exports = new System({ name: 'express' })
	.add('app', app())
	.dependsOn('config', 'logger')
	.add('sessionMiddleware', sessionMiddleware())
	.dependsOn('app')
	.add('middleware.default', defaultMiddleware())
	.dependsOn('logger', 'app', 'routes')
	.add('server', server())
	.dependsOn('config', 'app', 'middleware.default');
