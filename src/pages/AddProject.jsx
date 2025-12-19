import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function AddProject() {
  const { addProject } = useApp()
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!title) return
    addProject({ title, description })
    nav('/')
  }

  return (
    <section className="form-page">
      <h2>Add Project</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="form-actions">
          <button className="btn" type="submit">
            Add Project
          </button>
        </div>
      </form>
    </section>
  )
}
