import React, { useState } from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress, Typography, FormHelperText
} from '@mui/material';

const Step4 = ({ userData, handleChange, onNext, specificModels, loading }) => {
    const [selectionError, setSelectionError] = useState(false);

    const handleNext = () => {
        if (!userData.specificModel) {
            setSelectionError(true);
        } else {
            setSelectionError(false);
            onNext();
        }
    };

    return (
        <Box className="p-8 bg-gray-100 rounded-lg shadow-md">
            <Typography variant="h5" className="text-center mb-4">
                Select Specific Model
            </Typography>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading} error={selectionError}>
                <FormLabel component="legend" className="block text-gray-700 text-sm font-bold mb-2 text-left mt-4">
                    Specific Model
                </FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup 
                    name="specificModel" 
                    value={userData.specificModel} 
                    onChange={handleChange} 
                    className="mt-2"
                >
                    {specificModels.map((model, index) => (
                        <FormControlLabel key={index} value={model} control={<Radio />} label={model} />
                    ))}
                </RadioGroup>
                {selectionError && <FormHelperText>Please select a specific model.</FormHelperText>}
            </FormControl>
            <Button
                variant="contained"
                fullWidth
                onClick={handleNext}
                sx={{ mt: 2 }}
                disabled={loading || !userData.specificModel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
                Next
            </Button>
        </Box>
    );
};

export default Step4;