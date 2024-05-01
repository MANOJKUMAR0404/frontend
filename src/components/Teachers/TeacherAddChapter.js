import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl="http://127.0.0.1:8000/api";

function TeacherAddChapter() {
  const [chapterData,setChapterData]=useState({
    title:'',
    description:'',
    video:'',
    remarks:''
  });


  const handleChange=(event)=>{
    setChapterData({  
      ...chapterData,
      [event.target.name]:event.target.value
    });
  }

  const handleFilechange=(event)=>{
    setChapterData({  
      ...chapterData,
      [event.target.name]:event.target.files[0]
    });
  }

  const {course_id}=useParams();
// Submit Form
const formSubmit=()=>{
  const _formData=new FormData();
  _formData.append("course",course_id);
  _formData.append("title",chapterData.title);
  _formData.append("description",chapterData.description);
  _formData.append("video",chapterData.video,chapterData.video.name);
  _formData.append("remarks",chapterData.remarks);
  try{
    axios.post(baseUrl+'/chapter/',_formData,{
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
  window.location.reload();
    }
  });
  }catch(error){
    console.log(error);
    
  }
};
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Course Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Video
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="video"
                  name="video"
                  onChange={handleFilechange}
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Remarks
                </label>
                <textarea
                  class="form-control"
                  name="remarks"
                  id="remarks"
                  rows="3"
                  placeholder="This video is about basic Introduction of the course"
                  onChange={handleChange}
                ></textarea>
              </div>
              <hr></hr>
              <button type="button" onClick={formSubmit} className="btn btn-primary">Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherAddChapter;
