import React, { Component } from 'react';

// PersonInfo component - represents the whole app
export default class PersonInfo extends Component {
    getName() {
        return "ARNHOLM, Per Anders Niklas"
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
                    <tr><th colSpan="3" className="tableInfo">Grundfakta</th></tr>
                    <tr><th>Fullständigt namn</th><td colSpan="2">ARNHOLM, Per Anders Niklas</td></tr>
                    <tr><th>Födelsekön</th><td colSpan="2">Man</td></tr>
                    <tr><th>Född</th><td>1972-09-20</td><td>Mölndal</td></tr>
                    <tr><th colSpan="3" className="tableInfo">Andra Fakta</th></tr>
                    <tr><th>Utbildning</th><td>Datavetenskap, Umeå Universitet</td></tr>
                    <tr><th>Sysselsättning</th><td>IT-konsult</td></tr>
                    <tr><th>Boende</th><td>1972	Mölndal</td></tr>
                    <tr><th>Boende</th><td>ca. 1972 - ca. 1975</td><td>Kållered</td></tr>
                    <tr><th>Boende</th><td>ca. 1975 - ca. 1980</td><td>Källby, Björgårdsvägen 19G</td></tr>
                    <tr><th>Boende</th><td>ca. 1980 - ca. 1984</td><td>Staffanstorp, Strindbergs stig 1</td></tr>
                    <tr><th>Boende</th><td>1984 - 1991</td><td>Mölndal, Södermalmsgatan 13</td></tr>
                    <tr><th>Boende</th><td>1991 - Est. 1993</td><td>Umeå, Istidsgatan</td></tr>
                    <tr><th>Boende</th><td>Est. 1993 - 1998</td><td>Umeå, Kandidatvägen 7</td></tr>
                    <tr><th>Boende</th><td>1998 - 7 Maj 2012</td><td>Göteborg, Solstrålegatan</td></tr>
                    <tr><th>Boende</th><td>7 Maj 2012</td><td>Svanesund, Björkvägen 9</td></tr>
                    <tr><th>ID-Nummer</th><td>1</td></tr>
                    </tbody></table>

                </div>
            </div>
    );
    }
}
