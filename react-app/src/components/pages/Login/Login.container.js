import { connect } from 'react-redux';

import Login from './Login.component';
import { resetToasterMessage } from '../../../state/Azure/actionCreators';
import { signIn } from '../../../state/Auth/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';
import { hasValidToken, isCheckingToken } from '../../../state/Auth/selectors';
import { checkToken } from '../../../state/Auth/actionCreators';

const mapStateToProps = state => ({
  toastMessage: contentSelector.toastMessage(state),
  namespaces: contentSelector.getNamespaces(state),
  hasValidToken: hasValidToken(state),
  isCheckingToken: isCheckingToken(state)
});

const mapDispatchToProps = dispatch => ({
  signIn: (clientId, clientSecret, appTenantId, subscriptionId) => dispatch(signIn(clientId, clientSecret, appTenantId, subscriptionId)),
  resetToaster: () => dispatch(resetToasterMessage()),
  checkToken: () => dispatch(checkToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
