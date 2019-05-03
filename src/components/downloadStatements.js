import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jsSHA from 'jssha';
import axios from 'axios'


 class downloadStatements extends Component {
   // {/* The constructor for a React Component is called before it is mounted. */}
   constructor(props) {
     {/* Pass props to the constructor by super. */}
     super(props);
     {/* Initalise the local state by assigning an object to this.state. */}
     this.state={
       // {/* Passing an empty string as a value for fromDate and toDate. */}
       //fromDate: " ",
       //toDate: " ",
     }
   }

     // {/* Invoked immediately after a component is mounted. */}
     componentDidMount() {
           const user = 'beautifulmouse787';
           const password = 'yogibear';
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
         }

  // {/* Render method returns a second navbar and date pickers on the screen so user can view a statement based on a specific date period. */}
   render () {
     return (
       <div>
       <div className="navbar2">
         <NavLink to="/MyAccounts" className = "navButton"> My Accounts </NavLink>
         <NavLink to="/newAcc" className = "navButton"> New Accounts </NavLink>
         <NavLink to="/myCards" className = "navButton"> My Cards </NavLink>
         <NavLink to="/accInfo" className = "navButton"> Account Information </NavLink>
       </div>
         <div className="content">
         <div id="payments">
           <h1 style={this.h1Style}>Download Statements</h1>
           {/** Upon clicking the cancel button, user is redirected to the My Accounts page. */}
           <NavLink to="/MyAccounts" className="button"> Cancel </NavLink>
           <div>
           </div>
           {/** Upon clicking the logout button, user is redirected to the My Accounts page. */}
           <NavLink to="/" className="button" > Logout </NavLink>
       </div>
     </div>
     </div>
   );
   }
}

 export default downloadStatements
