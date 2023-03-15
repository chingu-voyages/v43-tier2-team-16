import Home from '../pages/Home';
import About from '../pages/About';
import Project from '../pages/Project';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/project">Project</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign up</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
