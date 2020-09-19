import React from 'react';

import LogoContainer from '../logo-container/logo-container.component';

import { Link } from 'react-router-dom';

import './header.style.scss';

const Header = () => (
  <div className="header">
    <div className="wrapper">
      <Link to="/">
        <LogoContainer/>
      </Link>
    </div>
  </div>
);

export default Header;
