import React, {Component} from "react";
import {getUserSession, getUsernameFromUserId} from "../../utils/api";
import {NO_USER_ID} from "../../utils/";

class MainPage extends Component {
    async componentDidMount() {
        const {initializeUserSession, location, preloadInitialState, initialState} = this.props;
        const params = new URLSearchParams(location.search);
        const userId = (params.get('userId')) ? params.get('userId') : NO_USER_ID;
        getUserSession(userId).then(async (sessionSlate) => {
            const username = await getUsernameFromUserId(userId).then((json) => {
                return json.username;
            });

            if (initialState) {
                preloadInitialState(initialState);
            } else {
                initializeUserSession({userId, sessionSlate, username});
            }
        });
    }

    render() {
        const {ComponentToLoad} = this.props;
        return (
            <div className="MainPage">
                <ComponentToLoad {...this.props} />
            </div>
        )
    }
}

export default MainPage;
