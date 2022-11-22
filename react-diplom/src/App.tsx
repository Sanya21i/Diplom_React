import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import RegistrationPage from "./pages/RegistrationPage";
import Layout from "./components/Layout";
import "./App.scss";
import ActivationPage from "./pages/ActivationPage";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import PersistLogin from "./components/PersistLogin";

function App() {
	return (
		<Routes>
			<Route path="*" element={<NotFoundPage />} />
     		<Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
				<Route path="/activate/:uid/:id" element={<ActivationPage />} />
				
        <Route element={<PersistLogin />} >
          <Route path="/blogs" element={<MainPage />} />
        </Route>
      </Route>
    </Routes>
	);
}

export default App;
