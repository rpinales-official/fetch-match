import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginScreen from './components/login-screen';
import HomeScreen from './components/home-screen';
import { Box } from '@mui/material';

function App() {
	return (
		<Box sx={styles.app}>
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/" element={<LoginScreen />} />
					<Route path="/home" element={<HomeScreen />} />
				</Routes>
			</Router>
		</Box>
	);
}

const styles = {
	app: {
		display: 'flex',
		justifyContent: 'center',
		height: '100vh',
	},
}

export default App;