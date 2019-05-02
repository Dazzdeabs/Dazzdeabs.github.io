import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jsSHA from 'jssha';
import axios from 'axios';
import Login from './login'


class Register1 extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super(props);
    // {/* Initalise the local state by assigning objects to this.state. */}
    this.state={
      // {/* Passing an array as a value for username and password. */}
      username: '' ,
      password: '',
    }

    {/**
      * Bind the value of the control to the currrent value of the state.
      * There must be a bound so that if there is a value and something that causes the control to re-render,
      it gets the correct value out of the state.
      */}
      this.componentDidMount=this.componentDidMount.bind(this)
    }

    // {/* Invoked immediately after a component is mounted. */}
    componentDidMount() {
      // /* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */
      const user = this.state.username;
      const password =this.state.password;
      console.log("username", user);
      console.log("password", password);
      const hmac = new jsSHA('SHA-256', 'TEXT');
      hmac.setHMACKey(password, 'TEXT');
      hmac.update(user);
      hmac.update(Date.now().toString(36).substring(0, 4));
      const token = `${hmac.getHMAC('HEX')}%${user}`;
      const api = axios.create({
        baseURL: 'http://45.77.58.134:8080',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      (async () => {
        // {/** Post a new user to the API. */}
        await api.post("/user", {
          "username": this.state.username,
          "password": this.state.password,
        })
        console.log("post user hit")
      })();
    }

    // {/* Render method returns user registration page on the screen. */}
    render () {
      return(
        <div>
          <div className="content">
            <div id="payments">
              <h1>Registration</h1>
              <h2> Fill in the Following information </h2>
            <div id="create">
              <p> Username: <input className="imput" onChange={e=>{this.setState({username: e.target.value.trim()})}} value={this.state.username} type="text" name="amount" /></p>
              <p> Password: <input className="imput" onChange={e=>{this.setState({password: e.target.value.trim()})}} value={this.state.password} type="text" name="amount" /></p>
            </div>
            <div className="text">
              <button className="button" onClick={this.componentDidMount}>Submit Registration</button><br/><br/>
            </div>
          </div>
        </div>
      </div>
      );
    }
  };

  export default Register1
