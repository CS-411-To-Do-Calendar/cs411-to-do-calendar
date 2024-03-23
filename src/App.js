import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main';
import Calendar from './pages/Calendar/Calendar';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './componets/Protected';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <Main /> } />
            <Route path='/calendar' element={ <Protected><Calendar /></Protected> } />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App