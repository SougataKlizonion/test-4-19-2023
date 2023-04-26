import React from 'react'
import ("./Header.css")

const Header = () => {
  return (
    <div  id='Main-header'>
      <ul className='sub-header'>
      <li>Login</li>
      <li>Register</li>
      <li>Home</li>
      </ul>
    </div>
  )
}

export default Header