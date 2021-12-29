import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import { NavLink } from "react-router-dom";

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            errMsg: ""
        }

        this.googleLogin = this.googleLogin.bind(this)
        this.loginToAccount = this.loginToAccount.bind(this)
    }

    componentDidMount(){
        let cookies = document.cookie.split('; ')
        let email = cookies.find(element => element.search("email")>=0)
        if(email!==undefined){
            fetch('http://localhost:8000/Users')
                .then(res => res.json())
                .then(data => {
                    let found = false
                    for(let i=0;i<data.length;i++){
                        if(data[i]["Email"]===email.replace("email=","")){
                            window.location.href="http://localhost:3000/user"
                            found=true;
                            break;
                        }
                    }
                    if(!found)
                        document.cookie = 'email=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                })
        }
    }

    //gets google data checks in JSON server logins in if there is a match
    googleLogin(res){
        let userData = res['su'];
        this.setState({errMsg:""});
        fetch('http://localhost:8000/Users')
                .then(res => res.json())
                .then(data => {
                    let found = false
                    if(data.length>0){
                        for(let i=0;i<data.length;i++){
                            if(data[i]["Email"]===userData['ev']){
                                document.cookie = "email="+data[i]["Email"];
                                window.location.href = "http://localhost:3000/User"
                                found = true
                                break;
                            }
                        }
                        if(!found)
                            this.setState({errMsg:"Account does not Exist"})
                    }else{
                        this.setState({errMsg:"Account does not Exist"})
                    }
                })
                .catch(err=>console.log(err))
    }



    loginToAccount(e){
        e.preventDefault()
        this.setState({errMsg:""});
        fetch('http://localhost:8000/Users')
        .then(res => res.json())
        .then(data => {
            let found = false
            for(let i=0;i<data.length;i++){
                if((data[i]["Username"]===e.target[0].value||data[i]["Email"]===e.target[0].value)&&data[i]["Password"]===e.target[1].value){
                    document.cookie = "email="+data[i]["Email"];
                    window.location.href="http://localhost:3000/user";
                    found=true;
                    break;
                }
            }
            if(!found)
                this.setState({errMsg:"Incorrect Username or Password"});
        })
    }

    render() {
        return (
            <div className="container" style={{padding:0}}>
                <div className="d-flex p-2 justify-content-center align-items-center" style={{minHeight:"100vh"}}>
                <form className="shadow-lg p-3 bg-body rounded" onSubmit={this.loginToAccount} style={{backgroundColor:"white"}}>
                    <img src="https://d2qgo50yy98y8.cloudfront.net/public/front/img/logo.png" alt="..." style={{width:"100%",height:"100%"}}/>
                    <div className="mb-3">
                        <label htmlFor="UsernameEmail" className="form-label">Username or Email address</label>
                        <input type="text" className="form-control" id="UsernameEmail" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" required />
                    </div>
                    <a href="/login">Forgot Password?</a>
                    <br />
                    <button type="submit" className="btn btn-primary" style={{width:"50%"}}>Sign In</button>
                    <NavLink to="/register"><button className="btn btn-primary" style={{width:"50%"}}>Sign Up</button></NavLink>
                    <br />
                    <GoogleLogin
                        clientId="761997475846-rsuh4aofub91efmjnlt5dk3o3u9uuu1e.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={(res)=>this.googleLogin(res)}
                        onFailure={(res)=>console.log(res)}
                        cookiePolicy={'single_host_origin'}
                        style={{width:"100%"}}
                    />
                    <br />
                    
                    {
                        this.state.errMsg === "" ?
                            <div></div> :
                            <div className="alert alert-danger" role="alert">
                                {this.state.errMsg}
                            </div>
                    }
                </form>
                </div>
            </div>
        )
    }
}