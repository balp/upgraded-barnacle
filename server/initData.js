import {Meteor} from 'meteor/meteor';
import {Facts} from "../imports/api/facts";
import {Names} from "../imports/api/names";
import {Persons} from "../imports/api/persons";
import {Families} from "../imports/api/families";
import {Children} from "../imports/api/children";
import {Notes} from "../imports/api/notes";
import {Sources} from "../imports/api/source";
import {Attachments} from "../imports/api/attachments";

function toDateVal(dateVal) {
    // console.error(dateVal);
    let _dateVal = {
        Modifier: undefined,
        Calendar: undefined,
        Year: undefined,
        Month: undefined,
        Day: undefined
    };
    let _dv = dateVal['DateVal'][0];
    if ('Modifier' in _dv) {
        _dateVal.Modifier = _dv['Modifier'][0];
    }
    if ('Calendar' in _dv) {
        _dateVal.Calendar = _dv['Calendar'][0];
    }
    if ('Year' in _dv) {
        _dateVal.Year = _dv['Year'][0];
    }
    if ('Month' in _dv) {
        _dateVal.Month = _dv['Month'][0];
    }
    if ('Day' in _dv) {
        _dateVal.Day = _dv['Day'][0];
    }
    return _dateVal;
}

function toDate(date) {
    // console.error(date);
    let _date = {
        Type: date['$']['Type'],
        StartDate: undefined,
        EndDate: undefined
    };
    if ('StartDate' in date) {
        _date.StartDate = toDateVal(date['StartDate'][0]);
    }
    if ('EndDate' in date) {
        _date.EndDate = toDateVal(date['EndDate'][0]);
    }
    // console.error(_date);
    return _date;

}

function toName(name) {
    //console.log(name);
    let _name = {
        ID: name['$']['ID'],
        Type: name['$']['Type'],
        DisplayAs: undefined,
        IsPreferred: false,
        PersonID: name['PersonID'][0]['$']['ID'],
        Given: undefined,
        Surname: undefined,
        Title: undefined,
        Suffix: undefined,
        Familiar: undefined,
        Date: undefined,
        Surety: undefined,
        NoteID: [],
        SourceID: []
    };
    if ('IsPreferred' in name) {
        _name.IsPreferred = (name['IsPreferred'][0] === 'true');
    }
    if ('Given' in name) {
        _name.Given = name['Given'][0];
    }
    if ('Surname' in name) {
        _name.Surname = name['Surname'][0];
    }
    if ('Title' in name) {
        _name.Title = name['Title'][0];
    }
    if ('Suffix' in name) {
        _name.Suffix = name['Suffix'][0];
    }
    if ('Familiar' in name) {
        _name.Familiar = name['Familiar'][0];
    }
    if ('Date' in name) {
        _name.Date = toDate(name['Date'][0]);
    }
    if ('Surety' in name) {
        _name.Surety = name['Surety'][0];
    }
    // Note and Source Not used in the arnholm db so support later
    return _name;
}

function toFact(fact) {
    // console.error(fact);
    let _fact = {
        ID: fact['$']['ID'],
        Type: fact['$']['Type'],
        ReferenceID: fact['ReferenceID'][0]['$']['ID'],
        Detail: undefined,
        Place: undefined,
        Date: undefined,
        Surety: undefined,
        NoteID: [],
        SourceID: []
    };
    if ('Detail' in fact) {
        _fact.Detail = fact['Detail'][0];
    }
    if ('Place' in fact) {
        _fact.Place = fact['Place'][0];
    }
    if ('Date' in fact) {
        _fact.Date = toDate(fact['Date'][0]);
    }
    if ('Surety' in fact) {
        _fact.Surety = fact['Surety'][0];
    }
    // console.error(_fact);
    return _fact;
}

