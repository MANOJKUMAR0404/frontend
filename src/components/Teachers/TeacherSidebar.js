import { Link } from "react-router-dom";
function TeacherSidebar(){
    return(
        <div className="card">
            <div className="list-group list-group-flush">
            <Link to="/Teacher-dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to="/Teacher-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/Teacher-add-courses" className="list-group-item list-group-item-action">Add Courses</Link>
                <Link to="/Teacher-MyUsers" className="list-group-item list-group-item-action">My Users</Link>
                <Link to="/Teacher-profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                {/* <Link to="/Teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link> */}
                <Link to="/Teacher-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
            </div>
    );
}

export default TeacherSidebar;