import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import logo from './logo.jpg';
import jsSHA from 'jssha'
import axios from 'axios'

class Login extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
   {/* Pass props to the constructor by super. */}
   super(props);
   {/* Initalise the local state by assigning objects to this.state. */}
   this.state = { items: [], text: '' };
   this.state = {
     // {/* Passing an empty string as a value for username and password. */}
     username: " ",
     password: " ",
     // {/* Passing fasle as a value. */}
     subbmitted: false,
     // {/* Passing true as a value. */}
     showMe:true
   };

   {/**
   * Bind the value of the control to the currrent value of the state.
   * There must be a bound so that if there is a value and something that causes the control to re-render,
   it gets the correct value out of the state.
   */}
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.forgot = this.forgot.bind(this);
   this.doLogin = this.doLogin.bind(this);
 }

 forgot(e){
     prompt('Enter you email adress and follow the link ')
}


  render() {
    return(
<div>
<div style = {{display : 'inline-block'}}>
  <img src={logo} className="logo" />
</div>
{
  this.state.showMe?
      <div className="login-container" style={this.logStyle}>
            <input
              id="username"
              onChange={e=>(this.setState({username: e.target.value.trim()}))}
              value={this.state.username}
              />
            <input
              id="password"
              onChange={e=>(this.setState({password: e.target.value.trim()}))}
              value={this.state.password} type="password"
            />
            <button className="button" onClick={this.doLogin}> Login </button>
            <div className ="login-container" style={{textAlign: 'right' }}>
              <button className='button' onClick={this.forgot}>Forgot Password</button>
              <NavLink to="/register1" className="button"> Register </NavLink>
            </div>
      </div>
      :null
    }

    {
      !this.state.showMe?
      <div className ="login-container" style={{textAlign: 'right' }}>
        <NavLink to="/" className="button" onClick={!this.login}> Log Out </NavLink>
      </div>
    :null
  }

    <div className ="navbar">
     <NavLink to="/" className="navButton"> Home </NavLink>
     <NavLink to="/support" className="navButton"> Online Support </NavLink>
     {
       !this.state.showMe?
       <div>
         <NavLink to="/payments" className="navButton"> Payments </NavLink>
         <NavLink to="/transfers" className="navButton"> Transfers </NavLink>
         <NavLink to="/utilities" className="navButton"> Utilities </NavLink>
         <NavLink to="/MyAccounts" className="navButton"> Accounts </NavLink>
        </div>
        :null
      }
    </div>
  </div>
    )
  }


  // {/** Login method. */}
  doLogin(e){
    {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}
    const user = this.state.username;
    const password = this.state.password;
    const hmac = new jsSHA('SHA-256', 'TEXT');
    hmac.setHMACKey(password, 'TEXT');
    hmac.update(user);
    hmac.update(Date.now().toString(36).substring(0, 4));
    const token = `${hmac.getHMAC('HEX')}%${user}`;
    const api = axios.create({
      // {/** Instantiate the network request. */}
      baseURL: 'http://45.77.58.134:8080',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    (async () => {

      let res;
      try {
        // {/* Retrieve clients for authenticated user. */}
        res = await api.get('/clients');
        // {/* Stores the username and password. */}
        this.props.store({username: this.state.username, password: this.state.password})

    } catch {
        res = false;
    }
      console.log(res);

      if(res != false) {
        this.setToken();
        this.refresh = setInterval(()=> this.setToken(),1000);
            this.setState({showMe:false});
        alert('Welcome ' + user  );

      }
      else{
        alert('Incorrect username or Password. Please try again')
      }
      return(
        <div> </div>
      )

    })();
  }

  setToken(){
    const hmac = new jsSHA('SHA-256', 'TEXT');
    hmac.setHMACKey(this.state.password, 'TEXT');
    hmac.update(this.state.username);
    hmac.update(Date.now().toString(36).substring(0, 4));
    const token = `${hmac.getHMAC('HEX')}%${this.state.usrename}`;
    if(this.state.token !==token){
      this.setState({token: token});
      console.log('Update Token')
    }
  }

  // {/* A function that update text state. */}
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,

    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
}
}

export default Login
