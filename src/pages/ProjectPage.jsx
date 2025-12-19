import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import TaskCard from '../components/TaskCard'

export default function ProjectPage() {
  const { id } = useParams()
  const nav = useNavigate()
  const { getProjectById, getTasksForProject, moveTask, deleteTask } = useApp()

  const project = getProjectById(id)
  const tasks = getTasksForProject(id)

  const columns = ['To Do', 'In Progress', 'Done']

  if (!project) return <div className="loading">Project not found</div>

  return (
    <section>
      <div className="page-header">
        <h2>{project.title}</h2>
        <p className="muted">{project.description}</p>
        <div style={{ marginTop: '8px' }}>
          <button className="btn" onClick={() => nav('/add-task')}>
            Add Task
          </button>
        </div>
      </div>

      <div className="columns">
        {columns.map((col) => (
          <div key={col} className="column">
            <h3 className="col-title">{col}</h3>
            <div className="col-list">
              {tasks.filter((t) => t.status === col).map((t) => (
                <TaskCard key={t.id} task={t} onMove={moveTask} onDelete={deleteTask} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}