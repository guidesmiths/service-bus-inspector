import { connect } from 'react-redux';

import Toaster from './Toaster';
import { resetToasterMessage } from '../../../state/Azure/actionCreators';
import * as contentSelector from '../../../state/Azure/selectors';

const mapStateToProps = state => ({
    toastMessage: contentSelector.toastMessage(state),
});

const mapDispatchToProps = dispatch => ({
    resetToaster: () => dispatch(resetToasterMessage()),
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps,
)(Toaster));