import React from 'react';
import { Link } from 'react-router-dom';

export default class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <Link to={'/person/PERS1'}>Anders Arnholm</Link>
            </div>

        );
    }
}