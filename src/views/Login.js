import React from "react";
import { withFirebase } from "../controller"
// import "../shards-dashboard/styles/bootstrap.min.css"
// import "../shards-dashboard/styles/fontawesome-all.min.css"
import "../shards-dashboard/styles/iofrm-style.css"
import "../shards-dashboard/styles/iofrm-theme4.css"
import graphic1 from "../shards-dashboard/images/graphic1.svg"

import {Form} from "shards-react"

const INITIAL_STATE = {
  email: "",
  password: ""
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            ...INITIAL_STATE
        }
    }
  
    handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.state
        const {controller} = this.props
        console.log(this.props)
        if(this.emailValidation(email)) {
          controller.login(email, password).then((us) => {
            console.log("Successfulley autherised for accesing");
            console.log(this.props)
            this.props.history.push('/home')
          }).catch(err => {
            let code = err.log.code
            console.log(err)
            if(code === "auth/user-not-found") alert("Email not in database/ Please register")
            else if(code === "auth/wrong-password") alert("Please check your password")
            else alert("Some unknown error occoured, msg" + err.code, err.message)
          })
        } else {
          alert("Email badly Formatted")
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    emailValidation = () => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.email.match(mailformat)) {
            return true
        }
        else {
            return false
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
        console.log(this.props.controller)
        return (
            
            <div className="form-body" style={{"height": "100vh"}}>
        <div className="website-logo">
            <a href="index.html">
                {/* <div className="logo">
                    <img className="logo-size" src={logoLight} alt="" />
                </div> */}
                  <img className="logo-size" src={require("../images/avatars/0.jpg")} alt="Odinub Logo" />
            </a>
        </div>
        <div className="row">
            <div className="img-holder">
                <div className="bg"></div>
                <div className="info-holder">
                    <img src={graphic1} alt="" />
                </div>
            </div>
            <div className="form-holder">
                <div className="form-content">
                    <div className="form-items">
                        <h3>Odinub/Dashboard Login</h3>
                        <p>Access to the Your Personalized Attendance Dashboard.</p>
                        <div className="page-links">
                            <a href="/login" className="active">Login</a>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <input className="form-control" onChange={this.handleChange} type="text" name="email" placeholder="E-mail Address" required />
                            <input className="form-control" onChange={this.handleChange} type="password" name="password" placeholder="Password" required />
                            <div className="form-button">
                                <button id="submit" onChange={this.onChange} type="submit" className="ibtn">Login</button> <a href="forget4.html">Forget password?</a>
                            </div>
                        </Form>
                        <div className="other-links">
                            <span>About Odinub</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        )
    }
}

export default withFirebase(Login)



