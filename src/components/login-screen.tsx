import React, { JSX } from 'react';
import { login } from '../services/api-service';

interface LoginScreenProps {
};

function LoginScreen(props: LoginScreenProps): JSX.Element {
    const {

    } = props;

    function handleLogin(): void {
        login('Roberto P', 'roberto.p@example.com').then((data) => {
            // @TODO: if sucessful navigate to home screen
            console.log('Response:', data);
        })
    }

    return (
        <button onClick={handleLogin}>{"Login"}</button>
    );
};

export default LoginScreen;