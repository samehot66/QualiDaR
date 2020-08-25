import React from 'react';


const Message = (props) => {
  return (
    !props.type  ?
    <div className='alert alert-danger alert-dismissible fade show' role='alert'>
      {props.msg}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div> :  <div className='alert alert-info alert-dismissible fade show' role='alert'>
    {props.msg}
    <button
      type='button'
      className='close'
      data-dismiss='alert'
      aria-label='Close'
    >
      <span aria-hidden='true'>&times;</span>
    </button>
  </div> 
  );
};


export default Message;
