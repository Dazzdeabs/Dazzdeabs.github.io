import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSha from 'jssha';

class Payments extends Component {
// {/* The constructor for a React Component is called before it is mounted. */}
constructor(props) {
  // {/* Pass props to the constructor by super. */}
  super(props);
  // {/* Initalise the local state by assigning objects to this.state. */}
  this.state ={
    // {/* Passing an array as a value for the objects below. */}
    clients: [],
    transactions: [],
    accounts: [],
    // {/* Passing an empty string as a value for the objects below. */}
    time: '',
    type: '',
    dest: '',
    amount: '',
    src: '',
    ref: '',
  }

  {/**
  * Bind the value of the control to the currrent value of the state.
  * There must be a bound so that if there is a value and something that causes the control to re-render,
  it gets the correct value out of the state.
  */}
  this.componentDidMount=this.componentDidMount.bind(this)
  this.onChange = this.onChange.bind(this)
  this.Payment = this.Payment.bind(this)
}

// {/* Invoked immediately after a component is mounted. */}
componentDidMount() {
         // /* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */
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
           headers: { 'Authorization': 'Bearer ' + token }
         });

         (async () => {
           // {/* Retrieve clients for authenticated user. */}}
           const res = await api.get('/clients');
           {/* Calls setState() immediately in componentDidMount().
             * setSate() updates the clients state with client data.
             * Passing clients object to setState().
           */}
           this.setState({clients: res.data});
           // {/*  Retrieve accounts for specified client UUID. */}
           const acc = await api.get(`/accounts/` + this.state.clients[0]["_id"])
           {/* Calls setState() immediately in componentDidMount().
             * setSate() updates the accounts state with account data.
             * Passing accounts object to setState().
           */}
           this.setState({accounts: acc.data})
            // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
           const transactions = await api.get(`/transactions/${acc.data[0]._id}/.*`)
           {/* Calls setState() immediately in componentDidMount().
             * setSate() updates the transactions state with transactions data.
             * Passing transactions object to setState().
           */}
           this.setState({transactions: transactions.data});
           //console.log(acc);
           //console.log(res);

         })()
  }

  Payment(){
      // /* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */
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
        headers: { 'Authorization': 'Bearer ' + token }
      });

        // {/** Post a new transaction, requires a body object as below. */}
        api.post('/transactions', {
          "time": '',
          "type": 'debit',
          "src": this.state.src,
          "dest": this.state.dest,
          "amount": -(this.state.amount),
          "ref": this.state.ref,

        }).then(function (response){
          console.log(response);
        }).catch(function (error){
          console.log(error);
        });


        }

        onChange (e) {
          this.setState({[e.target.name]: e.target.value}); // or this.setState({amount: e.target.value})  only works for individual inputs
          console.log(this.state.src)
          }

        // {/* Render method returns a second navbar, textboxes and dropdown on the screen for user to perform payments. */}
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
              <div id="Once-off Payments" className="w3-container city">
                <h1>Once-off Payments</h1>
                  <div id="payments">
                    <h2> 1. Who would you like to pay? </h2>
                    <p> Select Destination Account:
                      <select className="imput"  onChange={this.onChange} name="dest">
                        <option value="">Select:</option>
                        <option value="Savings">Savings</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Debit">Debit</option>
                        <option value="Investment">Special Investment</option>
                        <option value="Credit">Credit</option>
                      </select></p>
                    <h2> 2. Payment Details </h2>
                     <p>Enter amount to pay: <input className="imput"  onChange={this.onChange} name="amount"/></p>
                     <p> Select Source Account:
                       <select className="imput" name="src" onChange={this.onChange}>
                       {this.state.accounts.map(x =>
                       <option value={x._id}> {`${x.description}`}</option>
                       )}
                       </select></p>
                     <p> Reference: <input className="imput"  onChange={this.onChange} name="ref"/></p>
              </div>
                <div className="text" >
                  <p><b>Please note</b></p>
                  <p>Your payment may take up to 24 hours to reflect on Bank of the Sun accounts, and up to 2 business days with other banks. </p>
                </div>
                <button className='button' onClick={this.Payment}>Pay</button><br/><br/>
                  </div>
                </div>
            </div>
          )
        }
      }

      export default Payments
