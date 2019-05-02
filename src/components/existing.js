import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import jsSha from 'jssha';

{/*This additiona feature does not work. We could not figure out the api callbacks to other users accounts.*/}

class Existing extends Component {
        // {/* The constructor for a React Component is called before it is mounted. */}
        constructor(props) {
          {/* Pass props to the constructor by super. */}
          super(props);
          {/* Initalise the local state by assigning objects to this.state. */}
          this.state ={
            // {/* Passing an empty string as a value for the objects below. */}
            clients: [],
            transactions: [],
            accounts: [],
            src: '',
            dest: '',
            amount: '',
            ref: '',
            time: '',
            amount1: '',
            amount2: '',
            amount3: '',
            amount4: '',
            ref1: '',
            ref2: '',
            ref3: '',
            ref4: '',
          }

          {/**
          * Bind the value of the control to the currrent value of the state.
          * There must be a bound so that if there is a value and something that causes the control to re-render,
          it gets the correct value out of the state.
          */}

          this.onChange = this.onChange.bind(this)
          this.ThomasPay = this.ThomasPay.bind(this)
          this.HaroldPay = this.HaroldPay.bind(this)
          this.DarrylPay = this.DarrylPay.bind(this)
          this.PhoebePay = this.PhoebePay.bind(this)
        }

        // {/* Invoked immediately after a component is mounted. */}
        componentDidMount() {
                 const user = this.props.username; //'blackfish787';
                 const password = this.props.password; //'lestat';
                 const hmac = new jsSha('SHA-256', 'TEXT');
                 hmac.setHMACKey(password, 'TEXT');
                 hmac.update(user);
                 hmac.update(Date.now().toString(36).substring(0, 4));
                 const token = `${hmac.getHMAC('HEX')}%${user}`;
                 const api = axios.create({
                   baseURL: 'http://45.77.58.134:8080',
                   headers: { 'Authorization': 'Bearer ' + token }
                 });

                 (async () => {
                   const res = await api.get('/clients');
                   this.setState({clients: res.data});
                   const acc = await api.get(`/accounts/` + this.state.clients[0]["_id"])
                   this.setState({accounts: acc.data})
                   const transactions = await api.get(`/transactions/${acc.data[0]._id}/.*`)
                   this.setState({transactions: transactions.data});
                 })()
          }

          ThomasPay(){
              const user = this.props.username; //'blackfish787';
              const password = this.props.password; //'lestat';
              const hmac = new jsSha('SHA-256', 'TEXT');
              hmac.setHMACKey(password, 'TEXT');
              hmac.update(user);
              hmac.update(Date.now().toString(36).substring(0, 4));
              const token = `${hmac.getHMAC('HEX')}%${user}`;
              const api = axios.create({
                baseURL: 'http://45.77.58.134:8080',
                headers: { 'Authorization': 'Bearer ' + token }
              });
              (async () => {
                const res = await api.get('/clients');
                this.setState({clients: res.data});
                const acc = await api.get(`/accounts/` + this.state.clients[0]["_id"])
                this.setState({accounts: acc.data})
                const transactions = await api.get(`/transactions/${acc.data[0]._id}/.*`)
                this.setState({transactions: transactions.data});
              })()

                api.post('/transactions', {

                  "time": '',
                  "type": 'debit',
                  "src": this.state.src,
                  "dest": '1131a1ca-bd63-37af-8eb3-43281cc88067',
                  "amount": -(this.state.amount1),
                  "ref": this.state.ref1,
            })

            api.post('/transactions', {

              "time": '',
              "type": 'credit',
              "src": '1131a1ca-bd63-37af-8eb3-43281cc88067',
              "dest": this.state.src,
              "amount": this.state.amount1,
              "ref": this.state.ref1,
        })

          }

          HaroldPay(){
              const user = this.props.username; //'blackfish787';
              const password = this.props.password; //'lestat';
              const hmac = new jsSha('SHA-256', 'TEXT');
              hmac.setHMACKey(password, 'TEXT');
              hmac.update(user);
              hmac.update(Date.now().toString(36).substring(0, 4));
              const token = `${hmac.getHMAC('HEX')}%${user}`;
              const api = axios.create({
                baseURL: 'http://45.77.58.134:8080',
                headers: { 'Authorization': 'Bearer ' + token }
              });

                api.post('/transactions', {

                  "time": '',
                  "type": 'debit',
                  "src": this.state.src,
                  "dest": '4d57aa2f-a0fb-39d7-b6ca-e584a7bc5324',
                  "amount": -(this.state.amount2),
                  "ref": this.state.ref2,
            })

            api.post('/transactions', {

              "time": '',
              "type": 'credit',
              "src": '4d57aa2f-a0fb-39d7-b6ca-e584a7bc5324',
              "dest": this.state.src,
              "amount": this.state.amount1,
              "ref": this.state.ref1,
        })
          }

