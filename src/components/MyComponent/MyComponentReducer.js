export const ACTIONS = {
    CLICK_LEFT: "CLICK_LEFT",
    CLICK_RIGHT: "CLICK_RIGHT"
};

export const onClickLeft = () => {
    return {
        type: ACTIONS.CLICK_LEFT
    };
};

export const onClickRight = () => {
    return {
        type: ACTIONS.CLICK_RIGHT
    };
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

const ACTION_HANDLERS = {
    [ACTIONS.CLICK_LEFT]: handleClickLeft,
    [ACTIONS.CLICK_RIGHT]: handleClickRight,
};

const defaultState = {};

export const reducer = (state = defaultState, action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};