function toPerson(person) {
    // console.error(person);
    let _person = {
        ID: person['$']['ID'],
        UserID: undefined,
        BirthSex: undefined,
        NoteID: [],
        SourceID: [],
        IsPrivate: undefined
    };
    if ('UserID' in person) {
        _person.UserID = person['UserID'][0];
    }
    if ('BirthSex' in person) {
        _person.BirthSex = person['BirthSex'][0];
    }
    if ('IsPrivate' in person) {
        _person.IsPrivate = (person['IsPrivate'][0] === 'true');
    }
    return _person;

}

function toFamily(family) {
    // console.error(person);
    let _family = {
        ID: family['$']['ID'],
        UserID: undefined,
        PrimeID: undefined,
        PartnerID: undefined,
        NoteID: [],
        SourceID: [],
    };
    if ('UserID' in family) {
        _family.UserID = family['UserID'][0];
    }
    if ('PrimeID' in family) {
        _family.PrimeID = family['PrimeID'][0]['$']['ID'];
    }
    if ('PartnerID' in family) {
        _family.PartnerID = family['PartnerID'][0]['$']['ID'];
    }
    return _family;

}

function toRelationship(relationship) {
    // console.error(relationship);
    let _relationship = {
        ParentID: relationship['$']['ParentID'],
        Type: relationship['$']['Type']
    };
    if ('Type' in relationship) {
        _relationship.Type = relationship['Type'];
    }
    //console.error(_relationship);
    return _relationship;
}

function toChild(child) {
    // console.error(child);
    let _child = {
        ID: child['$']['ID'],
        PersonID: child['PersonID'][0]['$']['ID'],
        FamilyID: child['FamilyID'][0]['$']['ID'],
        Parent1Relation: undefined,
        Parent2Relation: undefined,
        Ordinal: undefined,
        NoteID: [],
        SourceID: [],
    };
    if ('Parent1Relation' in child) {
        _child.Parent1Relation = toRelationship(child['Parent1Relation'][0]['Relationship'][0]);
    }
    if ('Parent2Relation' in child) {
        _child.Parent2Relation = toRelationship(child['Parent2Relation'][0]['Relationship'][0]);
    }
    if ('Ordinal' in child) {
        _child.PartnerID = child['Ordinal'][0];
    }
    return _child;

}

function toNote(note) {
    //console.error(note);
    let _note = {
        ID: note['$']['ID'],
        Detail: undefined,
        Date: undefined,
    };
    if ('Detail' in note) {
        _note.Detail = note['Detail'][0];
    }
    if ('Date' in note) {
        _note.Date = toDate(note['Date'][0]);
    }
    return _note;
}

function toSource(source) {
    console.error(source);
    let _source = {
        ID: source['$']['ID'],
        Detail: undefined,
        SourceAuthor: undefined,
        SourceTitle: undefined,
        SourceLocation: undefined,
        Date: undefined,
        HolderID: []
    };
    if ('Detail' in source) {
        _source.Detail = source['Detail'][0];
    }
    if ('SourceAuthor' in source) {
        _source.SourceAuthor = source['SourceAuthor'][0];
    }
    if ('SourceTitle' in source) {
        _source.SourceTitle = source['SourceTitle'][0];
    }
    if ('SourceLocation' in source) {
        _source.SourceLocation = source['SourceLocation'][0];
    }
    if ('Date' in source) {
        _source.Date = toDate(source['Date'][0]);
    }
    return _source;
}

function toAttachment(attachment) {
    // console.error(attachment);
    let _attachment = {
        ID: attachment['$']['ID'],
        ReferenceID: attachment['ReferenceID'][0]['$']['ID'],
        Filename: attachment['Filename'][0],
        Fileinfo: undefined,
        Detail: undefined,
        SourceID: [],
    };
    if ('Fileinfo' in attachment) {
        _attachment.Fileinfo = attachment['Fileinfo'][0];
    }
    if ('Detail' in attachment) {
        _attachment.Detail = attachment['Detail'][0];
    }
    return _attachment;
}


