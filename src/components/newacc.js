import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jsSHA from 'jssha';
import axios from 'axios'

class Newacc extends Component {
// {/* The constructor for a React Component is called before it is mounted. */}
constructor(props) {
  {/* Pass props to the constructor by super. */}
  super(props);
  {/* Initalise the local state by assigning objects to this.state. */}
  this.state={
    // {/* Passing an 0 as a value for balance. */}
    balance: 0,
    // {/* Passing an empty string as a value for id, client, description and type. */}
    _id: '',
    client: '',
    description: '',
    type: '',
  }

  {/**
  * Bind the value of the control to the currrent value of the state.
  * There must be a bound so that if there is a value and something that causes the control to re-render,
  it gets the correct value out of the state.
  */}
  this.onChangeAcc=this.onChangeAcc.bind(this)
  this.componentDidMount=this.componentDidMount.bind(this)
}

// {/* Invoked immediately after a component is mounted. */}
componentDidMount() {
          {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}
          const user = this.props.username //'lazymeercat116';
          const password = this.props.password //'hottest';
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
            // {/* Retrieve clients for authenticated user. */}}
            const res = await api.get('/clients');
            // {/*  Retrieve accounts for specified client UUID. */}
            const acc = await api.get(`/accounts/${res.data[0]._id}`)


            const newacc = await api.post('/apply', {
              "_id": acc.data[0]._id,
              "balance": acc.data[0].balance,
              "client": acc.data[0].client,
              "description": acc.data[0].description,
              "type": this.state.type,
            })

            console.log(acc)
          })();
        };

// {/* Updates the type state whenever the dropwdown value changes. */}
onChangeAcc(event) {
  this.setState({
    type: event.target.value
  })
}

// {/* Updates the bank state whenever the dropwdown value changes. */}
// onChangeTitle(event) {
//   this.setState({
//     title: event.target.value
//   })
// }

  // {/* Render method returns a second navbar and a dropdown on the screen for the user to create a new account. */}
  render () {
    return (
      <div>
      <div className='navbar2'>
      <NavLink to="/MyAccounts" className = "navButton"> My Accounts </NavLink>
      <NavLink to="/newAcc" className = "navButton"> New Account </NavLink>
      <NavLink to="/accInfo" className = "navButton"> Account Information </NavLink>
      </div>
      <div className = "content">
        <div id="payments">
          <h1>Create a New Account</h1>
          <div className="create">
            <h2> Accounts </h2>
            <p>
              <select className="imput" value={this.state.type} onChange={this.onChangeAcc}>
                <option value="">Select Account</option>
                <option value="Cheque">Cheque</option>
                <option value="Savings">Savings</option>
                <option value="Credit">Credit</option>
                <option value="Special Investment">Special Investment</option>
              </select>
              </p>
            <div className="register">
            </div>
          </div>
          <div className="text">
            {/* ComponentDidMount() renders user input to API. */}
            <button className="button" onClick={this.componentDidMount}>Submit Application</button><br/><br/>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Newacc
