import { Routes, Route } from 'react-router-dom'
import Home from './pages/LandingPage/Home'
import ProjectDetails from './pages/LandingPage/components/ProjectDetails'
import About from './pages/AboutPage/About'
import Project from './pages/Projects/Project'
import Login from './pages/Profile/Login'
import Signup from './pages/Profile/Signup'
import Profile from './pages/Profile/Profile'
import WithoutNav from './layout/WithoutNav'
import WithNav from './layout/WithNav'
import 'react-toastify/dist/ReactToastify.css'
import ProjectInfo from './pages/Projects/ProjectInfo/ProjectInfo'
import Error404 from './pages/ErrorPage/Error404'
import ProtectedRoute from './layout/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path='/' element={<Home />} />
          <Route path='project-details' element={<ProjectDetails />} />
          <Route path='/about' element={<About />} />

          <Route path='/project' element={<ProtectedRoute><Project /></ProtectedRoute>}/>
          <Route path='/project/:projectId' element={<ProjectInfo />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
