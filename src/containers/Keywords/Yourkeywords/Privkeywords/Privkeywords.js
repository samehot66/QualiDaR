import React, { useState, useEffect, useRef } from 'react';
import Auxi from '../../../../hoc/Auxi';
import axios from 'axios';
import config from '../../../../config.json';
import classes from './Privkeywords.css';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';
import Allkeywords from './Allkeywords/Allkeywords';

const privkeywords = (props) => {

    const [keywordForm, setkeywordForm] = useState(
        {
            keyword: {
                elementType: 'input',
                elementLabel: 'New keyword',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Input your keyword...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50
                },
                valid: false,
                error: ''
            }
        })

    const [FormIsValid, setFromIsValid] = useState(false);
    const [allkeywords, setallkeywords] = useState([]);
    const [search, setsearch] = useState('');
    const [allkeywordsfilterserch, setallkeywordsfilterserch] = useState([]);

    useEffect(() => {
        const keywords = [];
        let data = {
            params: {
                "uid": sessionStorage.getItem("uid"),
                "access_token": sessionStorage.getItem("access_token"),
                "keywordgroupsid": props.groupid
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL + '/api/keywords/private', data, axiosConfig)
            .then((res) => {
                for (const index in res.data) {
                    keywords.push({
                        kid: res.data[index].kid,
                        keywordtext: res.data[index].keywordtext
                    });
                }
                setallkeywords(keywords);
            })
            .catch((err) => {
                alert("Show keywords Failed");
            })

    }, [])

    useEffect(() => {
        setallkeywordsfilterserch(
            allkeywords.filter(keywords => {
                return keywords.keywordtext.toString().toLowerCase().includes(search.toLowerCase());
            })
        )
    }, [search, allkeywords])

    const checkValidity = (value, rules) => {
        let isValid = true;
        let checkArray = [];
        let error = '';

        checkArray.push({
            Isvalid: isValid,
            Error: error
        })

        if (!rules) {
            return checkArray;
        }

        if (value.length < rules.minLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Minimum length is ' + rules.minLength;
        }

        if (value.length > rules.maxLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Maximum length is ' + rules.maxLength;
        }

        if (rules.required) {
            if (!(value.trim() !== "")) {
                checkArray[0].Isvalid = false;
                checkArray[0].Error = 'Must not empty!';
            }
        }

        return checkArray;
    }

    const addKeywordHandler = async (event) => {
        event.preventDefault();
        const formDataArray = [];
        for (let formElementIdentifier in keywordForm) {
            formDataArray[formElementIdentifier] = { value: keywordForm[formElementIdentifier].value }
        }

        let data = {
            "uid": sessionStorage.getItem("uid"),
            "keywordgroupsid": props.groupid,
            "access_token": sessionStorage.getItem("access_token"),
            "keywordtext": formDataArray["keyword"].value
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post(config.URL + '/api/keywords/private', data, axiosConfig)
            .then((res) => {
                onGetKeywords()
            })
            .catch((err) => {
                alert("Add failed, Keyword has already exist");
                onGetKeywords();
            })
    }

    const onGetKeywords = async () => {
        const keywords = [];
        let data = {
            params: {
                "uid": sessionStorage.getItem("uid"),
                "access_token": sessionStorage.getItem("access_token"),
                "keywordgroupsid": props.groupid
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.get(config.URL + '/api/keywords/private', data, axiosConfig)
            .then((res) => {
                for (const index in res.data) {
                    keywords.push({
                        kid: res.data[index].kid,
                        keywordtext: res.data[index].keywordtext
                    });
                }
                setallkeywords(keywords);
            })
            .catch((err) => {
                alert("Show keywords Failed");
            })
    }

    const handleGetKeywords = async (newKeyState) => {
        const keywords = [];
        for (const index in newKeyState) {
            keywords.push({
                kid: newKeyState[index].kid,
                keywordtext: newKeyState[index].keywordtext
            });
        }
        await setallkeywords(keywords);
    }


    const formElementsArray = [];
    for (let key in keywordForm) {
        formElementsArray.push({
            id: key,
            config: keywordForm[key]
        })
    }

    const checkErrorFunc = (error) => {
        if (error === '') {
            return 'No';
        }
        else {
            return 'Yes';
        }
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedkeywordForm = {
            ...keywordForm
        };

        const updatedFormElement = {
            ...updatedkeywordForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)[0].Isvalid;
        updatedFormElement.error = checkValidity(updatedFormElement.value, updatedFormElement.validation)[0].Error;
        updatedkeywordForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        if (updatedkeywordForm['keyword'].valid === false) {
            formIsValid = false;
        }

        setkeywordForm({ ...updatedkeywordForm });
        setFromIsValid(formIsValid);
    }

    return (
        <Auxi>
            <form onSubmit={addKeywordHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        elementLabel={formElement.config.elementLabel}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        error={formElement.config.error}
                        checkError={checkErrorFunc(formElement.config.error)} />
                ))}
                <Button btnType="Success" disabled={!FormIsValid}>Add</Button>
            </form>
            <Button btnType="DangerEmail" clicked={props.cancel}>Cancel</Button>
            <div className={classes.Keywordinthis}>All keyword(s) in this group</div>
            <div className={classes.Keywords}>

                <input className={classes.Search} type="text" placeholder="  Search..." onChange={e => setsearch(e.target.value)} />

                {allkeywordsfilterserch.map(keywords => (
                    <Allkeywords keywordtext={keywords.keywordtext} kid={keywords.kid} key={keywords.kid} groupid={props.groupid} onGetKeywords={handleGetKeywords} />
                ))}
            </div>
        </Auxi>
    )
};
export default privkeywords;


