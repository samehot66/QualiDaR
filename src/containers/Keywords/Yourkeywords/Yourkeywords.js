import React, { useState } from 'react';

import Auxi from '../../../hoc/Auxi';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';

import axios from 'axios';
import config from '../../../config.json';
const yourkeywords = (props) => {

  return (
    <Auxi>
        <Auxi>
            <tr>
                <td style={{ color: "#17a2b8" }}>
                    <i class="fa fa-fw fa-folder"></i>
                    {props.gname}

                </td>
                <td style={{ color: "#ccc" }}>
                    me
                </td>
                <td> 
                <i class="fa fa-fw fa-edit" style={{fontSize: "18px" }} ></i>
                <i class="fa fa-fw fa-trash" style={{fontSize: "18px" }} ></i>
                </td>
            </tr>
        </Auxi>
    </Auxi>
  )
};

export default yourkeywords;