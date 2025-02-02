import React from 'react';
import {
    TextField, Button, Box
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Step5 = ({ userData, handleDateChange, handleSubmit, loading }) => {
    return (
        <Box className="p-8 bg-gray-100 rounded-lg shadow-md"> {/* Outer box with padding, background, rounded corners, and shadow */}
            <h5 className="text-center mb-4 text-2xl "> {/* Title with styling */}
                Select Dates
            </h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="mb-4"> {/* Container for Start Date with margin */}
                    <DatePicker
                        label="Start Date"
                        value={userData.startDate}
                        onChange={(newValue) => handleDateChange("startDate", newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />} // Full width TextField
                    />
                </div>
                <div className="mb-6"> {/* Container for End Date with larger margin */}
                    <DatePicker
                        label="End Date"
                        value={userData.endDate}
                        onChange={(newValue) => handleDateChange("endDate", newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />} // Full width TextField
                    />
                </div>
            </LocalizationProvider>
            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" // Tailwind styling
                sx={{ mt: 2 }} // MUI styling for margin-top
            >
                Submit
            </Button>
        </Box>
    );
};

export default Step5;