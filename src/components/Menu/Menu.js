import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Auxi from "../../hoc/Auxi";

const Menu = () => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const logout =()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <aside
      className="main-sidebar sidebar-light-primary elevation-4"
      style={{ minHeight: "113%" }}
    >
      {isauth ? (
        <NavLink
          to="#"
          className="brand-link"
          style={{ backgroundColor: "#2981e9" }}
        >
          <img
            src={require("./icon/logo.png")}
            alt="QualiDaR"
            className="brand-image"
            style={{ opacity: ".8" }}
          />
          <span
            className="brand-text font-weight-light"
            style={{ color: "white" }}
          >
            QualiDaR
          </span>
        </NavLink>
      ) : (
        <NavLink to="#" className="brand-link">
          <img
            src={require("./icon/logo.png")}
            alt="QualiDaR"
            className="brand-image"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">QualiDaR</span>
        </NavLink>
      )}
      {/* Sidebar */}
      <div className="sidebar">
        {isauth ? (
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={require("./icon/user.png")}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <NavLink
                to="/profile"
                className="d-block text-truncate "
                data-toggle="tooltip"
                data-placement="top"
                title={localStorage.getItem("email")}
              >
                {localStorage.getItem("email")}
              </NavLink>
            </div>
          </div>
        ) : null}

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {isauth ? (
              <Auxi>
           
               
                <li className="nav-item">
                  <NavLink to="/projects" className="nav-link">
                    <i className="nav-icon fas fa-folder" />
                    <p>Project(s)</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/keywords" className="nav-link">
                    <i className="nav-icon fas fa-key" />
                    <p>Keyword(s)</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sharedwithme" className="nav-link">
                    <i className="nav-icon fas fa-users" />
                    <p>Shared with me</p>
                  </NavLink>
                </li>
                <li className="nav-item">
             
                   <p  className="nav-link" onClick={logout}  style={{ cursor:"pointer"}} >
                 <a href="" style={{ cursor:"pointer"}} onClick={logout}>
                 <i className="nav-icon" onClick={logout}/>
                 <p  style={{color:"red", cursor:"pointer"}} onClick={logout}>    Logout</p>
                  </a> </p>
                </li> 
              </Auxi>
            ) : (
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <i className="nav-icon fas fa-user" />
                  <p>Sign Up/Sign In</p>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu;
