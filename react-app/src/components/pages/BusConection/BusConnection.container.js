import { connect } from 'react-redux';

import BusConnection from './BusConnection.component';
import { getDlq, deleteDlq, getActive, deleteActive } from '../../../state/Azure/actionCreators';
import { setLoading } from '../../../state/UI/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';
import * as uiSelector from '../../../state/UI/selectors';
import { hasValidToken, isCheckingToken } from '../../../state/Auth/selectors';
import { checkToken } from '../../../state/Auth/actionCreators';

const mapStateToProps = state => ({
  content: contentSelector.getDlq(state),
  isLoading: uiSelector.isLoading(state),
  toastMessage: contentSelector.toastMessage(state),
  dlqList: contentSelector.getDlq(state),
  activeList: contentSelector.getActive(state),
  connectionString: contentSelector.getConnectionString(state),
  hasValidToken: hasValidToken(state),
  isCheckingToken: isCheckingToken(state)
});

const mapDispatchToProps = dispatch => ({
  getDlq: content => dispatch(getDlq(content)),
  deleteDlq: content => dispatch(deleteDlq(content)),
  getActive: content => dispatch(getActive(content)),
  setLoading: loading => dispatch(setLoading(loading)),
  deleteActive: content => dispatch(deleteActive(content)),
  checkToken: () => dispatch(checkToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(BusConnection);
