import { Routes, Route } from 'react-router-dom'
import Home from './pages/LandingPage/Home'
import About from './pages/AboutPage/About'
import Project from './pages/Projects/Project'
import Login from './pages/Profile/Login'
import Signup from './pages/Profile/Signup'
import Profile from './pages/Profile/Profile'
import WithoutNav from './layout/WithoutNav'
import WithNav from './layout/WithNav'

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
          <Route path='/project' element={<Project />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
