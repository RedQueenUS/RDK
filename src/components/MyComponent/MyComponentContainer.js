import { connect } from 'react-redux';
import MyComponent from './MyComponent';

const mapDispatchToProps = {

}

const mapStateToProps = (state, ownProps) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);