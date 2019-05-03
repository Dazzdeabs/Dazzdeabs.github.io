import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';

class MyAccounts extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super()
    // {/* Initalise the local state by assigning an object to this.state. */}
    // {/* Passing an array as a value for accounts. */}
    this.state = { accounts: [] };
  }

  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
    //console.log(this.props)
    {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}
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
      {/* Calls setState() immediately in componentDidMount().
        * setSate() updates the accounts state with the account data.
        * Passing accounts object to setState().
        */}
        this.setState({accounts: accounts.data});
        //console.log(accounts);
      })();
    };

    // {/* Render method returns a second navbar and user's account(s) on the screen. */}
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
        <h1>Accounts</h1>
        {/* Renders the description of the account e.g. cheque by having access to local state by this.state. */}
        <h2>{this.state.accounts.description}</h2>
        <table>
        <thead>
        <th>Description</th>
        <th>Type</th>
        <th>Balance</th>
        <th></th>
        </thead>
        <tbody>
        {/* Maps the account description, type and balance into a table. */}
        {this.state.accounts.map(x =>
          <tr>
          <td>{x.description}</td>
          <td>{x.type}</td>
          {/* Converts the cents to rands. */}
          <td>{Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'ZAR',
          }).format(x.balance)}</td>
          {/* Upon clicking the statements button, user is redirected to statements page. */}
          <td><NavLink to={"/Statements/" + x._id} className = "button"> Statements </NavLink></td>
          </tr>
        )}
        </tbody>
        </table><br/><br/>
        </div>
        </div>
        </div>
      );
    }
  }

  export default MyAccounts
