const System = require('systemic');
const initAzure = require('./initAzure');

module.exports = new System({ name: 'azure' })
	.add('azure', initAzure())
	.dependsOn('logger');
