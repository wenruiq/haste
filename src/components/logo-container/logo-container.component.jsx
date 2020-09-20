import React from 'react';

import './logo-container.styles.scss';

const LogoContainer = () => (
  <div className="logo-container">
    <img src={require("../../assets/logo.png")} alt="logo"/>
  </div>
)

export default LogoContainer;