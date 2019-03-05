import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from '../components/Main/Main';
import Counter from '../components/Counter/Counter';
import IncrementForm from '../components/Counter/IncrementForm';
import TaskList from '../components/TaskList/TaskList';
import FetchExample from '../components/FetchExample/FetchExample';
import Documentation from '../components/Documentation/Documentation';
import AssetGallery from '../components/AssetGallery/AssetGallery';

export default class Routes extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/counter" render={() => (<Main DefaultComponent={Counter} />)} />
                        <Route path="/form" render={() => (<Main DefaultComponent={IncrementForm} />)} /> 
                        <Route path="/task-list" render={() => <Main DefaultComponent={TaskList} />} />
                        <Route path="/fetch-example" render={() => <Main DefaultComponent={FetchExample} />} />
                        <Route path="/documentation" render={() => <Main DefaultComponent={Documentation} />} />
                        <Route path="/asset-gallery" render={() => <Main DefaultComponent={AssetGallery} />} />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}