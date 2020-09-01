import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import { logoutUser } from "../../../utils/authentication/authentication";
import bankLogo from "../../../assets/images/SVG/bank.svg";
import "./Nav.css";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      showDropDown: false,
      profileUrl: secureStorage.getItem(sessionStorage.currentUser).profileURL,
      name: secureStorage.getItem(sessionStorage.currentUser).name,
    };
  }

  handleOpenDropDown = () => {
    this.setState(
      {
        showDropDown: true,
      },
      () => {
        document.addEventListener("click", this.handleCloseDropDown);
      }
    );
  };

  handleCloseDropDown = () => {
    this.setState(
      {
        showDropDown: false,
      },
      () => {
        document.removeEventListener("click", this.handleCloseDropDown);
      }
    );
  };

  render() {
    const { showDropDown, profileUrl, name } = this.state;
    return (
      <div className="navigation-container">
        <Navbar className="w-100">
          <Navbar.Brand className="text-white brand">
            <img
              alt=""
              src={bankLogo}
              width="26"
              height="26"
              className="d-inline-block align-top"
            />
            <h1 className="ml-3">Peach Tree Bank</h1>
          </Navbar.Brand>

          <div className="collapse navbar-collapse ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  onClick={this.handleOpenDropDown}
                >
                  <img
                    src={profileUrl}
                    width="40"
                    height="40"
                    className="rounded-circle profile-image"
                  />
                </a>
                <div
                  className={`dropdown-menu ${showDropDown ? "show" : ""}`}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item text-truncate">Hi! {name}</a>
                  <a
                    className="dropdown-item text-truncate"
                    onClick={logoutUser}
                  >
                    Log Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
