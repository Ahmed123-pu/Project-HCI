import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem('tm_theme') || 'dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch projects (users) and tasks (posts) from JSONPlaceholder
    async function load() {
      setLoading(true)
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ])
        const users = await usersRes.json()
        const posts = await postsRes.json()

        const initialProjects = users.map((u) => ({
          id: u.id,
          title: u.name,
          description: u.company?.catchPhrase || u.email,
        }))

        const statusMap = ['To Do', 'In Progress', 'Done']

        const initialTasks = posts.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.body,
          projectId: p.userId,
          status: statusMap[p.id % 3],
        }))

        // merge with any localStorage saved additions
        const saved = JSON.parse(localStorage.getItem('tm_local') || '{}')
        const mergedProjects = [...initialProjects, ...(saved.projects || [])]
        const mergedTasks = [...initialTasks, ...(saved.tasks || [])]

        setProjects(mergedProjects)
        setTasks(mergedTasks)
      } catch (e) {
        console.error('Failed to load API data', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    // persist only user-added items (ids > 10000 used for new ones)
    const addedProjects = projects.filter((p) => p.id > 10000)
    const addedTasks = tasks.filter((t) => t.id > 10000)
    localStorage.setItem('tm_local', JSON.stringify({ projects: addedProjects, tasks: addedTasks }))
  }, [projects, tasks])

  useEffect(() => {
    try {
      localStorage.setItem('tm_theme', theme)
      document.documentElement.classList.toggle('light-theme', theme === 'light')
    } catch (e) {
      console.error('Unable to persist theme', e)
    }
  }, [theme])

  function addProject({ title, description }) {
    const newProject = { id: Date.now(), title, description }
    setProjects([newProject, ...projects]);
    return newProject
  }

  function addTask({ title, description, projectId, status }) {
    const newTask = { id: Date.now(), title, description, projectId: Number(projectId), status }
    setTasks([newTask, ...tasks]);
    return newTask
  }

  function moveTask(taskId, newStatus) {
    setTasks((s) => s.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)))
  }

  function deleteTask(taskId) {
    setTasks((s) => s.filter((t) => t.id !== taskId))
  }

  function getProjectById(id) {
    return projects.find((p) => String(p.id) === String(id))
  }

  function getTasksForProject(projectId) {
    return tasks.filter((t) => String(t.projectId) === String(projectId))
  }

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  const value = {
    projects,
    tasks,
    loading,
    addProject,
    addTask,
    moveTask,
    deleteTask,
    getProjectById,
    getTasksForProject,
    theme,
    toggleTheme,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext