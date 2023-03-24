import { Routes, Route } from 'react-router-dom'
import Home from './pages/LandingPage/Home'
import About from './pages/AboutPage/About'
import Project from './pages/Projects/Project'
import Login from './pages/Profile/Login'
import Signup from './pages/Profile/Signup'
import Profile from './pages/Profile/Profile'
import WithoutNav from './layout/WithoutNav'
import WithNav from './layout/WithNav'
import 'react-toastify/dist/ReactToastify.css'
import ProjectInfo from './pages/Projects/ProjectInfo/ProjectInfo'

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
          <Route path='/about' element={<About />} />
          <Route path='/project'>
            <Route index element={<Project />} />
            <Route path=':projectId' element={<ProjectInfo />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
