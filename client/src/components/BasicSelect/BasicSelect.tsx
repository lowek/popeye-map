import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import PropTypes from "prop-types";
import {IBasicSelect} from "@/interfaces";

const BasicSelect = ({ parentCallback, label, values, initial }: IBasicSelect) => {

    const listItems = [];
    for (const i of values) {
        listItems.push(<MenuItem value={i} key={i.toString()}>
            {i}
        </MenuItem>);
    }

    const handleChange = (event: SelectChangeEvent<string | number>,) => {
        parentCallback(event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 120 }} className="mb-3">
                <FormControl fullWidth id={`form-${label.toLowerCase()}`}>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="select-label"
                        id={`select-${label.toLowerCase()}`}
                        value={initial}
                        label={label}
                        onChange={handleChange}
                    >
                        {listItems}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};
BasicSelect.propTypes = {
    parentCallback: PropTypes.func,
    label: PropTypes.string,
    values: PropTypes.array,
    initial: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
export default BasicSelect;
