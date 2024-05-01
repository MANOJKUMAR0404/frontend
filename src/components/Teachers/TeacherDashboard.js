// import { Link } from "react-router-dom";
// import { Routes as Switch,Route} from 'react-router-dom';
import {useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./TeacherSidebar";
const baseUrl="http://127.0.0.1:8000/api";
function TeacherDashboard() {
  const [dashboardData,setdashboardData]=useState([]);
  const teacherId=localStorage.getItem('teacherId');
  useEffect(()=>{
    try{
      axios.get(baseUrl+'/teacher/dashboard/'+teacherId)
      .then((res)=>{
        setdashboardData(res.data);
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
            <div className='row'>
              <div className='col-md-3'>
                <div  className='card border-primary'>
                  <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                  <div className='card-body'>
                    <h3>{dashboardData.total_teacher_courses}</h3>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div  className='card border-success'>
                  <h5 className='card-header bg-success text-white'>Total Students</h5>
                  <div className='card-body'>
                    <h3>{dashboardData.total_teacher_students}</h3>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div  className='card border-info'>
                  <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                  <div className='card-body'>
                    <h3>{dashboardData.total_teacher_chapters}</h3>
                  </div>
                </div>
              </div>
            </div>
        </section>
        </div>
      </div>
  );
}

export default TeacherDashboard;
