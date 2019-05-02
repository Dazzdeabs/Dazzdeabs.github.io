import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Legal extends Component {
  // {/* Render method returns a second navbar and the bank's legal information on the screen. */}
  render () {
    return (
      <div>
      <div className='navbar2'>
      <NavLink to="/Support" className="navButton"> Banking Regulations </NavLink>
      <NavLink to="/Legal" className="navButton"> Legal </NavLink>
      <NavLink to="/Faq" className="navButton"> FAQ </NavLink>
      <NavLink to="/Contact" className="navButton"> Contact US </NavLink>
      </div>

      <div className="content">
        <div  className="w3-container city Scheduled Payments" >
          <h1 className="legal">Legal</h1>
          We respect your privacy and personal information!<br/>This Privacy Policy governs the manner in which Bank of the Sun treats your personal information collected<br/>
          electronically when you use our website (which can be found at www.BankOfTheSun.co.za, apply online for certain products and services, contact us electronically or register<br/>
          for one of the services offered on the website. We respect your privacy and your personal information and for this reason, we take all reasonable measures, in accordance with this <br/>
          Policy, to protect your personal information and to keep it confidential, even when you are no longer our customer. We also voluntarily subscribe to the principles, outlined in Section<br/>
          51 of the Electronic Communications and Transactions Act 2002 ('ECT Act'), which govern your right to having your personal information kept private.<br/><br/>
        </div>
      </div><br/>
      </div>
    )
  }
}

export default Legal
