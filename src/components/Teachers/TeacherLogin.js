// import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
function TeacherLogin() {
  const [TeacherLoginData,setTeacherLoginData]=useState({
    'email':'',
    'password':''
  });

  const [errorMsg,seterrorMsg]=useState('');
  // element value change
 const handleChange=(event)=>{
    setTeacherLoginData({  
      ...TeacherLoginData,
      [event.target.name]:event.target.value
    });
  }
  // Submit Form
  const submitForm=()=>{
    const TeacherFormData=new FormData();
    TeacherFormData.append("email",TeacherLoginData.email)
    TeacherFormData.append("password",TeacherLoginData.password)
    try{
      axios.post(baseUrl+'/teacher-login',TeacherFormData)
      .then((res)=>{
          if(res.data.bool==true){
            localStorage.setItem('TeacherLoginStatus',true);
            localStorage.setItem('teacherId',res.data.teacher_id);
            window.location.href='/Teacher-dashboard';
          }else{
            seterrorMsg("Invalid Email or Password!!!")
          }
      });
    }catch(error){
      console.log(error);
      
    }
  };

  const TeacherLoginStatus=localStorage.getItem('TeacherLoginStatus')
  if(TeacherLoginStatus=='true'){
    window.location.href='/Teacher-dashboard';
  }

  useEffect(()=>{
    document.title='Teachers Login'
  });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
              {errorMsg && <p className='text-danger'>{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    name='email'
                    type="email"
                    value={TeacherLoginData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    name='password'
                    type="password"
                    value={TeacherLoginData.password}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                {/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div> */}
                <button onClick={submitForm} type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
