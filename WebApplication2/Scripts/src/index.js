import React from 'react';
import ReactDOM from 'react-dom';
import  './style.css';

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    Object.values(formErrors).forEach(val => {
        val.length < 0 && (valid = false);
    });

    Object.values(rest).forEach(val => {

        val === null && (valid = false);
    });
    return valid;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            A: null,
            B: null,
            C: null,
            Step: null,
            From: null,
            To: null,
            formErrors: {
                A: "",
                B: "",
                C: "",
                Step: "",
                From: "",
                To: ""
            }
        };

    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var json = {
                    A: $('#A').val(),
                    C: $('#C').val(),
                    B: $('#B').val(),
                    Step: $('#Step').val(),
                    RangeFrom: $('#from').val(),
                    RangeTo: $('#to').val()
                }
                $.ajax({
                    url: "/Draw/Post",
                    dataType: "json",
                    type: "POST",
                    data: { jData: JSON.stringify(json) },
                    success: function (jPoints) {
                        var data = new google.visualization.DataTable();
                        data.addColumn('number', 'PointX');
                        data.addColumn('number', 'PointY');

                        for (var xPoint in jPoints) {
                            data.addRow([jPoints[xPoint].PointX, jPoints[xPoint].PointY])
                        }

                        var options = {
                            curveType: 'function',
                            lineWidth: 4,
                            intervals: { 'style': 'line' },
                            legend: 'none',
                            explorer: {
                                keepInBounds: true,
                                maxZoomIn: 0.1,
                            },
                            vAxis: {
                                viewWindowMode: 'maximized',
                            }
                        };
                        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                        chart.draw(data, options);
                        $(window).smartresize(function () {
                            chart.draw(data, options);
                        });
                    }
                });
            }
        } else {
            alert("Please enter valid data");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "A":
                formErrors.A = value.length > 0 && Number.isInteger(Number(value)) == false
                    ? "enter integer number A"
                    : ""
                break;
            case "B":
                formErrors.B = value.length > 0 && Number.isInteger(Number(value)) == false
                    ? "enter integer number B"
                    : ""
                break;
            case "C":
                formErrors.C = value.length > 0 && Number.isInteger(Number(value)) == false
                    ? "enter integer number C"
                    : ""
                break;
            case "Step":
                formErrors.Step = value.length > 0 && Number.isNaN(Number(value)) == false
                    ? ""
                    : "enter number step"
                break;
            case "From":
                formErrors.From = value.length > 0 && Number.isInteger(Number(value)) == false
                    ? "enter integer number From"
                    : ""
                break;
            case "To":
                formErrors.To = value.length > 0 && Number.isInteger(Number(value)) == false
                    ? "enter integer number To"
                    : ""
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });

    }

    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <div className="wrapper-form">
                    <form onSubmit={this.handleSubmit} noValidate method="post" className="formData">
                        <div>
                            <label> Function: y = <b>A</b>x<sup><small>2</small></sup> + <b>B</b>x + <b>C</b> </label><br />
                         </div>
                        <div className="A">
                            <input
                                className={formErrors.A.length > 0 ? " error" : null}
                                placeholder="A"
                                id="A"
                                name="A"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.A.length > 0 && (
                            <span className="errorMessage">{formErrors.A}</span>
                        )}
                        <div className="B">
                            <input
                                className={formErrors.B.length > 0 ? " error" : null}
                                placeholder="B"
                                id="B"
                                name="B"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.B.length > 0 && (
                            <span className="errorMessage">{formErrors.B}</span>
                        )}
                        <div className="C">
                            <input
                                className={formErrors.C.length > 0 ? " error" : null}
                                placeholder="C"
                                id="C"
                                name="C"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.C.length > 0 && (
                            <span className="errorMessage">{formErrors.C}</span>
                        )}
                        <div className="Step">
                            <input
                                className={formErrors.Step.length > 0 ? " error" : null}
                                placeholder="Step"
                                id="Step"
                                name="Step"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.Step.length > 0 && (
                            <span className="errorMessage">{formErrors.Step}</span>
                        )}
                        <div className="From">
                            <input
                                className={formErrors.From.length > 0 ? " error" : null}
                                placeholder="From"
                                id="from"
                                name="From"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.From.length > 0 && (
                            <span className="errorMessage">{formErrors.From}</span>
                        )}
                        <div className="To">
                            <input
                                className={formErrors.To.length > 0 ? " error" : null}
                                placeholder="To"
                                id="to"
                                name="To"
                                formNoValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        {formErrors.To.length > 0 && (
                            <span className="errorMessage">{formErrors.To}</span>
                        )}
                        <div>
                            <button type="submit" id="drawGraph" >Build</button>
                        </div>
                    </form>
                </div>
                <div id="chart_div" className="chart"></div>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('content')
);