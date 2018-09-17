import { combineReducers } from "redux";
import { reducer as mainPageReducer, preloadInitialState, stateInitialization } from '../components/MainPage/MainPageReducer';
import { reducer as MyComponent } from "../components/MyComponent/MyComponentReducer";

const reducers = (state, action, wholeStore) => {
    const combinedReducers = [
        combineReducers({
            mainPageReducer,
            MyComponent,
            stateInitialization
        }),
        preloadInitialState.handleFunction
    ];

    return combinedReducers.reduce((aggr, reduction) => {
        return reduction(aggr, action, wholeStore)
    }, state);
}

export default reducers;
