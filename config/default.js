module.exports = {
	server: {
		host: '0.0.0.0',
		port: process.env.PORT || 4000,
	},
	controller: {
		subscriptionToAnalyzeId: 'subscriptionToAnalyze',
		publicationsToAnalyzeId: 'publicationToAnalyze',
		// publications: {
		// 	performanceTest: {
		// 		topic: 'performance-test.v1.dummy.topic',
		// 	},
		// },
	},
	auth: {
		provider: {
			tenantId: process.env.TENANT_ID,
			clientId: process.env.CLIENT_ID,
			serverUrl: process.env.SERVER_URL || 'http://localhost:4000',
			clientSecret: process.env.CLIENT_SECRET,
		},
	},
	routes: {
		admin: {
			swaggerOptions: {
				swaggerDefinition: {
					info: {
						description: 'Documentation for fer-mar-bus',
						title: 'fer-mar-bus',
						version: '1.0.0',
					},
					host: process.env.SERVICE_ENV || 'localhost:4000',
					basePath: '/v1',
					produces: ['application/json'],
					schemes: ['http'],
					securityDefinitions: {
						JWT: {
							type: 'apiKey',
							in: 'header',
							name: 'Authorization',
							description: '',
						},
					},
				},
			},
		},
		api: {
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			appTenantId: process.env.TENANT_ID,
			subscriptionId: process.env.SUBSCRIPTION_ID,
		},
	},
	metrics: {
		key: null,
		internalLogging: false,
		context: {
			tags: {
				'ai.cloud.role': process.env.npm_package_name,
				'ai.cloud.roleInstance': process.env.HOSTNAME || 'local',
			},
		},
		autoCollect: {
			requests: true,
			performance: true,
			exceptions: true,
			dependencies: true,
			console: false,
		},
	},
	logger: {
		transport: 'console',
		include: [
			'tracer',
			'timestamp',
			'level',
			'message',
			'error.message',
			'error.code',
			'error.stack',
			'request.url',
			'request.headers',
			'request.params',
			'request.method',
			'response.statusCode',
			'response.headers',
			'response.time',
			'process',
			'system',
			'package.name',
			'service',
		],
		exclude: [
			'password',
			'secret',
			'token',
			'request.headers.cookie',
			'dependencies',
			'devDependencies',
		],
	},
};
