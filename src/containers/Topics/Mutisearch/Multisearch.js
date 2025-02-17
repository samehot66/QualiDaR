import React, { useState, useEffect } from "react";
import Errorpage from "../../../components/UI/Errorpage/Errorpage";
import classes from "./Multisearch.css";
import Auxi from "../../../hoc/Auxi";
//import config from "../../../config.json";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";

const Setfile = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [allkeywords, setallkeywords] = useState([]);
  const [search, setsearch] = useState("");
  const [allkeywordsfilterserch, setallkeywordsfilterserch] = useState([]);
  const [inusekeyword, setinusekeyword] = useState([]);
  useEffect(() => {
    const keywords = [];
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.tid,
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
       // console.log(res.data[0])
        for(const index in res.data[0].keywordgroups)
        {
          for(const index2 in res.data[0].keywordgroups[index].keywords)
          {
             keywords.push({
              kid: res.data[0].keywordgroups[index].keywords[index2].kid,
              groupname:  res.data[0].keywordgroups[index].groupname,   
              keywordtext: res.data[0].keywordgroups[index].keywords[index2].keywordtext
          })      
           
          }
        }
          // keywords.push({
          //     keywordgroupsid: res.data[0].keywordgroups[index].keywords[index2].kid,
          //     groupname:  res.data[0].keywordgroups[index].groupname,   
          //     keywords: res.data[0].keywordgroups[index].keywords[index2].keywordtext
          // })      
         // keywordgroups[0].keywords[0].kid
      
        setallkeywords(keywords);   
      })
      .catch((err) => {
        //alert("Show keywords Failed!");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    setallkeywordsfilterserch(
      allkeywords.filter((keywords) => {
        return keywords.keywordtext
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, allkeywords]);

  const addKeywordHandler =(keywords,indexstate)=>{
    let x =[...inusekeyword];
    console.log(indexstate)
    let check = false;
    for (let index = 0; index < x.length; index++) { 
        if(x[index].kid===keywords.kid)
        {
            check = true
        } 
    } 
    if(check==false)
    {
       x.push(keywords)
    }
     setinusekeyword(x)
    let y = [...allkeywords];
    y.splice(indexstate, 1);
    setallkeywords(y);
   
  }
  const removeKeywordHandler=(index)=>{

   
    let x = [...inusekeyword] 
    
    setallkeywords([...allkeywords, x[index]]);
  
    x.splice(index, 1);
    setinusekeyword(x)
  }

  const onSearch= async()=>{
      let setkw=[];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        keywords: inusekeyword,
        tid:props.tid
      },
    };
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   // console.log(data)
    await axios
      .get(process.env.REACT_APP_URL + "/api/phrases/multi", data, axiosConfig)
      .then((res) => {
       
  props.onGetphrasemulti(res.data)
      })
      .catch((err) => {
        alert("Show keywords Failed!");
      });
    for (let index = 0; index < inusekeyword.length; index++) { 
       setkw.push(inusekeyword[index].keywordtext)
    } 
      await props.onSetkw(setkw);
      await props.cancel();
  }
  const clearkw=()=>{
      let x = [...allkeywords];
      let y = [...inusekeyword];
      let z = x.concat(y);
      setallkeywords(z);
      setinusekeyword([]);
  }
  return isauth ? (
    <Auxi>
      <div className={["card card-primary", classes.Box].join(" ")}>
        <div
          className="card-header border-transparent "
          style={{ padding: "0.2rem 1rem" }}
        >
          <h3 className="card-title">Keyword(s) </h3>
          <div className="card-tools">
          <input
                  type="text"
                  className="form-control"
                  style={{ height: "1.25rem" }}
                  placeholder="Search..."
                  onChange={(e) => setsearch(e.target.value)}
                />

          </div>
        </div>
        <div className="card-body p-0 " style={{ overflow: "auto" }}>
          <table
            className="table m-0 text-nowrap"
            style={{ overflow: "scroll" }}
          >
             <thead>
                    <tr>
                      <th>Name</th>
                      <th>Group name</th>
                      <th>Tool(s)</th>
                    </tr>
                  </thead>
            <tbody>
              {allkeywordsfilterserch.map((keywords,index) => (
                <tr key={keywords.kid}>
                     <td>
                          <i
                            className="fa fa-fw fa-file-word"
                            style={{ color: "#4c96ed" }}
                          ></i>
                          {keywords.keywordtext}
                        </td>
                        <td>
                          {keywords.groupname}
                        </td>
                  <td>
                    <i
                      id={keywords.kid}
                      className="fa fa-fw fa-plus-square"
                      style={{ fontSize: "18px", color: "#007bff" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                      onClick={() => addKeywordHandler(keywords,index)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={["card card-info", classes.Box].join(" ")}>
        <div
          className="card-header border-transparent "
          style={{ padding: "0.2rem 1rem" }}
        >
          <h3 className="card-title">Keyword(s) for search</h3>
          <div className="card-tools">
          <button
                      type="button"
                      className={[
                        "btn btn-block btn-danger",
                        classes.Clearkw,
                      ].join(" ")}
                      onClick={clearkw}
                    >  
                            Clear
                    </button>
          </div>
        </div>
        <div className="card-body p-0 " style={{ overflow: "auto" }}>
          <div>
            <table
              className="table m-0 text-nowrap"
              style={{ overflow: "scroll" }}
            >
              <thead>
                    <tr>
                    <th>Name</th>
                      <th>Group name</th>
                      <th>Tool(s)</th>
                    </tr>
                  </thead>
            <tbody>
            {inusekeyword.map((keywords,index) => (
                <tr key={keywords.kid}>
                     <td>
                          <i
                            className="fa fa-fw fa-file-word"
                           style={{ color: "#17a2b8" }}
                          ></i>
                          {keywords.keywordtext}
                        </td>
                        <td>
                          {keywords.groupname}
                        </td>
                  <td>
                    <i
                      id={keywords.kid}
                      className="fa fa-fw fa-minus-square"
                      style={{ fontSize: "18px", color: "#FF5533" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                      onClick={() => removeKeywordHandler(index)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
      <Button btnType="Searchmultikey" clicked={onSearch}>Search</Button>
    </Auxi>
  ) : (
    <Errorpage></Errorpage>
  );
};

export default Setfile;