          DarrylPay(){
              const user = this.props.username; //'blackfish787';
              const password = this.props.password; //'lestat';
              const hmac = new jsSha('SHA-256', 'TEXT');
              hmac.setHMACKey(password, 'TEXT');
              hmac.update(user);
              hmac.update(Date.now().toString(36).substring(0, 4));
              const token = `${hmac.getHMAC('HEX')}%${user}`;
              const api = axios.create({
                baseURL: 'http://45.77.58.134:8080',
                headers: { 'Authorization': 'Bearer ' + token }
              });

                api.post('/transactions', {

                  "time": '',
                  "type": 'debit',
                  "src": this.state.src,
                  "dest": '8106961d-2746-305e-aa5c-fe7c9ef05b1b',
                  "amount": -(this.state.amount3),
                  "ref": this.state.ref3,
            })

            api.post('/transactions', {

              "time": '',
              "type": 'credit',
              "src": '8106961d-2746-305e-aa5c-fe7c9ef05b1b',
              "dest": this.state.src,
              "amount": this.state.amount1,
              "ref": this.state.ref1,
        })
          }

          PhoebePay(){
              const user = this.props.username; //'blackfish787';
              const password = this.props.password; //'lestat';
              const hmac = new jsSha('SHA-256', 'TEXT');
              hmac.setHMACKey(password, 'TEXT');
              hmac.update(user);
              hmac.update(Date.now().toString(36).substring(0, 4));
              const token = `${hmac.getHMAC('HEX')}%${user}`;
              const api = axios.create({
                baseURL: 'http://45.77.58.134:8080',
                headers: { 'Authorization': 'Bearer ' + token }
              });

                api.post('/transactions', {

                  "time": '',
                  "type": 'debit',
                  "src": this.state.src,
                  "dest": 'a1b180d7-e139-3e85-921d-ff2fbedfd147',
                  "amount": -(this.state.amount4),
                  "ref": this.state.ref4,
            })

            api.post('/transactions', {

              "time": '',
              "type": 'credit',
              "src": 'a1b180d7-e139-3e85-921d-ff2fbedfd147',
              "dest": this.state.src,
              "amount": this.state.amount1,
              "ref": this.state.ref1,
        })
          }


          onChange (e) {
                      this.setState({[e.target.name]: e.target.value});
                      console.log(this.state.src)
          }



      // {/* Render method returns a second navbar, textboxes and dropwdowns on the screen for user to perform a payment. */}
      render () {
        return (
          <div>
            <div className="navbar2">
              <NavLink to="/payments" className="navButton"> Once-off Payments </NavLink>
              <NavLink to="/scheduled" className="navButton"> Scheduled Payments </NavLink>

              <div className = "dropdown">
                <button className = "dropbtn"> Pay Beneficiary <i className = "fa fa-caret-down"></i></button>
              <div className = "dropdown-content">
              <NavLink to="/beneficiary" className="navButton"> Add New Beneficiary </NavLink>
              <NavLink to="/existing" className="navButton"> Existing Beneficiaries </NavLink>
            </div>
            </div>
              <NavLink to="/history" className="navButton"> Payment History </NavLink>
            </div>
                        <h2>Existing Beneficiaries</h2>
                        <table>
                            <tr>
                              <th>Name</th>
                              <th>Account Type</th>
                              <th>Pay Amount</th>
                              <th>Reference</th>
                              <th>Action</th>
                            </tr>
                            <tr>
                              <td>Thomas</td>
                              <td>Savings Account</td>
                              <td><input className="imput" name="amount1" onChange={this.onChange} /></td>
                              <td><input className="imput" name="ref1" onChange={this.onChange} /></td>
                              <td><button className='button' onClick={this.ThomasPay}>Pay Again</button></td>
                            </tr>
                            <tr>
                              <td>Harold</td>
                              <td>Cheque Account</td>
                              <td><input className="imput" name="amount2" onChange={this.onChange} /></td>
                              <td><input className="imput" name="ref2" onChange={this.onChange} /></td>
                              <td><button className='button' onClick={this.HaroldPay}>Pay Again</button></td>
                            </tr>
                            <tr>
                              <td>Darryl</td>
                              <td>Credit Account</td>
                              <td><input className="imput" name="amount3" onChange={this.onChange} /></td>
                              <td><input className="imput" name="ref3" onChange={this.onChange} /></td>
                              <td><button className='button' onClick={this.DarrylPay}>Pay Again</button></td>
                            </tr>
                            <tr>
                              <td>Phoebe</td>
                              <td>Savings Account</td>
                              <td><input className="imput" name="amount4" onChange={this.onChange} /></td>
                              <td><input className="imput" name="ref4" onChange={this.onChange} /></td>
                              <td><button className='button' onClick={this.PhoebePay}>Pay Again</button></td>
                            </tr>
                      </table>
                      <br />
                        </div>
            )
      }
  }

export default Existing
