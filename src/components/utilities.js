import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './footer';
import Airtime from './Airtime';
import SMS from './sms';
import Data from './data';
import jsSHA from 'jssha';
import axios from 'axios';


class Utilities  extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
    super(props);
    // {/* Initalise the local state by assigning objects to this.state. */}
    this.state={
      // {/* Passing an empty string as a value for objects below. */}
      src:'',
      dest: '',
      amount: 0,
      ref: '',
      // {/* Passing an array as a value for objects below. */}
      clients: [],
      accounts: [],
      transactions: [],
      // {/* Passing an empty string as a value for account. */}
      account: '',
      type:'',
    }
    // {/**
    // * Bind the value of the control to the currrent value of the state.
    // * There must be a bound so that if there is a value and something that causes the control to re-render,
    // it gets the correct value out of the state.
    // */}
    this.componentDidMount=this.componentDidMount.bind(this)
    this.makePayment = this.makePayment.bind(this)

  }

  // {/* Invoked immediately after a component is mounted. */}
   componentDidMount() {
         {/* Props is used to pass the username and password down the component tree from the parent (App.js) to child (MyAccounts.js) */}

         const user ='blackfish787'//{this.props.user}
         const password ='lestat'//{this.props.password}
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
           this.setState({clients: res.data});
           // {/*  Retrieve accounts for specified client UUID. */}
           const acc = await api.get(`/accounts/` + this.state.clients[0]["_id"])
           this.setState({accounts: acc.data})
         })()
       }

         makePayment(){
           const user ='blackfish787'//{this.props.user}
           const password ='lestat'//{this.props.password}
           const hmac = new jsSHA('SHA-256', 'TEXT');
           hmac.setHMACKey(password, 'TEXT');
           hmac.update(user);
           hmac.update(Date.now().toString(36).substring(0, 4));
           const token = `${hmac.getHMAC('HEX')}%${user}`;
           const api = axios.create({
             // {/** Instantiate the network request. */}
             baseURL: 'http://45.77.58.134:8080',
             headers: { 'Authorization': 'Bearer ' + token }});


             (async () => {
             try {
               // {/* Retrieve clients for authenticated user. */}}
               const res = await api.get('/clients');
               // {/* Calls setState() immediately in componentDidMount().
               //   * setSate() updates the clients state with client data.
               //   * Passing clients object to setState().
               // */}
               this.setState({clients: res.data});
               // {/*  Retrieve accounts for specified client UUID. */}
               const acc = await api.get(`/accounts/` + this.state.clients[0]["_id"])
               // /* Calls setState() immediately in componentDidMount().
               //   * setSate() updates the accounts state accounts data.
               //   * Passing accounts object to setState().
               // */}
               this.setState({accounts: acc.data})
               // {/*  Retrieves all( .*) transactions for given accounts based on the clients ID. */}
               const tras = await api.get('/transactions');
               // {/* Calls setState() immediately in componentDidMount().
               //   * setSate() updates the transactions state with the transactions data.
               //   * Passing transactions object to setState().
               // */}
               this.setState({transactions: tras.data})

               // {/** Post a new transaction, requires a body object as below. */}
             api.post('/transactions', {
               time: this.state.time,
               type: 'credit',
               dest: this.state.src,
               src: this.state.dest,
               amount: -(this.state.amount),
               ref: this.state.ref,
             }).then(function (response){
               console.log(response);
             }).catch(function (error){
               console.log(error);
             });
           }


         catch {
           console.log('error')
           alert('error')
         }
       })()

       }

// {/* Render method returns a second navbar and dropdowns for the account type and utility choice on the screen. */}
  render () {
    return (
      <div>

      <div className="navbar2">
        <NavLink to="/utilities" className="navButton"> Airtime and Bundles </NavLink>
        <NavLink to="/buyElectricity" className="navButton"> Electricity </NavLink>
        </div>
          <div className="content">
              <div id="payments">
                <div id="Airtime and Bundles" className="w3-container city" >
                  <h1>Airtime and Bundles</h1>
                    <h2> 1. Accounts </h2>
                    <p> Select the source account:
                      <select className ='imput' onChange={this.onChange}>
                         {this.state.accounts.map(x =>
                         <option key={x._id}>{`${x.description}`}</option>
                       )}
                       </select></p>
                     <h2> 2. Details </h2>
                    <NavLink to="/airtime" className="button"> Airtime </NavLink>
                    <NavLink to="/data" className="button"> Data </NavLink>
                    <NavLink to="/sms" className="button"> SMS </NavLink> <br/><br/>
          </div>
          </div>
          </div>
          </div>
    )
  }
  }
export default Utilities
