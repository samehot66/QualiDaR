import React,{ useState, useEffect } from 'react';
import Auxi from '../../../hoc/Auxi';
import Errorpage from '../../../components/UI/Errorpage/Errorpage';
import Fileupload from '../../Upload/FileUpload';

const oneproject = (props) => { 
    
    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [checkaccess,setcheckaccess] = useState(false);


    // useEffect(() => {
    //     const checkaccess = [];        
    //     let source = axios.CancelToken.source();
    //     let data = {
    //         params: {
    //             "uid": localStorage.getItem("uid"),
    //             "access_token": localStorage.getItem("access_token"),
    //             "pid": props.match.params.id
    //         }
    //     }
    //     let axiosConfig = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     axios.get(config.URL  + '/api/projects', data, axiosConfig,{ cancelToken: source.token})
    //         .then((res) => {
    //             for (const index in res.data) {
    //                 checkaccess.push({
    //                     status: res.data[index].status,
    //                 });
    //             }
    //             setprojects(loadprojects);
    //         })
    //         .catch((err) => {
    //             alert("Show all projects Failed");
    //         })
    //     return ()=>
    //     {
    //         source.cancel();
    //     }
    // }, [])

    const check= async (uid)=>
    {
        if(uid==1)
        {
            return true;
        }
        else
        { 
            return false;
        }
    }

    return (
                isauth && check(localStorage.getItem("uid")) ?
                    <Auxi>
                        <div className="content-header" style={{ padding: "1px .5rem" }}>
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1 className="m-0 text-dark">One Project(s)</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="container-fluid">
        This route from {props.match.params.id}

        <Fileupload pid={props.match.params.id}/>
                            </div>
                        </div>
                    </Auxi>
                    :
                    <Errorpage></Errorpage>
    )
};

export default oneproject;