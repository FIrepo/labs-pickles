import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './scss/index.css';

import Home from './routes/home';
import Drivers from './routes/drivers';
import NotFound from './routes/_not-found';
import Layout from './routes/_layout';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        <Router>
            <Layout>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route exact={true} path="/drivers" component={Drivers}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        </Router>
    , document.getElementById('pickles-app')
);

registerServiceWorker();
