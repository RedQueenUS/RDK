import { connect } from 'react-redux';
import MyComponent from './MyComponent';
import {onClickLeft, onClickRight} from "./MyComponentReducer";

const mapStateToProps = (state, ownProps) => {
    const {MyComponent} = state;
    const {clicks} = MyComponent;

    return {
        clicks
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickLeft: () => {
            dispatch(onClickLeft());
        },
        onClickRight: () => {
            dispatch(onClickRight());
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);