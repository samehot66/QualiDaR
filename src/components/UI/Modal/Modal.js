import React from "react";
import classes from "./Modal.css";
import Auxi from "../../../hoc/Auxi";
import Blackdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Auxi>
      <Blackdrop show={props.show} clicked={props.modalClosed} />
      {props.settingtype ? 
      <div
        className={classes.Modal2}
        onClick={props.clicked}
        style={{
          transfrom: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
          display: props.show ? "block" : "none",
        }}
      >
        <div className="card card-info">
          <div className="card-header" style={{ backgroundColor: "#0061c9" }}>
            <h3 className="card-title">{props.name}</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                onClick={props.modalClosed}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
      <div className="card-body text-wrap">{props.children}</div>
          <div className="card-footer"></div>
        </div>
      </div> :
      
      <div
        className={classes.Modal}
        onClick={props.clicked}
        style={{
          transfrom: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
          display: props.show ? "block" : "none",
        }}
      >
        <div className="card card-info">
          <div className="card-header" style={{ backgroundColor: "#0061c9" }}>
            <h3 className="card-title">{props.name}</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                onClick={props.modalClosed}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
      <div className="card-body text-wrap">{props.children}</div>
          <div className="card-footer"></div>
        </div>
      </div>
      
      
      
      }
    </Auxi>
  );
};

export default Modal;
