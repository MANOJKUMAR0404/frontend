// import { Link } from "react-router-dom";

import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
  
function Login() {

  const [StudentLoginData,setStudentLoginData]=useState({
    'email':'',
    'password':''
  })

  const [errorMsg,seterrorMsg]=useState('');
  // element value change
 const handleChange=(event)=>{
  setStudentLoginData({  
      ...StudentLoginData,
      [event.target.name]:event.target.value
    });
  }
  // Submit Form
  const submitForm=()=>{
    const StudentFormData=new FormData();
    StudentFormData.append("email",StudentLoginData.email)
    StudentFormData.append("password",StudentLoginData.password)
    try{
      axios.post(baseUrl+'/student-login',StudentFormData)
      .then((res)=>{
          if(res.data.bool==true){
            localStorage.setItem('StudentLoginStatus',true);
            localStorage.setItem('studentId',res.data.student_id);
            window.location.href='/user-dashboard';
          }else{
            seterrorMsg("Invalid Email or Password!!!")
          }
      });
    }catch(error){
      console.log(error);
      
    }
  };

  const StudentLoginStatus=localStorage.getItem('StudentLoginStatus')
  if(StudentLoginStatus==='true'){
    window.location.href='/user-dashboard';
  }

  useEffect(()=>{
    document.title='Student Login'
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">User Login</h5>
            <div className="card-body">
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    UserName
                  </label>
                  <input
                    name='email'
                    type="email"
                    value={StudentLoginData.email}
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
                    value={StudentLoginData.password}
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
                <button onClick={submitForm} type="submit"className="btn btn-primary">
                  Login
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
