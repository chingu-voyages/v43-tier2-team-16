import React, {useState} from 'react'
import classes from "../Projects/project.module.css"

const Project = () => {

  const [maxCharacter, setMaxCharacter]= useState('')
  const [error, setError]= useState('')

  const handleChange=(e)=>{
    if(e.target.value.length >= 100){
       setMaxCharacter(e.target.value)
  }
}
   
  
  return (
    <section className={classes.projects}>

    <h1>Kindly fill out the form to upload a project.</h1>
    <div className={classes.form}>
      <form>
    <input type='file'/>
    <button>Upload Image</button>
    <textarea type='message' cols='20 'rows="10" placeholder="Give a short description of your work" onChange={handleChange}/>
    <input type='text' placeholder='stacks used'/>
    <button>Uplaod Project</button>
    </form>
    </div>
  </section>
  )
}

export default Project


