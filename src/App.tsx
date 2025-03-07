import React from 'react';
import LoginScreen from './components/login-screen';
import { Box } from '@mui/material';

function App() {
	return (
		<Box sx={styles.app}>
			<LoginScreen />
		</Box>
	);
}

const styles ={
	app: {
		textAlign: "center",
	},
}

export default App;