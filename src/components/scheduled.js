import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSha from 'jssha';
import moment from 'moment';

{/*This is an additionl feature that we could not get working properly, we could not convert normal time to unix time properly*/}

class Scheduled extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super(props);
    // {/* Initalise the local state by assigning objects to this.state. */}
    this.state ={
      // {/* Passing an empty string as a value for the objects below. */}
      payAmount: '',
      payName: '',
      dest: '',
      accNum: '',
      ref: '',
      time: '',
    }

    {/**
    * Bind the value of the control to the currrent value of the state.
    * There must be a bound so that if there is a value and something that causes the control to re-render,
    it gets the correct value out of the state.
    */}
    this.onChangeType = this.onChangeType.bind(this)
  }

  // {/* Updates the type state whenever the dropwdown value changes. */}
  onChangeType(event) {
    this.setState ({
      type: event.target.value
    })
  }

updateTime() {
  let unixDate = moment(this.props.time, 'YYYY.MM.DD').unix();
  console.log(unixDate)
}

  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
           {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}
           const user = 'lazymeercat116';
           const password = 'hottest';
           const hmac = new jsSha('SHA-256', 'TEXT');
           hmac.setHMACKey(password, 'TEXT');
           hmac.update(user);
           hmac.update(Date.now().toString(36).substring(0, 4));
           const token = `${hmac.getHMAC('HEX')}%${user}`;
           const api = axios.create({
             // {/** Instantiate the network request. */}
             baseURL: 'http://45.77.58.134:8080',
             headers: { 'Authorization': 'Bearer ' + token }
           })


            (async () => {
              // {/* Retrieve clients for authenticated user. */}}
             const res = await api.get('/clients');
             {/* Calls setState() immediately in componentDidMount().
               * setSate() updates the clients state with the client data.
               * Passing cleint object to setState().
             */}
             this.setState({clients: res.data});
             // {/*  Retrieve accounts for specified client UUID. */}
              const accounts = await api.get(`/accounts/` + this.state.clients[0]["_id"])
              {/* Calls setState() immediately in componentDidMount().
                * setSate() updates the accounts state with the account data.
                * Passing accounts object to setState().
              */}
             this.setState({accounts: accounts.data});
             const transactions = await api.get(`/transactions/${accounts.data[0]._id}/.*`)
             {/* Calls setState() immediately in componentDidMount().
               * setSate() updates the transfers state with transfers data.
               * Passing transactions object to setState().
             */}
             this.setState({transfers: transactions.data});
             {/* Calls setState() immediately in componentDidMount().
               * setSate() updates the time state with time data.
               * Passing time object to setState().
             */}
             this.setState({time: moment(this.state.time,
           )})
            // console.log(this.state.time)
        }
    )}


            makePayment () {
            {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}
            const user = this.props.username; //'blackfish787';
            const password = this.props.password; //'lestat';
            const hmac = new jsSha('SHA-256', 'TEXT');
            hmac.setHMACKey(password, 'TEXT');
            hmac.update(user);
            hmac.update(Date.now().toString(36).substring(0, 4));
            const token = `${hmac.getHMAC('HEX')}%${user}`;
            const api = axios.create({
              // {/** Instantiate the network request. */}
              baseURL: 'http://45.77.58.134:8080',
              headers: { 'Authorization': 'Bearer ' + token } });

             // {/** Post a new transaction, requires a body object as below. */}
             api.post('/transactions', {
              time: this.state.time,
               type: this.state.type,
               // src: accounts.data[0]._id,
               dest: this.state.dest,
               amount:this.state.amount,
               ref:this.state.ref,
             }).then(function (response) {
               console.log(response);
             });
};

// {/* Render method returns a second navbar, textboxes and a dropdown on the screen for user to make a scheduled payment. */}
  render () {
    return (
      <div>
        <div className="navbar2">
          <NavLink to="/payments" className="navButton"> Once-off Payments </NavLink>
          <NavLink to="/scheduled" className="navButton"> Scheduled Payments </NavLink>
          <div className = "dropdown">
            <button className = "dropbtn"> Pay Beneficiary <i className = "fa fa-caret-down"></i></button>
          <div className = "dropdown-content">
          <NavLink to="/beneficiary" className="navButton"> Add New Beneficiary </NavLink>
          <NavLink to="/existing" className="navButton"> Existing Beneficiaries </NavLink>
        </div>
        </div>
          <NavLink to="/history" className="navButton"> Payment History </NavLink>
        </div>

        <div className="content">
          <div id="Scheduled Payments" className="w3-container city">
            <h1>Scheduled Payments</h1>

            <div id="payments">
            <h2> 1. Scheduled Payment Details </h2>
               Payment Amount: <input className="imput" onChange={e=>{this.setState({payAmount: e.target.value.trim()})}} value={this.state.payAmount} />
              <p> Scheduled Payment Name: <input className="imput" onChange={e=>{this.setState({payName: e.target.value.trim()})}} value={this.state.payName} /></p>
            <h2> 2. Beneficiary Details </h2>
            <p> Enter Name: <input className="imput" onChange={e=>{this.setState({dest: e.target.value.trim()})}} value={this.state.dest} /></p>
            <p> Account Type:
              <select className="imput" value={this.state.type} onChange={this.onChangeType}>
                <option value="">Select:</option>
                <option value="Savings">Savings</option>
                <option value="Cheque">Cheque</option>
                <option value="Debit">Debit</option>
                <option value="Investment">Special Investment</option>
                <option value="Credit">Credit</option>
              </select></p>
              <p> Account Number: <input className="imput" onChange={e=>{this.setState({accNum: e.target.value.trim()})}} value={this.state.accNum} /></p>
              <p> Reference: <input className="imput"  onChange={e=>{this.setState({ref: e.target.value.trim()})}} value={this.state.ref} /></p>
              <h2> 3. Scheduled Payment Dates </h2>
              <p> To Date: <input className="imput" type="date" onChange={e=>{this.setState({time: e.target.value})}} value={this.state.time} /></p>
          </div>

            <div className="text">
              <p><b>Please note</b></p>
              <p>Your payment may take up to 24 hours to reflect on Bank of the Sun accounts, and up to 2 business days with other banks. </p>
                    <button className='button' onClick={e=>console.log(this.state)}>Pay</button><br/><br/>
            </div>
            </div>
          </div>
        </div>


    )
  }
}

export default Scheduled
