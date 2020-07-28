import React,{ useState } from 'react';
import Auxi from '../../../hoc/Auxi';
import Errorpage from '../../../components/UI/Errorpage/Errorpage';

const oneproject = (props) => { 
    
    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    console.log(props);
    let x = props.match.params.id;
    return (
                isauth ?
                    <Auxi>
                        <div className="content-header" style={{ padding: "1px .5rem" }}>
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1 className="m-0 text-dark">One Project(s)</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="container-fluid">
        This route from {x}
                            </div>
                        </div>
                    </Auxi>
                    :
                    <Errorpage></Errorpage>
    )
};

export default oneproject;