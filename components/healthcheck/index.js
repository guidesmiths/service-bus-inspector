const System = require('systemic');
const initHealthCheck = require('./health-check');

module.exports = new System({ name: 'healthcheck' })
	.add('healthcheck', initHealthCheck());
// .dependsOn('db', 'bus');
