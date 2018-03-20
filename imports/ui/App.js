import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Facts } from '../api/facts.js'
import { Names } from "../api/names";
import Fact from './Facts.js'
import {Children} from "../api/children";

// PersonInfo component - represents the whole app
class PersonInfo extends React.Component {
    getPersonName() {
        let surname = '';
        let given = '';
        for (n in this.props.mynames) {
            let name = this.props.mynames[n];
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
    formatName(name) {
        console.log(name);
        let surname = !!name['Surname'] ? name['Surname'] : '';
        let given = !!name['Given'] ? name['Given'] : '';
        let formated_name = !!name['Familiar']
            ? <span><span>{surname}</span>, <span>{given}</span> <span>[{name['Familiar']}]</span></span>
            : <span><span>{surname}</span>, <span>{given}</span></span>;
        return (formated_name)
    }
    getName(id) {
        if (this.props.namesLoading) {
            return("[Loading]")
        }
        if (this.props.namesExists) {
            let name = this.props.names.find(function (n) {
                return n['PersonID'] === id;
            });
            return(this.formatName(name))
        }
        return("[Error]")
    }

    renderParents() {
        return this.props.childs.map((child) =>
        (<div key={child._id} className="col s12 family_parents">{console.log(child)}
            <span>Parents:&nbsp;</span>
            <span className="family_person">{this.getName(child.Parent1Relation.ParentID)}</span>
            <span>&nbsp;&&nbsp;</span>
            <span className="family_person">{this.getName(child.Parent2Relation.ParentID)}</span>
        </div>))
    }
    renderCloseFamily() {
        return(<div className="row">
            {this.renderParents()}
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
        </div>)
    }
    render() {
        return (
            <div className="container person-view">
            <header>
                    <h1 className="header">{this.getPersonName()}</h1>
            </header>
                <div>
                    <h2 className="header">Personliga Detaljer</h2>
                    <table className="compactTable"><tbody>
                    {this.renderFacts()}
                    </tbody></table>
                </div>
                <div>
                    <h2 className="header">Närmaste Familj</h2>
                    {this.renderCloseFamily()}
                </div>
            </div>
    );
    }
}

PersonInfo.propTypes = {
    mynames: PropTypes.array,
    mynamesLoading: PropTypes.bool,
    mynamesExists: PropTypes.bool,

    facts: PropTypes.array,
    factsLoading: PropTypes.bool,
    factsExists: PropTypes.bool,

    childs: PropTypes.array,
    childsLoading: PropTypes.bool,
    childsExists: PropTypes.bool,

    names: PropTypes.array,
    namesLoading: PropTypes.bool,
    namesExists: PropTypes.bool,
};

export default withTracker(({ id }) => {
    const mynamesHandle = Meteor.subscribe('names.person', id);
    const mynamesLoading = !mynamesHandle.ready();
    const mynames_person = Names.find({"PersonID": id});
    const mynamesExists = !mynamesLoading && !!mynames_person;

    const factsHandle = Meteor.subscribe('facts.person', id);
    const factsLoading = !factsHandle.ready();
    const facts_person = Facts.find();
    const factsExists = !factsLoading && !!facts_person;

    const childsHandle = Meteor.subscribe('children.person', id);
    const childsLoading = !childsHandle.ready();
    const childs_person = Children.find();
    const childsExists = !childsLoading && !!childs_person;

    const namesHandle = Meteor.subscribe('names', );
    const namesLoading = !namesHandle.ready();
    const names_person = Names.find();
    const namesExists = !namesLoading && !!names_person;

    return {
        mynames: mynames_person.fetch(),
        mynamesLoading: mynamesLoading,
        mynamesExists: mynamesExists,
        facts: facts_person.fetch(),
        factsLoading,
        factsExists,
        childs: childs_person.fetch(),
        childsLoading,
        childsExists,
        names: names_person.fetch(),
        namesLoading,
        namesExists
    };
})(PersonInfo)