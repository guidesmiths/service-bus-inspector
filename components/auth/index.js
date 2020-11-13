const System = require('systemic');
const authProvider = require('./authProvider');

module.exports = new System({ name: 'auth' })
	.add('auth', authProvider())
	.dependsOn('app', 'config');
