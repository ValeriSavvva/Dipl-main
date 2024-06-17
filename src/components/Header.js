import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header-cont">
        <div className="header-container-row-start">
          <div>
            <div><Link to='/intensives'>
              <img
                src="https://cdn.animaapp.com/projects/66178f6565c5717abaa98a66/releases/66179015c39a2cda9c36b812/img/vector---0.svg"
                alt="logo"
              ></img>
              </Link>
            </div>
          </div>
          <div>
            <div className="header-container-row-start">
              <div className="bold-font font-14">LOGO</div>
              <div className="font-14">Костромской государственный университет</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="header-container-row-buttons">
            <div className="button-square">
              <img
                src="https://cdn.animaapp.com/projects/66178f6565c5717abaa98a66/releases/66179015c39a2cda9c36b812/img/vector---0-1.svg"
                alt="logo"
              ></img>
            </div>
            <div className="button-square">
              <img
                src="https://cdn.animaapp.com/projects/66178f6565c5717abaa98a66/releases/66179015c39a2cda9c36b812/img/vector-1.svg"
                alt="logo"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
