import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/gs_icon.svg';
import { ReactComponent as AzureLogo } from '../../../assets/azure.svg';
import { azureLogin } from '../../../api/contentAPI';

import './Login.css';

const Login = ({ history, signIn, hasValidToken, checkToken, isCheckingToken }) => {
	const [clientId, setClientId] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [appTenantId, setAppTenantId] = useState('');
	const [subscriptionId, setSubscriptionId] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const onClickLogin = () => {
		setSubmitted(true);
		signIn();
	};

	const keyPressed = event => {
		if (event.key === 'Enter') {
			onClickLogin();
		}
	};

	useEffect(() => {
		checkToken()
	}, [])

	useEffect(() => {
		if (hasValidToken && !isCheckingToken) {
			history.push('/home/default');
		}
	}, [hasValidToken, history]);

	return (
		<div className="loginContainer">
			{/* <form className="cardCustom" onSubmit={onClickLogin}>
				<h5><Logo/><b className="titleText">Service Bus Inspector</b></h5>
				<div className="input-group mb-3 inputWrap">
					<input
						type="text"
						onKeyPress={event => keyPressed(event)}
						autoComplete={"on"}
						style={{'-webkit-text-security': 'disc', 'text-security': 'disc'}}
						className={'form-control' + (clientId === '' && submitted === true ? ' is-invalid' : '')}
						required
						placeholder="Client Id"
						aria-label="ClientId"
						aria-describedby="basic-addon1"
						onChange={evt => setClientId(evt.target.value)}
						name="text"
					/>
					<div className="invalid-feedback">Client ID is required.</div>
					<input
						type="text"
						onKeyPress={event => keyPressed(event)}
						autoComplete={"on"}
						style={{'-webkit-text-security': 'disc', 'text-security': 'disc'}}
						className={'form-control' + (clientSecret === '' && submitted === true ? ' is-invalid' : '')}
						required
						placeholder="Client Secret"
						aria-label="ClientSecret"
						aria-describedby="basic-addon1"
						onChange={evt => setClientSecret(evt.target.value)}
						name="clientSecret"
					/>
					<div className="invalid-feedback">Client Secret is required.</div>
					<input
						type="text"
						onKeyPress={event => keyPressed(event)}
						autoComplete={"on"}
						style={{'-webkit-text-security': 'disc', 'text-security': 'disc'}}
						className={'form-control' + (appTenantId === '' && submitted === true ? ' is-invalid' : '')}
						required
						placeholder="App Tenant Id"
						aria-label="appTenantId"
						aria-describedby="basic-addon1"
						onChange={evt => setAppTenantId(evt.target.value)}
						name="tenantId"
					/>
					<div className="invalid-feedback">Tenant ID is required.</div>
					<input
						type="text"
						onKeyPress={event => keyPressed(event)}
						autoComplete={"on"}
						style={{'-webkit-text-security': 'disc', 'text-security': 'disc'}}
						className={'form-control' + (subscriptionId === '' && submitted === true ? ' is-invalid' : '')}
						required
						placeholder="Subscription Id"
						aria-label="subscriptionId"
						aria-describedby="basic-addon1"
						onChange={evt => setSubscriptionId(evt.target.value)}
						name="subscriptionId"
					/>
					<div className="invalid-feedback">Subscription ID is required.</div>
				</div>
				<Button type="button" onClick={onClickLogin}>
					Login
				</Button>
			</form> */}
			<div className="cardCustom">
				<h5><Logo/><b className="titleText">Service Bus Inspector</b></h5>
				<AzureLogo onClick={() => [azureLogin(), onClickLogin()]} />
				<h6>Sign in with Azure</h6>
			</div>
		</div>
	);
};

Login.propTypes = {
	signIn: PropTypes.func.isRequired
};

export default withRouter(Login);
