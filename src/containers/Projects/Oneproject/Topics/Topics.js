import React, { useState, useEffect } from "react";
import Modal from "../../../../components/UI/Modal/Modal";
import config from "../../../../config.json";
import Button2 from "../../../../components/UI/Button/Button";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Edittopic from "./Edittopics";
import Settingfile from "../Setting/Setttingfile/Settingfile";
import Settingkeyword from "../Setting/Settingkeyword/Settingkeyword";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Auxi from '../../../../hoc/Auxi';
import Settingwordlength from '../Setting/Settingwordlength/Settingwordlength';
const topic = (props) => {

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Setting file(s)', 'Setting keyword group(s)', 'Setting word length'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Settingfile pid={props.webid} tid={props.tid} />;
    case 1:
      return   <Settingkeyword pid={props.webid} tid={props.tid} />;
    case 2:
      return  <Settingwordlength cancel={handleNext} onSetwordlength={Setwordlength} />;
    default:
      return 'Unknown step';
  }
}
const [wordlength,setwordlength]=useState(200);
const Setwordlength = (newState) =>{
  let length = newState;
  setwordlength(length);
}
const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
   
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [numinuse,setnuminuse] =useState(0);
  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => {
    setDeletemodal(true);
  };
  const closeDeleteModal = () => {
    setDeletemodal(false);
  };

  const [Editmodal, setEditmodal] = useState(false);
  const showEditModal = () => {
    setEditmodal(true);
  };
  const closeEditModal = () => {
    setEditmodal(false);
  };

  const [Settingmodal, setSettingmodal] = useState(false);
  const showSettingModal = () => {
    setSettingmodal(true);
  };
  const closeSettingModal = () => {
    setSettingmodal(false);
  };
  const [done,setdone] =useState(props.done);
  const closeSettingModal2 = async() => {
    alert("Start extracting ["+ props.tname + "] topic...");
    setSettingmodal(false);
    setdone(false);
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      tid: props.tid,
      done: false,
      wordlength: wordlength
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(process.env.REACT_APP_URL + "/api/topics/finish", data, axiosConfig).then((res) => {
      setdone(true);
    })
    .catch((err) => {
      alert("Processing Failed");
      setdone(false);
    });

  
    await onGettopics();
  };

  const [Setfilemodal, setSetfilemodal] = useState(false);
  const showSetfileModal = () => {
    setSetfilemodal(true);
  };
  const closeSetfileModal = () => {
    setSetfilemodal(false);
  };

  const [Setkeywordgroupmodal, setSetkeywordgroupmodal] = useState(false);
  const showSetkeywordgroupModal = () => {
    setSetkeywordgroupmodal(true);
  };
  const closeSetkeywordgroupModal = () => {
    setSetkeywordgroupmodal(false);
  };

  const deleteHandler = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.tid
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.delete(process.env.REACT_APP_URL + '/api/topics', data, axiosConfig)
    await onGettopics();
    closeDeleteModal();
  };

  const onGettopics = async () => {
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
      .get(process.env.REACT_APP_URL + "/api/topics", data, axiosConfig)
      .then((res) => {
        props.onGettopics(res.data);
      })
      .catch((err) => {
        //alert("Show all files Failed");
        localStorage.clear();
      });
  };

  const onGettopicafteredit=(newState) =>{
    //console.log(newState)
    props.onGettopics(newState);
  }

  useEffect(() => {
    let numinuse = 0;
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
      .get(process.env.REACT_APP_URL + "/api/topics/numinuse", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
       numinuse = res.data[0].sectionCount;
       setnuminuse(res.data[0].sectionCount);
    
      })
      .catch((err) => {});
    return () => {
      source.cancel();
    };
  }, []);



  return (
    <tr>
      {done ? (
        <td>
          <i className="fa fa-fw  fa-archive" style={{ color: "#007bff" }}></i>
          <NavLink
            to={
              "/projects/" +
              props.pname +
              "/" +
              props.webid +
              "/" +
              props.tname +
              "/" +
              props.tid
            }
          >

            {props.tname}
          </NavLink>
        </td>
      ) : (
        <td style={{ color: "#007bff" }}>
          <i className="fa fa-fw  fa-archive"></i> {props.tname}
        </td>
      )}

      {done ? (
        <td style={{ color: "green" }}>Done</td>
      ) : (
        <td style={{ color: "red" }}>Wait start/Extracting...</td>
      )}
      <td>{numinuse}</td>
      <td>
          <i
            className="fa fa-fw fa-play"
            style={{ fontSize: "18px" }}
            onClick={showSettingModal}
            data-toggle="tooltip"
            data-placement="top"
            title={"Start Process"}
          ></i>

        <i
          className="fa fa-fw fa-edit"
          style={{ fontSize: "18px" }}
          onClick={showEditModal}
          data-toggle="tooltip"
          data-placement="top"
          title={"Edit"}
        ></i>
        {props.owner == localStorage.getItem("email") && done ? (
          <i
            className="fa fa-fw fa-trash"
            style={{ fontSize: "18px" }}
            onClick={showDeleteModal}
            data-toggle="tooltip"
            data-placement="top"
            title={"Delete"}
          ></i>
        ) : null}
     
        <Modal
          show={Settingmodal}
          modalClosed={closeSettingModal}
          name="Setting for process"
          settingtype={true}
        >
 <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
      
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
          
            <div style={{ fontSize: "22px", textAlign: "center" }}>
            Are you sure to start processing this topic?
          </div>
          <Button2 btnType="Starttopic" clicked={closeSettingModal2}>
            Process
          </Button2>
          <Button2 btnType="Cancletopic" clicked={closeSettingModal}>
            Cancel
          </Button2>
          
            <Button onClick={handleReset}  color="primary"  className={classes.button}>
              REDO
            </Button> 
          </div>
        ) : (
          <div>
          {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
            
              {activeStep ===2 ? '' :
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {'Next'}
              </Button> }
            </div>
          </div>
        )}
      </div>
    </div>
        </Modal>
        <Modal
          show={Editmodal}
          modalClosed={closeEditModal}
          name="Edit a topic name"
        >
          <Edittopic
            tid={props.tid}
            tname={props.tname}
            cancel={closeEditModal}
            onGettopicafteredit={onGettopicafteredit}
            webid={props.webid}
          />
        </Modal>
        <Modal
          show={Deletemodal}
          modalClosed={closeDeleteModal}
          name="Delete a topic from project"
        >
          <div style={{ fontSize: "22px", textAlign: "center" }}>
            Are you sure to delete
            <span style={{ color: "blue" }}> {props.tname} </span>
            topic?
          </div>
          <Button2 btnType="Success" clicked={deleteHandler}>
            Delete
          </Button2>
          <Button2 btnType="Danger" clicked={closeDeleteModal}>
            Cancel
          </Button2>
        </Modal>{" "}
      </td>
      <td>{props.email}</td>
      <td style={{ color: "#ccc" }}>{props.role}</td>
    </tr>
  );
};

export default topic;
