// import React,{useState} from 'react';

// import { Link } from 'react-router-dom';
// import Errorpage from '../../components/UI/Errorpage/Errorpage';
// import Auxi from '../../hoc/Auxi';


// const topics = (props) => {
    
//     const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 
//     console.log(props.match.params.tid);
//    console.log(props.match.params.id);


//     return ( 
//         isauth?
//         <Auxi>
//     <div className="x" onClick={(event)=>{console.log(event.target)}}>grekgerkgko</div>
//  \
//   </Auxi> 
//     :
//   <Errorpage></Errorpage>
//     ) 
// };

// export default topics;

import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import FullEditor from 'ckeditor5-build-full'
import Auxi from '../../hoc/Auxi';
import ReactHtmlParser from 'react-html-parser';
import './Topics.css'
const topics = (props) => {
    const [content,setcontent] = useState('');
    const handleChange = (event,editor) =>{
     // const target = event.target.value;
     const data = editor.getData();
console.log(data);
setcontent(data)
    }   //<textarea cols="25" row="14" type="text" name="content" value={content} onChange={handleChange}/>
    

    FullEditor.defaultConfig = {
        toolbar: ['bold', 'italic','|','highlight:yellowMarker' ,'|','undo','redo' ],

        language: 'en'
    };


    return ( <Auxi>
      <CKEditor
editor={FullEditor}
onInit={editor =>{}}
onChange={handleChange}

/>
<div>
{ReactHtmlParser(content)}
 </div>
   </Auxi> ) 
};

export default topics;
