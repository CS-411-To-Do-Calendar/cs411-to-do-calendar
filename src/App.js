import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

import Main from './pages/Main/Main';
import Account from './pages/Account/Account';
import Todo from './pages/Todo/Todo';
import Protected from './componets/Protected';
import Chatbot from './pages/Chatbot/Chatbot';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <Main /> } />
            <Route path='/Account' element={ <Protected><Account /></Protected> } />
            <Route path='/Todo' element={ <Protected><Todo /></Protected> } />
            <Route path='/chatbot' element={ <Protected><Chatbot /></Protected> } />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App