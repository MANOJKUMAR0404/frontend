// import { Link } from "react-router-dom";
// import { Routes as Switch,Route} from 'react-router-dom';
import {useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from "./TeacherSidebar";
const baseUrl="http://127.0.0.1:8000/api";
function TeacherProfileSetting() {

  const teacherId=localStorage.getItem('teacherId');
  const [teacherData,setteacherData]=useState({
    full_name:'',
    email:'',
    qualification:'',
    password:'',
    prev_photo:'',
    p_photo:'',
    mobile:'',
    skills:'',
    status:''
  });


  useEffect(()=>{
    try {
        axios.get(baseUrl + "/teacher/"+teacherId)
        .then((res) => {
          setteacherData({
            full_name:res.data.full_name,
            email:res.data.email,
            password:res.data.password,
            qualification:res.data.qualification,
            password:res.data.password,
            prev_photo:res.data.profile_photo,
            mobile:res.data.mobile,
            skills:res.data.skills,
            p_photo:''
          });
        });
      } catch (error) {
        console.log(error);
      }
  },[]);

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
    if(teacherData.p_photo!==""){
      teacherFormData.append("profile_photo",teacherData.p_photo,teacherData.p_photo.name);
  }
    teacherFormData.append("mobile",teacherData.mobile)
    teacherFormData.append("skills",teacherData.skills)
    try{
      axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormData,{
          headers:{
            'content-type':'multipart/form-data'
          }
      })
      .then((res)=>{
        if(res.status==200 || res.status==201){
          Swal.fire({
              title: 'Data has been Updated!',
              icon: 'success',
              toast:true,
              timer:3000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
    });
      }
      });
    }catch(error){
      console.log(error);
      
    }
  };

useEffect(()=>{
  document.title='Teacher Profile'
});

const TeacherLoginStatus=localStorage.getItem('TeacherLoginStatus')
if(TeacherLoginStatus!='true'){
  window.location.href='/Teacher-login';
}

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
        <div className="card">
            <h5 className="card-header">Edit Profile</h5>
            <div className="card-body">
              <form>
              <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    FullName
                  </label>
                  <input onChange={handleChange} value={teacherData.full_name} name="full_name" type="text" id="full_name" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email Id
                  </label>
                  <input onChange={handleChange} value={teacherData.email} name="email" type="email" id="email" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Qualification
                  </label>
                  <input onChange={handleChange} value={teacherData.qualification} name="qualification" id="qualification" type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Password
                  </label>
                  <input onChange={handleChange} value={teacherData.password} name="password" type="text" id="password" className="form-control"/>
                </div>
                <div className="mb-3">
                <label for="video" className="form-label">
                  Featured Image
                </label>
                <input
                  type="file"
                  onChange={handleFilechange}
                  name="p_photo"
                  className="form-control"
                  id="p_photo"
                />
                {teacherData.prev_photo &&
                <img src={teacherData.prev_photo} width='300' height='200' alt='phot not loaded'/>
                }
              </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Mobile Number
                  </label>
                  <input onChange={handleChange} value={teacherData.mobile} name="mobile" id="number" type="number" className="form-control"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Skills
                  </label>
                  <textarea onChange={handleChange} value={teacherData.skills} id="skills" name="skills" className="form-control"></textarea>
                  <div id="emailHelp" className="form-text">Example:Java,Python,Html etc.,</div>
                </div>
                {/* name="status" */}
                <button type="submit" onClick={submitForm} className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSetting;
