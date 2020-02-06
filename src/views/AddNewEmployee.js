import React from "react";
import ReactDOM from 'react-dom';
// import options from './data';

// import './styles.css';
// import "./form.css"
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
    FormFeedback,
    Button,
    CardBody,
    Alert,
    Container
} from "shards-react";
import { withFirebase } from "../controller";
import PageTitle from "../components/common/PageTitle"

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    // govId: "",
    street: "",
    state: "",
    city: "",
    zip: "",
    marrage_status: "0",
    spouseContact: "",
    spouseFirstName: "",
    spouseLastName: "",
    description: "",
    email: "",
    department: "",
    title: "",
    supervisor: "",
    workLocation: "",
    workPhone: "",
    salary: "",
    startDate: "",
    gender : "",
    birthDate:"",
    emergencyLastName: "",
    emergencyFirstName: "",
    EmergencyAddress: "",
    emergencyCity: "",
    emergencyState: "",
    emergencyZip: "",
    emergencyRelation: "",
    emergencyContact: "",
    rfid: ""
}


class UserAccountDetails extends React.Component {
    constructor(props) {
        super(props)
        this.rfidHandler = this.props.controller.rfidHandler("store_rfid_temp_id")
        this.unsub = null
        this.shouldFormSubmit = 0
        this.state = {
            notification: "",
            ...INITIAL_STATE,
            init: {},
            rfid_loading: false,
            loading_text: "Loading..."
        }
        this.handleRfidClick = this.handleRfidClick.bind(this)
    }

    
    // UNCOMMENT THIS 
    UNSAFE_componentWillMount() {
        
    }

    handleShouldSubmit = (bool) => {
        if(bool) {
            this.shouldFormSubmit += 1
        }
        return bool
    }

    handleRfidClickStop = () => {
        this.handleRfidChange("Press Button to scan rfid")
        if(this.unsub !== null) {
            this.unsub()
        }
    }
 
    handleRfidClick = () => {
        this.handleRfidChange("Sending request to server...", true, "Sending Request To Server...")
        this.rfidHandler.setRfidRequest().then(success => {
            this.handleRfidChange("Rfid Requested. First scanned would be displayed here", true, "Awaiting Reply from device...")
            const self = this
            this.unsub = self.rfidHandler.rfidListnerFromBuffer(function (rfid, err, unsub) {  
                console.log(rfid, err)
                if(err === "bad request") {
                    self.handleRfidChange("Bad Request", false)
                    unsub()

                } else if(err === "requested") {
                    self.handleRfidChange("Awaiting Response from Device", true, "Awaiting Reply from device...")
                } else {
                    self.handleRfidChange(rfid)
                    unsub()
                }
            })
        }).catch(err => {
            this.handleRfidChange("Some unknown error occoured", false, "Some unknown error occoured")
        })
        // console.log("yeksdbferjkt", this.props.firebase)
        // this.props.firebase.getTempRfidRef().doc("store_rfid_temp_id").set({
        //     "init_time": new Date(),
        //     "rfid": String("request pending"),
        //     "rfid_request": true,
        //     "last_edited": "client"
        // }).then(success => {
        //     this.setState({
        //         rfid: "The first rfid scanned would be assigned to this employee"
        //     })
        // }).catch(err => {
        //     alert("Please check ur internet connection")
        // })
        // this.setState({
        //     rfid: ""
        // })
        // this.setState({rfid_loading: !this.state.rfid_loading})
    }
    
    handleRfidChange = (rfid, bool = false, loading_text) => {
        this.setState({
            rfid_loading: bool,
            rfid: rfid || this.state.rfid,
            loading_text: loading_text || this.state.loading_text
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // var firebase = this.props.firebase
        // console.log(this.shouldFormSubmit)
        const newInit = {
            firstName: true,
            lastName: true,
            email: true,
            street : true,
            city : true,
            state : true,
            zip : true, 
            title: true,
            supervisor : true,
            startDate : true,
            workPhone : true,
            rfid : true,
            emergencyLastName : true,
            emergencyFirstName : true,
            EmergencyAddress : true,
            emergencyCity : true,
            emergencyState : true,
            emergencyZip : true,
            emergencyRelation : true,
            emergencyContact : true,
            birthDate : true,
            gender : true
        }
        this.setState({init: newInit})
        // firebase.saveNewEmployee(this.state)
    }

    handleChange = (e) => {
        const newInit = this.state.init
        newInit[String(e.target.name)] = true
        // console.log("New Init", newInit)
        this.setState({ 
            [e.target.name]: e.target.value,
            init: newInit          
         })
         
    }

    email_validation = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.email.match(mailformat)){
            return true;
        }
        else {
            return false;
        }
    }

