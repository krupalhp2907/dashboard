import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "./PageTitle";

const Table = ({ title, subtitle,employees,  history, title_visible}) => {
    console.log(history)
  return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    {title_visible ? null : (
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title={title || "Table"} subtitle={subtitle || "subtitle"} className="text-sm-left" />
      </Row>
    )}
    

    {/* Default Light Table */}
    {
      employees.map((data, index) => {
        return (
            <Row key={index}>
            <Col >
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">{data.title}</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      {
                        data.heading.map((text, idx) => {
                          return (
                            <th scope="col" className="border-0" key={idx}>
                            {text}
                          </th>
                          )
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((employee, idx) => (
                      <tr key={idx} 
                        onClick={() => history.push("/employee_details/"+employee.id)}
                        style={{"cursor" : "pointer"}}
                      >
                        <td>{idx + 1}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.country}</td>
                        <td>{employee.city}</td>
                        <td>{employee.phone}</td>
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

    
  </Container>
)};

Table.propTypes = {
  /**
   * The title
   */
  title: PropTypes.string,
  /**
   * The subtitle
   */
  subtitle: PropTypes.string,
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


Table.defaultProps = {
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

export default Table
