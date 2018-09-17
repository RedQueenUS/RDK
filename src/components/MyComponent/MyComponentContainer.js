import { connect } from 'react-redux';
import MyComponent from './MyComponent';
import {clickLeft, clickRight} from "./MyComponentReducer";

const mapStateToProps = (state, ownProps) => {
    const {MyComponent} = state;
    const {clicks} = MyComponent;

    return {
        clicks
    };
}

const mapDispatchToProps = {
    onClickLeft: clickLeft.onFunction,
    onClickRight: clickRight.onFunction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);