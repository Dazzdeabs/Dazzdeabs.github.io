import React, { Component } from 'react'
import Welcome from './welcome';
import Login from './login';

import Fpassword from './forgotpassword';

class Home extends Component {
  // {/* Render method returns the home page on the screen. */}
  render () {
    return (
      <div>
      <Welcome/>
      </div>
    )
  }
}

export default Home
