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

const Form = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
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
                const response = await axios.get(`http://localhost:3000/api/vehicle/models?type=${typeId}`);
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
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/api/bookings', userData);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Booking created successfully!");
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
            console.error("Error submitting booking:", error);
            setError(error.response?.data?.error || error.message);
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