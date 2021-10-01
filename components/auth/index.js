const Systemic = require('systemic');
const authProvider = require('./authProvider');

module.exports = new Systemic({ name: 'auth' })
	.add('auth', authProvider())
	.dependsOn('app', 'config', 'logger');
