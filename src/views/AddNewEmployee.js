import React from "react";
import PageTitle from "../components/common/PageTitle";
import { withFirebase } from "../controller"

import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button,
    CardBody,
    Alert,
    Container,
    FormFeedback
} from "shards-react";


const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    street: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    description: "",
    email: "",
    department: "",
    title: "",
    supervisor: "",
    workPhone: "",
    salary: "",
    startDate: "",
    rfid: "",
    errors: {
        firstName: true,
        lastName: true,
        email: true,
        address: true,
        city: true,
        state: true,
        zip: true,
        description: true,
        department: true
    },
    clicked: {
        firstName: false,
        lastName: false,
        email: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        description: false,
        department: false
    },
    formSubmit: false
}

class AddNewEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notification: "",
            ...INITIAL_STATE
        }
    }




    

    handleSubmit = (e) => {
        e.preventDefault()
        const {firstName, lastName, email, address, zip, description, department, city, state} = this.state
        const newEmployee = {
            firstName,
            lastName,
            email,
            streetName: address,
            zip,
            description,
            department,
            city,
            state
        }
        this.props.controller.save(newEmployee).then(succ => {
            alert("Succes")
        }).catch(err => {
            console.log(err)
            alert("Error: Check your internet connection")
        })
    }

    handleChange = (e) => {
        this.setState({[e.target]: e.target.value})
        const {name, value} = e.target
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
        
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Add New Employee" subtitle="Blog Posts" className="text-sm-left" />
                </Row>
                <Form onSubmit={this.handleSubmit} className="mt-2">
                    <Row>
                        <Col md="8">
                            <Card small className="mb-4">
                                <CardHeader className="border-bottom">
                                    <h6 className="m-0">Personal Information</h6>
                                </CardHeader>
                                <ListGroup flush>
                                    <ListGroupItem className="p-3">
                                        <Row>
                                            <Col>
                                                <Row>
                                                    {/* First Name */}
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">First Name</label>
                                                        <FormInput
                                                            id="feFirstName"
                                                            placeholder="First Name"
                                                            value={this.state.firstName}
                                                            name="firstName"
                                                            onChange={this.handleChange}
                                                            valid={this.state.clicked.firstName && !this.state.errors.firstName ? true:false}
                                                            invalid={this.state.clicked.firstName && this.state.errors.firstName ? true:false}
                                                        />
                                                        <FormFeedback>Should have atleast 2 characters</FormFeedback>
                                                    </Col>
                                                    {/* Last Name */}
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feLastName">Last Name</label>
                                                        <FormInput
                                                            id="feLastName"
                                                            placeholder="Last Name"
                                                            value={this.state.lastName}
                                                            name="lastName"
                                                            onChange={this.handleChange}
                                                            valid = {this.state.clicked.lastName && !this.state.errors.lastName ? true:false}
                                                            invalid = {this.state.clicked.lastName && this.state.errors.lastName ? true:false}
                                                        />
                                                        <FormFeedback invalid="true">Should have atleast 2 characters</FormFeedback>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    {/* Email */}
                                                    <Col className="form-group">
                                                        <label htmlFor="feEmail">Email</label>
                                                        <FormInput
                                                            type="email"
                                                            id="feEmail"
                                                            placeholder="Email Address"
                                                            onChange={this.handleChange}
                                                            autoComplete="email"
                                                            value={this.state.email}
                                                            name="email"
                                                            valid={this.state.clicked.email && this.emailValidation() ? true:false}
                                                            invalid={this.state.clicked.email && !this.emailValidation() ? true:false}
                                                        />
                                                        <FormFeedback invalid="true">Invalid Email</FormFeedback>
                                                    </Col>
                                                </Row>

                                                <Row form>
                                                    <Col md="12" className="form-group">
                                                    <label htmlFor="feCity">Address</label>
                                                    <FormInput
                                                        id="feAddress"
                                                        placeholder="Address"
                                                        onChange={this.handleChange}
                                                        value={this.state.address}
                                                        name="address"
                                                        valid = {this.state.clicked.address && !this.state.errors.address ? true:false}
                                                        invalid = {this.state.clicked.address && this.state.errors.address ? true:false}
                                                    />
                                                    <FormFeedback invalid="true">Address should not be empty</FormFeedback>
                                                    </Col>
                                                </Row>

                                                <Row form>
                                                
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feCity">City</label>
                                                    <FormInput
                                                        id="feCity"
                                                        placeholder="City"
                                                        onChange={this.handleChange}
                                                        value={this.state.city}
                                                        name="city"
                                                        valid = {this.state.clicked.city && !this.state.errors.city ? true:false}
                                                        invalid = {this.state.clicked.city && this.state.errors.city ? true:false}
                                                    />
                                                    <FormFeedback invalid="true">City should not be empty</FormFeedback>
                                                </Col>
                                                
                                                <Col md="4" className="form-group">
                                                    <label htmlFor="feInputState">State</label>
                                                    <FormSelect id="feInputState"
                                                        value={this.state.state}
                                                        name="state"
                                                        onChange={this.handleChange}
                                                        valid = {this.state.clicked.state && !this.state.errors.state ? true:false}
                                                        invalid = {this.state.clicked.state && this.state.errors.state ? true:false}
                                                    >
                                                        <option value="">Choose...</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                        <option>edrtgy</option>
                                                    </FormSelect>
                                                    <FormFeedback invalid="true">State should not be empty</FormFeedback>
                                                </Col>
                                                
                                                <Col md="2" className="form-group">
                                                    <label htmlFor="feZipCode">Zip</label>
                                                    <FormInput
                                                        id="feZipCode"
                                                        placeholder="Zip"
                                                        onChange={this.handleChange}
                                                        value={this.state.zip}
                                                        name="zip"
                                                        valid={this.state.clicked.zip && this.zipValidation() ? true:false}
                                                        invalid={this.state.clicked.zip && !this.zipValidation() ? true:false}
                                                    />
                                                    <FormFeedback invalid="true">Invalid Zip Code</FormFeedback>
                                                </Col>
                                            </Row>
                                                <Row>
                                                    {/* Description */}
                                                    <Col md="12" className="form-group">
                                                        <label htmlFor="feDescription">Description</label>
                                                        <FormTextarea
                                                            id="feDescription"
                                                            rows="5"
                                                            value={this.state.description}
                                                            name="description"
                                                            onChange={this.handleChange}
                                                            valid = {this.state.clicked.description && !this.state.errors.description ? true:false}
                                                            invalid = {this.state.clicked.description && this.state.errors.description ? true:false}
                                                        />
                                                        <FormFeedback invalid="true">Description should not be empty</FormFeedback>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>

                        
                        <Col lg="4">
                            <Card small className="mb-4">
                                <CardHeader className="border-bottom">
                                    <h6 className="m-0">Department</h6>
                                </CardHeader>
                                <CardBody>
                                    <Col className="form-group">
                                        <label htmlFor="feDepartment">Select from overflow</label>
                                        <FormSelect
                                            className="form-control"
                                            id="feDepartment"
                                            name="department"
                                            value={this.state.department}
                                            onChange={this.handleChange}
                                            valid = {this.state.clicked.department && !this.state.errors.department ? true:false}
                                            invalid = {this.state.clicked.department && this.state.errors.department ? true:false}
                                        >
                                            <option value="">Choose...</option>
                                            <option>Sales</option>
                                            <option>Marketing</option>
                                            <option>R and D</option>
                                            <option>Production</option>
                                            <option>Purchasing</option>
                                            <option>Accounting and Finance</option>
                                        </FormSelect>
                                        <FormFeedback invalid="true">Department should not be empty</FormFeedback>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    <Button disabled theme="accent" id="submitButton" type="submit" className="mb-3">Save</Button>
                </Form >
                </Container>

        )
    }
}

export default withFirebase(AddNewEmployee)



