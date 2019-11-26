import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Toaster from '../../commons/Toaster/Toaster.container';
import { withRouter } from 'react-router-dom'

import './Login.css';

const Login = (props) => {
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [appTenantId, setAppTenantId] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onClickLogin = () => {
        setSubmitted(true);
        if (clientId !== '' && clientSecret !== '' && appTenantId !== '' && subscriptionId !== '') {
            props.signIn(clientId, clientSecret, appTenantId, subscriptionId);
        }
    };

    const keyPressed = event => {
        if (event.key === "Enter") {
            onClickLogin()
        }
    }

    useEffect(() => {
        if (props.toastMessage.length > 0) {
            props.history.push('/home')
        }
    }, [props.toastMessage])

    useEffect(() => {
        props.resetToaster();
    }, [])

    return (
        <div className="loginContainer">
            {props.toastMessage !== [] &&
                props.toastMessage.map((element, index) => (
                    <Toaster
                        key={index}
                        message={element.message}
                        action={element.action}
                    />)
                )
            }
            <form className="cardCustom" onSubmit={onClickLogin}>
                <h5>Login</h5>
                <div className="input-group mb-3 inputWrap">
                    <input type="text" onKeyPress={(event) => keyPressed(event)} className={"form-control" + (clientId === '' && submitted === true ? " is-invalid" : '')} required placeholder="Client Id" aria-label="ClientId" aria-describedby="basic-addon1" onChange={(evt) => setClientId(evt.target.value)} />
                    <div class="invalid-feedback">
                        Client ID is required.
                    </div>
                    <input type="text" onKeyPress={(event) => keyPressed(event)} className={"form-control" + (clientSecret === '' && submitted === true ? " is-invalid" : '')} required placeholder="Client Secret" aria-label="ClientSecret" aria-describedby="basic-addon1" onChange={(evt) => setClientSecret(evt.target.value)} />
                    <div class="invalid-feedback">
                        Client Secret is required.
                    </div>
                    <input type="text" onKeyPress={(event) => keyPressed(event)} className={"form-control" + (appTenantId === '' && submitted === true ? " is-invalid" : '')} required placeholder="App Tenant Id" aria-label="appTenantId" aria-describedby="basic-addon1" onChange={(evt) => setAppTenantId(evt.target.value)} />
                    <div class="invalid-feedback">
                        Tenant ID is required.
                    </div>
                    <input type="text" onKeyPress={(event) => keyPressed(event)} className={"form-control" + (subscriptionId === '' && submitted === true ? " is-invalid" : '')} required placeholder="Subscription Id" aria-label="subscriptionId" aria-describedby="basic-addon1" onChange={(evt) => setSubscriptionId(evt.target.value)} />
                    <div class="invalid-feedback">
                        Subscription ID is required.
                    </div>
                </div>
                <Button type="button" onClick={onClickLogin}>Login</Button>
            </form>
        </div>
    )
};

Login.propTypes = {
    signIn: PropTypes.func.isRequired,
};

export default withRouter(Login);
