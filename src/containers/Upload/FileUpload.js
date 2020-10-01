import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import config from "../../config.json";

const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [type, settype] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [desc, setdesc] = useState("");
  const onChange = (e) => {
    setFile(e.target.files[0]);

    if (e.target.files[0] !== undefined) setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", desc);
    formData.append("uid", localStorage.getItem("uid"));
    formData.append("pid", props.pid);
    formData.append("access_token", localStorage.getItem("access_token"));

    try {
      const res = await axios.post(process.env.REACT_APP_URL + "/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
         
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 5000);
        },
      });
 onGetfiles();
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      settype(true);
      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
        settype(false);
      } else if (err.response.status === 400) {
        setMessage("File name has already exist!");
        settype(false);
      } else {
        settype(false);
        setMessage(err.response.data.msg);
      }
    }
  };

  const onGetfiles = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.webid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(process.env.REACT_APP_URL + "/api/files", data, axiosConfig)
      .then((res) => {
        props.onGetfiles(res.data);
      })
      .catch((err) => {
        //alert("Show all files Failed");
        localStorage.clear();
      });
  };

  return (
    <Fragment>
      {message ? <Message msg={message} type={type} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
            accept=".pdf"
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <Progress percentage={uploadPercentage} />
        Description: 
        <input
          type="text"
          style={{ marginTop: "3px", height: "25px" }}
          onChange={(e) => setdesc(e.target.value)}
        />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
