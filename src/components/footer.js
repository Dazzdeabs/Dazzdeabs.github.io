import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';


class Footer extends Component {
  // {/* Render method returns a footer on the screen. */}
  render () {
    return (
      <footer >
        <center>
          <p><a href ='support.html'>Banking Regulations</a> | <a href ='supportLegal.html'>Legal</a>  | <a href ='supportFaq.html'>FAQ</a>  | <a href ='supportContact.html'>Contact us</a></p>
          <p> © Copyright. Bank Of The Sun Limited. All rights reserved.</p>
          <a href="https://www.facebook.com"><i id="media" class="fab fa-facebook-f fa-3x"></i></a>
          <a href="https://twitter.com"><i id="media"  class="fab fa-twitter fa-3x"></i></a>
          <a href="https://www.instagram.com/?hl=en"><i id="media"  class="fab fa-instagram fa-3x"></i></a>
        </center>
      </footer>
    )
  }
}
export default Footer
