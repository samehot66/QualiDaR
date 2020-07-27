import React, { useState } from 'react';

import Auxi from '../../../hoc/Auxi';

import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';
import config from '../../../config.json';

const Publickeywords = (props) => {

    return (
        <Auxi>
            <tr>
                <td>
                    {props.gname}

                </td>
                <td>
                    {props.owner}
                </td>
                <td>
                    <span className="badge badge-success">Shipped</span></td>
            </tr>
        </Auxi>
    )
};

export default Publickeywords;