<<<<<<< HEAD
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ProjectPage from './pages/ProjectPage'
import AddTask from './pages/AddTask'
import AddProject from './pages/AddProject'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-root">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/add-project" element={<AddProject />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
=======

import './App.css'

function App() {
  

  return (
    <>
      
    </>
  )
}

export default App
>>>>>>> 34221959efa642af1a921b49069a94178d2a6f2d
