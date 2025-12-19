import React from 'react'

export default function TaskCard({ task, onMove, onDelete }) {
  return (
    <div className="task-card">
      <h4 className="task-title">{task.title}</h4>
      <p className="task-desc">{task.description}</p>
      <div className="task-meta">
        <span className="status">{task.status}</span>
        <div className="task-actions">
          {task.status !== 'To Do' && (
            <button className="small" onClick={() => onMove(task.id, 'To Do')}>
              To Do
            </button>
          )}
          {task.status !== 'In Progress' && (
            <button className="small" onClick={() => onMove(task.id, 'In Progress')}>
              In Prog
            </button>
          )}
          {task.status !== 'Done' && (
            <button className="small" onClick={() => onMove(task.id, 'Done')}>
              Done
            </button>
          )}
          <button className="small danger" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}