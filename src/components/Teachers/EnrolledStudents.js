import { Link } from "react-router-dom";
import Sidebar from "./TeacherSidebar";
import {useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";

function EnrolledStudents() {

    const [studentData,setstudentData]=useState([]);
    const {course_id}=useParams();
      
// fetch courses  
    useEffect(()=>{
        try{
          axios.get(baseUrl+'/fetch-enrolled-students/'+course_id)
          .then((res)=>{
            setstudentData(res.data);
          });
        }catch(error){
          console.log(error);
          
        }
      },[]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
            <Sidebar />
        </aside>
        <section className="col-md-9">
            <div className='card'>
                <h5 className='card-header'>Enrolled Students List</h5>
                <div className='card-body'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Interested Categories</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((row,index)=>
                            <tr>
                            <td>{row.student.full_name}</td>
                            <td>{row.student.email}</td>
                            <td>{row.student.interest_field}</td>
                            <td>
                                {/* <Link className='btn btn-info btn-sm ms-2' to={"/edit-course/"+student.id} >View</Link> */}
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

export default EnrolledStudents;
