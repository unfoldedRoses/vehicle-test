// client/src/components/Steps/Step3.jsx
import React from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress
} from '@mui/material';

const Step3 = ({ userData, handleChange, onNext, vehicleTypes, loading }) => {
    return (
        <Box>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading}>
                <FormLabel component="legend">Select Vehicle Type</FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup name="vehicleType" value={userData.vehicleType} onChange={handleChange}>
                    {Object.keys(vehicleTypes).map((type) => (
                        <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                    ))}
                </RadioGroup>
            </FormControl>
            <Button variant="contained" fullWidth onClick={onNext} sx={{ mt: 2 }} disabled={loading}>
                Next
            </Button>
        </Box>
    );
};

export default Step3;