import { connect } from 'react-redux';

import Login from './Login.component';
import { resetToasterMessage } from '../../../state/Azure/actionCreators';
import { signIn } from '../../../state/Auth/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';

const mapStateToProps = state => ({
    toastMessage: contentSelector.toastMessage(state),
    namespaces: contentSelector.getNamespaces(state)
});

const mapDispatchToProps = dispatch => ({
    signIn: (clientId, clientSecret, appTenantId, subscriptionId) => dispatch(signIn(clientId, clientSecret, appTenantId, subscriptionId)),
    resetToaster: () => dispatch(resetToasterMessage()),
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login));