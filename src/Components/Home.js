import React from "react";
import { NavLink } from "react-router-dom"




export default class Home extends React.Component {

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

    render() {
        return (
            <div className="position-relative" style={{ height: "100vh" }}>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <NavLink to="/login"><button type="button" className="btn btn-primary" >Login</button></NavLink>
                    <NavLink to="/register"><button type="button" className="btn btn-primary" >Register</button></NavLink>
                </div>
            </div>
        )
    }

}
