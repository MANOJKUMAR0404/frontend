import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl="http://127.0.0.1:8000/api";
function EditCourse() {
  const teacherId=localStorage.getItem('teacherId');
  console.log(teacherId);
  const [cats,setCats]=useState([]);
  const [courseData,setCourseData]=useState({
    category:'',
    title:'',
    description:'',
    prev_img:'',
    f_img:'',
    techs:''
  });

  const {course_id}=useParams();

  useEffect(()=>{
    try{
      axios.get(baseUrl+'/category')
      .then((res)=>{
          setCats(res.data);
      });
    }catch(error){
      console.log(error);
    }
    //Fetch Current Course data
    try {
        axios.get(baseUrl + "/teacher-course-detail/"+course_id)
        .then((res) => {
            setCourseData({
            category:res.data.category,
            title:res.data.title,
            description:res.data.description,
            prev_img:res.data.featured_image,
            techs:res.data.techs,
            f_img:''
          });
        });
      } catch (error) {
        console.log(error);
      }
  },[]);

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
  const _formData=new FormData();
  _formData.append("category",courseData.category);
  _formData.append("teacher",teacherId);
  _formData.append("title",courseData.title);
  _formData.append("description",courseData.description);
  if(courseData.f_img!==""){
      _formData.append("featured_image",courseData.f_img,courseData.f_img.name);
  }
  _formData.append("techs",courseData.techs);
  try{
    axios.put(baseUrl+'/teacher-course-detail/'+course_id,_formData,{
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

  

  // console.log(cats);
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Category
                </label>
                <select name="category" value={courseData.category} onChange={handleChange} className="form-control">
                  {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                </select>
              </div>
              <div className="mb-3">
                <label for="title" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  value={courseData.title}
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
                  value={courseData.description}
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
                {courseData.prev_img &&
                <img src={courseData.prev_img} width='300' height='200'/>
                }
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
                  value={courseData.techs }
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

export default EditCourse;
