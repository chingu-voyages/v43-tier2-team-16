import { useParams } from 'react-router-dom'
import styles from './ProjectInfo.module.css'
import { useAuthContext } from '../../../context/AuthContext'

const ProjectInfo = () => {
  const { projectId } = useParams()

  const { usersData } = useAuthContext()

  const userData = usersData.find(user => user.uid === projectId)

  if (!userData) {
    return <p>User Data not found</p>
  }

  return (
    <div className={styles.container}>
      <img src={userData.photoURL} alt={userData.projectName} />

      <section>
        <h2>{userData.projectName}</h2>
        <h5>
          Developed by : <span>{userData.developer}</span>
        </h5>
        <p className={styles.description}>{userData.description}</p>
        <div>
          {userData.stacks.split(',').map(stack => (
            <p
              className={styles.stacks}
              style={{
                backgroundColor: `rgb(${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )})`
              }}
            >
              {stack}
            </p>
          ))}
        </div>
        <a href={userData.liveSite} target='_blank' rel='noreferrer'>
          <button>View Live Site &rArr;</button>
        </a>
      </section>
    </div>
  )
}

export default ProjectInfo
