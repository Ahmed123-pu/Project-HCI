import React from 'react'
import { useApp } from '../context/AppContext'
import ProjectCard from '../components/ProjectCard'

export default function Dashboard() {
  const { projects, getTasksForProject, loading } = useApp()

  if (loading) return <div className="loading">Loading projects...</div>

  return (
    <section>
      <div className="page-header">
        <h2>Projects</h2>
        <p className="muted">Select a project to view and manage its tasks.</p>
      </div>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} tasksCount={getTasksForProject(p.id).length} />
        ))}
      </div>
    </section>
  )
}