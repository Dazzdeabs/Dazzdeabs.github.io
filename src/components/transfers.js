import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jsSha from 'jssha';
import axios from 'axios';
import Login from './login'

class Transfers extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super(props);
    // {/* Initalise the local state by assigning objects to this.state. */}
    this.state={
      // {/* Passing an empty string as a value for the objects below. */}
      amount: '',
      ref: '',
      dest: '',
      src: '',
      type:'',
      time: '',
      // {/* Passing an array as a value for the objects below. */}
      accounts:[],
      clients: [],
      transactions: [],
    }

    {/**
    * Bind the value of the control to the currrent value of the state.
    * There must be a bound so that if there is a value and something that causes the control to re-render,
    it gets the correct value out of the state.
    */}
    this.onChange=this.onChange.bind(this)
    this.Payment=this.Payment.bind(this)
  }


  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
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
             headers: { 'Authorization': 'Bearer ' + token }
           });

           (async () => {
             // {/* Retrieve clients for authenticated user. */}}
             const res = await api.get('/clients');
             {/* Calls setState() immediately in componentDidMount().
               * setSate() updates the clients state with the client data.
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
           })()
    }


    Payment(){
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
          headers: { 'Authorization': 'Bearer ' + token }
        });

         // {/** Post a new transaction, requires a body object as below. */}
         api.post('/transactions', {
             time: '',
             type: 'debit',
             src: this.state.src,
             dest: this.state.dest,
             amount: -(this.state.amount),
             ref: this.state.ref,
             });

           // {/** Post a new transaction, requires a body object as below. */}
           api.post('/transactions', {
              time: '',
              type: 'credit',
              src: this.state.dest,
              dest: this.state.src,
              amount: this.state.amount,
              ref: this.state.ref,
              })
         };


 onChange(e){
  this.setState({[e.target.name]: e.target.value});
  console.log(this.state.src);
}

// {/* Render method returns a second navbar, textboxes and a dropdown on the screen for user to make an inter-account transfer. */}
  render () {
    return (
      <div>
      <div className="navbar2">
        <NavLink to="/transfers" className="navButton"> Inter-Account Transfers </NavLink>
        </div>
        <div className="content">
        <div id="payments">
          <h1 style={this.h1Style}>Inter-Account Transfers</h1>
            <h2> 1. Accounts </h2>
            <p> Account From:  </p>
              <select className="imput" name="src"  onChange={this.onChange}>
              {this.state.accounts.map(x =>
                <option value={x._id}>{`${x.description}`}</option>
              )}
              </select>
              <p> Account To:  </p>
                <select className="imput" name="dest"  onChange={this.onChange}>
                {this.state.accounts.map(x =>
                  <option value={x._id}>{`${x.description}`}</option>
                )}
                </select>
            <h2> 2. Amount </h2>
            <p> Enter amount to transfer: <input className="imput" onChange={this.onChange} name="amount" /></p>
            <h2> 3. References </h2>
            <p> To Reference: <input className="imput" onChange={this.onChange} name="ref" /></p>
            <p><b>Please note</b></p>
            <p>Your transfer may take up to 24 hours to reflect in your account.</p>
            <button className='button' onClick={this.Payment}>Transfer</button><br/><br/>
      </div>
    </div>
    </div>
    )
  }
}

 export default Transfers
