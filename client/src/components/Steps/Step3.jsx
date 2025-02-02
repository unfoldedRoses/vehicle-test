import React, { useState } from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress, Typography, FormHelperText
} from '@mui/material';

const Step3 = ({ userData, handleChange, onNext, vehicleTypes, loading }) => {
    const [selectionError, setSelectionError] = useState(false);

    const handleNext = () => {
        if (!userData.vehicleType) {
            setSelectionError(true);
        } else {
            setSelectionError(false);
            onNext();
        }
    };

    return (
        <Box className="p-8 bg-gray-100 rounded-lg shadow-md">
            <Typography variant="h5" className="text-center mb-4">
                Select Vehicle Type
            </Typography>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading} error={selectionError}>
                <FormLabel 
                    component="legend" 
                    className="block text-gray-700 text-sm font-bold mb-2 text-left mt-4"
                >
                    Vehicle Type
                </FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup 
                    name="vehicleType" 
                    value={userData.vehicleType} 
                    onChange={handleChange} 
                    className="mt-2"
                >
                    {Object.keys(vehicleTypes).map((type) => (
                        <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                    ))}
                </RadioGroup>
                {selectionError && <FormHelperText>Please select a vehicle type.</FormHelperText>}
            </FormControl>
            <Button
                variant="contained"
                fullWidth
                onClick={handleNext}
                sx={{ mt: 2 }}
                disabled={loading || !userData.vehicleType} // Disable if loading or no selection
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
                Next
            </Button>
        </Box>
    );
};

export default Step3;