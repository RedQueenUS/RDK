import {createUIEHandler} from '../../utils/index';

const CLICK_LEFT = "CLICK_LEFT";
const onClickLeft = () => {
    return {

    }
};
const handleClickLeft = (state, action) => {
    const {clicks} = state;
    const {left, right} = clicks;
    return {
        ...state,
        clicks: {
            left: left + 1,
            right
        }
    };
};
export const clickLeft = createUIEHandler(CLICK_LEFT, onClickLeft, handleClickLeft);



const CLICK_RIGHT = "CLICK_RIGHT";
const onClickRight = () => {
    return {

    }
};
const handleClickRight = (state, action) => {
    const {clicks} = state;
    const {left, right} = clicks;
    return {
        ...state,
        clicks: {
            left,
            right: right + 1
        }
    };
};
export const clickRight = createUIEHandler(CLICK_RIGHT, onClickRight, handleClickRight);



export const UIEHandlers = {
    [clickLeft.type]: clickLeft,
    [clickRight.type]: clickRight,
    getType: function (actionType) {
        return this[actionType].type;
    },
    getOnFunction: function (actionType) {
        return this[actionType].onFunction;
    },
    getHandlerFunction: function (actionType) {
        return this[actionType].handleFunction;
    }
};

const defaultState = {};

export const reducer = (state = defaultState, action) => {
    const {type} = action;
    if (!UIEHandlers.hasOwnProperty(type)) {
        return state;
    }

    const handlerFunction = UIEHandlers.getHandlerFunction(type);
    return handlerFunction(state, action);
};
