import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Step1 = ({ userData, handleChange, onNext }) => {
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);

    const handleNext = () => {
        if (!userData.first_name) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }

        if (!userData.last_name) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }

        if (userData.first_name && userData.last_name) {
            onNext();
        }
    };

    return (
        <Box className="p-8 bg-gray-100 rounded-lg shadow-md">
            <Typography variant="h5" className="text-center mb-4">
                First, what's your name?
            </Typography>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold  text-left mt-4" htmlFor="first_name">
                    First Name
                </label>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    required
                    error={firstNameError} // Set error state based on validation
                    helperText={firstNameError && "First name is required"} // Helper text for error
                    InputProps={{
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    }}
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold  text-left mt-4" htmlFor="last_name">
                    Last Name
                </label>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    required
                    error={lastNameError} // Set error state based on validation
                    helperText={lastNameError && "Last name is required"} // Helper text for error
                    InputProps={{
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    }}
                />
            </div>

            <Button
                variant="contained"
                fullWidth
                onClick={handleNext} // Call the validation function
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                sx={{ mt: 2 }}
            >
                Next
            </Button>
        </Box>
    );
};

export default Step1;