import React, { useState } from 'react'; // Import useState
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress, Typography
} from '@mui/material';

const Step2 = ({ userData, handleChange, onNext, loading }) => {
    const [selectionError, setSelectionError] = useState(false); // State for selection error

    const handleNext = () => {
        if (!userData.wheels) { // Check if no selection is made
            setSelectionError(true); // Set error state
        } else {
            setSelectionError(false); // Clear error state
            onNext(); // Proceed to the next step
        }
    };

    return (
        <Box className="p-8 bg-gray-100 rounded-lg shadow-md">
            <Typography variant="h5" className="text-center mb-4">
                Select Number of Wheels
            </Typography>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading} error={selectionError}> {/* Add error prop */}
                <FormLabel component="legend" className="block text-gray-700 text-sm font-bold mb-2 text-left mt-4">
                    Number of Wheels
                </FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup 
                    name="wheels" 
                    value={userData.wheels} 
                    onChange={handleChange} 
                    className="mt-2"
                >
                    <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
                    <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
                </RadioGroup>
                {selectionError && <FormHelperText>Please select the number of wheels.</FormHelperText>} {/* Error message */}

            </FormControl>
            <Button
                variant="contained"
                fullWidth
                onClick={handleNext} // Call the validation function
                sx={{ mt: 2 }}
                disabled={loading || !userData.wheels} // Disable if loading or no selection
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
                Next
            </Button>
        </Box>
    );
};

export default Step2;