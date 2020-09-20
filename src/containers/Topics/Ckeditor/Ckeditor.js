import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import FullEditor from "ckeditor5-build-full";
import Auxi from "../../../hoc/Auxi";
import "./Ckeditor.css";
import Button from '../../../components/UI/Button/Button';
import config from "../../../config.json";
import axios from "axios";

const topics = (props) => {
  const [content, setcontent] = useState("");
  
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setcontent(data);
  };

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
  const Updatetext = async () => {
    let textinfo = [];
 
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      phraseid: props.textinfo.phraseid,
      text: content
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };   
    console.log(data)
    textinfo.push({
      index: props.textinfo.index,
      text: content,
      phraseid: props.textinfo.phraseid
    });
    await axios.put(config.URL + "/api/phrases/edit", data, axiosConfig);
    await props.onUpdate(textinfo);
    await props.modalClosed();
  };

  return (
    <Auxi>
      <div style={{ height:"300px", overflowY:"auto"}}>
      <CKEditor
        editor={FullEditor}
        onInit={(editor) => {}}
        onChange={handleChange}
        data={props.textinfo.text}
      />
      <Button btnType="Save" clicked={Updatetext}>Ok</Button></div>
    </Auxi>
  );
};

export default topics;
