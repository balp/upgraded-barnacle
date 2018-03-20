import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Facts } from '../api/facts.js'
import { Names } from "../api/names";
import Fact from './Facts.js'
import {Children} from "../api/children";
import {Families} from "../api/families";

// PersonInfo component - represents the whole app
class PersonInfo extends React.Component {
    getPersonName() {
        if (this.props.mynamesLoading) {
            return("[Loading]")
        }
        if (this.props.mynamesExists) {
            let name = this.props.mynames[0];
            // console.log("getPersonName(): ", name);
            return (PersonInfo.formatName(name))
        }
        return (<span>UNKNOWN {this.props.id}</span>)
    }
    renderFacts() {
        if (this.props.myfactsLoading) {
            return(<tr><th>"[Loading]"</th></tr>)
        }
        if (this.props.myfactsExists) {
            return this.props.myfacts.map((fact) => (
                <Fact key={fact._id} fact={fact}/>
            ));
        }
    }
    static formatName(name) {
        // console.log(name);
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
            return(PersonInfo.formatName(name))
        }
        return("[Error]")
    }

    renderParents() {
        return this.props.selfchilds.map((child) =>
        (<div key={child._id} className="col s12 family_parents">
            <span>Parents:&nbsp;</span>
            <span className="family_person">{this.getName(child.Parent1Relation.ParentID)}</span>
            <span>&nbsp;&&nbsp;</span>
            <span className="family_person">{this.getName(child.Parent2Relation.ParentID)}</span>
        </div>))
    }

    renderSiblings() {
        if (this.props.selfchildsExists && this.props.childsExists) {
            let family = this.props.selfchilds.find(child => child.Parent1Relation.Type === "Biological");
            let familyId = family.FamilyID;
            let personId = this.props.id;
            let siblings = this.props.childs.filter(child => child.FamilyID === familyId
                && child.PersonID !== personId);
            // console.log(familyId, siblings);
            return siblings.map( sibling => (
                <div key={sibling._id} className="col s11 offset-s1 siblings">{this.getName(sibling.PersonID)}</div>
            ))
        }
        return(<div className="col s11 offset-s1 siblings">[Loading]</div>)
    }
    renderFamilyFacts(family) {
        if (this.props.factsExists) {
            let familyId = family.ID;
            let facts = this.props.facts.filter(fact => fact.ReferenceID === familyId);
            // console.log(facts);
            return facts.map((fact) => (
                <Fact key={fact._id} fact={fact}/>
            ));

        }
        return(<tr><td>[Loading]</td></tr>);
    }
    renderFamilyChilds(family) {
        if (this.props.childsExists) {
            let familyId = family.ID;
            let children = this.props.childs.filter(child => child.FamilyID === familyId);
            return children.map( child => (
                <div key={child._id} className="col s11 offset-s1">{this.getName(child.PersonID)}</div>));
        }
    }
    renderFamilyInfo() {
        if (this.props.familiesExists ) {
            let personId = this.props.id;
            let families = this.props.families.filter(family => family.PrimeID === personId
                || family.PartnerID === personId);
            // console.log(families);
            return families.map( family => (
                <div key={family._id} className="col s11 offset-s1 self_partner">
                    <div className="col s12 family_self">
                        <span className="family_person">{this.getName(family.PrimeID)}</span>
                        <span>&nbsp;&&nbsp;</span>
                        <span className="family_person">{this.getName(family.PartnerID)}</span>
                    </div>
                    <div className="col s10 offset-s2">
                        <table className="compactTable"><tbody>
                            {this.renderFamilyFacts(family)}
                        </tbody></table>
                    </div>
                    {this.renderFamilyChilds(family)}
                </div>
            ));
        }
        return(<div className="col s11 offset-s1 self_partner" />)
    }
    renderCloseFamily() {
        return(<div className="row">
            {this.renderParents()}
            {this.renderSiblings()}
            {this.renderFamilyInfo()}
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
    id: PropTypes.string,

    mynames: PropTypes.array,
    mynamesLoading: PropTypes.bool,
    mynamesExists: PropTypes.bool,

    myfacts: PropTypes.array,
    myfactsLoading: PropTypes.bool,
    myfactsExists: PropTypes.bool,

    selfchilds: PropTypes.array,
    selfchildsLoading: PropTypes.bool,
    selfchildsExists: PropTypes.bool,

    names: PropTypes.array,
    namesLoading: PropTypes.bool,
    namesExists: PropTypes.bool,

    childs: PropTypes.array,
    childsLoading: PropTypes.bool,
    childsExists: PropTypes.bool,

    families: PropTypes.array,
    familiesLoading: PropTypes.bool,
    familiesExists: PropTypes.bool,

    facts: PropTypes.array,
    factsLoading: PropTypes.bool,
    factsExists: PropTypes.bool,

};

export default withTracker(({ id }) => {
    const mynamesHandle = Meteor.subscribe('names.person', id);
    const mynamesLoading = !mynamesHandle.ready();
    const mynames_person = Names.find({"PersonID": id});
    const mynamesExists = !mynamesLoading && !!mynames_person;

    const myfactsHandle = Meteor.subscribe('facts.person', id);
    const myfactsLoading = !myfactsHandle.ready();
    const myfacts_person = Facts.find({"ReferenceID": id});
    const myfactsExists = !myfactsLoading && !!myfacts_person;

    const selfchildsHandle = Meteor.subscribe('children.person', id);
    const selfchildsLoading = !selfchildsHandle.ready();
    const selfchilds_person = Children.find({"PersonID": id});
    const selfchildsExists = !selfchildsLoading && !!selfchilds_person;

    const namesHandle = Meteor.subscribe('names');
    const namesLoading = !namesHandle.ready();
    const names_person = Names.find();
    const namesExists = !namesLoading && !!names_person;

    const childsHandle = Meteor.subscribe('children');
    const childsLoading = !childsHandle.ready();
    const childs_person = Children.find();
    const childsExists = !childsLoading && !!childs_person;

    const familiesHandle = Meteor.subscribe('families');
    const familiesLoading = !familiesHandle.ready();
    const families_person = Families.find();
    const familiesExists = !familiesLoading && !!families_person;

    const factsHandle = Meteor.subscribe('facts', id);
    const factsLoading = !factsHandle.ready();
    const facts_person = Facts.find();
    const factsExists = !factsLoading && !!facts_person;

    return {
        id,
        mynames: mynames_person.fetch(),
        mynamesLoading: mynamesLoading,
        mynamesExists: mynamesExists,
        myfacts: myfacts_person.fetch(),
        myfactsLoading,
        myfactsExists,
        selfchilds: selfchilds_person.fetch(),
        selfchildsLoading,
        selfchildsExists,
        names: names_person.fetch(),
        namesLoading,
        namesExists,
        childs: childs_person.fetch(),
        childsLoading,
        childsExists,
        families: families_person.fetch(),
        familiesLoading,
        familiesExists,
        facts: facts_person.fetch(),
        factsLoading,
        factsExists,
    };
})(PersonInfo)