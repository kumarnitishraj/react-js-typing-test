import React from 'react';
import { FormControl } from 'react-bootstrap';

const UiInput = ({ value, placeholder, onChange }) => {
    return(
        <FormControl
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default UiInput;