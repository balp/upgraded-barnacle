import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Facts } from '../api/facts.js'
import Fact from './Facts.js'

// PersonInfo component - represents the whole app
class PersonInfo extends Component {
    getName() {
        return "ARNHOLM, Per Anders Niklas"
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
    return {
      facts: Facts.find({}).fetch(),
    };
})(PersonInfo)