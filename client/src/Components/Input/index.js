import React from 'react';
import './index.css';

const Input = (props) => {
    return (
        <>
            <input
                type={props.type}
                value={props.value}
                onChange={(e) => props.handleOnChange(e.target.value)}
                placeholder={props.placeholder}
                className="input-text"
            />
            <p style={{ color: "red", display: "none" }} id={props.id_error} />
        </>
    );
}

export default Input;
