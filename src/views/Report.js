import React from "react"
import "../shards-dashboard/styles/calendar.css"
import Table from "../components/common/Table"
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import SmallStats from "../components/common/SmallStats";
import { Row, Col, Container, DatePicker, Button, Card, CardBody, CardHeader, Badge } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { withFirebase } from "../controller";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import {productivityPresenter, smallStatsPresenter} from "../presenter"
import { withRouter } from "react-router-dom";

var employees =  []
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const day = new Array()
day[0] = "Sun"
day[1] = "Mon"
day[2] = "Tue"
day[3] = "Wed"
day[4] = "Thu"
day[5] = "Fri"
day[6] = "Sat"


class Report extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active_date: new Date(),
            lowerLimit: new Date(),
            upperLimit: new Date(),
            _calander: this._calander_per_month(),
            range_view: false,
            selectDate: false,
            isLoading: true,
            data: [],
            smallStatsData: [],
            productivityData: productivityPresenter({
                title: "Productivity",
                labels: [0],
                data: [{
                    data: [0],
                    label: "Any"
                }]
            }),
            employees: [],
            dates: [new Date()]
        }
        this.getAnalysisInRange = () => {}
        
    }

    updateDateChange = (date) => {
        const res = this.getAnalysisInRange(date, date)
        let smallStatsData = smallStatsPresenter([{
                label: "Productivity",
                count: res.productivity.count
            }, {
                label: "Present",
                count: res.present.value[0].length,
            }, {
                label: "Early Arrival",
                count: res.earlyArrival.value[0].length,
            },
            {
                label: "Total Employees",
                count: res.total.count,
            },
            {
                label: "Early Arrival",
                count: res.earlyArrival.value[0].length,
            }
        ])
        
        return {
            smallStatsData,
            employees: res.total.data,
            dates: res.dates
        }
    }

    updateRangeChange = (date1, date2) => {
        const res = this.getAnalysisInRange(new Date(date1), new Date(date2))
        let smallStatsData = smallStatsPresenter([{
            label: "Productivity",
            count: res.productivity.count
        }, {
            label: "Total Employees",
            count: res.total.count,
        }, {
            label: "Absent",
            count: res.absent.value[0].length,
        },
        {
            label: "Regular",
            count: res.companyStats.regular.count,
        },
        {
            label: "Irregular",
            count: res.companyStats.irregular.count
        }
        ])
        let chartData = {
            labels: Array.from(new Array(res.sample), (_,i)=> res.dates[i].getDate() + "/" + res.dates[i].getMonth() + 1 + "/" + res.dates[i].getFullYear()),
            datasets: [
              {
                label: "Current Month",
                fill: "start",
                data: Array.from(res.present.value, (value) => value.length),
                backgroundColor: "rgba(0,123,255,0.1)",
                borderColor: "rgba(0,123,255,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgb(0,123,255)",
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3
              }
            ]
          }

        return {
            smallStatsData,
            productivityData: chartData,
            employees: res.total.data,
            dates: res.dates
        }
    }

   

    componentDidMount() {
        const {controller} = this.props
        const self = this
        const {active_date} = self.state
        controller.analyser().then(data => {
            self.getAnalysisInRange = data.getAnalysisInRange
            let newState = this.updateDateChange(new Date())
            self.setState({
                ...this.state,
                isLoading: false,
                ...newState,
                dates: [new Date()] 

            })
        })
    }

    changeDate = ({ date, handleDateChange, range_view}, opts) => {
        // is payload true format 
        var updatedState = {}
        if (handleDateChange === true) {
            updatedState.selectDate = !this.state.handleDateChange
        }
        if (date) {
            updatedState.active_date = date
            updatedState._calander = this._calander_per_month(date)
        }
        if(range_view !== true) {
            let dt = this.updateDateChange(date)
        
            updatedState.smallStatsData = dt.smallStatsData
            updatedState.employees = dt.employees
            updatedState.dates = dt.dates
        }
        if (range_view === true) {
            updatedState.range_view = range_view
        }
        return this.setState({
            ...this.state,
            ...updatedState,
            ...opts
        })
    }

    _calander_per_month = (date = new Date(), arr = [], cell = 42) => {
        let first_date_of_month = new Date(date.getFullYear(), date.getMonth(), 1)
        const err = first_date_of_month.getDay() * (-1) - 1
        first_date_of_month = new Date(first_date_of_month.setDate(first_date_of_month.getDate() + err))
        var i = 0
        for (; i < cell; i += 1) {
            var new_date = new Date(first_date_of_month.setDate(first_date_of_month.getDate() + 1))
            if (i < Math.abs(err + 1)) {
                arr.push({
                    date: new_date,
                    muted: true
                })
            } else if (new_date.getMonth() === date.getMonth()) {
                arr.push({
                    date: new_date,
                    muted: false
                })
            } else {
                arr.push({
                    date: new_date,
                    muted: true
                })
            }
        }
        return arr
    }

    handleLeftClick = (e) => {
        e.preventDefault()
        var cur = this.state.active_date
        this.changeDate({ date: new Date(cur.setMonth(cur.getMonth() - 1)) })
    }

    handleRightClick = (e) => {
        e.preventDefault()
        var cur = this.state.active_date
        this.changeDate({ date: new Date(cur.setMonth(cur.getMonth() + 1)) })
    }

    handleRangeDateChange = (e) => {
        e.preventDefault()
        const lowerLimit = new Date(e.target.lowerLimit.value)
        const upperLimit = new Date(e.target.upperLimit.value)
        this.setState({
            ...this.state,
            range_view: true
        })
        let newSate = this.updateRangeChange(lowerLimit, upperLimit)
        this.setState({
            ...this.state,
            ...newSate,
            range_view: true
        })
    }

    handleMonthChange = () => {
        this.changeDate({ range_view: true })
    }

    handleDateChange = (e) => {
        this.changeDate({ date: new Date(e.target.value), handleDateChange: true })
    }

    compareDate = (date1, date2) => {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    }

    // setDateActive = (date) => {
    //     if(this.state.range_view) {
    //         // for(let date1 in this.state.dates) {


    //         //     if(this.compareDate(new Date(date1), date) === true) {
    //         //         return true
    //         //     }
    //         // }
    //         // return false
    //     } else {
    //         return this.compareDate(this.state.dates[0], date)
    //     }
    // }

    checkInArray = (arr=[], date1) => {
        if(arr.indexOf(date1) === -1) {
            return false
        }
        return true
    }

    navigate = (e) => {
        const Loc = e.pageY
        window.scrollTo({ top: Loc, behavior: "smooth" })
    }
    

    render() {
        console.log(this.state)
        const total_cell = 42, per_row = 7
        const inline = total_cell / per_row
        var { active_date, _calander, range_view, selectDate, isLoading, dates, employees } = this.state
        var calander = new Array(inline)
        for (var i = 0; i < inline; i++) {
            calander[i] = _calander.slice(per_row * i, per_row * i + per_row)
        }
        var clicks = [], timeout, self = this;

        function doubleClick() {
            self.setState({ selectDate: true })
        }

        function clickHandler(event) {
            event.preventDefault();
            clicks.push(new Date().getTime());
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
                    doubleClick();
                } else {
                    // singleClick();
                }
            }, 250);
        }

        return (
            <Container fluid className={`main-content-container px-4 ${isLoading ? "d-flex align-items-center justify-content-center": ""}`} >
                {/* <div className="sticky-top d-flex justify-content-center" data-spy="affix" >
                <Badge pill theme="primary">Date</Badge>
                </div> */}
                {this.state.isLoading && 
      <div className="spinner-border text-primary" style={{"width": "3rem", "height": "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
                
                    {!isLoading &&
                        <div className="cal">
                            <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Report" subtitle="Blog Posts" className="text-sm-left" />
                </Row>
                        <div className="header">
                            <div className="d-flex justify-content-between align-items-center">
                                <Button className="left" onClick={this.handleLeftClick} style={{ "cursor": "pointer" }}>
                                    Left
                                </Button>
                                {!selectDate && <h5 className="month-year" onClick={clickHandler} style={{ "cursor": "pointer", "WebkitUserSelect": "none" }}>
                                    {`${month[active_date.getMonth()]} ${active_date.getFullYear()}`}
                                </h5>}
                                {selectDate && <form onSubmit={this.handleRangeDateChange} className="sticky-top" data-spy="affix" data-offset-top="205">
                                    <div className="form-row">
                                        <div className="col">
                                        <input type="date" className="form-control" required name="lowerLimit"/>
                                        </div>
                                        <div className="col">
                                        <input type="date" className="form-control" required name="upperLimit"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">Save</button>
                                    </div>
                                    </form>}
                                <Button className="right" onClick={this.handleRightClick} style={{ "cursor": "pointer" }}>
                                    Right
                                </Button>
                            </div>
                        </div>
                        <div className="py-1" style={{ "padding": "15px" }}>
                        </div>

                        {<div className="py-1" style={{ "padding": "15px" }}>
                            <div className="row day">
                                {
                                    day.map((value, idx) => {
                                        return (
                                            <div className={`day-item col text-center p-0 ${idx === 6 ? "leaf" : ""}`} key={idx}>
                                                {value}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {
                                calander.map((arr, value) => {
                                    return (
                                        <div className="row date" key={value}>
                                            {
                                                arr.map((obj, idx) => {
                                                    return (
                                                        <div className={`date-item col p-0 ${idx + 1 === per_row ? "leaf" : ""}`} key={idx}>
                                                            <div className={`text-dot-wrapper pb-md-2 pr-md-1 mt-md-1`}>
                                                                <span className={`date-text ${obj.muted ? "text-muted" : ""} ${self.compareDate(active_date,obj.date) ? "active-date" : ""}`} onClick={() => self.changeDate({ date: obj.date}, {range_view: false}  )}>{obj.date.getDate()}</span>
                                                                <div className={`dot`}></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>}
                    </div>
                    }
                    {!isLoading &&
                        <Row className="mt-3">
                        {this.state.smallStatsData.map((stats, idx) => (
                            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                            <SmallStats
                                id={`small-stats-${idx}`}
                                variation="1"
                                chartData={stats.datasets}
                                chartLabels={stats.chartLabels}
                                label={stats.label}
                                value={stats.value}
                                percentage={stats.percentage}
                                increase={stats.increase}
                                decrease={stats.decrease}
                            />
                            </Col>
                        ))}
                        </Row>
                    }
                    {!isLoading && range_view &&
                    <Row className="mt-3">
                        <Col lg="8">
                            <UsersOverview title="Use overview" title="Present" chartData={this.state.productivityData}/>
                        </Col>
                        <Col md="4" className="mt-3 mt-md-0">
                            <UsersByDevice />
                        </Col>
                    </Row>
                    }
                    {!isLoading && 
                        <Row noGutters className="page-header py-4" onClick={this.navigate} style={{ "cursor": "pointer" }}>
                        <PageTitle title="Employee Analysis" subtitle="Dashboard" className="text-sm-left mb-3" />
                    </Row>
                    }

                    {!isLoading && 
                    
                    
                this.state.dates.map((date, idx) => {
                    return (
                        <div className="accordion" id="accordionExample" key={idx}>
                    {
                        <ul className="list-group mb-3">
                        <div className="list-group-item p-0" id={`heading${idx}`} style={{"backgroundColor": "#fff"}}>
                        <h2 className="mb-0 mt-2 d-flex justify-content-center align-items-center">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${idx}`} aria-expanded="false" aria-controls={`#collapse${idx}`}>
                            <h6>{`${date.getFullYear()}, ${month[date.getMonth()]} ${date.getDate()}`}</h6>
                            </button>
                        </h2>
                        </div>
    
                        <div id={`collapse${idx}`} className="collapse show pt-1 px-1" aria-labelledby={`heading${idx}`} data-parent="#accordionExample">
                        <div className="card-body p-0">
                                    <Row key={idx}>
                                        
                                    <Col>
                                    <Card small className="mb-4">
                                    <CardHeader className="border-bottom">
                                        <h6 className="m-0">Detail Analysis</h6>
                                    </CardHeader>
                                    <CardBody className="p-0 pb-3">
                                        <table className="table mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th scope="col" className="border-0">
                                                    #
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Name
                                                </th>
                                                <th scope="col" className="border-0">
                                                    department
                                                </th>
                                                <th scope="col" className="border-0">
                                                    Labels
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.employees.map((employee, idx) => {
                                                return (
                                                    (
                                                        <tr key={idx} 
                                                            onClick={() => this.props.history.push("/employee_details/"+employee.id)}
                                                            style={{"cursor" : "pointer"}}
                                                        >
                                                            <td>{idx + 1}</td>
                                                            <td>{employee.getFullName()}</td>
                                                            <td>{employee.getDepartment()}</td>

                                                    <td>{employee.checkIsPresent(date) ? <Badge pill theme="success">P</Badge>: <Badge pill theme="danger">A</Badge>} {employee.checkEarlyArrival(date) ? <Badge pill theme="primary">E</Badge>: <Badge pill theme="danger">L</Badge>} <Badge pill theme="secondary">1Hr 23Min</Badge></td>
                                                        </tr>
                                                        )
                                                )
                                            })}
                                        </tbody>
                                        </table>
                                    </CardBody>
                                    </Card>
                                </Col>
                                </Row>
                        </div>
                        </div>
                    </ul>
                    }
                </div>
                    
            )
        })
        
                    }
            </Container>
        )
    }
}

export default withFirebase(Report)



    // _calander_helper = (curr_date, max_itrs, curr_itrs, arr) => {
    //     if (curr_itrs < max_itrs) {
    //         arr.push(this._calander_per_month(curr_date))
    //         this._calander_helper(new Date(curr_date.getFullYear(), curr_date.getMonth() + 1, curr_date.getDate()), max_itrs, curr_itrs += 1, arr)
    //     }
    //     return arr
    // }

    // calander = (init_date = new Date(), sampler = 1) => {
    //     const init_month_substractor = Math.floor(sampler / 2)
    //     const init_month = new Date(init_date.setMonth(init_date.getMonth() - init_month_substractor))
    //     console.log("A month before todays", init_month)
    //     const cal = this._calander_helper(init_month, sampler, 0, [])
    //     return cal
    // }
