import React from 'react'
import Project from '../Projects/Project'
import Login from './Login'
import Signup from './Signup'


const Profile = () => {
  return (
    <div>
     <a href='/signup'><button>SIGNUP</button></a>
     <a href='/login'><button>LOGIN</button></a>

     <section>
      <Project />
     </section>
    </div>
  )
}

export default Profile
