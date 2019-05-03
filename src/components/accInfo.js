import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AccInfo extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    {/* Pass props to the constructor by super. */}
    super(props);
    {/**
      * Initalise the local state by assigning objects to this.state.
    */}
    this.state={
       // {/* Passing an empty string as a value for cheque, savings, credit and inv. */
      cheque: '',
      savings: '',
      credit: '',
      inv: '',

    }

    {/**
    * Bind the value of the control to the currrent value of the state.
    * There must be a bound so that if there is a value and something that causes the control to re-render,
    it gets the correct value out of the state.
    */}
    this.handleCheque = this.handleCheque.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCredit = this.handleCredit.bind(this);
    this.handleSpec = this.handleSpec.bind(this);
  }

  // {/* A function to update the cheque state. */}
  handleCheque () {
   this.setState(state => ({
          // {/* Popup message provides user with information about the cheque account. */}
          cheque: alert('This is all the information on the cheque account. '),
      }))
  }

  // {/* A function to update the savings state. */}
  handleSave () {
   this.setState(state => ({
          // {/* Popup message provides user with information about the savings account. */}
          savings: alert('This is all the information on the savings account. '),
      }))
  }

  // {/* A function to update the credit state. */}
  handleCredit () {
   this.setState(state => ({
          // {/* Popup message provides user with information about the credit account. */}
          credit: alert('This is all the information on the credit account. '),
      }))
  }

  // {/* A function to update the investment state. */}
  handleSpec () {
   this.setState(state => ({
          // {/* Popup message provides user with information about the investment account. */}
          inv: alert('This is all the information on the special investment account. '),
      }))
  }

  // {/* Render method returns a second navbar and buttons for information on different accounts. */}
  render () {
    return (
      <div>
      <div className='navbar2'>
      <NavLink to="/MyAccounts" className = "navButton"> My Accounts </NavLink>
      <NavLink to="/newAcc" className = "navButton"> New Account </NavLink>
      <NavLink to="/accInfo" className = "navButton"> Account Information </NavLink>
      </div>
        <center>
          <h1>Account Information</h1>
          <div className="btns">
            {/* Calls the handleChange function with the onChange event. */}
            <button id="typebtn" className ="button"type="button" onClick={this.handleCheque}>Cheque</button>
            <button id="typebtn" className ="button"type="button" onClick={this.handleSave}>Savings</button>
            <button id="typebtn" className ="button"type="button" onClick={this.handleCredit}>Credit</button>
            <button id="typebtn" className ="button"type="button" onClick={this.handleSpec}>Special Investment</button><br/><br/>
          </div>
        </center>
      </div>
    )
  }
}

export default AccInfo
