import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// import App from '../imports/ui/App.js';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

import '/imports/startup/client';

Meteor.startup(() => {
    render(renderRoutes(), document.getElementById('render-target'));
});