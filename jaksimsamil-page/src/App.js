import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <>
      <Route component={HomePage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={SettingPage} path="/setting" />
      <Route component={TestPage} path="/test" />
    </>
  );
}

export default App;
