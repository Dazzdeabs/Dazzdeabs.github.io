import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './footer';
import Airtime from './Airtime';
import SMS from './sms';
import jsSHA from 'jssha';
import axios from 'axios';
import Utilities from "./utilities";

class Data  extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super(props);
    // {/* Initalise the local state by assigning an object to this.state. */
    this.state={
      // {/* Passing a 0 as a value for amount. */}
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
           const acc = await api.get(`/accounts/${res.data[0]._id}`)
           // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
           let trans = await api.get(`/transactions/${acc.data[0]._id}/.*`)

           // {/** P  ost a new transaction, requires a body object as below. */}
           await api.post("/transactions", {
             "type": "Data",
             "src": acc.data[0]._id,
             "dest": acc.data[0]._id,
             "amount": -(this.state.amount),
             "ref": "Data"
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

       onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.src);
        }

// {/* Render method returns a second navbar, textboxes and a dropdown on the screen for user to make a scheduled payment. */}
  render () {
    return (
      <div>
        <Utilities/>
                <div className="content">
                  <div id="payments">
                    <div className="green box">
                       <p> Choose a Recharge Amount:
                       <select className="imput" value={this.state.amount} onChange={this.selectFrom}>
                          <option value="">Select:</option>
                          <option value="30">30 SMSs at R10.00</option>
                          <option value="17">50 SMSs at R17.00</option>
                          <option value="30">100 SMSs at R30.00</option>
                          <option value="50">200 SMSs at R50.00</option>
                          <option value="75">300 SMSs at R75.00</option>
                          <option value="114">500 SMSs at R114.00</option>
                          <option value="420">2000 SMSs at R420.00</option>
                        </select>
                       </p>
                     </div>
                     {/* ComponentDidMount() renders user input to API. */}
                    <button className='button' onClick={this.componentDidMount}>Buy</button><br/><br/>
                </div>
              </div>
          </div>
    )
  }
}

export default Data
