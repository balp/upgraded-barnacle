import React, { Component } from 'react';
import Fact from './Facts.js'

// PersonInfo component - represents the whole app
export default class PersonInfo extends Component {
    getName() {
        return "ARNHOLM, Per Anders Niklas"
    }
    getFacts() {
        return [
            { _id: 1, name:"Fullständigt namn", date:"", text: "ARNHOLM, Per Anders Niklas"},
            { _id: 2, name:"Födelsekön", date:"", text: "Man"},
            { _id: 3, name:"Född", date:"1972-09-20", text: "Mölndal"},
            { _id: 4, name:"Utbildning", date:"", text: "Datavetenskap, Umeå Universitet"},
            { _id: 5, name:"Sysselsättning", date:"", text: "IT-konsult"},
            { _id: 6, name:"Boende", date:"1972", text: "Mölndal"},
            { _id: 7, name:"Boende", date:"ca. 1972 - ca. 1975", text: "Kållered"},
            { _id: 8, name:"Boende", date:"ca. 1975 - ca. 1980", text: "Källby, Björgårdsvägen 19G"},
            { _id: 9, name:"Boende", date:"ca. 1980 - ca. 1984", text: "Staffanstorp, Strindbergs stig 1"},
            { _id: 10, name:"Boende", date:"1984 - 1991", text: "Mölndal, Södermalmsgatan 13"},
            { _id: 11, name:"Boende", date:"1991 - Est. 1993", text: "Umeå, Istidsgatan"},
            { _id: 12, name:"Boende", date:"Est. 1993 - 1998", text: "Umeå, Kandidatvägen 7"},
            { _id: 13, name:"Boende", date:"1998 - 7 Maj 2012", text: "Göteborg, Solstrålegatan"},
            { _id: 14, name:"Boende", date:"2012-05-07", text: "Svanesund, Björkvägen 9"},
        ]
    }
    renderFacts() {
        return this.getFacts().map((fact) => (
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
