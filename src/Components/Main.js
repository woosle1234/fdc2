import React,{ Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import User from "./User";

export default class Main extends Component{


    render(){
        return(
            <Router>
                <Routes>
                    <Route exact path="/User" element={<User />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </Router> 
        )
    }
}