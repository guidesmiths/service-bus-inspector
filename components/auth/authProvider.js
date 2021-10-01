const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

module.exports = () => {
	const start = async ({ app, config }) => {
		const { tenantId, clientId, serverUrl, clientSecret } = config.provider;

		app.use(cookieParser());
		app.use(expressSession({
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: false,
		}),
		);
		app.use(bodyParser.urlencoded({ extended: true }));

		app.use(passport.initialize());
		app.use(passport.session());

		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser((user, done) => {
			done(null, user);
		});
		passport.use(
			new OIDCStrategy(
				{
					identityMetadata: `https://login.microsoftonline.com/${tenantId}/.well-known/openid-configuration`,
					clientID: clientId,
					clientSecret,
					responseType: 'code id_token',
					responseMode: 'form_post',
					redirectUrl: `${serverUrl}/auth/openid/callback`,
					allowHttpForRedirectUrl: true,
					passReqToCallback: false,
					// loggingLevel: 'info',
				},
				(iss, sub, profile, accessToken, refreshToken, done) => {
					if (!profile) {
						return done(new Error('No profile found'), null);
					}
					const user = {
						email: profile.upn,
						name: profile.name,
						displayName: profile.displayName,
					};
					return done(null, user);
				},
			),
		);

		const getPassport = () => passport;
		const ensureAuthenticated = (req, res, next) => { // eslint-disable-line consistent-return
			if (['test', 'local'].includes(process.env.SERVICE_ENV) || req.isAuthenticated()) {
				return next();
			}
			res.status(401).send({
				message: 'Authentication failed' });
		};

		return { getPassport, ensureAuthenticated };
	};

	return { start };
};
