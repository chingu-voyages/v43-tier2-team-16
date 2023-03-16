import Home from '../pages/LandingPage/Home';
import About from '../pages/AboutPage/About';
import Project from '../pages/Projects/Project';
import Login from '../pages/Profile/Login';
import Signup from '../pages/Profile/Signup';

function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/profile">Add Project</a></li>
        
      </ul>
    </nav>
  );
}

export default Nav;
