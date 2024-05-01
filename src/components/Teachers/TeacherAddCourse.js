import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
function TeacherAddCourse() {
  const teacherId=localStorage.getItem('teacherId');
  console.log(teacherId);
  const [cats,setCats]=useState([]);
  const [courseData,setCourseData]=useState({
    category:'',
    title:'',
    description:'',
    f_img:'',
    techs:''
  });


  const handleChange=(event)=>{
    setCourseData({  
      ...courseData,
      [event.target.name]:event.target.value
    });
  }

  const handleFilechange=(event)=>{
    setCourseData({  
      ...courseData,
      [event.target.name]:event.target.files[0]
    });
  }

// Submit Form
const formSubmit=()=>{
  const teacherId=localStorage.getItem('teacherId');
  const _formData=new FormData();
  _formData.append("category",courseData.category);
  _formData.append("teacher",teacherId);
  _formData.append("title",courseData.title);
  _formData.append("description",courseData.description);
  _formData.append("featured_image",courseData.f_img,courseData.f_img.name);
  _formData.append("techs",courseData.techs);
  try{
    axios.post(baseUrl+'/course/',_formData,{
        headers:{
          'content-type':'multipart/form-data'
        }
    })
    .then((res)=>{
      window.location.href='/Teacher-add-courses'
    });
  }catch(error){
    console.log(error);
    
  }
};

  useEffect(()=>{
    try{
      axios.get(baseUrl+'/category')
      .then((res)=>{
          setCats(res.data);
      });
    }catch(error){
      console.log(error);
      
    }
  },[]);

  // console.log(cats);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Category
                </label>
                <select name="category" onChange={handleChange} className="form-control">
                  {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                </select>
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  name="title"
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">
                  Course Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="video" className="form-label">
                  Featured Image
                </label>
                <input
                  type="file"
                  onChange={handleFilechange}
                  name="f_img"
                  className="form-control"
                  id="f_img"
                  
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Technologies Used
                </label>
                <textarea
                  className="form-control"
                  id="techs"
                  name="techs"
                  placeholder="Python,ReactJs,Django etc.,"
                  onChange={handleChange}
                ></textarea>
              </div>
              <hr></hr>
              <button onClick={formSubmit} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherAddCourse;
