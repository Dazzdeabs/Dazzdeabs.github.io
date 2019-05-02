import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Contact extends Component {
  // {/* Render method returns a second navbar and the bank's contact details on the screen. */}
  render () {
    return (
      <div>
      <div className='navbar2'>
      <NavLink to="/support" className="navButton"> Banking Regulations </NavLink>
      <NavLink to="/legal" className="navButton"> Legal </NavLink>
      <NavLink to="/faq" className="navButton"> FAQ </NavLink>
      <NavLink to="/contact" className="navButton"> Contact US </NavLink>
      </div>
      <div className="content">
        <div className="Payment History w3-container city">
          <h1 className="call">Contact Us</h1>
          Land-line:<div className="space">(021) 590 6625</div>
          <br/>
          <br/>
          E-mail: <div className="space">bankofthesun@something.something</div>
          <br/>
          <br/>
          Facebook:<div className="space"><a href="http://www.fabebook.com">facebook</a></div>
        </div>
      </div><br/>
      </div>
    )
  }
}

export default Contact
