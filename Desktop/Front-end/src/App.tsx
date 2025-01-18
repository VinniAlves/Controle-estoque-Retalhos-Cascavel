import './App.css'
import useRoutes from './routes'
import { BrowserRouter, RouterProvider, Route,Routes } from 'react-router-dom'
import React from 'react';




function App() {
    const routes = useRoutes();

  return (
      <BrowserRouter>
        <Routes>

          {
            routes.map((route,index)=>(
              <Route key={index} path={route.path} element={route.element}/>
            ))
          }
        </Routes>
      </BrowserRouter>
  )
}




export default App
