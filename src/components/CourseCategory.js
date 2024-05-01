import {Link} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
const baseUrl = "http://127.0.0.1:8000/api";
function CourseCategory() {

  const {category_slug} = useParams();
  const [courseData, setcourseData] = useState([]);
  // fetch courses
useEffect(() => {
  try {
    axios.get(baseUrl +"/course/?category="+category_slug)
    .then((res) => {
      setcourseData(res.data);
    });
  } catch (error) {
    console.log(error);
  }
}, []);

  return (
    <div className="container mt-3">
      {/*  Latest Courses*/}
      <h3 className="pb-1 mb-4">
        {category_slug}
      </h3>
      <div className="row">
      {courseData && courseData.map((course,index)=>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to={"/course-detail/"+course.id}>
              <img src={course.featured_image} width='300' height='250' className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to={"/course-detail/"+course.id}>{course.title}</Link>
              </h5>
            </div>
          </div>
        </div>
        )}
      </div>
      {/* End Latest Courses */}
      {/* pagination start */}
      <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
      {/* pagination end */}
    </div>
  );
}
export default CourseCategory;
