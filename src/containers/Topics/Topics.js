import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Ckeditor from './Ckeditor/Ckeditor';
import { NavLink } from 'react-router-dom';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import Auxi from '../../hoc/Auxi';
import classes from './Topics.css';
import config from '../../config.json';
import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';
const topics = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));

    const [Infomodal, setInfomodal] = useState(false);
    const showInfoModal = () => { setInfomodal(true) };
    const closeInfoModal = () => { setInfomodal(false) };

    const [file,setfile] = useState([]);
    const [kwgroup,setkwgroup] = useState([]);
    //  console.log(props.match.params.tid);
    //  console.log(props.match.params.id);

    const [paragraphall, setparagraphall] = useState([]);
    const [paragraphinuse, setparagraphinuse] = useState([]);

    useEffect(() => {

        let source = axios.CancelToken.source();
        const keywordgroupinfo = [];
        const fileinfo = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "tid": props.match.params.tid
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL + '/api/topics/detail', data, axiosConfig, { cancelToken: source.token })
            .then((res) => {
           
                for (const index in res.data.keywordgroups) {
                    keywordgroupinfo.push({
                        keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
                        groupname: res.data.keywordgroups[index].groupname
                    })
                }

                for (const index in res.data.pdffiles) {
                    fileinfo.push({
                        pdfid: res.data.pdffiles[index].pdfid,
                        pdfname: res.data.pdffiles[index].pdfname
                    })
                }
              
                setfile(fileinfo);
                setkwgroup(keywordgroupinfo);
    

            })
            .catch((err) => {
                alert("Show info Failed");
            })
        return () => {
            source.cancel();
        }
    }, [])

    useEffect(() => {

        let source = axios.CancelToken.source();
        const keywordgroupinfo = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "tid": props.match.params.tid
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL + '/api/keywords/topic/keywords', data, axiosConfig, { cancelToken: source.token })
            .then((res) => {
           console.log("fewgreger",res.data)
                // for (const index in res.data.keywordgroups) {
                //     keywordgroupinfo.push({
                //         keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
                //         groupname: res.data.keywordgroups[index].groupname
                //     })
                // }

              

            })
            .catch((err) => {
                alert("Show keyword(s) Failed");
            })
        return () => {
            source.cancel();
        }
    }, [])





    const getParagraphs = () => {
        const loadparagraphs = [];
        
                    loadparagraphs.push({
                        phraseid: "1",
text: "คาดการณ์ว่าจะเพิ่ม มากขึ้นเรื่อยๆ เนื่องจากแคมเปญต่างๆ เริ่มหันมาใช้การสื่อสารกับ ลูกค้าผ่านสื่อโฆษณาในหลากหลายช่องทางมากยิ่งขึ้นนอกจากนีรายงานของ Future Market Insights ได้คาดว่าช่วง ปี 2561 – 2571 สื่อโฆษณานอกบ้านแบบดิจิทัลทั่วโลกจะเติบโตเพิ่มขึ้นอย่างต่อเนื่องกว่า 11.0% ต่อปี ด้วยศักยภาพในการเชื่อมโยงระหว่างสื่อโฆษณานอกบ้านและสื่อโฆษณาทางออนไลน์/ดิจิทัล ทำให้สามารถ นำเสนอสื่อโฆษณาที่มีคุณภาพได้หลากหลาย",
                        pdfname:"BTS.pdf",
                        page:"44",
                            
                            status:"unseen"
                        });
                        loadparagraphs.push({
                            phraseid: "3",
    text: "fefefefeายช่องทางมากยิ่งขึ้นนอกจากนีรายงานของ Future Market Insights ได้คาดว่าช่วง ปี 2561 – 2571 สื่อโฆษณานอกบ้านแบบดิจิทัลทั่วโลกจะเติบโตเพิ่มขึ้นอย่างต่อเนื่องกว่า 11.0% ต่อปี ด้วยศักยภาพในการเชื่อมโยงระหว่างสื่อโฆษณานอกบ้านและสื่อโฆษณาทางออนไลน์/ดิจิทัล ทำให้สามารถ นำเสนอสื่อโฆษณาที่มีคุณภาพได้หลากหลาย",
                            pdfname:"BTS.pdf",
                            page:"44",
                                
                                status:"unseen"
                            });   loadparagraphs.push({
                                phraseid: "2",
        text: "คาดการณ์ว่าจะเพิ่ม มากขึ้นเรื่อยๆ เนื่องจากแคมเปญต่างๆ เริ่มหันมาใช้การสื่อสารกับ ลูกค้าผ่านสื่อโฆษณาในหลากหลายช่องทางมากยิ่งขึ้นนอกจากนีรายงานของ Future Market Insights ได้คาดว่าช่วง ปี 2561 – 2571 สื่อโฆษณานอกบ้านแบบดิจิทัลทั่วโลกจะเติบโตเพิ่มขึ้นอย่างต่อเนื่องกว่า 11.0% ต่อปี ด้วยศักยภาพในการเชื่อมโยงระหว่างสื่อโฆษณานอกบ้านและสื่อโฆษณาทางออนไลน์/ดิจิทัล ทำให้สามารถ นำเสนอสื่อโฆษณาที่มีคุณภาพได้หลากหลาย",
                                pdfname:"BTS.pdf",
                                page:"44",
                                    
                                    status:"unseen"
                                });
                    setparagraphall(loadparagraphs);
   

    };



    const removeHandler = (id) => {

        var x = [...paragraphall];

        setparagraphinuse([...paragraphinuse, x[id]]);
        console.log(paragraphinuse);
        x.splice(id, 1)

        setparagraphall(x);


    };

    const removeHandler2 = (id) => {
        var x = [...paragraphinuse]

        setparagraphall([...paragraphall, x[id]]);
        x.splice(id, 1)

        setparagraphinuse(x);


    };

    return (
        isauth ?
            <Auxi>
                <div className="content-header" style={{ padding: "1px .5rem" }}>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">{props.match.params.tname}   <i className="fa fa-fw fa-info-circle" style={{ fontSize: "18px" }} onClick={showInfoModal}></i> </h1>
                                <Modal show={Infomodal} modalClosed={closeInfoModal} name="Topic information">
                                <div className={["card ", classes.Boxmodal].join(' ') }>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" , backgroundColor:"#52a5ff"}}>
                                <h3 className="card-title" style={{color:"white"}}>File(s) in this topic
                              
                                </h3>
                                <div className="card-tools">
                               
                               
                                  </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }} >
                                        <thead>
                                            <tr> 
                                                
                                                <th>File name</th>
                                                
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                       
                                       {file.map(f=>(
<tr key={f.pdfid}>
<td style={{ color: "#007bff" }}>   
<i className="fa fa-fw  fa-file-pdf" ></i> 
{f.pdfname}
</td>
</tr>
                                       ))}
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                        <div className={["card card-info", classes.Boxmodal].join(' ') }>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem"}}>
                                <h3 className="card-title" style={{color:"white"}}>Keyword group(s) in this topic 
                              
                                </h3>
                                <div className="card-tools">
                               
                               
                                  </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }} >
                                        <thead>
                                            <tr> 
                                                
                                                <th>Keyword group name</th>
                                                
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                       
                                        {kwgroup.map(k => (
                                    <tr key={k.keywordgroupsid}>
                                               <td style={{ color: "#17a2b8" }}> <i  className="fa fa-fw  fa-folder" ></i> {k.groupname}</td>
                                              
                                         </tr>
                                    ))}
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                               
                               
                               
                                </Modal>
                            </div>


                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">


                                    <li className="breadcrumb-item">
                                        <NavLink to={"/projects/" + props.match.params.pname + "/" + props.match.params.id} >{props.match.params.pname}</NavLink></li>
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
                                    <h3 className="card-title">Keyword(s)
                                </h3>
                                    <div className="card-tools">
                                        <input type="text" className="form-control" style={{ height: "1.25rem", width: "120px" }} placeholder="Search..." />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                    <div className="list-group" style={{ margin: "5px" }}>
                                        <button type="button" className="list-group-item-info active " disabled style={{ height: "30px", fontSize: "15px", padding: "0.03rem 0.75rem", borderTopRightRadius: "0.25rem", borderTopLeftRadius: "0.25rem" }}>
                                            ESG: Social by ISNE#5
  </button>
                                        <button type="button" className="list-group-item list-group-item-action" onClick={getParagraphs} style={{ padding: "0.03rem 0.75rem" }}>สื่อโฆษณา</button>
                                        <button type="button" className="list-group-item list-group-item-action"  style={{ padding: "0.03rem 0.75rem" }}>สังคมออนไลน์</button>
                                        <button type="button" className="list-group-item list-group-item-action"  style={{ padding: "0.03rem 0.75rem" }}>การประชาสัมพันธ์</button>
                                    </div>

 <div className="list-group" style={{ margin: "5px" }}>
                                        <button type="button" className="list-group-item-info active " disabled style={{ height: "30px", fontSize: "15px", padding: "0.03rem 0.75rem", borderTopRightRadius: "0.25rem", borderTopLeftRadius: "0.25rem" }}>
                                            Environment
  </button>
                                        <button type="button" className="list-group-item list-group-item-action"  style={{ padding: "0.03rem 0.75rem" }}>สื่อโฆษณา</button>
                                        <button type="button" className="list-group-item list-group-item-action"  style={{ padding: "0.03rem 0.75rem" }}>สังคมออนไลน์</button>
                                        <button type="button" className="list-group-item list-group-item-action"  style={{ padding: "0.03rem 0.75rem" }}>การประชาสัมพันธ์</button>
                                    </div>


                                </div>

                                   


                          
                            </div>

                            <div className={["card card-info", classes.Box2].join(' ')}>
                                <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem", backgroundColor:"#66bfed" }}>
                                    <h3 className="card-title"> Paragarph(s)
                                </h3>
                                    <div className="card-tools">
                                        hgrthtr
                                </div>
                                </div>
                                {/* /.card-header  <Ckeditor />*/}
                                <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                 <div style={{ overflow: "auto",height:"600px" }} >
                                    {paragraphall.map((p, i) => (
                                    
                                    
                                   <div className="card card-info" id={p.phraseid}  style={{ margin:"10px"}} >
  <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" , backgroundColor:"#66bfed"}}>
    <h3 className="card-title"> Paragraph ID: {p.phraseid}, File: <a href={"./upload/"+props.match.params.id+"/"+p.pdfname+"#page="+p.page} target="_blank">{p.pdfname}</a></h3>
    <div className="card-tools">
                                        <button onClick={() => removeHandler(i)}>Add to in use</button>
                                        <button><a href={"./upload/"+props.match.params.id+"/"+p.pdfname+"#page="+p.page} target="_blank">File</a></button>
                                        <button>Edit</button>
                                        <button>Remove</button>

    </div>
    {/* /.card-tools */}
  </div>
  {/* /.card-header */}
  <div className="card-body">
  {p.text}
  </div>
  {/* /.card-body */}
  <div className="card-footer">
   page: {p.page}
  </div>
  {/* /.card-footer */}
</div>

                                    


                                        
                                    ))}</div>
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
                                {paragraphinuse.map((project, i) => (
                                        <div id={project.phraseid} key={project.phraseid} onClick={() => removeHandler2(i)}>
                                            {project.text}
                                        </div>
                                    ))}
                                  
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



