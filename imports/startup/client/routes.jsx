import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router';

import { App } from '../../ui/App.js';
import AppContainer from '../../ui/containers/AppContainer.js';
import PersonInfo from '../../ui/containers/PersonInfo.js';
import NotFoundPage from '../../ui/pages/NotFoundPage.js';


export const renderRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={AppContainer}/>
            <Route path="/person/:id" component={PersonInfo}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);