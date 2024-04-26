import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

import Main from './pages/Main/Main';
import Account from './pages/Account/Account';
import Todo from './pages/Todo/Todo';
import Protected from './componets/Protected';
import Chatbot from './pages/Chatbot/Chatbot';
import Setting from './pages/Setting/Setting';
import Tutorial from './pages/Tutorial/Tutorial';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <Main /> } />
            <Route path='/tutorial' element={ <Protected><Tutorial /></Protected> } />
            <Route path='/Account' element={ <Protected><Account /></Protected> } />
            <Route path='/Todo' element={ <Protected><Todo /></Protected> } />
            <Route path='/chatbot' element={ <Protected><Chatbot /></Protected> } />
            <Route path='/setting' element={ <Protected><Setting /></Protected> } />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App