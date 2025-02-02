// client/src/components/Steps/Step5.jsx
import React from 'react';
import {
    TextField, Button, Box
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Step5 = ({ userData, handleDateChange, handleSubmit, loading }) => {
    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Start Date"
                    value={userData.startDate}
                    onChange={(newValue) => handleDateChange("startDate", newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="End Date"
                    value={userData.endDate}
                    onChange={(newValue) => handleDateChange("endDate", newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2 }} disabled={loading}>
                Submit
            </Button>
        </Box>
    );
};

export default Step5;
