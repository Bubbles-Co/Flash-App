import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/routes'>Routes</Link></li>
        <li><Link to='/sessions'>Sessions</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header;