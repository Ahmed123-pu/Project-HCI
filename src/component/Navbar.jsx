import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { theme, toggleTheme } = useApp()

  return (
    <header className="nav">
      <div className="nav-inner container">
        <h1 className="brand">TaskBoard</h1>
        <nav>
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/add-task" className="nav-link">
            Add Task
          </NavLink>
          <NavLink to="/add-project" className="nav-link">
            Add Project
          </NavLink>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}