function TeacherLogout(){
    localStorage.removeItem('TeacherLoginStatus')
        window.location.href="/Teacher-login";
    return(
        <div></div>
    )
};
export default TeacherLogout;