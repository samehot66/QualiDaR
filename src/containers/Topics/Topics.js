import React,{useState} from 'react';
import Ckeditor from './Ckeditor/Ckeditor';
import { NavLink } from 'react-router-dom';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import Auxi from '../../hoc/Auxi';
import classes from './Topics.css';

const topics = (props) => {
    
    const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 
    console.log(props.match.params.tid);
   console.log(props.match.params.id);


    return ( 
        isauth?
        <Auxi>
                <div className="content-header" style={{ padding: "1px .5rem" }}>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">{props.match.params.tname}   <i className="fa fa-fw fa-info-circle" style={{ fontSize: "18px" }} ></i> </h1>
                          
                            </div>


                          <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    
                                         
                                         <li className="breadcrumb-item">
                                         <NavLink to={"/projects/"+props.match.params.pname+"/"+ props.match.params.id} >{props.match.params.pname}</NavLink></li>
                                    <li className="breadcrumb-item active"> {props.match.params.tname} </li>
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                          
                            <div className={["card card-info", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">Keyword group(s)
                                </h3>
                                <div className="card-tools">
                                <input type="text" />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
            <div className="list-group">
  <button type="button" className="list-group-item active" disabled>
    ESG
  </button>
  <button type="button" className="list-group-item list-group-item-action">key1</button>
  <button type="button" className="list-group-item list-group-item-action">key2</button>
  <button type="button" className="list-group-item list-group-item-action">key3</button>

</div>
                        </div>
                   
                             
                            </div>
                     
                            <div className={["card card-info", classes.Box2].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title"> Paragarph(s)
                                </h3>
                                <div className="card-tools">
                        hgrthtr
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                          <Ckeditor/>
                        </div>
                   
                             
                            </div>
                            <div className={["card card-primary", classes.Box3].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">In use
                                </h3>
                                <div className="card-tools">
                               jtyjtyjt
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                           ;ui;u
                        </div>
                   
                             
                            </div>
                        </div>
                 
                    </div>







                </div>
            </Auxi>
    :
  <Errorpage></Errorpage>
    ) 
};

export default topics;
