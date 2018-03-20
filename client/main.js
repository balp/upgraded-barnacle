import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
    render(<App id={"PERS4"}/>, document.getElementById('render-target'));
});