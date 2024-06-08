import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login/index.jsx'
import Products from './pages/products/index.jsx'
import Users from './pages/users/index.jsx'

const router = createBrowserRouter([
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/users",
    element: <Users />
  },
  
]

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)

