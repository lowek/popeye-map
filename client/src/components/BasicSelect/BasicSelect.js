import {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = () => {
    const intervals = [1,5,10];
    const [interval, setInterval] = useState(1);

    const listItems = intervals.map((number) =>
        <MenuItem value={number} key={number.toString()}>
            {number}
        </MenuItem>
    );

    const handleChange = (event) => {
        setInterval(event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Interval</InputLabel>
                    <Select
                        labelId="select-label"
                        id="simple-select"
                        value={interval}
                        label="Interval"
                        onChange={handleChange}
                    >
                        {listItems}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default BasicSelect;
