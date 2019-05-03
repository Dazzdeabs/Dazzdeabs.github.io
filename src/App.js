import React, { Component } from 'react';
import './styleSheet.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from './components/home';
import Support from './components/support';
import Error from './components/error';
import Navigation from './components/navigation';
import Login from './components/login';
import Payments from './components/payments';
import Transfers from './components/transfers';
import Utilities from './components/utilities';
import MyAccounts from './components/MyAccounts';
import Newacc from './components/newacc';
import AccInfo from './components/accInfo';
import Statements from './components/Statements';
import History from './components/history';
import Beneficiary from './components/beneficiary';
import Scheduled from './components/scheduled';
import Existing from './components/existing';
import downloadStatements from './components/downloadStatements';
import printStatements from './components/printStatements';
import Electricity from './components/buyElectricity';
import Footer from './components/footer';
import Legal from './components/legal';
import Faq from './components/faq';
import Contact from './components/contact';
import Airtime from './components/Airtime';
import SMS from './components/sms';
import Data from './components/data';
import Register1 from './components/register1';

class App extends Component {
  // {/* The constructor for a React Component is called before it is mounted. */}
  constructor(props) {
    // {/* Pass props to the constructor by super. */}
   super(props);
   {/**
   * Bind the value of the control to the currrent value of the state.
   * There must be a bound so that if there is a value and something that causes the control to re-render,
   it gets the correct value out of the state.
   */}
   this.loginstateimport = this.loginstateimport.bind(this);
   // {/* Initalise the local state by assigning objects to this.state. */}
   this.state = {
     // {/* Passing an empty string as a value for username and password.. */}
     username: " ",
     password: " ",
   };
 }

 // {/* A function to update the state of username and password.. */}
 loginstateimport(data){
   this.setState({username: data.username, password: data.password})
   console.log(data)
 }

 // {/* Renders the banking wesbite on the screen. */}
  render() {
    return (
      <BrowserRouter>
      <div>
      <Login store={this.loginstateimport}/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/support" component={Support}/>
        <Route path="/payments"  render={props=> <Payments username={this.state.username} password={this.state.password}/>}/> //component={Payments}/>
        <Route path="/transfers" render={props => <Transfers username={this.state.username} password={this.state.password}/>}/>//component={Transfers}/>
        <Route path="/utilities" render={props => <Utilities username={this.state.username} password={this.state.password}/>}/> //component={Utilities}
        <Route path="/buyElectricity" render={props => <Electricity username={this.state.username} password={this.state.password}/>}/> //component={Electricity} />
        <Route path="/MyAccounts" render={props => <MyAccounts username={this.state.username} password={this.state.password}/>}/>
        <Route path="/newAcc"   render={props=> <Newacc username={this.state.username} password={this.state.password}/>}/>//component={Newacc}/>
        <Route path="/accInfo" component={AccInfo}/>
        <Route path="/Statements/:accid" component={Statements}/>
        <Route path="/beneficiary" render={props=> <Beneficiary username={this.state.username} password={this.state.password}/>}/>
        <Route path="/scheduled" render={props=> <Scheduled username={this.state.username} password={this.state.password}/>}/>
        <Route path="/existing"  render={props=> <Existing username={this.state.username} password={this.state.password}/>}/>
        <Route path="/downloadStatements" component={downloadStatements}/>
        <Route path="/printStatements" component={printStatements}/>
        <Route path="/history" render={props=> <History username={this.state.username} password={this.state.password}/>}/>//component={Newacc}/>
        <Route path="/legal" component={Legal}/>
        <Route path="/faq" component={Faq}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/Airtime" render={props=> <Airtime username={this.state.username} password={this.state.password}/>}/>
        <Route path="/data" render={props=> <Data username={this.state.username} password={this.state.password}/>}/>
        <Route path="/sms" render={props=> <SMS username={this.state.username} password={this.state.password}/>}/>
        <Route path="/register1" render={props=> <Register1 username={this.state.username} password={this.state.password}/>}/>
        <Route component={Error}/>
      </Switch>
      <Footer/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
