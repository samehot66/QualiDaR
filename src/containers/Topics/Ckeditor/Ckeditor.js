import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import FullEditor from "ckeditor5-build-full";
import Auxi from "../../../hoc/Auxi";
import "./Ckeditor.css";
import Button from '../../../components/UI/Button/Button';

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
    textinfo.push({
      index: props.textinfo.index,
      text: content,
      phraseid: props.textinfo.phraseid
    });
    await props.onUpdate(textinfo);
    await props.modalClosed();
  };

  return (
    <Auxi>
      <CKEditor
        editor={FullEditor}
        onInit={(editor) => {}}
        onChange={handleChange}
        data={props.textinfo.text}
      />
      <Button btnType="Save" clicked={Updatetext}>Ok</Button>
    </Auxi>
  );
};

export default topics;
