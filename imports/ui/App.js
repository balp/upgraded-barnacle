import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Facts } from '../api/facts.js'
import { Names } from "../api/names";
import Fact from './Facts.js'

// PersonInfo component - represents the whole app
class PersonInfo extends Component {
    getName() {
        var surname = '';
        var given = '';
        for (n in this.props.names) {
            let name = this.props.names[n]
            if ('Surname' in name) {
                surname = name['Surname']
            }
            if ('Given' in name) {
                given = name['Given']
            }
            if ('Familiar' in name) {
                given = name['Familiar']
            }
        }
        return (<span>
            <span>{surname}</span>, <span>{given}</span>
        </span>)
    }
    renderFacts() {
        return this.props.facts.map((fact) => (
            <Fact key={fact._id} fact={fact} />
        ));
    }
    render() {
        return (
            <div className="container person-view">
            <header>
                    <h2 className="header">{this.getName()}</h2>
            </header>
                <div className="container">
                    <h3 className="header">Personliga Detaljer</h3>
                    <table className="compactTable"><tbody>
                    {this.renderFacts()}
                    </tbody></table>

                </div>
            </div>
    );
    }
}

export default withTracker(() => {
    Meteor.subscribe('facts');
    Meteor.subscribe('names');
    return {
        facts: Facts.find({"ReferenceID":"PERS1"}).fetch(),
        names: Names.find({"PersonID":"PERS1"}).fetch(),
    };
})(PersonInfo)