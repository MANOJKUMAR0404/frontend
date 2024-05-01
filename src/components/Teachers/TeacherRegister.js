// import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
function TeacherRegister() {
  const [teacherData,setteacherData]=useState({
    'full_name':'',
    'email':'',
    'password':'',
    'qualification':'',
    'profile_photo':'',
    'mobile':'',
    'skills':'',
    'status':''
  });

  // element value change
 const handleChange=(event)=>{
    setteacherData({  
      ...teacherData,
      [event.target.name]:event.target.value
    });
  }

  const handleFilechange=(event)=>{
    setteacherData({  
      ...teacherData,
      [event.target.name]:event.target.files[0]
    });
  }
  // Submit Form
  const submitForm=()=>{
    const teacherFormData=new FormData();
    teacherFormData.append("full_name",teacherData.full_name)
    teacherFormData.append("email",teacherData.email)
    teacherFormData.append("password",teacherData.password)
    teacherFormData.append("qualification",teacherData.qualification)
    teacherFormData.append("profile_photo",teacherData.profile_photo,teacherData.profile_photo.name)
    teacherFormData.append("mobile",teacherData.mobile)
    teacherFormData.append("skills",teacherData.skills)
    
    try{
      axios.post(baseUrl+'/teacher/',teacherFormData).then((response)=>{
        setteacherData({
          'full_name':'',
          'email':'',
          'password':'',
          'qualification':'',
          'profile_photo':'',
          'mobile':'',
          'skills':'',
          'status':'sucess'

        })
      });
    }catch(error){
      console.log(error);
      setteacherData({'status':'error'})
    }
  };

  useEffect(()=>{
    document.title='Teachers Registration'
  });

  const TeacherLoginStatus=localStorage.getItem('TeacherLoginStatus')
  if(TeacherLoginStatus=='true'){
    window.location.href='/Teacher-dashboard';
  }


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          {teacherData.status==='sucess' && <p class='text-sucess'>Thanks for Your Registeration</p>}
          {teacherData.status==='error' && <p class='text-danger'>Inputs are Invalid</p>}
          <div className="card">
            <h5 className="card-header">Teacher Registeration</h5>
            <div className="card-body">
              <form>
              <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    FullName
                  </label>
                  <input onChange={handleChange} value={teacherData.full_name} name="full_name"type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email Id
                  </label>
                  <input onChange={handleChange} value={teacherData.email} name="email" type="email" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Password
                  </label>
                  <input onChange={handleChange} value={teacherData.password} name="password" type="password" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input onChange={handleChange} value={teacherData.qualification} name="qualification" type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Profile Photo
                  </label>
                  <input onChange={handleFilechange} name="profile_photo" type="file" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Mobile Number
                  </label>
                  <input onChange={handleChange} value={teacherData.mobile} name="mobile" type="number" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Skills
                  </label>
                  <textarea onChange={handleChange} value={teacherData.skills} name="skills" className="form-control"></textarea>
                  <div id="emailHelp" className="form-text">Example:Java,Python,Html etc.,</div>
                </div>
                {/* name="status" */}
                <button onClick={submitForm} type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
