import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../services/login-api';
import { Box, TextField, Button, Typography } from '@mui/material';

interface LoginScreenProps { };

function LoginScreen(props: LoginScreenProps): JSX.Element {
    const { } = props;

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    function handleLogin() {
        setError(null); // Reset error on new attempt
        login(name, email)
            .then(() => {
                navigate('/home');
            })
            .catch(() => {
                setError('Login failed. Please try again.');
            });
    }

    return (
        <Box sx={styles.constainer}>
            <Typography variant="h5" textAlign="center">Login</Typography>

            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)} />

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            {error && <Typography color="error">{error}</Typography>}

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

const styles = {
    constainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2
    },
};

export default LoginScreen;