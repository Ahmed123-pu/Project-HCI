import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function AddTask() {
  const { projects, addTask } = useApp()
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectId, setProjectId] = useState(projects[0]?.id || '')
  const [status, setStatus] = useState('To Do')

  function onSubmit(e) {
    e.preventDefault()
    if (!title || !projectId) return
    const t = addTask({ title, description, projectId, status })
    nav(`/project/${t.projectId}`)
  }

  return (
    <section className="form-page">
      <h2>Add Task</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Project</label>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
          <option value="">-- select project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <div className="form-actions">
          <button className="btn" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}
