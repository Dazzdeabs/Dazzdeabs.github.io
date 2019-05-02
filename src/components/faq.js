import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Faq extends Component {
  // {/* Render method returns a second navbar and answers to FAQ on the screen. */}
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
        <div className="Pay Beneficiaries w3-container city">
          <h1>FAQ</h1>
          <br/>
          What is Bank of the Sun?<br/>
          Bank of the Sun is a bank that offers cheque accounts, credit cards, savings accounts and investment services.<br/>
          Internet banking is supported through the website.<br/>
          Our vision is to give everyone in the world the opportunity to enjoy a healthy financial life.<br/><br/>

          What products do you offer?<br/>
          At the moment, we offer four types of bank accounts: cheque accounts, credit cards, savings accounts and investment accounts.<br/><br/>

          What about my information? Is that safe?<br/>
          The protection and security of your personal data is of paramount importance to us. We use advanced data<br/>
          encryption and storing technologies that ensure your personal information and transactions are sent and <br/>
          stored securely. Our privacy notice provides more information on what data we collect and how it gets used.<br/><br/>

          Can I use my card overseas and will I be charged?<br/>
          The Bank of the Sun card is the ultimate travel buddy — welcome anywhere you see the Mastercard acceptance logo.<br/>

          Take a look at our pricing policy for more info: www.BankOfThe Sun.com/legal/<br/><br/>
        </div>
      </div><br/>
      </div>
    )
  }
}

export default Faq
