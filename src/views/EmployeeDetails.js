import React from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import EmployeeStats from "../components/employee-profile/EmployeeStats";
import EmployeeAccountDetails from "../components/employee-profile/EmployeeAccountDetails";
import {withRouter} from "react-router-dom"
import UsersOverview from "../components/blog/UsersOverview";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  Progress,
  FormFeedback
} from "shards-react";



class EmployeeDetails extends React.Component {

  // const smallStatsData = {
  //   Salary:
  //   Regularity:
  //   Scanning Regularly:
  //   Productivity
  //   Online/Offline Status
  //   Leave
  // }


  constructor(props) {
      super(props)
      let firstName = "krupal"
      let lastName = "panchasara"
      let city = "city"
      this.state = {
        editOn: false,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: "",
        email: "sierra@example.com",
        address: "",
        zip: "",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?",
        errors: {
            firstName: false,
            lastName: false,
            email: false,
            address: false,
            city: false,
            state: false,
            zip: false,
            description: false
        },
        clicked: {
            firstName: false,
            lastName: false,
            email: false,
            address: false,
            city: false,
            state: false,
            zip: false,
            description: false
        },
      }
  }

  static defaultProps = {
      title: "Account Details",
      employeeDetails: {
            "1" : {
                firstName: "Ali",
                lastName: "Kerry",
                city: "Gdańsk",
                state: "Russia",
                avatar: require("./../images/avatars/0.jpg"),
                jobTitle: "Project Manager",
                performanceReportTitle: "Work completed",
                performanceReportValue: 74,
                metaTitle: "Description",
                metaValue:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
            },
            "2" : {
                firstName: "Clark",
                lastName: "Angela",
                city: "Gdańsk",
                state: "Russia",
                avatar: require("./../images/avatars/0.jpg"),
                jobTitle: "Project Manager",
                performanceReportTitle: "Workload",
                performanceReportValue: 65,
                metaTitle: "Description",
                metaValue:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
            },
            "3" : {
                firstName: "Jerry",
                lastName: "Jerry",
                city: "Gdańsk",
                state: "Russia",
                avatar: require("./../images/avatars/0.jpg"),
                jobTitle: "Project Manager",
                performanceReportTitle: "Workload",
                performanceReportValue: 82,
                metaTitle: "Description",
                metaValue:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
            },
            "4" : {
                firstName: "Jerry",
                lastName: "Kerry",
                city: "Gdańsk",
                state: "Russia",
                avatar: require("./../images/avatars/0.jpg"),
                jobTitle: "Project Manager",
                performanceReportTitle: "Workload",
                performanceReportValue: 78,
                metaTitle: "Description",
                metaValue:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
            },
            "5" : {
                firstName: "Ali",
                lastName: "Clark",
                city: "Gdańsk",
                state: "Russia",
                avatar: require("./../images/avatars/0.jpg"),
                jobTitle: "Project Manager",
                performanceReportTitle: "Workload",
                performanceReportValue: 87,
                metaTitle: "Description",
                metaValue:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
            }
        }
    };




  handleFormChange = (e) => {
    if(this.state.editOn) {
      const {name, value} = e.target
      console.log(name,value)
      let errors = this.state.errors
      switch(name) {
          case 'firstName':
              errors.firstName = value.length <= 2 ? true : false
              break
          case 'lastName':
              errors.lastName = value.length <= 2 ? true : false
              break
          case 'address':
              errors.address = value.length < 1 ? true : false
              break
          case 'city':
              errors.city = value.length < 1 ? true : false
              break
          case 'description':
              errors.description = value.length < 1 ? true : false
              break
          case 'state':
              errors.state = value.length < 1 ? true : false
              break
          case 'department':
              errors.department = value.length < 1 ? true : false
              break
          default:
              break
      }
      let clicked = this.state.clicked
      clicked[name] = true
      this.setState({errors, [name]: value, clicked})
      this.submitButtonChange(this.state.errors)
    }
  }

  handleEdit = (e) => {
    this.setState({editOn: true})
  }

  handleSubmit = (e) => {
    this.setState({editOn: false})
  }

  emailValidation = () => {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let errors = this.state.errors
      if (this.state.email.match(mailformat)) {
          errors.email = false
          return true
      }
      else {
          errors.email = true
          return false
      }
  }

  zipValidation = () => {
      let zipFormat = /^[0-9]{6}$/
      let errors = this.state.errors
      if (this.state.zip.match(zipFormat)) {
          errors.zip = false
          return true
      }
      else {
          errors.zip = true
          return false;
      }
  }

  submitButtonChange = (errors) => {
      let valid = true
      let count = 0
      Object.values(errors).forEach(val => {
          if(val) {
              count++
          }
      })
      if(count == 0) {
          document.getElementById("submitButton").disabled = false;
      }
      else {
          document.getElementById("submitButton").disabled = true;
      }
  }

