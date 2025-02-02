// client/src/components/Steps/Step1.jsx
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const Step1 = ({ userData, handleChange, onNext }) => {
    return (
        <Box>
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                required
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                required
            />
            <Button variant="contained" fullWidth onClick={onNext} sx={{ mt: 2 }}>
                Next
            </Button>
        </Box>
    );
};

export default Step1;