Meteor.startup(() => {
    console.log("Startup: initData.js", Facts.find().count());

    function loadScionData() {
        let sciondata = Assets.getText("Arnholm.sgx");
        xml2js.parseString(sciondata, function (err, result) {
            if ('ScionPC' in result) {
                console.dir(result['ScionPC']);
                let scionpc = result['ScionPC'];
                if ('Header' in scionpc) {
                    console.log("Header");
                    console.dir(scionpc['Header']);
                }
                if ('Names' in scionpc) {
                    console.log("Names: ");
                    //console.dir(scionpc['Names']);
                    let names = scionpc['Names'][0]['Name'];
                    for (name in names) {
                        let obj = toName(names[name]);
                        //console.error(obj);
                        Names.insert(obj);
                    }
                }
                if ('PersonalFacts' in scionpc) {
                    console.log("PersonalFacts: ");
                    // console.dir(scionpc['PersonalFacts']);
                    let facts = scionpc['PersonalFacts'][0]['Fact'];
                    // console.error(toFact(facts[0]))
                    for (fact in facts) {
                        let obj = toFact(facts[fact]);
                        //console.error(obj);
                        Facts.insert(obj);
                    }

                }
                if ('FamilyFacts' in scionpc) {
                    console.log("FamilyFacts: ");
                    //console.dir(scionpc['FamilyFacts']);
                    let facts = scionpc['FamilyFacts'][0]['Fact'];
                    //console.error(toFact(facts[0]))
                    for (fact in facts) {
                        let obj = toFact(facts[fact]);
                        //console.error(obj);
                        Facts.insert(obj);
                    }
                }
                if ('People' in scionpc) {
                    console.log("People: ")
                    let persons = scionpc['People'][0]['Person'];
                    // console.error(toPerson(persons[0]))
                    for (person in persons) {
                        let obj = toPerson(persons[person]);
                        Persons.insert(obj);
                    }
                }
                if ('Families' in scionpc) {
                    console.log("Families: ");
                    let families = scionpc['Families'][0]['Family'];
                    // console.error(toFamily(families[0]))
                    for (family in families) {
                        Families.insert(toFamily(families[family]))
                    }
                }
                if ('Children' in scionpc) {
                    console.log("Children: ");
                    let children = scionpc['Children'][0]['Child'];
                    // console.error(toChild(children[0]))
                    for (child in children) {
                        Children.insert(toChild(children[child]))
                    }

                }
                if ('Notes' in scionpc) {
                    console.log("Notes:")
                    let notes = scionpc['Notes'][0]['Note'];
                    // console.error(toNote(notes[0]))
                    for (note in notes) {
                        Notes.insert(toNote(notes[note]));
                    }
                }
                if ('Sources' in scionpc) {
                    console.log("Sources:")
                    let sources = scionpc['Sources'][0]['Source'];
                    // console.error(toSource(sources[0]))
                    for (source in sources) {
                        Sources.insert(toSource(sources[source]))
                    }
                }
                if ('PersonalAttachments' in scionpc) {
                    console.log("PersonalAttachments:")
                    let attachments = scionpc['PersonalAttachments'][0]['Attachment']
                    // console.error(toAttachment(attachments[0]))
                    for (attachment in attachments) {
                        Attachments.insert(toAttachment(attachments[attachment]))
                    }
                }
                if ('FamilyAttachments' in scionpc) {
                    console.log("FamilyAttachments")
                    let attachments = scionpc['FamilyAttachments'][0]['Attachment']
                    // console.error(toAttachment(attachments[0]))
                    for (attachment in attachments) {
                        Attachments.insert(toAttachment(attachments[attachment]))
                    }
                }
                if ('PersonalLDSEvents' in scionpc) {
                    console.log("PersonalLDSEvents")
                }
                if ('FamilyLDSEvents' in scionpc) {
                    console.log("FamilyLDSEvents")
                }
                if ('Repositories' in scionpc) {
                    console.log("Repositories")
                }


            } else {
                console.log("No ScionPC")
            }

        });
    }

    if (Facts.find().count() === 0) {
        console.info("Startup: have no data adding!!!");
        loadScionData();
    }
    console.info("Startup: (done) initData.js", Facts.find().count());
});
