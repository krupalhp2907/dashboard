import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";
import NewDraft from "../components/blog/NewDraft";
import Discussions from "../components/blog/Discussions";
import TopReferrals from "../components/common/TopReferrals";
import { withFirebase } from "../controller";

//Import presenters
import {smallStatsPresenter} from "../presenter"
 
const Home = ({controller}) => {
  const [smallStats, setSmallStats] = useState([])
  const [productivity, setProductivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [topRe, setTopRe] = useState([])
  const [empByDept, setEmpByDept] = useState({})
  const [online, setOnline] = useState([])

  function getSample(arr, sample = 7) { 
    let n = arr 
    return n.slice(-sample)
  }


  const setUpProductivity = (thisMonthData, lastMonthData, viewer) => {
    return {
      labels: Array.from(new Array(Math.max(thisMonthData.sample, lastMonthData.sample)), (_,i) => i+1),
      datasets: [
        {
          label: "Current Month",
          fill: "start",
          data: Array.from(new Array(thisMonthData.sample), (_,i) => thisMonthData[viewer].value[i].length),
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        },
        {
          label: "Past Month",
          fill: "start",
          data: Array.from(new Array(lastMonthData.sample), (_,i) => lastMonthData[viewer].value[i].length),
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgba(255,65,105,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgba(255,65,105,1)",
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: "rgba(255,65,105,1)"
        }
      ]
    }
  }

  const setUpSmallStats = (thisMonthData) => {
    return [
      {
        label: "Online",
        value: String(thisMonthData.today.online.count),
        percentage: "4.7%",
        increase: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "4",md: "6", sm: "6" },
        datasets: [
          {
            label: "Online",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: []
          }
        ]
      },
      {
        label: "Total Employees",
        value: String(thisMonthData.total.count),
        percentage: "4.7%",
        increase: true,
        chartLabels: new Array(7).fill(null),
        aattrs: { lg: "4",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: []
          }
        ]
      },
      {
        label: "Offline",
        value: String(thisMonthData.today.offline.count),
        percentage: "4.7%",
        increase: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "4",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: []
          }
        ]
      },
      {
        label: "Present",
        value: String(thisMonthData.today.present.count),
        percentage: "12.4",
        increase: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "3",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: getSample(Array.from(new Array(thisMonthData.sample), (_,i) => thisMonthData.present.value[i].length))
          }
        ]
      },
      
      {
        label: "Early Arrival",
        value: String(thisMonthData.today.earlyArrival.count),
        percentage: "3.8%",
        increase: false,
        decrease: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "3",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: getSample(Array.from(new Array(thisMonthData.sample), (_,i) => thisMonthData.earlyArrival.value[i].length))
          }
        ]
      },
     
      
      
      {
        label: "Productivity",
        value: "29",
        percentage: "2.71%",
        increase: false,
        decrease: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "3",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: getSample(Array.from(new Array(thisMonthData.sample), (_,i) => thisMonthData.productivity.value[i].length))
          }
        ]
      },
      {
        label: "Absent",
        value: String(thisMonthData.today.absent.count),
        percentage: "2.4%",
        increase: false,
        decrease: true,
        chartLabels: new Array(7).fill(null),
        attrs: { lg: "3",md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: getSample(Array.from(new Array(thisMonthData.sample), (_,i) => thisMonthData.absent.value[i].length))
          }
        ]
      },
      
    ]
  }

  const setUpDeptAttnData = (thisMonthData, viewer) => {
    let departments = thisMonthData.departments.value
      let totalEmployees = thisMonthData.total.count === 0 ? 1:thisMonthData.total.count,
        depAttn=[],
        zerosCount = 0
      if(viewer) {
        for(let department in departments) {
          if(departments[department].length === 0) {
            zerosCount+=1
          }
          depAttn.push((thisMonthData.today[viewer].value.length / totalEmployees) * 100)
        }
        if(zerosCount === thisMonthData.departments.count) {
          return new Array(thisMonthData.departments.total).fill(0)
        }
        return depAttn
      } else {
        let deptsArr = Object.keys(thisMonthData.departments.value)
        return Array.from(new Array(thisMonthData.departments.count), (_,i) => departments[deptsArr[i]].length)
      }
  }

  const setUpTopRes = (thisMonthData) => {
    let departments = thisMonthData.departments.today.online
      let tr = []
      for(let department in departments) {
        tr.push({
          title: String(department),
          value: String(departments[department])
        })
      }
      return tr
  }

  

  useEffect(() => {

    /**
     * Fix dates for calculation references
     */
    const date = new Date()
    const firstDateOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDateOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0)
    const firstDateOflastMonth = new Date(lastDateOfLastMonth.getFullYear(), lastDateOfLastMonth.getMonth(), 1)
    controller.analyser().then(data => {
      const thisMonthData = data.getAnalysisInRange(new Date(), firstDateOfThisMonth)
      const lastMonthData = data.getAnalysisInRange(lastDateOfLastMonth, firstDateOflastMonth)
      

      const pd = setUpProductivity(thisMonthData, lastMonthData, 'present')

      const ssd = setUpSmallStats(thisMonthData)

      const deptAttnData = setUpDeptAttnData(thisMonthData)
      console.log(deptAttnData)
      const tr = setUpTopRes(thisMonthData)

      setProductivity(pd)      
      setSmallStats(ssd)
      setTopRe(tr)
      setOnline(Array.from(new Array(thisMonthData.today.online.count), (_,i) => {
        return ({
          title: thisMonthData.today.online.value[i].getFullName(),
          value: "Present"
        })
      }))
      setEmpByDept({
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: deptAttnData,
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
              "rgba(0,123,255,0.3)"
            ]
          } 
        ],
        labels: Object.keys(thisMonthData.departments.today.present)
      })
      
      setIsLoading(false)
    })
  }, [])

  

  return (
    <Container fluid className={`main-content-container px-4 ${isLoading ? "d-flex align-items-center justify-content-center": ""}`}>

{isLoading && 
      <div className="spinner-border text-primary" style={{"width": "3rem", "height": "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
      {!isLoading && 
        <React.Fragment>
        {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="Home" subtitle="Dashboard" className="text-sm-left mb-3" />
      </Row>
  
      {/* Small Stats Blocks */}
      <Row>
        {smallStats.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
            />
          </Col>
        ))}
      </Row>
  
      {!isLoading &&
        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview title="Productivity" chartData={productivity}/>
          </Col>
    
          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice title="Employees in Department" chartData={empByDept}/>
          </Col>
    
          {/* New Draft */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col>
    
          {/* Discussions */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <TopReferrals title="Online"  referralData={online}/>
          </Col>
    
          {/* Top Referrals */}
          <Col lg="4" md="12" sm="12" className="mb-4">
            <TopReferrals title="Attendence" referralData={topRe}/>
          </Col>
        </Row>
      }
      </React.Fragment>
      }
    </Container>
  )
};

Home.propTypes = {
  controllers: PropTypes.object
};

// Home.defaultProps = {
//   smallStats: [
    
//   ]
// };

export default withFirebase(Home);
