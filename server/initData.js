import {Meteor} from 'meteor/meteor';
import {Facts} from "../imports/api/facts";
import {Names} from "../imports/api/names";

InitData = [
    {name: "Fullständigt namn", date: "", text: "ARNHOLM, Per Anders Niklas"},
    {name: "Födelsekön", date: "", text: "Man"},
    {name: "Född", date: "1972-09-20", text: "Mölndal"},
    {name: "Utbildning", date: "", text: "Datavetenskap, Umeå Universitet"},
    {name: "Sysselsättning", date: "", text: "IT-konsult"},
    {name: "Boende", date: "1972", text: "Mölndal"},
    {name: "Boende", date: "ca. 1972 - ca. 1975", text: "Kållered"},
    {name: "Boende", date: "ca. 1975 - ca. 1980", text: "Källby, Björgårdsvägen 19G"},
    {name: "Boende", date: "ca. 1980 - ca. 1984", text: "Staffanstorp, Strindbergs stig 1"},
    {name: "Boende", date: "1984 - 1991", text: "Mölndal, Södermalmsgatan 13"},
    {name: "Boende", date: "1991 - Est. 1993", text: "Umeå, Istidsgatan"},
    {name: "Boende", date: "Est. 1993 - 1998", text: "Umeå, Kandidatvägen 7"},
    {name: "Boende", date: "1998 - 7 Maj 2012", text: "Göteborg, Solstrålegatan"},
    {name: "Boende", date: "2012-05-07", text: "Svanesund, Björkvägen 9"},
];

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
                    console.log("FamilyFacts")
                }
                if ('People' in scionpc) {
                    console.log("People")
                }
                if ('Families' in scionpc) {
                    console.log("Families")
                }
                if ('Children' in scionpc) {
                    console.log("Children")
                }
                if ('Notes' in scionpc) {
                    console.log("Notes")
                }
                if ('Sources' in scionpc) {
                    console.log("Sources")
                }
                if ('PersonalAttachments' in scionpc) {
                    console.log("PersonalAttachments")
                }
                if ('FamilyAttachments' in scionpc) {
                    console.log("FamilyAttachments")
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

        //for (let fact in InitData) {
        //    Facts.insert(InitData[fact]);
        //}
    }
    console.info("Startup: (done) initData.js", Facts.find().count());
});
