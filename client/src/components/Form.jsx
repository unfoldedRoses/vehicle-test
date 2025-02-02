// client/src/components/Form.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import { ToastContainer, toast } from 'react-toastify';
const Form = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        wheels: '',
        vehicleType: '',
        specificModel: '',
        startDate: null,
        endDate: null,
    });

    const [vehicleTypes, setVehicleTypes] = useState({});
    const [specificModels, setSpecificModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleTypes = async (wheels) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/vehicle/types?wheels=${wheels}`);
                setVehicleTypes(response.data.reduce((acc, type) => {
                    acc[type.type_name] = type.id;
                    return acc;
                }, {}));
            } catch (error) {
                console.error("Error fetching vehicle types:", error);
                setError(error.response?.data?.error || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userData.wheels) {
            fetchVehicleTypes(userData.wheels);
        } else {
            setVehicleTypes({});
            setSpecificModels([]);
        }
    }, [userData.wheels]);

    useEffect(() => {
        const fetchSpecificModels = async (typeId) => {
            const apiUrl = import.meta.env.VITE_API_URL;
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${apiUrl}/vehicle/models?type=${typeId}`);
                setSpecificModels(response.data.map(model => model.model_name));
            } catch (error) {
                console.error("Error fetching specific models:", error);
                setError(error.response?.data?.error || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userData.vehicleType && vehicleTypes[userData.vehicleType]) {
            fetchSpecificModels(vehicleTypes[userData.vehicleType]);
        } else {
            setSpecificModels([]);
        }
    }, [userData.vehicleType, vehicleTypes]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (name, newValue) => {
        setUserData({ ...userData, [name]: newValue ? dayjs(newValue) : null });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        console.log('Form Data Submitted:', userData);
        const apiUrl = import.meta.env.VITE_API_URL;
        setError(null);
        try {
            const response = await axios.post(`${apiUrl}/booking/create`, userData);
            if (response.status !== 201) { // Check for 201 (Created) status, not 200
                throw new Error(`HTTP error! status: ${response.status}, message: ${response.data?.error || 'Unknown error'}`); // Include error message from server
            }
            toast.success("Booking created successfully!");
            setUserData({
                firstName: '',
                lastName: '',
                wheels: '',
                vehicleType: '',
                specificModel: '',
                startDate: null,
                endDate: null,
            });
            setStep(1);
        } catch (error) {
            toast.error("Sorry booking not stored:", error);
            // More informative error handling:
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                setError(error.response.data.error || error.message || "An error occurred."); // Prioritize server error message
            } else if (error.request) {
                // The request was made but no response was received
                
                console.error("Request error:", error.request);
                setError("No response received.");
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error(error.message);
                setError(error.message || "A setup error occurred.");
            }
    
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 userData={userData} handleChange={handleChange} onNext={handleNext} />;
            case 2:
                return <Step2 userData={userData} handleChange={handleChange} onNext={handleNext} loading={loading} />;
            case 3:
                return <Step3 userData={userData} handleChange={handleChange} onNext={handleNext} vehicleTypes={vehicleTypes} loading={loading} />;
            case 4:
                return <Step4 userData={userData} handleChange={handleChange} onNext={handleNext} specificModels={specificModels} loading={loading} />;
            case 5:
                return <Step5 userData={userData} handleDateChange={handleDateChange} handleSubmit={handleSubmit} loading={loading} />;
            default:
                return null;
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Vehicle Booking Form
            </Typography>
            {error && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                    {error}
                </Typography>
            )}
            {renderStep()}
        </Container>
    );
};

export default Form;