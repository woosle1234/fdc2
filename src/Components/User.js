import React,{ Component } from "react";

export default class User extends Component {

    constructor(props){
        super(props)

        this.state={
            userData: []
        }

        this.logout = this.logout.bind(this);
    }

    //Checks if the user is logged in otherwise sends them back to login page
    componentDidMount(){
        let cookies = document.cookie.split('; ')
        let email = cookies.find(element => element.search("email")>=0)
        if(email===undefined){
            window.location.href = "http://localhost:3000/login"
        }else{
            fetch('http://localhost:8000/Users')
                .then(res => res.json())
                .then(data => {
                    for(let i=0;i<data.length;i++){
                        if(data[i]["Email"]===email.replace("email=","")){
                            this.setState({userData:JSON.stringify(data[i],null,2)})
                            break;
                        }
                    }
                })
        }
        
    }

    //deletes login cookie
    logout(e){
        e.preventDefault()
        document.cookie = 'email=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "http://localhost:3000/"
    }

    render(){
        return(
            <div>
                Logged In
                <br />
                <pre>{this.state.userData}</pre>
                <button className="btn btn-danger" onClick={this.logout}>Logout</button>
            </div>
        )
    }
}