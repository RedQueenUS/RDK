import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import MyComponent from '../components/MyComponent';

export default class Routes extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={MyComponent} />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}
