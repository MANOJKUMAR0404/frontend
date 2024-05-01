import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
const baseUrl="http://127.0.0.1:8000/api";

function TeacherMyCourses() {

    const [courseData,setCourseData]=useState([]);
    const {course_id}=useParams();

    const teacherId=localStorage.getItem('teacherId');
      
// fetch courses  
    useEffect(()=>{
        try{
          axios.get(baseUrl+'/teacher-courses/'+teacherId)
          .then((res)=>{
            setCourseData(res.data);
          });
        }catch(error){
          console.log(error);
          
        }
      },[]);


      // const handleDeleteClick = (course_id) => {
      //   Swal.fire({
      //       title: 'Confirm!',
      //       text: 'Are You sure you want to delete this data',
      //       icon: 'info',
      //       confirmButtonText: 'Continue',
      //       showCancelButton:true
      //     }).then((result)=>{
      //       if(result.isConfirmed){
      //         try{
      //           axios.delete(baseUrl+'/course/'+course_id)
      //           .then((res)=>{
      //             Swal.fire('success','Data has been deleted!');
      //           });
      //         }catch(error){
      //           Swal.fire('ok','Data has not been deleted!');
      //         }
      //       }else{
      //         Swal.fire('ok','Data has not been deleted!');
      //       }
      //     });
      //   }
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
            <Sidebar />
        </aside>
        <section className="col-md-9">
            <div className='card'>
                <h5 className='card-header'>My Courses</h5>
                <div className='card-body'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Images</th>
                                <th>Total Enrolled</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((course,index)=>
                            <tr>
                            <td><Link to={"/all-chapters/"+course.id}>{course.title}</Link>
                            <hr />
                            {course.course_rating &&
                            <div>
                            Rating: {course.course_rating}/5
                            </div>
                            }
                            </td>
                            <td><img src={course.featured_image} width='100'  height='80' className="rounded" alt={course.title}/></td>
                            <td><Link to={"/enrolled-students/"+course.id}>{course.total_enrolled_students}</Link></td>
                            <td>
                                <Link className='btn btn-success btn-sm' to={"/Teacher-addchapter/"+course.id} >Add Chapter</Link>
                                <Link className='btn btn-info btn-sm ms-2' to={"/edit-course/"+course.id} >Edit</Link>
                                <button className='btn btn-danger btn-sm ms-2'>Delete</button>
                            </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        </div>
      </div>
  );
}

export default TeacherMyCourses;
