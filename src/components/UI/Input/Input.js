import React from 'react';
import classes from './Input.css';
import TextField from '@material-ui/core/TextField';

const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            if (props.checkError === 'No') {
                inputElement = <TextField rowsMax={1}
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            }
            else {
                inputElement = <TextField rowsMax={1} error
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    helperText={props.error}
                    onChange={props.changed} />;
            } break;
        case ('textarea'):
            if (props.checkError === 'No') {
                inputElement = <TextField multiline rowsMax={3}
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            }
            else {
                inputElement = <TextField multiline rowsMax={3} error 
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                helperText={props.error}
                onChange={props.changed} />;
            } break;
        case ('select'):
            inputElement =
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                    >
                </select>; break;
        default:
            if (props.checkError === 'No') {
                inputElement = <TextField rowsMax={1}
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            }
            else {
                inputElement = <TextField rowsMax={1} error
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    helperText={props.error}
                    onChange={props.changed} />;
            } 
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.elementLabel} </label>
            {inputElement}
        </div>
    )
}

export default input;