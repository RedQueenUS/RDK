import { connect } from 'react-redux'
import AppComponent from './App'

const mapStatetoProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        init: () => {
            return;
        }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
