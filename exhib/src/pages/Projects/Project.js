import React, {useState, useEffect} from 'react'
import classes from "../Projects/project.module.css"
import { storage } from '../../firebase-config'
import {ref, uploadBytes, getDownloadURL, listAll} from 'firebase/storage'
import { v4 } from 'uuid'
import Form from '../../layout/Form'

const Project = () => {

 
  const [imageUpload, setImageUpload]= useState(null)
  // const [url, setUrl]= useState('')
  const [imageList, setImageList]= useState([])

  const handleImageChange = (e) =>{
    
    if(e.target.files[0]) {
    }
    setImageUpload(e.target.files[0])
  }
    //  console.log(imageUpload)
    // if(imageUpload == null) return
    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    // uploadBytes(imageRef, imageUpload).then(() => {
    //   alert("image uploaded")
    // })
   const imageListRef=ref(storage, '/images')

  

  const handleUploadImage = (e) =>{
    e.preventDefault();
    const imageRef = ref(storage, `/images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url)=> {
        setImageList((prev) => [...prev, url])
      })
    
     .catch(err =>{
      //   console.log(err.message, "error getting the image url")
      })
     
      .catch(err =>{
        console.log(err.message)
      })

      .finally(() => {

        // Clear the selected image from the state
        setImageUpload(null);
        });
        
    })

  }
  useEffect(()=> {
    listAll(imageListRef).then((response) =>{
      response.items.forEach((item)=> {
        console.log(response)
        getDownloadURL(item).then((url)=> {
          setImageList((prev) => [...prev, url])
          
      })
    })
  })
  }, [])

  
  return (
    <section className={classes.projects}>

    <h1>Kindly fill out the form to upload a project.</h1>
    <div className={classes.form}>
      <form>
    <input type='file' onChange={handleImageChange}/>
    <button onClick={handleUploadImage}>Upload Image</button>
    <textarea type='message' cols='20 'rows="10" placeholder="Give a short description of your work"/>
    <input type='text' placeholder='stacks used' />
    <button>Upload Project</button>
    </form>
    </div>
    <div className={classes.images_container}>
    {imageList.map((url, id) => {
    
      return <Form image={url} key={id}/>
     
    })}
   </div>
  </section>
  )
}

export default Project


