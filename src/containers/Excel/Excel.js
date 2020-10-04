import React, { useState, useEffect } from "react";
import Errorpage from "../../components/UI/Errorpage/Errorpage";
import Auxi from "../../hoc/Auxi";
import config from "../../config.json";
import axios from "axios";
import classes from "./Excel.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { NavLink } from "react-router-dom";

const Projects = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [checkaccess, setcheckaccess] = useState(false);
  const [exceldata,setexceldata] = useState([]);
  const [numexcel,setnumexcel] =useState(0);
  useEffect(() => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.match.params.id,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/projects/checkaccess", data, axiosConfig)
      .then((res) => {
        if (res.data.status == true) {
          setcheckaccess(true);
        } else {
          setcheckaccess(false);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadexceldata = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.match.params.id,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/excel", data, axiosConfig, { cancelToken: source.token,})
      .then((res) => {
        console.log(res.data)
        for (const index in res.data) {
  
          loadexceldata.push({
 phraseid: res.data[index].phraseid,
                     file: res.data[index].pdfname,
                      page : res.data[index].page_number,
                     tname: res.data[index].tname,
                     groupname: res.data[index].groupname,
      keyword: res.data[index].keywordtext,
     text: res.data[index].text
                
          });
        }
      setexceldata(loadexceldata);
      setnumexcel(loadexceldata.length);
      })
      .catch((err) => {
        //alert("Show data Failed");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);
  

  return isauth ? (
    <Auxi>
     <div className="content-header" style={{ padding: "1px .5rem", display: checkaccess ? "block" : "none"  }}>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Export project  <ReactHTMLTableToExcel  
                                                className="btn btn-info"  
                                                table="emp"  
                                                filename={props.match.params.pname + "_project"} 
                                                sheet="Project"  
                                                buttonText="Download" /> </h1>
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

                  {props.match.params.pname} Export
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className={["card", classes.Box].join(" ")}>
            <div
              className="card-header border-transparent "
              style={{ padding: "0.2rem 1rem", backgroundColor: "#66bfed" }}
            >
              <h3 className="card-title" style={{ color: "white" }}>
              {props.match.params.pname} project has {numexcel} in use section(s)
              </h3>
              <div className="card-tools">
              
              </div>
            </div>
            <div className="card-body p-0 " style={{ overflow: "auto" }}>
        
                    <table id="emp"
                      className="table m-0 text-nowrap"
                      style={{ overflow: "scroll" }}
                    >
                      <thead>
                        <tr> 
                          <th>No.</th>
                          <th>File</th>
                         <th>Page</th>
                         <th>Topic name</th>
                         <th>Keyword group name</th>
                          <th>Keyword</th>
                          <th>Text</th>   
                        </tr>
                      </thead>
                      <tbody>
                      {exceldata.map((data,index) => (
                         <tr key={data.phraseid}>     
                         <td>{index+1}</td>
                         <td>{data.file}</td> 
                       <td>{data.page}</td>       
                        <td>{data.tname}</td>
                        <td>{data.groupname}</td>    
                        <td>{data.keyword}</td>
                        <td>{data.text}</td>
                     </tr>
                        ))}

                     {/* <tr>     
                     <td>No.</td>
                         <td>BTS.pdf</td> 
                       <td>44</td>       
                        <td>Social</td>
                        <td>สื่อโฆษณา</td>
                        <td>นงาน 24 ภาวะอุตสาหกรรม และแนวโน้มธุรกิจ2.1 ประวัติความเป็นมา 262.2 เหตุการณ์สำคัญในปี 2561/62 282.3 ภาพรวมธุรกิจและภาวะอุตสาหกรรม - ธุรกิจระบบขนส่งมวลชน 312.4 ภาพรวมธุรกิจและภาวะอุตสาหกรรม - ธุรกิจสื่อโฆษณา 402.5 ภาพรวมธุรกิจและภาวะอุตสาหกรรม - ธุรกิจอสังหาริมทรัพย์ 442.6 ภาพรวมธุรกิจและภาวะอุตสาหกรรม - ธุรกิจบริการ 472.7 การประเมินผลการดำเนินงานเทียบกับเป้าหมายปี 2561/62 49 2.8 แนวโน้มธุรกิจปี 2562/63</td>
                     </tr>   */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
       
       
      
       
      </div>
    </Auxi>
  ) : (
    <Errorpage></Errorpage>
  );
};

export default Projects;
