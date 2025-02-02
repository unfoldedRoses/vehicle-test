// client/src/components/Steps/Step2.jsx
import React from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, CircularProgress
} from '@mui/material';

const Step2 = ({ userData, handleChange, onNext, loading }) => {
    return (
        <Box>
            <FormControl component="fieldset" fullWidth margin="normal" disabled={loading}>
                <FormLabel component="legend">Select Number of Wheels</FormLabel>
                {loading && <CircularProgress />}
                <RadioGroup name="wheels" value={userData.wheels} onChange={handleChange}>
                    <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
                    <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
                </RadioGroup>
            </FormControl>
            <Button variant="contained" fullWidth onClick={onNext} sx={{ mt: 2 }} disabled={loading}>
                Next
            </Button>
        </Box>
    );
};

export default Step2;
