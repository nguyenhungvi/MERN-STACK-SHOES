import React from "react";
import './index.css';

const Input = (props) => {
    return (
        <div className="input">
            <label htmlFor={props.name}>
                {props.nameLabel}:
            </label>
            <br />
            <input
                type={props.type}
                value={props.name}
                onChange={(e) => props.handleValue(e.target.value)}
                alt={props.name}
                placeholder={props.placeholder}
            />
            <br />
            <span style={{ color: "red", display: "none" }} id={props.error} />
        </div>
    );
};

export default Input;