  render() {
    const id = this.props.id
    const employeeDetails = this.props.employeeDetails
    const title = this.props.title
    return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
          <EmployeeStats />
      </Row>
      <Row>
        <Col lg="4">
          <Card small className="mb-4 pt-3" >
            <CardHeader className="border-bottom text-center">
              <div className="mb-3 mx-auto">
                <img
                  className="rounded-circle"
                  src={require("../images/avatars/2.jpg")}
                  width="110"
                />
              </div>
              <h4 className="mb-0">{this.state.firstName + " " + this.state.lastName}</h4>
              <span className="text-muted d-block mb-2">Internship</span>
              {this.state.editOn ? null :
                <div>
                <Button outline size="sm" className="mx-1 mb-2 btn btn-success btn-outline-success btn-sm btn-pill">
                  <i className="material-icons mr-1">person_add</i> Mark Attendance
                </Button>
                <Button onClick={this.handleEdit} outline size="sm" className="mx-1 mb-2 btn btn-info btn-outline-info btn-sm btn-pill">
                  <i className="material-icons mr-1">person_add</i> Edit
                </Button>
                <Button outline size="sm" className="mx-1 mb-2 btn btn-danger btn-outline-danger btn-sm btn-pill">
                  <i className="material-icons mr-1">person_add</i> Remove
                </Button>
                </div>
              }
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="px-4">
                <div className="progress-wrapper">
                  <strong className="text-muted d-block mb-2">
                    Progress
                  </strong>
                  <Progress
                    className="progress-sm"
                    value={78}
                  >
                    <span className="progress-value">
                      {78}%
                    </span>
                  </Progress>
                </div>
              </ListGroupItem>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  meta title
                </strong>
                <span>{this.state.description}</span>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col lg="8">
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">title</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        {/* First Name */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feFirstName">First Name</label>
                          <FormInput
                            className="changeHandler"
                            id="feFirstName"
                            placeholder="First Name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleFormChange}
                            valid={this.state.editOn && !this.state.errors.firstName}
                            invalid={this.state.editOn && this.state.errors.firstName}
                          />
                          <FormFeedback invalid>Should have atleast 2 characters</FormFeedback>
                        </Col>
                        {/* Last Name */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feLastName">Last Name</label>
                          <FormInput
                          className="changeHandler"
                            id="feLastName"
                            placeholder="Last Name"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleFormChange}
                            valid = {this.state.editOn && !this.state.errors.lastName}
                            invalid = {this.state.editOn && this.state.errors.lastName}
                          />
                          <FormFeedback invalid>Should have atleast 2 characters</FormFeedback>
                        </Col>
                      </Row>
                      <Row form>
                        {/* Email */}
                        <Col md="12" className="form-group">
                          <label htmlFor="feEmail">Email</label>
                          <FormInput
                          className="changeHandler"
                            type="email"
                            id="feEmail"
                            placeholder="Email Address"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleFormChange}
                            autoComplete="email"
                            valid={this.state.editOn && this.emailValidation()}
                            invalid={this.state.editOn && !this.emailValidation()}
                          />
                          <FormFeedback invalid>Invalid Email</FormFeedback>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feAddress">Address</label>
                        <FormInput
                        className="changeHandler"
                          id="feAddress"
                          placeholder="Address"
                          value={this.state.address}
                          name="address"
                          onChange={this.handleFormChange}
                          valid = {this.state.editOn && !this.state.errors.address}
                          invalid = {this.state.editOn && this.state.errors.address}
                        />
                        <FormFeedback invalid>Address should not be empty</FormFeedback>
                      </FormGroup>
                      <Row form>
                        {/* City */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feCity">City</label>
                          <FormInput
                          className="changeHandler"
                            id="feCity"
                            placeholder="City"
                            value={this.state.city}
                            name="city"
                            onChange={this.handleFormChange}
                            valid = {this.state.editOn && !this.state.errors.city}
                            invalid = {this.state.editOn && this.state.errors.city}
                          />
                          <FormFeedback invalid>City should not be empty</FormFeedback>
                        </Col>
                        {/* State */}
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">State</label>
                          <FormSelect
                          className="changeHandler"
                            id="feInputState"
                            name="state"
                            onChange={this.handleFormChange}
                            value={this.state.state}
                            valid = {this.state.editOn && !this.state.errors.state}
                            invalid = {this.state.editOn && this.state.errors.state}
                          >
                            <option value="">Choose...</option>
                            <option>edrtgy</option>
                            <option>edrtgy</option>
                            <option>edrtgy</option>
                            <option>edrtgy</option>
                          </FormSelect>
                          <FormFeedback invalid>State should not be empty</FormFeedback>
                        </Col>
                        {/* Zip Code */}
                        <Col md="2" className="form-group">
                          <label htmlFor="feZipCode">Zip</label>
                          <FormInput
                          className="changeHandler"
                            id="feZipCode"
                            placeholder="Zip"
                            name="zip"
                            value={this.state.zip}
                            onChange={this.handleFormChange}
                            valid={this.state.editOn && this.zipValidation()}
                            invalid={this.state.editOn && !this.zipValidation()}
                          />
                          <FormFeedback invalid>Invalid Zip Code</FormFeedback>
                        </Col>
                      </Row>
                      <Row form>
                        {/* Description */}
                        <Col md="12" className="form-group">
                          <label htmlFor="feDescription">Description</label>
                          <FormTextarea
                          className="changeHandler"
                            id="feDescription"
                            rows="5"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleFormChange}
                            valid = {this.state.editOn && !this.state.errors.description}
                            invalid = {this.state.editOn && this.state.errors.description}
                          />
                          <FormFeedback invalid>Description should not be empty</FormFeedback>
                        </Col>
                      </Row>
                      <Button theme="accent" id="submitButton" onClick={this.handleSubmit}>Update Account</Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col  className="mb-4" lg="10" md={{offset:"1"}}>
          <UsersOverview />
        </Col>
      </Row>
    </Container>
  );
  }
}



export default withRouter((props) => (
    <EmployeeDetails id={props.match.params.id} />
  ));
