import React, { useState, useEffect } from 'react';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import classes from './Keywords.css';
import Auxi from '../../hoc/Auxi';
import config from '../../config.json';
import Publickeywords from './Publickeywords/Publickeywords';
import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';
import Addgroup from './Addgroup/Addgroup';
import Yourkeywords from './Yourkeywords/Yourkeywords';
import { NavLink } from 'react-router-dom';

const Keywords = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [publickeywords, setpublickeywords] = useState([]);
    const [searchpublic, setsearchpublic] = useState('');
    const [publicfilterserch, setpublicfilterserch] = useState([]);
    const [subscribekeywords, setsubscribekeywords] = useState([]);
    const [privatekeywords, setprivatekeywords] = useState([]);

    const [searchprivate, setsearchprivate] = useState('');
    const [privatefilterserch, setprivatefilterserch] = useState([]);


    const [Newgroupmodal, setNewgroupmodal] = useState(false);
    const shownewgroupModal = () => { setNewgroupmodal(true) };
    const closenewgroupModal = () => { setNewgroupmodal(false) };

    useEffect(() => {
        const pubkeywords = [];
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "shared": true
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get(config.URL + '/api/keywords', data, axiosConfig, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                for (const index in res.data) {
                    pubkeywords.push({
                        keywordgroupsid: res.data[index].keywordgroupsid,
                        groupname: res.data[index].groupname,
                        owner: res.data[index].email,
                    });
                }
                setpublickeywords(pubkeywords);

            })
            .catch((err) => {
                alert("Show public keyword groups Failed");
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])

    useEffect(() => {
        setpublicfilterserch(
            publickeywords.filter(gkeyword => {
                return gkeyword.groupname.toString().toLowerCase().includes(searchpublic.toLowerCase())
            })
        )
    }, [searchpublic, publickeywords])

    const handleGetpubgroups = async (newPubState) => {
        const pubkeywords = [];
        for (const index in newPubState) {
            pubkeywords.push({
                keywordgroupsid: newPubState[index].keywordgroupsid,
                groupname: newPubState[index].groupname,
                owner: newPubState[index].email,
            });
        }
        const subscribekeywords = [];
        let data = {
            params: { "uid": localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.get(config.URL + '/api/keywords/groups', data, axiosConfig)
            .then((res) => {
                for (const index in res.data) {
                    subscribekeywords.push({
                        keywordgroupsid: res.data[index].keywordgroupsid,
                        groupname: res.data[index].groupname,
                        owner: res.data[index].email,
                    });
                }
                setsubscribekeywords(subscribekeywords);
            })
            .catch((err) => {
                console.log("Show subscribe keyword groups Failed");
            })
        await setpublickeywords(pubkeywords);
    }

    useEffect(() => {
        const subscribekeywords = [];
        let source = axios.CancelToken.source();
        let data = {
            params: { "uid": localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") }


        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get(config.URL + '/api/keywords/groups', data, axiosConfig, axiosConfig,{ cancelToken: source.token})
            .then((res) => {

                for (const index in res.data) {
                    subscribekeywords.push({
                        keywordgroupsid: res.data[index].keywordgroupsid,
                        groupname: res.data[index].groupname,
                        owner: res.data[index].email,
                    });
                }

                setsubscribekeywords(subscribekeywords);
            })
            .catch((err) => {
                console.log("Show subscribe keyword groups Failed");
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])

    const handleGetsubgroups = async (newSubState) => {
        const subscribekeywords = [];
        for (const index in newSubState) {
            subscribekeywords.push({
                keywordgroupsid: newSubState[index].keywordgroupsid,
                groupname: newSubState[index].groupname,
                owner: newSubState[index].email,
            });
        }
        const pubkeywords = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "shared": true
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.get(config.URL + '/api/keywords', data, axiosConfig)
            .then((res) => {
                for (const index in res.data) {
                    pubkeywords.push({
                        keywordgroupsid: res.data[index].keywordgroupsid,
                        groupname: res.data[index].groupname,
                        owner: res.data[index].email,
                    });
                    console.log(res);
                }
                setpublickeywords(pubkeywords);
            })
            .catch((err) => {
                alert("Show public keyword groups Failed");
            })

        await setsubscribekeywords(subscribekeywords);

    }

    useEffect(() => {
        const yourkeywords = [];
        let source = axios.CancelToken.source();
        let data = {
            params: { "uid": localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get(config.URL + '/api/keywords/mygroups', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                for (const index in res.data) {
                    yourkeywords.push({
                        keywordgroupsid: res.data[index].keywordgroupsid,
                        groupname: res.data[index].groupname,
                        shared: res.data[index].shared
                    });
                }
                setprivatekeywords(yourkeywords);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])

    const handleGetyourgroups = async (newYourState) => {
        const yourkeywords = [];
        for (const index in newYourState) {
            yourkeywords.push({
                keywordgroupsid: newYourState[index].keywordgroupsid,
                groupname: newYourState[index].groupname,
                shared: newYourState[index].shared
            });
        }
        await setprivatekeywords(yourkeywords);
    }

    useEffect(() => {
        setprivatefilterserch(
            privatekeywords.filter(gkeyword => {
                return gkeyword.groupname.toString().toLowerCase().includes(searchprivate.toLowerCase())
            })
        )
    }, [searchprivate, privatekeywords])
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
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><NavLink to="/dashboard">Home</NavLink></li>
                                <li className="breadcrumb-item active">Keyword(s)</li>
                                </ol>
                            </div>
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <div className="content">
                    <div className="container-fluid">
                        <div className={["card card-primary", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">Public keyword group(s) </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={e => setsearchpublic(e.target.value)} />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <table className="table m-0 " style={{ overflow: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th>Group name</th>
                                            <th>Owner</th>
                                            <th>Tool(s)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {publicfilterserch.map(gkeyword => (<tr key={gkeyword.keywordgroupsid}>
                                            <Publickeywords gname={gkeyword.groupname} owner={gkeyword.owner} groupid={gkeyword.keywordgroupsid} key={gkeyword.keywordgroupsid} type="notmember" onGetpubgroups={handleGetpubgroups} />
                                        </tr>))}
                                    </tbody>
                                </table>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                        <div className={["card card-info", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">Your keyword group(s)
                            <button type="button" className={["btn btn-block btn-success", classes.AddIcon].join(" ")} onClick={shownewgroupModal} > + Keyword group</button>
                                    <Modal show={Newgroupmodal} modalClosed={closenewgroupModal} name="Create new keyword group">
                                        <Addgroup cancel={closenewgroupModal} onGetyourgroups={handleGetyourgroups} />
                                    </Modal>
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={e => setsearchprivate(e.target.value)} />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 " style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Group name</th>
                                                <th>Owner</th>
                                                <th>Tool(s)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {privatefilterserch.map(gkeyword => (<tr key={gkeyword.keywordgroupsid}>
                                                <Yourkeywords gname={gkeyword.groupname} groupid={gkeyword.keywordgroupsid} key={gkeyword.keywordgroupsid} shared={gkeyword.shared} onGetyourgroups={handleGetyourgroups} />
                                            </tr>))}
                                            {subscribekeywords.map(gkeyword => (<tr key={gkeyword.keywordgroupsid}>
                                                <Publickeywords gname={gkeyword.groupname} owner={gkeyword.owner} groupid={gkeyword.keywordgroupsid} key={gkeyword.keywordgroupsid} type="member" onGetsubgroups={handleGetsubgroups} />
                                            </tr>))}</tbody>
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