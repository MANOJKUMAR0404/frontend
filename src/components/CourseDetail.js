import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail() {
  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [techlistData, settechlistData] = useState([]);
  const [userloginStatus, setuserloginStatus] = useState([]);
  const [enrollStatus, setenrollStatus] = useState([]);
  let { course_id } = useParams();
  const [ratingStatus,setratingStatus]=useState();
  const [Averagerating,setAveragerating]=useState();
  const studentId = localStorage.getItem("studentId");
  // fetch courses
  useEffect(() => {
    try {
      axios.get(baseUrl + "/course/" + course_id).then((res) => {
        setcourseData(res.data);
        setchapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
        setrelatedcourseData(JSON.parse(res.data.related_videos));
        settechlistData(res.data.tech_list);
        if(res.data.course_rating!='' && res.data.course_rating!=null){
          setAveragerating(res.data.course_rating)
        }
      });
    } catch (error) {
      console.log(error);
    }

    // enroll status
    try {
      axios.get(baseUrl + "/fetch-enroll-status/" + studentId + "/" + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    // fetch rating status
    try {
      axios.get(baseUrl + "/fetch-rating-status/" + studentId + "/" + course_id).then((res) => {
          if (res.data.bool == true) {
            setratingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const StudentLoginStatus = localStorage.getItem("StudentLoginStatus");
    if (StudentLoginStatus === "true") {
      setuserloginStatus("success");
    }
  }, []);

  const enrollCourse = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", studentId);
    try {
      axios
        .post(baseUrl + "/student-enroll-course/", _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // window.location.href='/Teacher-add-courses'
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You are successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setenrollStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


  // add rating
const [ratingData,setratingData]=useState({
  rating:'',
  reviews:''
})


  const handleChange=(event)=>{
    setratingData({  
      ...ratingData,
      [event.target.name]:event.target.value
    });
  }

  // Submit Form
const formSubmit=()=>{
  const _formRatingData=new FormData();
  _formRatingData.append("course",course_id);
  _formRatingData.append("student",studentId);
  _formRatingData.append("rating",ratingData.rating);
  _formRatingData.append("reviews",ratingData.reviews)
  try{
    axios.post(baseUrl+'/course-rating/',_formRatingData,{
        headers:{
          'content-type':'multipart/form-data'
        }
    })
    .then((res)=>{
      if(res.status==200 || res.status==201){
        Swal.fire({
            title: 'Rating has been Updated!',
            icon: 'success',
            toast:true,
            timer:3000,
            position:'top-right',
            timerProgressBar:true,
            showConfirmButton:false
  });
  // window.location.reload();
    }
    });
  }catch(error){
    console.log(error);
    
  }
};

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_image}
            width='300'
            height='200'
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{" "}
            <Link to={`/Teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p className="fw-bold">
            Techs:&nbsp;
            {techlistData.map((tech, index) => (
              <>
                <Link
                  to={`/category/${tech.trim()}`}
                  className="badge badge-pill text-dark bg-warning"
                >
                  {tech}
                </Link>
                &nbsp;
              </>
            ))}
          </p>
          <p className="fw-bold">Course Duration: 3hr 40min</p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Students
          </p>
          <p className="fw-bold">
            Rating : {Averagerating}/5
            {enrollStatus === "success" && userloginStatus === "success" &&  
              <>
              {ratingStatus!='success' && 
                <button
                  className="btn btn-success btn-sm ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#ratingModal"
                >
                  Rating
                </button>
                }

                <div
                  className="modal fade"
                  id="ratingModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Rating for {courseData.title}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label
                              for="exampleInputEmail1"
                              className="form-label"
                            >
                              Rating
                            </label>
                            <select onChange={handleChange} className="form-control" name="rating">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label
                              for="exampleInputPassword1"
                              className="form-label"
                            >
                              Comments
                            </label>
                            <textarea
                              className="form-control"
                              name="reviews"
                              rows="10"
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <button type="submit" onClick={formSubmit} className="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </p>
          {enrollStatus === "success" && userloginStatus == "success" && (
            <p>
              <span>You are already enrolled in this course</span>
            </p>
          )}
          {userloginStatus == "success" && enrollStatus !== "success" && (
            <p>
              <button
                className="btn btn-success"
                type="button"
                onClick={enrollCourse}
              >
                Enroll in this course
              </button>
            </p>
          )}
          {userloginStatus !== "success" && (
            <p>
              <Link className="btn btn-success" to={"/user-login"}>
                Login to Enroll Course
              </Link>
            </p>
          )}
        </div>
      </div>
      {/* course videos */}
      {enrollStatus === "success" && userloginStatus == "success" && (
        <div className="card mt-4">
          <div className="card-header">
            <h5>Course videos</h5>
          </div>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              // <li className="list-group-item">
              //   {chapter.title}
              //   <span className="float-end">
              //     {/* <span className="me-3">1 hour 30 minutes</span> */}
              //     <button className="moda"><i className="bi bi-play-circle"></i></button>
              //   </span>
              // </li>
              <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="true" aria-controls="collapseOne">
        {chapter.title}
      </button>
    </h2>
    <div id="collapse" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div>Description: {chapter.description}</div>
        <video controls width='400' height='300'>
          <source src={chapter.video} type="video/mp4"></source>
        </video>
      </div>
    </div>
  </div>
  
</div>
            ))}
          </ul>
        </div>
      )}
      {/* Latest Courses
      <h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
      <div className="row mb-4">
        {relatedcourseData.map((rcourse,index)=>
        <div className="col-md-3">
          <div className="card">
            <Link target="__blank" to={`/course-detail/${rcourse.pk}`}>
              <img src={`${siteUrl}media/${rcourse.fields.featured_image}`} className="card-img-top" alt={rcourse.fields.title} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
              <Link target="__blank" to={`/course-detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
              </h5>
            </div>
          </div>
        </div>
        )}
      </div> */}
      {/* End Latest Courses */}
    </div>
  );
}
export default CourseDetail;
