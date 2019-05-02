import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.jpg';

class Navigation extends Component {
  // {/* Render method returns a logo and navbar. */}
  render () {
    return (
      <div>
      <header>
      <div style ={this.divStyle}>
        <img src={logo} className="logo" />
      </div>
      </header>
     <div className = "navbar">
     <NavLink to="/" className="Button"> Home </NavLink>
     <NavLink to="/support" className="Button"> Online Support </NavLink>
     <NavLink to="/payments" className="Button"> Payments </NavLink>
     <NavLink to="/transfers" className="Button"> Transfers </NavLink>
     <NavLink to="/utilities" className="Button"> Utilities </NavLink>
     <NavLink to="/MyAccounts" className="Button"> Accounts </NavLink>
      </div>
      </div>
    )
  }
}

export default Navigation
