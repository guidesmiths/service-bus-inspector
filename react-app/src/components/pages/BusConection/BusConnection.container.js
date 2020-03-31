import { connect } from 'react-redux';

import BusConnection from './BusConnection.component';
import { setToasterMessage } from '../../../state/Azure/actionCreators';
import { setLoading } from '../../../state/UI/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';
import * as uiSelector from '../../../state/UI/selectors';
import { hasValidToken, isCheckingToken } from '../../../state/Auth/selectors';
import { checkToken } from '../../../state/Auth/actionCreators';

const mapStateToProps = state => ({
	isLoading: uiSelector.isLoading(state),
	toastMessage: contentSelector.toastMessage(state),
	hasValidToken: hasValidToken(state),
	isCheckingToken: isCheckingToken(state),
	busConnectionParams: contentSelector.getBusConnectionParams(state)
});

const mapDispatchToProps = dispatch => ({
	setLoading: loading => dispatch(setLoading(loading)),
	checkToken: () => dispatch(checkToken()),
	setToasterMessage: params => dispatch(setToasterMessage(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(BusConnection);
