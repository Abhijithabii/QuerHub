import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthProvider } from './Utils/AuthContext';
import Home from './Pages/Home';
import AnswerPage from './Pages/AnswerPage';

function App() {


  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/'  element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/answer/:question_id' element={<AnswerPage/>} />
      </Routes>
      </AuthProvider>
    </Router>
      
    </>
  )
}

export default App
