import React from 'react';
import App from '../App.js';

export default class PersonInfo extends React.Component {
    render() {
        console.log(this.props.match.params);
        let person = this.props.match.params.id;
        return (
            <App id={person}/>
        );
    }
}