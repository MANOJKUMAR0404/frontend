import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useRef } from 'react';
const baseUrl = "http://127.0.0.1:8000/api";

function AllChapters() {
  const [chapterData, setchapterData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { course_id } = useParams();
  const videoRef = useRef(null);

  const handleSeek = (e) => {
    const seekBar = e.target;
    const seekPosition = (e.nativeEvent.offsetX / seekBar.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = seekPosition;
  };

  const handleSeeked = () => {
    const seekBar = document.querySelector("input[type='range']");
    videoRef.current.currentTime = seekBar.value;
  };

  // fetch courses
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course-chapters/" + course_id).then((res) => {
        settotalResult(res.data.length);
        setchapterData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // delete data
  
  const handleDeleteClick = (chapter_id) => {
    Swal.fire({
        title: 'Confirm!',
        text: 'Are You sure you want to delete this data',
        icon: 'info',
        confirmButtonText: 'Continue',
        showCancelButton:true
      }).then((result)=>{
        if(result.isConfirmed){
          try{
            axios.delete(baseUrl+'/chapter/'+chapter_id)
            .then((res)=>{
              Swal.fire('success','Data has been deleted!');
              try {
                axios.get(baseUrl + "/course-chapters/" + course_id).then((res) => {
                  settotalResult(res.data.length);
                  setchapterData(res.data);
                });
              } catch (error) {
                console.log(error);
              }
              // console.log(res);
              // settotalResult(res.data.length);
              // setchapterData(res.data);
            });
          }catch(error){
            Swal.fire('ok','Data has not been deleted!');
          }
        }else{
          Swal.fire('ok','Data has not been deleted!');
        }
      });
    }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters ({totalResult})<Link className="btn btn-info float-end" to={"/Teacher-addchapter/"+course_id}>Add Chapter</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData.map((chapter, index) => (
                    <tr>
                      <td className="col-md-3">
                        <Link to={'/edit-chapter/'+chapter.id}>
                          <div>{chapter.title}</div>
                        </Link>
                      </td>
                      <td className="col-md-3">
                        <br />
                        <video  controls width='300' height='150'>
                            <source src={chapter.video} type="video/mp4" />
                        </video>
                      </td>
                      <td className="col-md-3">
                        {chapter.remarks}
                      </td>
                      <td>
                      <button className="btn btn-sm btn-info text-white">
                      <Link to={'/edit-chapter/'+chapter.id}><i class="bi bi-pencil-square"></i></Link>
                        </button>
                        
                        <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-sm btn-danger text-white ms-2"><i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllChapters;