    all_number = (t = this.state.zip ) => {
        var numbers = /^[0-9]+$/;
        if(t.match(numbers))
            {return true;}
            else
            {return false;}
    }
   


    check_mo_number = (t = this.state.workPhone) => {

        if(this.all_number(t)) {
            if(t.length !== 10) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    


    render() {
        // console.log("states is here", this.state)
        const c = this.check_mo_number
        const d = this.all_number
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Home" subtitle="Dashboard" className="text-sm-left mb-3" />
                </Row>
                <Form onSubmit={this.handleSubmit}>
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
                                                            required
                                                            id="feFirstName"
                                                            placeholder="First Name"
                                                            value={this.state.firstName}
                                                            name="firstName"
                                                            onChange={this.handleChange}
                                                            valid = {this.state.init.firstName === true ? this.state.firstName.length > 2  : false}
                                                            invalid = { this.state.init.firstName === true ? this.state.firstName.length <= 2 : false}
                                                        />
                                                        <FormFeedback invalid>First name should be greater then 2</FormFeedback>
                                                    </Col>
                                                    {/* Last Name */}
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feLastName">Last Name</label>
                                                        <FormInput
                                                        required    
                                                            id="feLastName"
                                                            placeholder="Last Name"
                                                            value={this.state.lastName}
                                                            name="lastName"
                                                            onChange={this.handleChange}
                                                            valid = {this.state.init.lastName === true ? this.state.lastName.length > 2 : false}
                                                            invalid = { this.state.init.lastName === true ? this.state.lastName.length <= 2 : false}
                                                        />
                                                        <FormFeedback invalid>First name should be greater then 2</FormFeedback>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    {/* Email */}
                                                    <Col className="form-group">
                                                        <label htmlFor="feEmail">Email</label>
                                                        <FormInput
                                                        required
                                                            type="email"
                                                            id="feEmail"
                                                            placeholder="Email Address"
                                                            onChange={this.handleChange}
                                                            autoComplete="email"
                                                            value={this.state.email}
                                                            name="email"
                                                            
                                                            valid = { this.state.init.email === true ? this.email_validation() : false}
                                                            invalid = { this.state.init.email === true ? !this.email_validation() : false}
                                                           
                                                            
                                                        />   <FormFeedback invalid> Incorrect email</FormFeedback>
                                                    </Col>

                                                    <Col md="4" className="form-group">
                                                        <label htmlFor="feBirthDate">Date of Birth</label>
                                                        <FormInput
                                                        
                                                            type="date"
                                                            id="feBirthDate"
                                                            placeholder="Birth Date"
                                                            value={this.state.birthDate}
                                                            name="birthDate"
                                                            onChange={this.handleChange} 
                                                            valid = {this.state.init.birthDate === true ? this.state.birthDate.length > 0 : false} 
                                                            invalid = {this.state.init.birthDate === true ? this.state.birthDate.length <= 1: false} 
                                                           />  <FormFeedback invalid> Enter Date of Birth  </FormFeedback> 


                                                    </Col> 
                                                    <Col md="3" className="form-group">
                                                    <label htmlFor="feInputgender">Gender</label>
                                                    <FormSelect id="feInputgender"
                                                        value={this.state.gender}
                                                        name="gender"
                                                        onChange={this.handleChange}
                                                        valid = {this.state.init.gender === true ? this.state.gender.length > 0 : false} 
                                                        invalid = {this.state.init.gender === true ? this.state.gender.length <= 1: false} 
                                                        >
                                                        <option>Choose...</option>
                                                        <option>Male</option>

                                            
                                                        <option>Female</option>
                                                        <option>others</option>
                                                        
                                                    </FormSelect>   <FormFeedback invalid> Enter Genders </FormFeedback> 
                                                </Col>
                                                
                                                    {/* Gov't ID od SSN*/}
                                                    {/* <Col md="6" className="form-group">
                                                    <label htmlFor="feGovId">P</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feGovId"
                                                        placeholder="SSN or Goverment ID"
                                                        onChange={this.handleChange}
                                                        value={this.state.govId}
                                                        name="govId"
                                                    />
                                                </Col> */}
                                                </Row>
                                                {/* Address */}
                                                <FormGroup>
                                                    <label htmlFor="feAddress">Street Name</label>
                                                    { <FormInput
                                                        id="feAddress"
                                                        placeholder="Street Name"
                                                        onChange={this.handleChange}
                                                        value={this.state.street}
                                                        name="street" 
                                                        valid = { this.state.init.street === true ? this.state.street.length > 10 : false}
                                                        invalid = { this.state.init.street === true ? this.state.street.length <= 10 : false}

                                                    />  }
                                                   
                                                    <FormFeedback invalid> Address is mandatory field</FormFeedback>
                                                </FormGroup>

                                                
                                                
                                                <Row form>

                                                 <Col md="6" className="form-group">
                                                    <label htmlFor="feCity">City</label>
                                                    <FormInput
                                                        id="feCity"
                                                        placeholder="City"
                                                        onChange={this.handleChange}
                                                        value={this.state.city}
                                                        name="city"
                                                        valid = { this.state.init.city === true ? this.state.city.length > 2 : false}
                                                        invalid = { this.state.init.city === true ? this.state.city.length <= 2 : false}
                                                    /> <FormFeedback invalid> This field is mandatory</FormFeedback>

                                                </Col>

                                                
                                                
                                                <Col md="4" className="form-group">
                                                    <label htmlFor="feInputState">State</label>
                                                    
                                                    {/* <Typeahead
                                                        {...this.state.state}
                                                        id="basic-example"
                                                        onChange={selected => this.setState({ selected })}
                                                        options={options}
                                                        placeholder="Choose a state..."
                                                

                                                         /> <FormFeedback invalid>Select state</FormFeedback> */}
                                                </Col>
                                                
                                                <Col md="2" className="form-group">
                                                    <label htmlFor="feZipCode">Zip</label>
                                                    <FormInput
                                                        id="feZipCode"
                                                        placeholder="Zip"
                                                        onChange={this.handleChange}
                                                        value={this.state.zip}
                                                        name="zip" 
                                                        valid = {this.state.init.zip === true ? this.all_number(): false} 
                                                        invalid = {this.state.init.zip === true ? !this.all_number(): false}

                                                    /><FormFeedback invalid> Enter all numeric value</FormFeedback>
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
                                                            onChange={this.handleChange} />
                                                    </Col>
                                                    
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                        

                        <Col md="4">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Marital Status</h6>
                            </CardHeader>
                            <CardBody>
                                <Row form>
                                    <Col lg="6">
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="marrage_status"
                                                    value="1"
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                Married
                                            </label>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="marrage_status"
                                                    value="0"
                                                    onChange={this.handleChange}
                                                    className="form-check-input"
                                                />
                                                Unmarried
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        

                        {this.state.marrage_status === "0" || <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Spouse's Details</h6>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <label htmlFor="feSpouseFirstName">First Name</label>
                                <FormInput
                                    id="feSpouseFirstName"
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    value={this.state.spouseName}
                                    name="spouseFirstName"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="feSpouseNumber">Last Name</label>
                                <FormInput
                                    id="feSpouseNumber"
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                    value={this.state.spouseName}
                                    name="spouseLastName"
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="feSpouseContact">Number</label>
                                <FormInput
                                    id="feSpouseContact"
                                    placeholder="Contact"
                                    onChange={this.handleChange}
                                    value={this.state.spouseContact}
                                    name="spouseContact"
                                />
                            </FormGroup>
                        </CardBody>
                    </Card>} 
                    </Col> 

                    

                        <Col lg="8">
                            <Card small className="mb-4">
                                <CardHeader className="border-bottom">
                                    <h6 className="m-0">Job Description</h6>
                                </CardHeader>
                                <ListGroup flush>
                                    <ListGroupItem className="p-3">
                                        <Row>
                                            <Col>
                                                <Row>

                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feTitle">Job Position</label>
                                                        <FormInput
                                                            id="feTitle"
                                                            placeholder="Title"
                                                            value={this.state.title}
                                                            name="title"
                                                            onChange={this.handleChange} 
                                                            valid = {this.state.init.title === true ? this.state.title.length > 0 : false} 
                                                            invalid = {this.state.init.title === true ? this.state.title.length <= 1: false}
                                                             /> <FormFeedback invalid> This field is mandatory</FormFeedback>
                                                    </Col>

                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feSupervisor">Supervisor</label>
                                                        <FormInput
                                                            id="feSupervisor"
                                                            placeholder="Supervisor"
                                                            value={this.state.supervisor}
                                                            name="supervisor"
                                                            onChange={this.handleChange} 
                                                            valid = {this.state.init.supervisor === true ? this.state.supervisor.length > 0 : false} 
                                                            invalid = {this.state.init.supervisor === true ? this.state.supervisor.length <= 1: false}
                                                            /> <FormFeedback invalid> This field is mandatory</FormFeedback>
                                                    </Col>
                                                </Row>
                                                <Row>

                                                    <Col md="6" className="form-group">
                                                    <label htmlFor="feWorkLocation">Work Location</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feWorkLocation"
                                                        placeholder="Work Location"
                                                        value={this.state.workLocation}
                                                        name="workLocation"
                                                        onChange={this.handleChange} 
                                                        valid = {this.state.init.workLocation === true ? this.state.workLocation.length > 0 : false} 
                                                        invalid = {this.state.init.workLocation === true ? this.state.workLocation.length <= 1: false}
                                                        /> <FormFeedback invalid> Entre work Location</FormFeedback>
                                                </Col>

                                                    <Col md="12" className="form-group">
                                                        <label htmlFor="feWorkPhone">Work phone</label>
                                                        <FormInput
                                                            type="number"
                                                            id="feWorkPhone"
                                                            placeholder="Work Phone"
                                                            value={this.state.workPhone}
                                                            name="workPhone"
                                                            onChange={this.handleChange}
                                                            valid = {this.state.init.workPhone === true ? this.check_mo_number()  : false} 
                                                            invalid = {this.state.init.workPhone === true ? !this.check_mo_number() : false}


                                                           
                                                            />  <FormFeedback invalid> Enter 10 digit mobile number</FormFeedback>
                                                    </Col>
                                                </Row>

                                                <Row>

                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feStartDate">Start Date</label>
                                                        <FormInput
                                                            type="date"
                                                            id="feStartDate"
                                                            placeholder="Start Date"
                                                            value={this.state.startDate}
                                                            name="startDate"
                                                            onChange={this.handleChange} 
                                                            valid = {this.state.init.startDate === true ? this.state.startDate.length > 0 : false} 
                                                            invalid = {this.state.init.startDate === true ? this.state.startDate.length <= 1: false} 
                                                           />  <FormFeedback invalid> Enter starting date  </FormFeedback> 


                                                    </Col> 

                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feSalary">Salary</label>
                                                        <FormInput 
                                                        type="number" 
                                                        id="feSalary" 
                                                        placeholder="Salary" 
                                                        value={this.state.salary} 
                                                        name="salary" 
                                                        onChange={this.handleChange}  
                                                    
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md="9" className="form-group inline-loader">
                                                        <label htmlFor="#ferfid">Rfid</label>
                                                        <FormInput
                                                            type="text"
                                                            id="ferfid"
                                                            placeholder="Press Button to scan rfid"
                                                            name="rfid"
                                                            onChange={this.handleRfidChange}
                                                            value={this.state.rfid}
                                                            disabled={true}
                                                        />
                                                        {this.state.rfid_loading && 
                                                            <span>
                                                                <div className="spinner-border text-primary spinner-border-sm mt-2" role="status"></div>
                                                        <span className="ml-1">{this.state.loading_text}</span><br />
                                                                <span className="ml-1">You must be having a stable connection</span>
                                                            </span>}
                                                    </Col>

                                                    <Col md="3" className={`form-group d-inline-flex justify-content-end ${this.state.rfid_loading ? "align-items-center" : "align-items-end pb-1"}`}>
                                                        <Button className={`btn btn-block ${this.state.rfid_loading ? "btn-danger" : "btn-primary"}`} onClick={this.state.rfid_loading === true ? this.handleRfidClickStop: this.handleRfidClick}>{`${this.state.rfid_loading ? "Stop Process" : "Scan RFID"}`}</Button>
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
                                    <div className="form-group">
                                        <label htmlFor="feDepartment">Select from overflow</label>
                                        <select
                                            className="form-control"
                                            id="feDepartment"
                                            name="department"
                                            value={this.state.department}
                                            onChange={this.handleChange}>
                                            <option>Sales</option>
                                            <option>Marketing</option>
                                            <option>R and D</option>
                                            <option>Production</option>
                                            <option>Purchasing</option>
                                            <option>Accounting and Finance</option>
                                        </select>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Emergency Contact Information</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <lab el htmlFor="feEmergencyFirstName">First Name</lab>
                                                    <FormInput 
                                                    id="feEmergencyFirstName" 
                                                    placeholder="First Name" 
                                                    value={this.state.emergencyFirstName} 
                                                    name="emergencyFirstName" 
                                                    onChange={this.handleChange} 
                                                    valid = {this.state.init.emergencyFirstName === true ? this.state.emergencyFirstName.length > 0 : false} 
                                                    invalid = {this.state.init.emergencyFirstName === true ? this.state.emergencyFirstName.length <= 1: false}
                                                    
                                                    />  <FormFeedback invalid> This field is required.</FormFeedback>
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyLastName">Last Name</label>
                                                    <FormInput
                                                        id="feEmergencyLastName"
                                                        placeholder="Last Name"
                                                        value={this.state.emergencyLastName}
                                                        name="emergencyLastName"
                                                        onChange={this.handleChange} 
                                                        valid = {this.state.init.emergencyLastName === true ? this.state.emergencyLastName.length > 2 : false}
                                                        invalid = { this.state.init.emergencyLastName === true ? this.state.emergencyLastName.length <= 2 : false}
            
                                                        /> <FormFeedback invalid> This field is required.</FormFeedback>
                                                </Col>
                                            </Row>

                                            <FormGroup>
                                                <label htmlFor="feEmergencyAddress">Address</label>
                                                <FormInput
                                                    id="feEmergencyAddress"
                                                    placeholder="Address"
                                                    onChange={this.handleChange}
                                                    value={this.state.EmergencyAddress}
                                                    name="EmergencyAddress" 
                                                    valid = {this.state.init.EmergencyAddress === true ? this.state.EmergencyAddress.length > 8 : false}
                                                    invalid = { this.state.init.EmergencyAddress === true ? this.state.EmergencyAddress.length <= 8 : false}
                                                    /> <FormFeedback invalid> Address is mandatory</FormFeedback>
                                            </FormGroup>
                                            <Row>
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyCity">City</label>
                                                    <FormInput
                                                        id="feEmergencyCity"
                                                        placeholder="City"
                                                        onChange={this.handleChange}
                                                        value={this.state.emergencyCity}
                                                        name="emergencyCity" 
                                                        valid = { this.state.init.emergencyCity === true ? this.state.emergencyCity.length > 2 : false}
                                                        invalid = { this.state.init.emergencyCity === true ? this.state.emergencyCity.length <= 2 : false}
                                                        /> <FormFeedback invalid> City is mandatory</FormFeedback>
                                                </Col>

                                                <Col md="4" className="form-group">
                                                    <label htmlFor="feEmergencyState">State</label>
                                                    {/* <Typeahead
                                                        {...this.state}
                                                        id="basic-example"
                                                        onChange={selected => this.setState({ selected })}
                                                        options={options}
                                                        placeholder="Choose a state..."
                                                        
                                                         /> */}
                                                </Col>

                                                <Col md="2" className="form-group">
                                                    <label htmlFor="feEmergencyZipCode">Zip</label>
                                                    <FormInput id="feEmergencyZipCode"
                                                        placeholder="Zip"
                                                        onChange={this.handleChange}
                                                        value={this.state.emergencyZip}
                                                        name="emergencyZip"

                                                        valid = {this.state.init.emergencyZip === true ? d(this.state.emergencyZip): false} 
                                                        invalid = {this.state.init.emergencyZip === true ? !d(this.state.emergencyZip): false}
                                                        /> <FormFeedback invalid> Enter all numeric value</FormFeedback>
                                                </Col>
                                            </Row>
                                            <Row>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyRelation">Relationship</label>
                                                    <FormInput
                                                        type="text"
                                                        id="feEmergencyRelationship"
                                                        placeholder="Relationship"
                                                        value={this.state.emergencyRelation}
                                                        name="emergencyRelation"
                                                        onChange={this.handleChange} 
                                                        valid = { this.state.init.emergencyRelation === true ? this.state.emergencyRelation.length > 2 : false}
                                                        invalid = { this.state.init.emergencyRelation === true ? this.state.emergencyRelation.length <= 2 : false}
                                                        /> 
                                                        
                                                </Col>

                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feEmergencyNumber">Phone Number</label>
                                                    <FormInput
                                                        type="number"
                                                        id="feEmergencyNumber"
                                                        placeholder="Number"
                                                        value={this.state.emergencyContact}
                                                        name="emergencyContact"
                                                        onChange={this.handleChange} 
                                                        valid = {this.state.init.emergencyContact === true ? c(this.state.emergencyContact) : false} 
                                                        invalid = {this.state.init.emergencyContact === true ? !c(this.state.emergencyContact)  : false}
                                                        /> 
                                                        <FormFeedback> Enter 10 digit mobile number</FormFeedback>
                                                </Col>    
                                            </Row>
                                            <Button theme="accent" type="submit">Submit</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                    </Row>
                </Form >
            </Container>
        )
    }
}



export default withFirebase(UserAccountDetails);



