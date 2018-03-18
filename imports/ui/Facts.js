import React, { Component } from 'react';

export default class Fact extends Component {
    static renderDate(date) {
        if (date.Day) {
            return (<span>{date.Year}-{date.Month.padStart(2, '0')}-{date.Day.padStart(2, '0')}</span>);
        }
        if (date.Month) {
            return (<span>{date.Year}-{date.Month.padStart(2, '0')}</span>);
        }
        return (<span>{date.Year}</span>);

    }
    renderDates() {

        if (this.props.fact.Date){
            // console.log(this.props.fact.Date)
            if (this.props.fact.Date.Type === "Single") {
                return ( <span>{Fact.renderDate(this.props.fact.Date.StartDate)}</span>);
            }
            if (this.props.fact.Date.Type === "Range") {
                return (
                    <span><span>{Fact.renderDate(this.props.fact.Date.StartDate)}</span>
                        <span>&#8660;</span>
                        <span>{Fact.renderDate(this.props.fact.Date.EndDate)}</span>
                    </span>
                );
            }
            if (this.props.fact.Date.Type === "Dual") {
                return (<span>{Fact.renderDate(this.props.fact.Date.StartDate)},
                     {Fact.renderDate(this.props.fact.Date.EndDate)}
                    </span>);
            }
        }
        return (
            ""
        )
    }
    render() {
        return (
            <tr><th>{this.props.fact.Type}</th>
                <td>{this.renderDates()}</td>
                <td>{this.props.fact.Place} {this.props.fact.Detail}</td>
            </tr>
        );
    }
}
