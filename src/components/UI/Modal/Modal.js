import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Blackdrop from '../Backdrop/Backdrop';
import useFitText from "use-fit-text";

const modal = (props) => {

    return (
        <Auxi>
            <Blackdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} onClick={props.clicked} style={{
                    transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    display: props.show ? 'block' : 'none'
                }}>
            <div className="card card-primary" >
  <div className="card-header">
    <h3 className="card-title">Title</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" onClick={props.modalClosed}>
        <i className="fas fa-times" /></button>
    </div>
  </div>
  <div className="card-body text-wrap" style={{display: 'block'}}>
    Start creating your amazing applicationxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!
  </div>
  {/* /.card-body */}
  <div className="card-footer" style={{display: 'block'}}>
    Footer
  </div>
  {/* /.card-footer*/}
</div>
</div>
        </Auxi>
    )
};

export default modal;