import React, { useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import FullEditor from "ckeditor5-build-full";
import Auxi from "../../../hoc/Auxi";
import ReactHtmlParser from "react-html-parser";
import "./Ckeditor.css";
import config from "../../../config.json";
import axios from "axios";
const topics = (props) => {
  const [content, setcontent] = useState("hthrhtrhtr");

  console.log(props.index);
  //   useEffect(() => {

  //     let source = axios.CancelToken.source();
  //     const keywordgroupinfo = [];
  //     let data = {
  //         params: {
  //             "uid": localStorage.getItem("uid"),
  //             "access_token": localStorage.getItem("access_token"),
  //             "tid": 1
  //         }
  //     }
  //     let axiosConfig = {
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     }
  //     axios.get(config.URL + '/api/keywords/topic/keywords', data, axiosConfig, { cancelToken: source.token })
  //         .then((res) => {
  //       setcontent(res.data[0].keywordgroup.groupname);
  //             // for (const index in res.data.keywordgroups) {
  //             //     keywordgroupinfo.push({
  //             //         keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
  //             //         groupname: res.data.keywordgroups[index].groupname
  //             //     })
  //             // }

  //         })
  //         .catch((err) => {
  //             alert("Show keyword(s) Failed");
  //         })
  //     return () => {
  //         source.cancel();
  //     }
  // }, [])
  const handleChange = (event, editor) => {
    // const target = event.target.value;
    const data = editor.getData();
    setcontent(data);
  }; //<textarea cols="25" row="14" type="text" name="content" value={content} onChange={handleChange}/>

  FullEditor.defaultConfig = {
    toolbar: [
      "bold",
      "italic",
      "|",
      "highlight:yellowMarker",
      "removeHighlight",
      "|",
      "undo",
      "redo",
    ],

    language: "en",
  };
  const Updatetext = () => {
    let x = [];
    x.push({
      index: props.index,
      text: content,
    });
    props.onUpdate(x);
  };

  return (
    <Auxi>
      <CKEditor
        editor={FullEditor}
        onInit={(editor) => {}}
        onChange={handleChange}
        data={content}
      />
      <button onClick={Updatetext}>Ok</button>
      {/* <div>
{ReactHtmlParser(content)}
 </div> */}
    </Auxi>
  );
};

export default topics;
