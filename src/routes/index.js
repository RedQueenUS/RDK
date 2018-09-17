import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../components/MainPage";
import MyComponent from "../components/MyComponent";
import emptySlateState from "../store/emptySlateState";
import initialState from "../store";

export default class Routes extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        <Route path="/__slate/:slateId" render={(props) => {return (<MainPage DefaultComponent={MyComponent} initialState={emptySlateState} {...props} />);}}  />
                        <Route path="/" render={(props) => {return (<MainPage DefaultComponent={MyComponent} {...props} />);}} />
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}
