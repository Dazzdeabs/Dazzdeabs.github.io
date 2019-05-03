import React, { Component } from 'react'
import background from './mountain.png';
import { NavLink } from 'react-router-dom';
import icon from './info.png';
import contact from './contact.jpg';
import Login from'./login';
import Popup from 'react-popup';


class Welcome extends Component {
  constructor(props){
    super(props)
    this.popUp = this.popUp.bind(this);
  }

  popUp(e) {
    var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }

  // {/* Render method returns the background image, welcome message and two icons on the screen. */}
  render () {
    return (
      <div>

        <div>
          <img  src={background} className="img"/>
          <div className="center">
            <center>
              <h1 >WELCOME TO THE BANK OF THE SUN</h1><br/>
              <p> - bringing sunshine to you - </p>
            </center><br/>
            <center>
            <div className="popup" onClick={this.popUp}><img id="contact" className="icon" src={contact}/>
              <span className="popuptext" id="myPopup">Land-line: (021) 590 6625<br/><br/>E-mail: bankofthesun@sunny.com<br/><br/>Facebook: facebook</span>
            </div>
          <NavLink to="/support"><img className="icon " id="info" src={icon}/></NavLink>
            </center>

          </div>
        </div>
      </div>

);

}
}

export default Welcome;
