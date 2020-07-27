import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import classes from './Keywords.css';
import Auxi from '../../hoc/Auxi';

const Keywords = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));

    return (
        isauth ?
         <Auxi>
            {/* Content Header (Page header) */}
            <div className="content-header" style={{ padding: "1px .5rem" }}>
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Keyword(s)</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <div className="float-sm-right">
                                Searh
                            </div >
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="content">
                <div className="container-fluid">
                    <div className={["card card-primary", classes.Box].join(' ')}>
                        <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                            <h3 className="card-title">Public keyword groups</h3>
                            <div className="card-tools">
                                <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." />
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0 " style={{ overflow: "auto" }}>
                            <div >
                                <table className="table m-0 " style={{ overflow: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th>Group Name</th>
                                            <th>Owner</th>
                                            <th>Subscribe</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>
                                                kanokpol.thongsem@elearning.cmu.ac.th
                                            </td>
                                            <td> 
                                                kanokpol.thongsem@elearning.cmu.ac.th
                                            </td>
                                            <td><span className="badge badge-success">Shipped</span></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* /.table-responsive */}
                        </div>
                        {/* /.card-body */}
                    </div>
                    <div className={["card card-info", classes.Box].join(' ')}>
                        <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                            <h3 className="card-title">Your keyword group(s)</h3>
                            <div className="card-tools">

                                <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." />


                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0 " style={{ overflow: "auto" }}>
                            <div >
                                <table className="table m-0 " style={{ overflow: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th>Group Name</th>
                                            <th>Owner</th>
                                            <th>Subscribe</th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>
                                                kanokpol.thongsem@elearning.cmu.ac.th
                                            </td>
                                            <td> 
                                                kanokpol.thongsem@elearning.cmu.ac.th
                                            </td>
                                            <td><span className="badge badge-success">Shipped</span></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* /.table-responsive */}
                        </div>
                        {/* /.card-body */}
                    </div>
                </div>
                {/* /.container-fluid */}
            </div>
        </Auxi>
        :
        <Errorpage></Errorpage>
    )
};

export default Keywords;