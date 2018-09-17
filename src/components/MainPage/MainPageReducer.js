import {createUIEHandler, getSessionData, setSessionData} from "../../utils";
import StringSet from "../../utils/StringSet";

const INITIALIZE_USER_SESSION = "INITIALIZE_USER_SESSION";
const onInitializeUserSession = ({userId, sessionSlate, username}) => {
    return {
        userId,
        sessionSlate,
        username
    };
}
const handleInitializeUserSession = (state = {}, {payload}) => {
    const {userId, sessionSlate, username} = payload;
    const {slate} = sessionSlate;
    const favorites = getSessionData(slate, "favorites") || [];
    const upvotes = getSessionData(slate, "upvotes") || [];
    return {
        ...state,
        userId,
        username,
        sessionSlate,
        favorites,
        upvotes
    };
};
export const initializeUserSession = createUIEHandler(INITIALIZE_USER_SESSION, onInitializeUserSession, handleInitializeUserSession);



const CLICK_FAVORITE_TOGGLE = "CLICK_FAVORITE_TOGGLE";
const onClickFavoriteToggle = (id) => {
    return {
        id
    };
};
const handleClickFavoriteToggle = (state = {}, {payload}) => {
    const {id} = payload;
    const {favorites, sessionSlate} = state;
    const {slate} = sessionSlate;
    const oldFavorites = new StringSet(favorites);
    const newFavorites = {favorites: oldFavorites.toggleAndReturn(id)};
    return {
        ...state,
        ...newFavorites,
        sessionSlate: {
            ...sessionSlate,
            slate: setSessionData(slate, newFavorites)
        }
    };
};
export const clickFavoriteToggle = createUIEHandler(CLICK_FAVORITE_TOGGLE, onClickFavoriteToggle, handleClickFavoriteToggle);



const CLICK_UP_VOTE = "CLICK_UP_VOTE";
const onClickUpVote = (id) => {
    return {
        id
    };
};
const handleClickUpVote = (state = {}, {payload}) => {
    const {id} = payload;
    const {upvotes, sessionSlate} = state;
    const {slate} = sessionSlate;
    const oldUpvotes = new StringSet(upvotes);
    const newUpvotes = {upvotes: oldUpvotes.toggleAndReturn(id)};
    return {
        ...state,
        ...newUpvotes,
        sessionSlate: {
            ...sessionSlate,
            slate: setSessionData(slate, newUpvotes)
        }
    };
};
export const clickUpVote = createUIEHandler(CLICK_UP_VOTE, onClickUpVote, handleClickUpVote);



export const IS_INITIALIZED = {isInitialized: true};
export const IS_NOT_INITIALIZED = {isInitialized: false};
const PRELOAD_INITIAL_STATE = "PRELOAD_INITIAL_STATE";
const onPreloadInitialState = (initialState) => {
    return {
        initialState
    };
};
const handlePreloadInitialState = (state, {type, initialState}) => {
    if (type === "PRELOAD_INITIAL_STATE") {
        const stateInitialization = IS_INITIALIZED;
        return {
            ...state,
            ...initialState,
            stateInitialization
        };
    }
    return state;
};
export const preloadInitialState = createUIEHandler(PRELOAD_INITIAL_STATE, onPreloadInitialState, handlePreloadInitialState);
export const stateInitialization = (state = IS_NOT_INITIALIZED, action) => {
    return state;
}



export const UIEHandlers = {
    [initializeUserSession.type]: initializeUserSession,
    [clickFavoriteToggle.type]: clickFavoriteToggle,
    [clickUpVote.type]: clickUpVote,
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

const defaultState = {
    userId: "00000000-0000-0000-0000-000000000000",
    sessionSlate: {
        slate: {
            id: "",
            runeId: "",
            ownerId: "",
            data: "",
            createdAt: "",
            isPublic: 0
        },
        counters: []
    }
};

export const reducer = (state = defaultState, action) => {
    const {type} = action;
    if (!UIEHandlers.hasOwnProperty(type)) {
        return state;
    }

    const handlerFunction = UIEHandlers.getHandlerFunction(type);
    return handlerFunction(state, action);
}
