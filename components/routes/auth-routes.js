module.exports = () => {
	const start = async ({ app, auth }) => {
		const passport = auth.getPassport();

		app.get('/auth/session', (req, res) => {
			const session = {};
			if (req.user) session.user = req.user;
			return res.json(session);
		});

		app.get('/login-azure', (req, res, next) => {
			// req.session.returnTo = req.query.returnTo;
			next();
		}, passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }));

		app.post('/auth/openid/callback', (req, res, next) => {
			passport.authenticate('azuread-openidconnect', { response: res, failureRedirect: '/login',
			})(req, res, next);
		}, (req, res) => {
			res.redirect('/home/default');
		},
		);
	};

	return { start };
};
