import { connect } from 'react-redux';

import Home from './Home.component';
import { setDlq, setActive, resetToasterMessage, getNamespaces, getTopics, selectNamespace } from '../../../state/Azure/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';
import { getLoadingState } from '../../../state/UI/selectors';

const mapStateToProps = state => ({
    topics: contentSelector.topics(state),
    toastMessage: contentSelector.toastMessage(state),
    loading: getLoadingState(state),
    namespaces: contentSelector.getNamespaces(state),
    selectedNamespace: contentSelector.getSelectedNamespace(state),
});

const mapDispatchToProps = dispatch => ({
    setDlq: () => dispatch(setDlq([])),
    setActive: () => dispatch(setActive([])),
    resetToaster: () => dispatch(resetToasterMessage()),
    getNamespaces: () => dispatch(getNamespaces()),
    getTopics: namespace => dispatch(getTopics(namespace)),
    selectNamespace: namespace => dispatch(selectNamespace(namespace)),
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home));