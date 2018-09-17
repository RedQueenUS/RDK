import { connect } from 'react-redux' 
import MainPage from './MainPage';
import { preloadInitialState, initializeUserSession } from './MainPageReducer';

const mapStateToProps = (state, ownProps) => {
    const {stateInitialization} = state;
    const {isInitialized} = stateInitialization;
    const {initialState, DefaultComponent, match} = ownProps;
    const DEFAULT_COMPONENT = DefaultComponent;

    if (!isInitialized && initialState) {
        return {
            initialState: {
                ...initialState,
                stateInitialization: {
                    isInitialized: true
                }
            },
            ComponentToLoad: DEFAULT_COMPONENT
        };
    }

    return {
        ComponentToLoad: DEFAULT_COMPONENT
    }
};

const mapDispatchToProps = {
    initializeUserSession: initializeUserSession.onFunction,
    preloadInitialState: preloadInitialState.onFunction
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
