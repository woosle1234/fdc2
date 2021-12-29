import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import { NavLink } from "react-router-dom";




export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            errorMsg: "",
            Created: false
        }

        this.saveData = this.saveData.bind(this)
        this.validateData = this.validateData.bind(this)
        this.checkGoogle = this.checkGoogle.bind(this)

    }

    //gets google info
    checkGoogle(res) {

        this.setState({ errorMsg: "" });
        let userData = res['su'];

        document.getElementById("FirstName").value = userData['FX'];
        document.getElementById("LastName").value = userData['UV'];
        document.getElementById("Email").value = userData['ev'];

    }


    //checks if the data is correct then sends the data to the JSON server
    validateData(formData) {
        if (formData["Password"] === formData["ConfirmPassword"]) {
            this.setState({ errorMsg: "" })
            fetch('http://localhost:8000/Users')
                .then(res => res.json())
                .then(data => {
                    let found = false
                    if (data.length > 0){
                        for (let i = 0; i < data.length; i++) {
                            if (data[i]['Email'] === formData['Email']) {
                                found = true
                                this.setState({ errorMsg: "Account Already Exists" });
                                break
                            } else if (data[i]['Username'] === formData['Username']) {
                                found = true
                                this.setState({ errorMsg: "Username Taken" });
                                break;
                            }
                        }
                    }
                    if(!found){
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        };
                        fetch('http://localhost:8000/Users', requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({ Created: true })
                                console.log(data);
                            }).catch(err=>console.log(err))
                    }
                }).catch(err=>console.log(err))

        }
        else {
            this.setState({ errorMsg: "Passwords Do Not Match" })
            return false
        }
    }

    saveData(e) {
        e.preventDefault();
        this.setState({ Created: false })
        let formData = {
            FirstName: e.target[0].value.trim(),
            LastName: e.target[1].value.trim(),
            Username: e.target[2].value.trim(),
            Password: e.target[3].value.trim(),
            ConfirmPassword: e.target[4].value.trim(),
            Email: e.target[5].value.trim(),
            PhoneNumber: e.target[6].value.trim(),
            UserType: e.target[7].value.trim(),
            Status: e.target[8].value.trim()
        }
        this.validateData(formData)

    }


    render() {
        return (
            <div className="container" style={{padding:0}}>
                <div className="d-flex p-2 justify-content-center align-items-center" style={{margin:"auto",minHeight:"100vh"}}>
                <form className="shadow-lg p-3 bg-body rounded" onSubmit={this.saveData} style={{backgroundColor:"white"}}>
                    <div className="mb-3">
                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input type="text" pattern="[a-zA-Z]*" className="form-control" id="FirstName" title="Letters Only" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input type="text" pattern="[a-zA-Z]*" className="form-control" id="LastName" title="Letters Only" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="Username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="ConfirmPassword" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="Email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="PhoneNumber" className="form-label">Phone Number(optional)</label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" id="PhoneNumber" aria-describedby="telHelp" />
                        <div id="telHelp" className="form-text">(xxx)-xxx-xxxx</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="UserType" className="form-label">User Type</label>
                        <select className="form-select" aria-label="Default select example" defaultValue="" id="UserType" required>
                            <option value="" disabled hidden>User Type</option>
                            <option value="Student">Student</option>
                            <option value="Applicant">Applicant</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Faviliator">Faciliator</option>
                            <option value="Mentor">Mentor</option>
                            <option value="Expert">Expert</option>
                            <option value="Recent Grad">Recent Grad</option>
                            <option value="Employee">Employee</option>
                            <option value="Employer">Employer</option>
                            <option value="Job Seeker">Job Seeker</option>
                            <option value="Intrapreneur">Intrapreneur</option>
                            <option value="AspiringEntrepreneur">Aspiring Entrepreneur</option>
                            <option value="Learner">Learner</option>
                            <option value="Innovator">Innovator</option>
                            <option value="Startup">Startup</option>
                            <option value="Evaluator">Evaluator</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Status" className="form-label">Status</label>
                        <select className="form-select" aria-label="Default select example" id="Status" defaultValue="" required>
                            <option value="" disabled hidden>Status</option>
                            <option value="LookingToMentorProjects">Looking to Mentor Projects</option>
                            <option value="LookingToJoinATeam">Looking to Join a Team</option>
                            <option value="LookingForTeammates">Looking for Teammates</option>
                            <option value="LookingToInvest">Looking to Invest</option>
                            <option value="LookingForEmployees">Looking for Employees</option>
                            <option value="LookingForEmployers">Looking for Employers</option>
                            <option value="LookingToBuildSkills">Looking to Build Skills</option>
                            <option value="LookingToLearn">Looking to Learn</option>
                            <option value="LookingToSolveProblems">Looking to Solve Problems</option>
                            <option value="LookingToCreateSocialImpact">Looking to Create Social Impact</option>
                            <option value="LookingForInvestors">Looking for Investors</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Register</button>
                    <br />
                    <GoogleLogin
                        clientId="761997475846-rsuh4aofub91efmjnlt5dk3o3u9uuu1e.apps.googleusercontent.com"
                        buttonText="Fill Forms with Google"
                        onSuccess={(res) => this.checkGoogle(res)}
                        onFailure={(res) => this.setState({ errorMsg: "Google Error" })}
                        cookiePolicy={'single_host_origin'}
                        style={{width:"100%"}}
                    />
                    <br />
                    <NavLink to="/login"><button className="btn btn-primary" style={{width:"100%"}}>Sign in to Existing Account</button></NavLink>

                    {
                        this.state.errorMsg === "" ?
                            <div></div> :
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                    }
                    {
                        this.state.Created ?
                            <div className="alert alert-success" role="alert">
                                Account Created!
                            </div> : <div></div>
                    }

                </form>
                </div>
            </div>
        )
    }
}