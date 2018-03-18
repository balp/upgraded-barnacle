import React, { Component } from 'react';

export default class Fact extends Component {
    render() {
        return (
            <tr><th>{this.props.fact.name}</th>
                <td>{this.props.fact.date}</td>
                <td>{this.props.fact.text}</td>
            </tr>
        );
    }
}
