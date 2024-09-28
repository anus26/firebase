import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Notfound from './Pages/Notfound.jsx'
import  Dashboard  from './Pages/Dashboard/Dashboard.jsx'
import Blogs from './Pages/Blogs/Blogs.jsx'
import ProtectedRoutes from './Pages/ProtectedRoutes.jsx'


 const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home />,
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'dashboard',
        element:< ProtectedRoutes component={<Dashboard/>}/>
      },
      {
        path:'blogs',
        element:<Blogs/>
      },
      {
        path:'*',
        element:<Notfound/>
      }
    ]
  }
 ])


createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
