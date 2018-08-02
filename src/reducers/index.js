import { combineReducers } from 'redux'
import { reducer as myComponentReducer } from '../components/MyComponent/MyComponentReducer';

const reducers = combineReducers({
    myComponentReducer
});

export default reducers
