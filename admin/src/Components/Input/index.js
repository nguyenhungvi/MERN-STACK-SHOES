import React from 'react';
import { Form } from 'react-bootstrap';
import './index.css';

const Input = (props) => {
    return (
        <Form.Group controlId="formBasicNameCategory">
            <Form.Label style={{ fontWeight: "bold", fontSize: "21px" }}>
                {props.nameLabel}:
            </Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                required
                onChange={(e) => props.handleOnChange(e.target.value)}
            />
            <Form.Control.Feedback id={props.id_error} />
        </Form.Group>
    );
}

export default Input;
