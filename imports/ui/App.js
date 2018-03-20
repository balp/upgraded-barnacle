import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Facts } from '../api/facts.js'
import { Names } from "../api/names";
import Fact from './Facts.js'

// PersonInfo component - represents the whole app
class PersonInfo extends React.Component {
    getName() {
        let surname = '';
        let given = '';
        for (n in this.props.names) {
            let name = this.props.names[n];
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
                    <h1 className="header">{this.getName()}</h1>
            </header>
                <div>
                    <h2 className="header">Personliga Detaljer</h2>
                    <table className="compactTable"><tbody>
                    {this.renderFacts()}
                    </tbody></table>
                </div>
                <div>
                    <h2 className="header">Närmaste Familj</h2>
                    <div className="row">
                        <div className="col s12 family_parents">
                            <span>Biologiska föräldrar:&nbsp;</span>
                            <span className="family_person">ARNHOLM, Bo Anders Henry ("Bosse")</span>
                            <span>&nbsp;&&nbsp;</span>
                            <span className="family_person">FRÖBERG, Ingrid Gunborg</span>
                            <span className="family_date_note">[g: 27 Nov 1971]</span>
                        </div>
                        <div className="col s11 offset-s1 siblings">
                            <span className="family_person">ARNHOLM, Per Robert Fredrik</span>
                            <span className="family_date_note">[f: 1 Dec 1975]</span></div>
                        <div className="col s11 offset-s1 self_partner">
                            <div className="row">
                                <div className="col s12 family_self">
                                    <span className="family_person">ARNHOLM, Per Anders Niklas</span>
                                    <span>&nbsp;&&nbsp;</span>
                                    <span className="family_person">NORMARK, Linda</span>
                                </div>
                                <div className="col s2 offset-s1">Förlovning</div>
                                <div className="col s2">21 Aug 1999</div>
                                <div className="col s7">GKSS båthamn i Långedrag, Göteborg</div>
                                <div className="col s2 offset-s1">ID-Nummer</div>
                                <div className="col s9">45</div>
                                <div className="col s2 offset-s1">Bevis</div>
                                <div className="col s9">N542</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

PersonInfo.propTypes = {
    names: PropTypes.array,
    namesLoading: PropTypes.bool,
    namesExists: PropTypes.bool,

    facts: PropTypes.array,
    factsLoading: PropTypes.bool,
    factsExists: PropTypes.bool,
};

export default withTracker(({ id }) => {
    const namesHandle = Meteor.subscribe('names.person', id);
    const namesLoading = !namesHandle.ready();
    const names_person = Names.find();
    const namesExists = !namesLoading && !!names_person;

    const factsHandle = Meteor.subscribe('facts.person', id);
    const factsLoading = !factsHandle.ready();
    const facts_person = Facts.find();
    const factsExists = !factsLoading && !!facts_person;

    return {
        names: names_person.fetch(),
        namesLoading,
        namesExists,
        facts: facts_person.fetch(),
        factsLoading,
        factsExists,
    };
})(PersonInfo)