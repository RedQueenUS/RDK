import { connect } from 'react-redux';
import MyComponent from './MyComponent';
import {clickLeft, clickRight} from "./MyComponentReducer";

const defaultState = {MyComponent: {clicks: {left: 2, right: 3}}};

const mapStateToProps = (state = defaultState, ownProps) => {
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
