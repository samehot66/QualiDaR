import React, { useState, useEffect, useMemo, useCallback } from "react";
import Ckeditor from "./Ckeditor/Ckeditor";
import { NavLink } from "react-router-dom";
import Errorpage from "../../components/UI/Errorpage/Errorpage";
import Auxi from "../../hoc/Auxi";
import classes from "./Topics.css";
import config from "../../config.json";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";
import ReactHtmlParser from "react-html-parser";

const topics = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [Infomodal, setInfomodal] = useState(false);
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
  const [kw, setkw] = useState("");
  const [paragraphall, setparagraphall] = useState([]);
  const [paragraphinuse, setparagraphinuse] = useState([]);
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
      .get(config.URL + "/api/topics/detail", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
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
        alert("Show info Failed");
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
      .get(config.URL + "/api/keywords/topic/keywords", data, axiosConfig, {
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
        alert("Show keyword(s) Failed");
      });
    return () => {
      source.cancel();
    };
  }, []);

  const getParagraphs = (kwindex,kw) => {
    const loadparagraphs = [];
    console.log(kwindex);
    loadparagraphs.push({
      phraseid: "1",
      text:
        "คาดการณ์ว่าจะเพิ่ม มากขึ้นเรื่อยๆ เนื่องจากแคมเปญต่างๆ เริ่มหันมาใช้การสื่อสารกับ ลูกค้าผ่านสื่อโฆษณาในหลากหลายช่องทางมากยิ่งขึ้นนอกจากนีรายงานของ Future Market Insights ได้คาดว่าช่วง ปี 2561 – 2571 สื่อโฆษณานอกบ้านแบบดิจิทัลทั่วโลกจะเติบโตเพิ่มขึ้นอย่างต่อเนื่องกว่า 11.0% ต่อปี ด้วยศักยภาพในการเชื่อมโยงระหว่างสื่อโฆษณานอกบ้านและสื่อโฆษณาทางออนไลน์/ดิจิทัล ทำให้สามารถ นำเสนอสื่อโฆษณาที่มีคุณภาพได้หลากหลาย",
      pdfname: "BTS.pdf",
      page: "44",

      status: "unseen",
    });
    loadparagraphs.push({
      phraseid: "2",
      text:
        "โฆษณานอกบ้านและสื่อโฆษณาทางออนไลน์/ดิจิทัล ทำให้สามารถ นำเสนอสื่อโฆษณาที่มีคุณภาพได้หลากหลายมิติ รวมไปถึงการเลือกเป้าหมายได้อย่างแม่นยำพร้อมทั้งให้ผลลัพธ์การวัดผลที่มีประสิทธิภาพที่มากขึ้น ด้วยเหตุนี้สื่อโฆษณาทั้งสองรูปแบบจะสามารถครอง ส่วนแบ่งตลาดจากการใช้จ่ายด้านโฆษณาจากรูปแบบอื่นๆ โดยเฉพาะ ในส่วนของสื่อโฆษณาแบบดั้งเดิมได้มากยิ่งขึ้น ภาพรวมธุรกิจและภาวะอุตสาหกรรม:ธุรกิจสื่อโฆษณา",
      pdfname: "BTS.pdf",
      page: "44",

      status: "unseen",
    });
    setparagraphall(loadparagraphs);
    setkw(kw);
  };

  const removeHandler = (id) => {
    var x = [...paragraphall];

    setparagraphinuse([...paragraphinuse, x[id]]);
    console.log(paragraphinuse);
    x.splice(id, 1);

    setparagraphall(x);
  };

  const removeHandler2 = (id) => {
    var x = [...paragraphinuse];

    setparagraphall([...paragraphall, x[id]]);
    x.splice(id, 1);

    setparagraphinuse(x);
  };

  const textUpdate = (newText) => {

    console.log(newText[0].phraseid)
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
   console.log(newText[0].phraseid)

   setparagraphinuse(items);

  };
  return isauth ? (
    <Auxi>
      <div className="content-header" style={{ padding: "1px .5rem" }}>
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
                                {" "}
                                <i className="fa fa-fw  fa-folder"></i>{" "}
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
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className={["card card-info", classes.Box].join(" ")}>
              <div
                className="card-header border-transparent "
                style={{ padding: "0.2rem 1rem" }}
              >
                <h3 className="card-title">Keyword(s)</h3>
                <div className="card-tools">
                  <input
                    type="text"
                    className="form-control"
                    style={{ height: "1.25rem", width: "120px" }}
                    placeholder="Search..."
                  />
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
                <h3 className="card-title"> Paragarph(s)</h3>
                <div className="card-tools">{kw}</div>
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
                          Paragraph ID: {p.phraseid}
                        </h3>
                        <div className="card-tools">
                          <i
                            className="fa fa-fw fa-plus-square"
                            style={{ fontSize: "18px" }}
                            onClick={() => removeHandler(i)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Add to in use paragraph"}
                          ></i>
                          <a
                            href={
                              "./upload/" +
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
                            title={"Delete"}
                          ></i>
                        </div>
                      </div>
                      <div className="card-body">{ReactHtmlParser(p.text)}</div>
                      <div className="card-footer">
                        <span style={{ float: "left" }}> page: {p.page}</span>
                        <span style={{ float: "right" }}>
                          File:{" "}
                          <a
                            href={
                              "./upload/" +
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
                        name="Edit paragraph"
                      >
                        <Ckeditor
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
                <h3 className="card-title">In use</h3>
                <div className="card-tools">{kw}</div>
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
                          {" "}
                          Paragraph ID: {p.phraseid}
                        </h3>
                        <div className="card-tools">
                          <i
                            className="fa fa-fw fa-minus-square"
                            style={{ fontSize: "18px" }}
                            onClick={() => removeHandler2(i)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={"Add to in use paragraph"}
                          ></i>
                          <a
                            href={
                              "./upload/" +
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
                            data-placement="top"
                            title={"Delete"}
                          ></i>
                        </div>
                      </div>
                      <div className="card-body">{ReactHtmlParser(p.text)}</div>
                      <div className="card-footer">
                        <span style={{ float: "left" }}> page: {p.page}</span>
                        <span style={{ float: "right" }}>
                          File:{" "}
                          <a
                            href={
                              "./upload/" +
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
                        name="Edit paragraph"
                      >
                        <Ckeditor
                          id={p.phraseid}
                          key={i}
                          textinfo={textinfo}
                          onUpdate={textUpdate2}
                          index={i}
                          modalClosed={closeEdittextModal2}
                        />
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
