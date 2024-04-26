import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import './App.css';

import Main from './pages/Main/Main';
import Account from './pages/Account/Account';
import Todo from './pages/Todo/Todo';
import Protected from './componets/Protected';
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
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App