import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginScreen from './components/login-screen';
import HomeScreen from './components/home-screen';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginScreen />} />
				<Route path="/home" element={<HomeScreen />} />
			</Routes>
		</Router>
	);
}

const styles = {
	app: {
		textAlign: "center",
	},
}

export default App;