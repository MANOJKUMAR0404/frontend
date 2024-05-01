import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const baseUrl = "http://127.0.0.1:8000/api";
const siteUrl = "http://127.0.0.1:8000/";
function TeacherDetail() {
  let {teacher_id} = useParams();
const [teacherData, setteacherData] = useState([]);
const [courseData, setcourseData] = useState([]);
const [skilllistData, setskilllistData] = useState([]);

// fetch courses
useEffect(() => {
  try {
    axios.get(baseUrl + "/teacher/" + teacher_id)
    .then((res) => {
      setcourseData(res.data.teacher_courses);
      setteacherData(res.data);
      setskilllistData(res.data.skill_list);
    });
  } catch (error) {
    console.log(error);
  }
}, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <img src={teacherData.profile_photo} width='400' height='300' className="img-thumbnail" alt="not-loaded" />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>
            {teacherData.detail}
          </p>
          <p className="fw-bold">
            Skills:&nbsp;
            {skilllistData.map((skill,index)=>
            <>
              <Link to={`/category/${skill.trim()}`} className="badge badge-pill text-dark bg-warning">{skill}</Link>&nbsp;
              </>
          )}
          </p>
          <p className="fw-bold">Recent Course: <Link to="/Teacher-detail/1">Figma</Link></p>
          <p className="fw-bold">Rating : 4.5/5</p>
        </div>
      </div>
      {/* course videos */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Course list</h5>
        </div>
        <div className="list-group list-group-flush">
          {courseData.map((course,index)=>
          <Link to={`/course-detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
        )}
        </div>
      </div>
    </div>
  );
}
export default TeacherDetail;
