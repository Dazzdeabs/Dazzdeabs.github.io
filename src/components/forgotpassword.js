import React, { Component } from 'react'

class Fpassword extends Component {
  forgotStyle ={
    position: 'relative',
    top:'22px',
    right:'2px'
  }

  // {/* Render method returns a forgot password button on the screen. */}
  render () {
    return(
      <div className="login-container">
      <button style ={this.forgotStyle}>Forgot Password</button>
      </div>
    )
  }
}

export default Fpassword
