import { connect } from 'react-redux';

import Home from './Home.component';
import { resetToasterMessage, getNamespaces, getTopics, selectNamespace } from '../../../state/Azure/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';
import { getLoadingState } from '../../../state/UI/selectors';
import { hasValidToken, isCheckingToken } from '../../../state/Auth/selectors';
import { checkToken } from '../../../state/Auth/actionCreators';

const mapStateToProps = state => ({
  topics: contentSelector.topics(state),
  toastMessage: contentSelector.toastMessage(state),
  loading: getLoadingState(state),
  namespaces: contentSelector.getNamespaces(state),
  selectedNamespace: contentSelector.getSelectedNamespace(state),
  hasValidToken: hasValidToken(state),
  isCheckingToken: isCheckingToken(state)
});

const mapDispatchToProps = dispatch => ({
  resetToaster: () => dispatch(resetToasterMessage()),
  getNamespaces: () => dispatch(getNamespaces()),
  getTopics: namespace => dispatch(getTopics(namespace)),
  selectNamespace: namespace => dispatch(selectNamespace(namespace)),
  checkToken: () => dispatch(checkToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
