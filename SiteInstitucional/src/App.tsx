import './App.css'
import useRoutes from './routes'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
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
