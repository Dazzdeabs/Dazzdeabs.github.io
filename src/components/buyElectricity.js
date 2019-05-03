import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jsSHA from 'jssha';
import axios from 'axios';

class Electricity extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    {/* Pass props to the constructor by super. */}
    super(props);
    {/* Initalise the local state by assigning an object to this.state. */}
    this.state={
      // {/* Passing an 0 as a value for amount. */}
      amount: 0,
    }

    {/**
    * Bind the value of the control to the currrent value of the state.
    * There must be a bound so that if there is a value and something that causes the control to re-render,
    it gets the correct value out of the state.
    */}
    this.selectFrom = this.selectFrom.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  // {/* Invoked immediately after a component is mounted. */}
  componentDidMount() {
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
           // /*  Retrieve accounts for specified client UUID. */}
           const acc = await api.get(`/accounts/${res.data[0]._id}`)
           // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
           let trans = await api.get(`/transactions/${acc.data[0]._id}/.*`)

           // {/* Post a new transaction, requires a body object as below. */
           await api.post("/transactions", {
             "type": 'Electricity',
             "src": acc.data[0]._id,
             "dest": acc.data[0]._id,
             "amount": this.state.amount,
             "ref": 'Electricity'
             });
           // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
           trans = await api.get(`/transactions/${acc.data[0]._id}/.*`)
           console.log(trans);
         })();
       }

       selectFrom (event) {
         this.setState ({
           amount: event.target.value
         })
       }



  // {/* Render method returns a second navbar and a dropwdown on the screen for user to select the amount of electricity to buy. */}
  render () {
    return (
      <div>
      <div className="navbar2">
        <NavLink to="/utilities" className="navButton"> Airtime and Bundles </NavLink>
        <NavLink to="/buyElectricity" className="navButton"> Electricity </NavLink>
        </div>
      <div className="content">
        <div id="payments">
          <div id="Electricity" className="w3-container city" >
            <h1>Electricity</h1>
            <form action="/action_page.php" >
              <h2> 1. Details </h2>
              <p> Choose Recharge Amount:
                <select className="imput" value={this.state.amount} onChange={this.selectFrom}>
                  <option value="">Select:</option>
                  <option value="Savings Account">R30.00</option>
                  <option value="Student Account">R50.00</option>
                  <option value="Savings Account">R100.00</option>
                  <option value="Business Account">R150.00</option>
                  <option value="Savings Account">R300.00</option>
                  <option value="Business Account">R500.00</option>
                  <option value="Savings Account">R1000.00</option>
                </select></p>
            </form>
            <button className='button' onClick={this.componentDidMount}>Buy</button><br/><br/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Electricity
