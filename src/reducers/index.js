import { combineReducers } from "redux";
import { reducer as MyComponent } from "../components/MyComponent/MyComponentReducer";

const reducers = combineReducers({
    MyComponent
});

export default reducers;
