import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppContainer';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { initialState } from "./store";
import injectTapEventPlugin from 'react-tap-event-plugin';

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__)
    ? composeWithDevTools({
        actionsBlacklist: [/* actions to be ignored in Redux DevTools */]
    })
    : compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
        applyMiddleware(
            createLogger()
            //sagaMiddleware
        )
    )
);

injectTapEventPlugin();

export const RUNE_ID = "12341234-1234-1234-1234-123412341234";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

