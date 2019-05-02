import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';

class History extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor() {
  // {/* Pass props to the constructor by super. */}
  super()
  // {/* Initalise the local state by assigning objects to this.state. */}
  this.state = {
  account: {},
  // {/* Passing an array as a value for transactions. */}
  transactions: [] };
}

  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
    {/* Global username and password fetches the payment history only if the user has 1 account, otherwise the table is empty because of an issue with the accounts unique id. */}
    {/*If the user has more than 1 account, the table is empty but the payment history is rendered in the console*/}
    const user = this.props.username; //'blackfish787';
    const password = this.props.password; //'lestat';
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
      const accounts = await api.get(`/accounts/${res.data[0]._id}`)
      // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
      const transactions = await api.get(`/transactions/${accounts.data[0]._id}/.*`)
      // {/*  Declare a payements array. */}
      const payments = [];
      await transactions.data.map(x => {
      // {/*  If the transaction type is a payment, populate the payements array with it. */}
      if (x.type === 'payment') {
         payments.push(x);
      }
      });

      {/* Calls setState() immediately in componentDidMount().
      * setSate() updates the account state with account data.
      * setSate() updates the transactions state with payments data.
      * Passing account and transactions objects to setState().
      */}
      this.setState({
        account: accounts.data[0],
        transactions: payments});
        console.log(transactions);
        })();
        };

      // {/* Render method returns a second navbar and user's payment history on the screen. */}
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
           <div id="Payment History" className="w3-container city">
            <h1>Payment History</h1>
              <table>
                <thead>
                  <th>Date</th>
                 <th>Time</th>
                 <th>Type</th>
                 <th>Amount</th>
                 <th>Ref</th>
               </thead>
              <tbody>
                {/* Maps the transactions time, type, amount and reference into a table. */}
                {this.state.transactions.map(x =>
                  // {/* Sets the key. */}
                  <tr key = {x._id}>
                    {/*Formats the date from seconds into 'YYYY/MM/D'. */}
                    <td>{Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      }).format(x.time)}</td>
                    {/*Formats the date from seconds into 'YYYY/MM/D'. */}
                    <td>{Intl.DateTimeFormat('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                      }).format(x.time)}</td>
                  <td>{x.type}</td>
                  {/* Converts the cents to rands. */}
                  <td>{Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: 'ZAR'
                      }).format(x.amount)}</td>
                <td>{x.ref}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div><br/>
      </div>
    )
  }
}

export default History
