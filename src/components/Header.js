import {Link} from 'react-router-dom';
function Header() {
  const TeacherLoginStatus=localStorage.getItem('TeacherLoginStatus')
  const StudentLoginStatus=localStorage.getItem('StudentLoginStatus')

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">EduSphere</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/Course-list">Courses</Link>
              <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Teacher
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {TeacherLoginStatus!='true' &&
                  <div>
                <li><Link className="dropdown-item" to="/Teacher-login">Login</Link></li>
                <li><Link className="dropdown-item" to="/Teacher-register">Register</Link></li>
                </div>
}
                {TeacherLoginStatus=='true' &&
                    <div>
                    <li><Link className="dropdown-item" to="/Teacher-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/Teacher-logout">Logout</Link></li>
                    </div>
                }
              </ul>
            </li>      
              <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {StudentLoginStatus!='true' &&
                  <div>
                <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                </div>
}
                {StudentLoginStatus=='true' &&
                <div>
                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                </div>
}
              </ul>
            </li>               
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;