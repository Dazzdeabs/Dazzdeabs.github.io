import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';

class Statements extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor() {
    {/* Pass props to the constructor by super. */}
    super()
    {/* Initalise the local state by assigning objects to this.state. */}
    this.state = { account: {}, transactions: [] };
  }

  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
    {/* username and password had to be hard coded in order to view the statements of the individual accounts, if user had 1< accounts an empty table was rendered */}
    const user = 'blacktiger144';
    const password = '191919';
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
      const id = this.props.match.params.accid;
      //console.log(id);
      // {/* Retrieve clients for authenticated user. */}}
      const res = await api.get('/clients');
      // /*  Retrieve accounts for specified client UUID. */}
      const accounts = await api.get(`/accounts/${res.data[0]._id}`)
      // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
      const transactions = await api.get(`/transactions/${id}/.*`)
      for (let x = 0; x < accounts.data.length; x++) {
        // {/* If the clients ID equals the accounts ID then it calls setSate() to get data from the accounts state to show
        // the clients statatement. */}
        if (accounts.data[x]._id === id) {
          {/* Calls setState() immediately in componentDidMount().
            * setSate() updates the accounts state with the account data.
            * Passing accounts object to setState().
            */}
            this.setState({account: accounts.data[x]});
            break;
          }
        }

        {/* Calls setState() immediately in componentDidMount().
          * setSate() updates the transactions state with transactions data.
          * Passing transactions object to setState().
          */}
          this.setState({transactions: transactions.data});
          // console.log(accounts);
        })();
      };

      // {/* Render method returns a second navbar and user's transaction list on the screen. */}
      render () {
        return (
          <div>
          <div className = "navbar2">
          <NavLink to="/MyAccounts" className = "navButton"> My Accounts </NavLink>
          <NavLink to="/newAcc" className = "navButton"> New Accounts </NavLink>
          <NavLink to="/accInfo" className = "navButton"> Account Information </NavLink>
          </div>
          <div className = "content">
          <div id="payments">
          <h1>Statements</h1>
          {/* Renders the description of the account e.g. cheque, savings by having access to local state by this.state. */}
          <h2>{this.state.account.description}</h2>
          <table>
          <thead>
          <th>Date</th>
          <th>Reference</th>
          <th>Amount</th>
          <th>Balance</th>
          <th></th>
          </thead>
          <tbody>
          {/* Maps the transactions into a table. */}
          {this.state.transactions.map(x =>
            // {/* Sets the key. */}
            <tr key = {x._id}>
            {/*Formats the date from seconds into 'YYYY/MM/D'. */}
            <td>{Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }).format(x.time)}</td>
            <td>{x.ref}</td>
            {/* Converts the cents to rands. */}
            <td>{Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'ZAR',
            }).format(x.amount)}</td>
            {/* Converts the cents to rands. */}
            <td>{Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'ZAR',
            }).format(x.balance)}</td>
            </tr>
          )}
          </tbody>
          </table>
          {/* Upon clikcing the print button, the print dialog box appears on the screen. */}
          <button className = "button" onClick={() => window.print()}>Print</button>
          </div>
          </div>
          </div>
        )
      }
    }

    export default Statements
