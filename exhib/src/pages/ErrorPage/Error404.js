import React from 'react'
import ErrorImage from "../../static/images/error.PNG"
import '../ErrorPage/error.css'

const Error404 = () => {
  return (
    <section className='error_page'>
      <div>
        <img src={ErrorImage} alt='404 Error' />
      </div>
    </section>
  )
}

export default Error404
