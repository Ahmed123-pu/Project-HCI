import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectCard({ project, tasksCount }) {
  const nav = useNavigate()

  return (
    <div className="project-card">
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-footer">
        <span className="badge">{tasksCount} tasks</span>
        <button className="btn" onClick={() => nav(`/project/${project.id}`)}>
          View Tasks
        </button>
      </div>
    </div>
  )
}