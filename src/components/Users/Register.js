// import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
function Register() {

  const [studentData,setstudentData]=useState({
    'full_name':'',
    'email':'',
    'password':'',
    'qualification':'',
    'mobile':'',
    'address':'',
    'interest_field':'',
    'status':''
  });

  const handleChange=(event)=>{
    setstudentData({  
      ...studentData,
      [event.target.name]:event.target.value
    });
  }

    // Submit Form
    const submitForm=()=>{
      const studentFormData=new FormData();
      studentFormData.append("full_name",studentData.full_name)
      studentFormData.append("email",studentData.email)
      studentFormData.append("password",studentData.password)
      studentFormData.append("qualification",studentData.qualification)
      studentFormData.append("mobile",studentData.mobile)
      studentFormData.append("address",studentData.address)
      studentFormData.append("interest_field",studentData.interest_field)
      
      try{
        axios.post(baseUrl+'/student/',studentFormData).then((response)=>{
          setstudentData({
            'full_name':'',
            'email':'',
            'password':'',
            'qualification':'',
            'mobile':'',
            'address':'',
            'interest_field':'',
            'status':'sucess'
  
          })
        });
      }catch(error){
        console.log(error);
        setstudentData({'status':'error'})
      }
    };


    useEffect(()=>{
      document.title='Students Registration'
    });
  
    const StudentLoginStatus=localStorage.getItem('StudentLoginStatus')
    if(StudentLoginStatus=='true'){
      window.location.href='/student-dashboard';
    }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
        {studentData.status==='sucess' && <p class='text-sucess'>Thanks for Your Registeration</p>}
          {studentData.status==='error' && <p class='text-danger'>Inputs are Invalid</p>}
          <div className="card">
            <h5 className="card-header">User Registeration</h5>
            <div className="card-body">
              <form>
              <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" >
                    FullName
                  </label>
                  <input className="form-control" name='full_name' type='text' value={studentData.full_name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" name='email' type='email'>
                    Email Id
                  </label>
                  <input type="email" className="form-control" name='email' onChange={handleChange} value={studentData.email} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" name='password' type='password'>
                    Password
                  </label>
                  <input type="password" className="form-control" name='password' onChange={handleChange}  value={studentData.password}/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" name='qualification' type='text'>
                    Qualification
                  </label>
                  <input type="text" className="form-control" name='qualification' onChange={handleChange} value={studentData.qualification} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" >
                    Mobile Number
                  </label>
                  <input className="form-control" name='mobile' type='number' onChange={handleChange} value={studentData.mobile} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label" >
                    Address
                  </label>
                  <input type="text" className="form-control" name='address' onChange={handleChange} value={studentData.address} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Interests
                  </label>
                  <textarea className="form-control" name='interest_field' type='text' onChange={handleChange} value={studentData.interest_field} ></textarea>
                  <div id="emailHelp" class="form-text">Example:Java,Python,Html etc.,</div>
                </div>
                <button type="submit" className="btn btn-primary"  onClick={submitForm}>
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
