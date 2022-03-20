import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import PropTypes, {InferProps} from "prop-types";

const BasicSelectPropTypes  = {
    parentCallback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    initial: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

type BasicSelectType = InferProps<typeof BasicSelectPropTypes>

const BasicSelect = ({ parentCallback, label, values, initial }: BasicSelectType) => {

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

BasicSelect.propTypes = BasicSelectPropTypes

export default BasicSelect;
