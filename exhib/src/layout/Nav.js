import './nav.css'
import { useState } from 'react';

function Nav() {
  const [activeNav, setActiveNav] = useState(false);
  var buttonText = activeNav ? 'close' : 'open'

  const handleNavMenu = () => {
    setActiveNav(!activeNav);
  }

  return (
    <nav className={`navbar ${activeNav ? 'active' : ''}`}>
      <div className='container'>
        <div className='nav-brand-wrapper'>
          <p className='h2 mb-0'>Exhib</p>
        </div>
        <button className='nav-trigger d-block d-lg-none m-0 ml-auto' onClick={handleNavMenu}>
          {buttonText}
        </button>
        <ul className='nav-menu d-flex align-items-center justify-content-center flex-column flex-lg-row'>
          <li className='link'><a href='/'>Home</a></li>
          <li className='link mx-4 my-5 my-lg-0'><a href='/about'>About</a></li>
          <li><a href='/profile'>Add Project</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
