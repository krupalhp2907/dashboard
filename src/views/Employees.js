import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody, Badge } from "shards-react";

import PageTitle from "../components/common/PageTitle";

/**
 * Import controllers
 */
import {withFirebase} from "../controller"

/**
 * Import presenter
 */
import { tablePresenter } from "../presenter";

const Employees = ({ history, title_visible, controller}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [employeesData, setEmployeesData] = useState([])
  const date = new Date()

  useEffect(() => {
    controller.getEmployees().then(obj => {
      const empByDept = obj.byDepartment
      setIsLoading(false)
      setEmployeesData(empByDept)
    })
  }, [])

  return (
  <Container fluid className={`main-content-container px-4 ${isLoading ? "d-flex align-items-center justify-content-center": ""}`} >
    
    {isLoading && 
      <div className="spinner-border text-primary" style={{"width": "3rem", "height": "3rem"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }

    {!isLoading && 
      
      <React.Fragment>
        {title_visible ? null : (
  <Row noGutters className="page-header py-4">
    <PageTitle sm="4" title="Employee Details" subtitle="Blog Posts" className="text-sm-left" />
  </Row>
)}


{/* Default Light Table */}
{
  Object.keys(employeesData).map((key, index) => {
    const data = employeesData[key]
    return (
        <Row key={index}>
        <Col >
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{key}</h6>
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
                    State
                  </th>
                  
                  <th scope="col" className="border-0">
                    Label
                  </th>

                </tr>
              </thead>
              <tbody>
                {data.map((employee, idx) => (
                  <tr key={idx} 
                    onClick={() => history.push("/employee_details/"+employee.id)}
                    style={{"cursor" : "pointer"}}
                  >
                    <td>{idx+1}</td>
                <td>{`${employee.getFullName().slice(0,9)}${employee.getFullName().length > 9 ? "...":""}`}</td>
                    <td>{employee.getState()}</td>
                    <td>{employee.checkIsPresent(date) ? <Badge pill theme="success">P</Badge>: <Badge pill theme="danger">A</Badge>} {employee.checkEarlyArrival(date) ? <Badge pill theme="primary">E</Badge>: <Badge pill theme="danger">L</Badge>} <Badge pill theme="secondary">1Hr 23Min</Badge> {employee.checkIsOnline(date) ? <Badge pill theme="success">On</Badge>: <Badge pill theme="danger">Of</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    )
  })
}

        </React.Fragment>
    }

  </Container>
)};

Employees.propTypes = {
  /**
   * The employees
   */
  employees: PropTypes.array,
  /**
   * The history
   */
  history: PropTypes.object,
  /**
   * The title
   */
  title_visible: PropTypes.bool,

};


Employees.defaultProps = {
  employees: [
    {
      title: "Hello world in python",
      heading: ["First Name", "Last Name", "Country", "City", "Phone"],
      data: [
      
        {
          id: "1",
          firstName: "Ali",
          lastName: "Kerry",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "107-0339"
        },
        {
          id: "2",
          firstName: "Clark",
          lastName: "Angela",
          country: "Estonia",
          city: "Gdańsk",
          phone: "405-0367"
        },
        {
          id: "3",
          firstName: "Jerry",
          lastName: "Jerry",
          country: "Cyprus",
          city: "Braunau am Inn",
          phone: "945-2034"
        },
        {
          id: "4",
          firstName: "Jerry",
          lastName: "Kerry",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "107-9231"
        },
        {
          id: "5",
          firstName: "Ali",
          lastName: "Clark",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "203-0339"
        }
  
      ]
    },
    {
      title: "Hello world in java",
      heading: ["First Name", "Last Name", "Country", "City", "Phone"],
      data: [
      
        {
          id: "1",
          firstName: "Ali",
          lastName: "Kerry",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "107-0339"
        },
        {
          id: "2",
          firstName: "Clark",
          lastName: "Angela",
          country: "Estonia",
          city: "Gdańsk",
          phone: "405-0367"
        },
        {
          id: "3",
          firstName: "Jerry",
          lastName: "Jerry",
          country: "Cyprus",
          city: "Braunau am Inn",
          phone: "945-2034"
        },
        {
          id: "4",
          firstName: "Jerry",
          lastName: "Kerry",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "107-9231"
        },
        {
          id: "5",
          firstName: "Ali",
          lastName: "Clark",
          country: "Russian Federation",
          city: "Gdańsk",
          phone: "203-0339"
        }
  
      ]
    }
  ]
}

export default withFirebase(Employees)


