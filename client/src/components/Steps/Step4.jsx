// client/src/components/Steps/Step4.jsx
import React from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress
} from '@mui/material';

const Step4 = ({ userData, handleChange, onNext, specificModels, loading }) => {
    return (
        <Box>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading}>
                <FormLabel component="legend">Select Specific Model</FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup name="specificModel" value={userData.specificModel} onChange={handleChange}>
                    {specificModels.map((model, index) => (
                        <FormControlLabel key={index} value={model} control={<Radio />} label={model} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Button variant="contained" fullWidth onClick={onNext} sx={{ mt: 2 }} disabled={loading}>
                Next
            </Button>
        </Box>
    );
};

export default Step4;
