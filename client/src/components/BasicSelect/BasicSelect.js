import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from "prop-types";

const BasicSelect = ({ parentCallback, label, values, initial }) => {

    const listItems = values.map((number) =>
        <MenuItem value={number} key={number.toString()}>
            {number}
        </MenuItem>
    );

    const handleChange = (event) => {
        parentCallback(event.target.value);
    };

    return (
        <>
            <Box sx={{ minWidth: 120 }} className="mb-3">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="select-label"
                        id="simple-select"
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
    initial: PropTypes.string || PropTypes.number
}
export default BasicSelect;
