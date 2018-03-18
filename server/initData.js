import { Meteor } from 'meteor/meteor';
import { Facts } from "../imports/api/facts";

InitData = [
    { name:"Fullständigt namn", date:"", text: "ARNHOLM, Per Anders Niklas"},
    { name:"Födelsekön", date:"", text: "Man"},
    { name:"Född", date:"1972-09-20", text: "Mölndal"},
    { name:"Utbildning", date:"", text: "Datavetenskap, Umeå Universitet"},
    { name:"Sysselsättning", date:"", text: "IT-konsult"},
    { name:"Boende", date:"1972", text: "Mölndal"},
    { name:"Boende", date:"ca. 1972 - ca. 1975", text: "Kållered"},
    { name:"Boende", date:"ca. 1975 - ca. 1980", text: "Källby, Björgårdsvägen 19G"},
    { name:"Boende", date:"ca. 1980 - ca. 1984", text: "Staffanstorp, Strindbergs stig 1"},
    { name:"Boende", date:"1984 - 1991", text: "Mölndal, Södermalmsgatan 13"},
    { name:"Boende", date:"1991 - Est. 1993", text: "Umeå, Istidsgatan"},
    { name:"Boende", date:"Est. 1993 - 1998", text: "Umeå, Kandidatvägen 7"},
    { name:"Boende", date:"1998 - 7 Maj 2012", text: "Göteborg, Solstrålegatan"},
    { name:"Boende", date:"2012-05-07", text: "Svanesund, Björkvägen 9"},
];

Meteor.startup(() => {
    console.log("Startup: initData.js", Facts.find().count(), Facts.find());
    if (Facts.find().count() === 0) {
        console.log("Startup: have no data adding!!!");
        for(let fact in InitData) {
            Facts.insert(InitData[fact]);
        }

    }
});
