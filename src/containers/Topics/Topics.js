import React, { useState, useEffect } from "react";
import Textedit from "./Textedit/Textedit";
import { NavLink } from "react-router-dom";
import Errorpage from "../../components/UI/Errorpage/Errorpage";
import Auxi from "../../hoc/Auxi";
import classes from "./Topics.css";
//import config from "../../config.json";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";
//import ReactHtmlParser from "react-html-parser";
import Highlighter from "react-highlight-words";
import Multisearch from "./Mutisearch/Multisearch";

const topics = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [Infomodal, setInfomodal] = useState(false);
  const [DeleteModal, setDeletemodal] = useState(false);
  const [checkaccess,setcheckaccess] = useState(false);
  const showInfoModal = () => {
    setInfomodal(true);
  };
  const closeInfoModal = () => {
    setInfomodal(false);
  };
  const [file, setfile] = useState([]);
  const [kwgroup, setkwgroup] = useState([]);
  //  console.log(props.match.params.tid);
  //  console.log(props.match.params.id);
  const [kw, setkw] = useState([]);
  const [paragraphall, setparagraphall] = useState([]);
  const [paragraphinuse, setparagraphinuse] = useState([]);

  const [numall,setnumall]  = useState(0);
  const [numinuse,setnuminuse] = useState(0);

  const [textinfo,settextinfo] = useState([]);
  const [kwgroupinfo,setkwgroupinfo] = useState([]);
  
  const [Edittext, setEdittextmodal] = useState(false);
  const showEdittextModal = (text,index,phraseid) => {

    settextinfo({index:index,text:text, phraseid:phraseid})
    setEdittextmodal(true);
  };
  const closeEdittextModal = () => {
    setEdittextmodal(false);
  };

  const [Edittext2, setEdittextmodal2] = useState(false);
  const showEdittextModal2 = (text,index,phraseid) => {
    settextinfo({index:index,text:text, phraseid:phraseid})
    setEdittextmodal2(true);
  };
  const closeEdittextModal2 = () => {
    setEdittextmodal2(false);
  };

  const [showsearchmulti,setsearchmulti] = useState(false);
  const showsearchmultiModal = () => {
  
    setsearchmulti(true);
  };
  const closesearchmultiModal = () => {
    setsearchmulti(false);
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    const keywordgroupinfo = [];
    const fileinfo = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.match.params.tid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/topics/detail", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        //console.log(res.data)
        for (const index in res.data.keywordgroups) {
          keywordgroupinfo.push({
            keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
            groupname: res.data.keywordgroups[index].groupname,
          });
        }

        for (const index in res.data.pdffiles) {
          fileinfo.push({
            pdfid: res.data.pdffiles[index].pdfid,
            pdfname: res.data.pdffiles[index].pdfname,
          });
        }

        setfile(fileinfo);
        setkwgroup(keywordgroupinfo);
      })
      .catch((err) => {
        //alert("Show info Failed");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const keywordgroupinfo = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.match.params.tid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/keywords/topic/keywords", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        for (const index in res.data[0].keywordgroups) {
            keywordgroupinfo.push({
                keywordgroupsid: res.data[0].keywordgroups[index].keywordgroupsid,
                groupname: res.data[0].keywordgroups[index].groupname,
                keywords: res.data[0].keywordgroups[index].keywords
            })       
        }
 
        setkwgroupinfo(keywordgroupinfo);
      })
      .catch((err) => {
        //alert("Show keyword(s) Failed");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.match.params.tid,
        pid: props.match.params.id
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/projects/checkaccess", data, axiosConfig, { cancelToken: source.token,
      })
      .then((res) => {
       setcheckaccess(res.data.status);
      })
      .catch((err) => {
      });
    return () => {
      source.cancel();
    };
  }, []);

  const getParagraphs = (kwindex,kw) => {
    const loadparagraphs = [];
    const loadinuse =[];
    const keywset = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.match.params.tid,
        kid: kwindex,
        status: "seen"
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/phrases", data, axiosConfig)
      .then((res) => {
     
        for (const index in res.data) {
          if(res.data[index].status=="unseen"){
            if(res.data[index].text!==''){
          loadparagraphs.push({
            phraseid: res.data[index].phraseid,
            text: res.data[index].text,
            pdfname: res.data[index].pdf_text.pdffile.pdfname,
            page: res.data[index].pdf_text.page_number,
            status: res.data[index].status,
            sectionid: res.data[index].sectionid
          });}
        }
          else{
            if(res.data[index].text!==''){
            loadinuse.push({
              phraseid: res.data[index].phraseid,
              text: res.data[index].text,
              pdfname: res.data[index].pdf_text.pdffile.pdfname,
              page: res.data[index].pdf_text.page_number,
              status: res.data[index].status,
              sectionid: res.data[index].sectionid
            });
          }}

      }
      setparagraphinuse(loadinuse)
        setparagraphall(loadparagraphs);
        setnumall(loadparagraphs.length);
        setnuminuse(loadinuse.length);
      })
      .catch((err) => {
        //alert("Show sections failed")
        localStorage.clear();
      });
    keywset.push(kw);
    //keywset.push("หลัก");
    //keywset.push("ส่วน");
    setkw(keywset);
  };

  const removeHandler =async (id,phraseid) => {

    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      phraseid: phraseid,
      status:"seen"
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(process.env.REACT_APP_URL + "/api/phrases/status", data, axiosConfig);

    var x = [...paragraphall];

    setparagraphinuse([...paragraphinuse, x[id]]);

    x.splice(id, 1);

    setparagraphall(x);
    setnumall(x.length);
        setnuminuse(paragraphinuse.length+1);
  };

  const removeHandler2 = async (id,phraseid) => {
   
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      phraseid: phraseid,
      status:"unseen"
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   await axios.put(process.env.REACT_APP_URL + "/api/phrases/status", data, axiosConfig);

    var x = [...paragraphinuse];

    setparagraphall([...paragraphall, x[id]]);
    x.splice(id, 1);

    setparagraphinuse(x);
    setnumall(paragraphall.length+1);
        setnuminuse(x.length);
  };

  const textUpdate = (newText) => {

    
    let items = [...paragraphall];

    let item = {...items[newText[0].index]};
  
    item.text = newText[0].text;
   
    items[newText[0].index] = item;

   setparagraphall(items);

  };

  const textUpdate2 = (newText) => {

    let items = [...paragraphinuse];

    let item = {...items[newText[0].index]};
  
    item.text = newText[0].text;
   
    items[newText[0].index] = item;
   //console.log(newText[0].phraseid)

   setparagraphinuse(items);

  };
  const deleteHandler =async (index,phraseid) =>{
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        phraseid: phraseid
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.delete(process.env.REACT_APP_URL + '/api/phrases/delete', data, axiosConfig)
    .then((res) => {
    
    alert("Delete Section ID: ["+phraseid+"] Successful.")
    })
    .catch((err) => {
      alert("Delete Section ID: ["+phraseid+"] Failed.")
    });
    var x = [...paragraphall];
    x.splice(index, 1);
    setparagraphall(x);
    setnumall(x.length);
      
  }

  const deleteHandler2 =async (index,phraseid) =>{
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        phraseid: phraseid
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.delete(process.env.REACT_APP_URL + '/api/phrases/delete', data, axiosConfig)  .then((res) => {
    
      alert("Delete Section ID:"+phraseid+" Successful.")
      })
      .catch((err) => {
        alert("Delete Section ID:"+phraseid+" Failed.")
      });
    var x = [...paragraphinuse];
    x.splice(index, 1);
    setparagraphinuse(x);

    setnuminuse(x.length);
  }
  const onGetphrasemulti =async (newState)=>
  {
    
    const loadparagraphs = [];
    const loadinuse =[];

    for (const index in newState) {
      if(newState[index].status=="unseen"){
        if(newState[index].text!==''){
      loadparagraphs.push({
        phraseid: newState[index].phraseid,
        text: newState[index].text,
        pdfname: newState[index].pdf_text.pdffile.pdfname,
        page: newState[index].pdf_text.page_number,
        status: newState[index].status,
        sectionid: newState[index].sectionid
      });}
    }
      else{
        if(newState[index].text!==''){
        loadinuse.push({
          phraseid: newState[index].phraseid,
          text: newState[index].text,
          pdfname: newState[index].pdf_text.pdffile.pdfname,
          page: newState[index].pdf_text.page_number,
          status: newState[index].status,
          sectionid: newState[index].sectionid
        });
      }}

  }
  setparagraphinuse(loadinuse)
    setparagraphall(loadparagraphs);
    setnumall(loadparagraphs.length);
    setnuminuse(loadinuse.length);
  }
  const onSetkw =async (newState)=>
  {
    setkw(newState)
  }
  return isauth ? (
    <Auxi>
      <div className="content-header" style={{ padding: "1px .5rem", display: checkaccess ? "block" : "none"  }}>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">
                {props.match.params.tname}{" "}
                <i
                  className="fa fa-fw fa-info-circle"
                  style={{ fontSize: "18px" }}
                  onClick={showInfoModal}
                ></i>{" "}
              </h1>
              <Modal
                show={Infomodal}
                modalClosed={closeInfoModal}
                name="Topic information"
              >
                <div className={["card ", classes.Boxmodal].join(" ")}>
                  <div
                    className="card-header border-transparent "
                    style={{
                      padding: "0.2rem 1rem",
                      backgroundColor: "#52a5ff",
                    }}
                  >
                    <h3 className="card-title" style={{ color: "white" }}>
                      File(s) in this topic
                    </h3>
                    <div className="card-tools"></div>
                  </div>
                  <div className="card-body p-0 " style={{ overflow: "auto" }}>
                    <div>
                      <table
                        className="table m-0 text-nowrap"
                        style={{ overflow: "scroll" }}
                      >
                        <thead>
                          <tr>
                            <th>File name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {file.map((f) => (
                            <tr key={f.pdfid}>
                              <td style={{ color: "#007bff" }}>
                                <i className="fa fa-fw  fa-file-pdf"></i>
                                {f.pdfname}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className={["card card-info", classes.Boxmodal].join(" ")}>
                  <div
                    className="card-header border-transparent "
                    style={{ padding: "0.2rem 1rem" }}
                  >
                    <h3 className="card-title" style={{ color: "white" }}>
                      Keyword group(s) in this topic
                    </h3>
                    <div className="card-tools"></div>
                  </div>
                  <div className="card-body p-0 " style={{ overflow: "auto" }}>
                    <div>
                      <table
                        className="table m-0 text-nowrap"
                        style={{ overflow: "scroll" }}
                      >
                        <thead>
                          <tr>
                            <th>Keyword group name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kwgroup.map((k) => (
                            <tr key={k.keywordgroupsid}>
                              <td style={{ color: "#17a2b8" }}>
                                <i className="fa fa-fw  fa-folder"></i>
                                {k.groupname}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>

            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <NavLink
                    to={
                      "/projects/" +
                      props.match.params.pname +
                      "/" +
                      props.match.params.id
                    }
                  >
                    {props.match.params.pname}
                  </NavLink>
                </li>
                <li className="breadcrumb-item active">
                  {" "}
                  {props.match.params.tname}{" "}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content" style={{ display: checkaccess ? "block" : "none"  }}>
        <div className="container-fluid">
          <div className="row">
            <div className={["card card-info", classes.Box].join(" ")}>
              <div
                className="card-header border-transparent "
                style={{ padding: "0.2rem 1rem" }}
              >
                <h3 className="card-title">Keyword(s)
              </h3>
                <div className="card-tools">
                  <button
                      type="button"
                      className={[
                        "btn btn-block btn-success",
                        classes.Searchmulti,
                      ].join(" ")}
                      onClick={showsearchmultiModal}
                    >  <i
                    className="fa fa-fw  fa-search"
                    style={{ fontSize: "12px",paddingRight:"3px" ,paddingleft:"0"}}
                    data-toggle="tooltip"
                    data-placement="top"
                    title={"Search with multi-keywords"}
                  ></i>
                            Multi-keywords
                    </button>
                    <Modal
                        show={showsearchmulti}
                        modalClosed={closesearchmultiModal}
                        name="Search with multi-keywords"
                      >
                      
                      <Multisearch tid={props.match.params.tid} cancel={()=>closesearchmultiModal()} onGetphrasemulti={onGetphrasemulti} onSetkw={onSetkw}/>
                      
                      </Modal>
                </div>
              </div>
              <div className="card-body p-0 " style={{ overflow: "auto" }}>


                {kwgroupinfo.map((k)=>(
                <div key={k.keywordgroupsid} className="list-group" style={{ margin: "5px" }}>
                  <button
                    type="button"
                    className="list-group-item-info active "
                    disabled
                    style={{
                      height: "30px",
                      fontSize: "15px",
                      padding: "0.03rem 0.75rem",
                      borderTopRightRadius: "0.25rem",
                      borderTopLeftRadius: "0.25rem",
                    }}
                  >
                    {k.groupname}
                  </button>
                  {k.keywords.map((keyword)=>( 
                  <button
                    key={keyword.kid}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => getParagraphs(keyword.kid,keyword.keywordtext)}
                    style={{ padding: "0.03rem 0.75rem" }}
                  >
                    {keyword.keywordtext}
                  </button>))}
                </div>))}
              </div>
            </div>

            <div className={["card card-info", classes.Box2].join(" ")}>
              <div
                className="card-header border-transparent "
                style={{ padding: "0.2rem 1rem", backgroundColor: "#66bfed" }}
              >
                <h3 className="card-title">{numall} section(s)</h3>
                <div className="card-tools text-truncate"  data-toggle="tooltip"
                data-placement="top"
                title={kw.join("+")} style={{width:"400px",float:"right",textAlign: "right"}}>{kw.join("+")}</div>
              </div>
              <div className="card-body p-0 " style={{ overflow: "auto" }}>
                <div style={{ overflow: "auto", height: "600px" }}>
                  {paragraphall.map((p, i) => (
                    <div
                      className="card card-info"
                      id={p.phraseid}
                      key={p.phraseid}
                      style={{ margin: "10px" }}
                    >
                      <div
                        className="card-header border-transparent "
                        style={{
                          padding: "0.2rem 1rem",
                          backgroundColor: "#66bfed",
                        }}
                      >
                        <h3 className="card-title">
                          {" "}
                          Section ID: {p.sectionid}
                        </h3>
                        <div className="card-tools">
                          <i
                            className="fa fa-fw fa-plus-square"
                            style={{ fontSize: "18px" }}
                            onClick={() => removeHandler(i,p.phraseid)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Add to in use section"}
                          ></i>
                          <a
                            href={
                              "/upload/" +
                              props.match.params.id +
                              "/" +
                              p.pdfname +
                              "#page=" +
                              p.page
                            }
                            target="_blank"
                          >
                            <i
                              className="fa fa-fw fa-file-pdf"
                              style={{ fontSize: "18px" }}
                              data-toggle="tooltip"
                              data-placement="top"
                              title={"Show in pdf"}
                            ></i>
                          </a>
                          <i
                            className="fa fa-fw fa-edit"
                            style={{ fontSize: "18px" }}
                            onClick={()=>showEdittextModal(p.text, i ,p.phraseid)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Edit"}
                          ></i>
                          <i
                            className="fa fa-fw fa-trash"
                            style={{ fontSize: "18px" }}
                            data-toggle="tooltip"
                            data-placement="top"
                            onClick={()=>deleteHandler(i,p.phraseid)}
                            title={"Delete"}
                          ></i>
                        </div>
                      </div>
                      <div className="card-body">
                        
                      <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={kw}
    autoEscape={true}
    textToHighlight={p.text}
  />
                        
                       </div>
                      <div className="card-footer">
                        <span style={{ float: "left" }}> page: {p.page}</span>
                        <span style={{ float: "right" }}>
                          File:{" "}
                          <a
                            href={
                              "/upload/" +
                              props.match.params.id +
                              "/" +
                              p.pdfname +
                              "#page=" +
                              p.page
                            }
                            target="_blank"
                          >
                            {p.pdfname}
                          </a>
                        </span>
                      </div>
                   
                      <Modal
                        show={Edittext}
                        modalClosed={closeEdittextModal}
                        name="Edit text section"
                      >
                      
                        <Textedit
                          id={p.phraseid}
                          key={i}
                          textinfo={textinfo}
                          onUpdate={textUpdate}
                          index={i}
                          modalClosed={closeEdittextModal}
                        />
                      </Modal>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={["card card-primary", classes.Box3].join(" ")}>
              <div
                className="card-header border-transparent "
                style={{ padding: "0.2rem 1rem" }}
              >
                <h3 className="card-title">{numinuse} in use</h3>
                <div className="card-tools text-truncate"  data-toggle="tooltip"
                data-placement="top"
                title={kw.join("+")} style={{width:"400px",float:"right",textAlign: "right"}}>{kw.join("+")}</div>
              </div>
              <div className="card-body p-0 " style={{ overflow: "auto" }}>
                <div style={{ overflow: "auto", height: "600px" }}>
                  {paragraphinuse.map((p, i) => (
                    <div
                      className="card card-info"
                      id={p.phraseid}
                      key={p.phraseid}
                      style={{ margin: "10px" }}
                    >
                      <div
                        className="card-header border-transparent "
                        style={{
                          padding: "0.2rem 1rem",
                          backgroundColor: "#007bff",
                        }}
                      >
                        <h3 className="card-title">
                          Section ID: {p.sectionid}
                        </h3>
                        <div className="card-tools">
                          <i
                            className="fa fa-fw fa-minus-square"
                            style={{ fontSize: "18px" }}
                            onClick={() => removeHandler2(i,p.phraseid)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Remove from in use section"}
                          ></i>
                          <a
                            href={
                              "/upload/" +
                              props.match.params.id +
                              "/" +
                              p.pdfname +
                              "#page=" +
                              p.page
                            }
                            target="_blank"
                          >
                            <i
                              className="fa fa-fw fa-file-pdf"
                              style={{ fontSize: "18px" }}
                              data-toggle="tooltip"
                              data-placement="top"
                              title={"Show in pdf"}
                            ></i>
                          </a>
                          <i
                            className="fa fa-fw fa-edit"
                            style={{ fontSize: "18px" }}
                            data-toggle="tooltip"
                            onClick={()=>showEdittextModal2(p.text,i,p.phraseid)}
                            data-placement="top"
                            title={"Edit"}
                          ></i>
                          <i
                            className="fa fa-fw fa-trash"
                            style={{ fontSize: "18px" }}
                            data-toggle="tooltip"
                            onClick={()=>deleteHandler2(i,p.phraseid)}
                            data-placement="top"
             
                            title={"Delete"}
                          ></i>
                        </div>
                      </div>
                      <div className="card-body"> <Highlighter
    highlightClassName="YourHighlightClass"
    searchWords={kw}
    autoEscape={true}
    textToHighlight={p.text}
  /></div>
                      <div className="card-footer">
                        <span style={{ float: "left" }}> page: {p.page}</span>
                        <span style={{ float: "right" }}>
                          File:{" "}
                          <a
                            href={
                              "/upload/" +
                              props.match.params.id +
                              "/" +
                              p.pdfname +
                              "#page=" +
                              p.page
                            }
                            target="_blank"
                          >
                            {p.pdfname}
                          </a>
                        </span>
                      </div>
                      <Modal
                        show={Edittext2}
                        modalClosed={closeEdittextModal2}
                        name="Edit text section"
                      >
                         <Textedit
                          id={p.phraseid}
                          key={i}
                          textinfo={textinfo}
                          onUpdate={textUpdate2}
                          index={i}
                          modalClosed={closeEdittextModal2}
                        />
                        {/* <Ckeditor
                          id={p.phraseid}
                          key={i}
                          textinfo={textinfo}
                          onUpdate={textUpdate2}
                          index={i}
                          modalClosed={closeEdittextModal2}
                        /> */}
                      </Modal>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auxi>
  ) : (
    <Errorpage></Errorpage>
  );
};

export default topics;
