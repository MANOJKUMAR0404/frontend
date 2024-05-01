import { Link } from "react-router-dom";
// import AllCourses from "./AllCourses";
import {useEffect,useState} from 'react';
import image from './images/image.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api";
function Home() {
  useEffect(()=>{
    document.title='Edusphere - Home'
  });

  const [courseData,setCourseData]=useState([]);
    
// fetch courses
  useEffect(()=>{
      try{
        axios.get(baseUrl+'/course/?result=4')
        .then((res)=>{
          setCourseData(res.data);
        });
      }catch(error){
        console.log(error);
        
      }
    },[]);

  return (
    <div className="container mt-4 col-12">
      {/* <div>
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={image} class="d-block w-100" alt="..." width="1000" height='600' />
        <h1 className="text-end"></h1>
    </div>
    <div class="carousel-item">
      <img src={image2} class="d-block w-100" alt="..." width="1000" height='600' />
      <div class="carousel-caption d-none d-md-block">
        <h1 ><text x='70%' y='50%'>Unlock your potential with knowledge, for learning is the gateway to endless possibilities.</text></h1>
      </div>
    </div>
    <div class="carousel-item">
      <img src={image3} class="d-block w-100" alt="..." width="1000" height='600' />
      <div class="carousel-caption d-none d-md-block">
        <h1 >Education is not just about gaining knowledge, but about becoming the best version of yourself.</h1>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div> */}
      {/*  Latest Courses*/}
      <h3 className="pb-1 mb-4">
        Latest Courses
        <Link to="/Course-list" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
      {courseData && courseData.map((course,index)=>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to={"/course-detail/"+course.id}>
              <img src={course.featured_image} className="img-thumbnail" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link className="text-decoration-none" to={"/course-detail/"+course.id}>{course.title}</Link>
              </h5>
                {course.techs}
            </div>
          </div>
        </div>
        )}
      </div>
      {/* End Latest Courses */}
      {/*  Popular Courses*/}
      {/* <h3 className="pb-1 mb-4 mt-5">
        Popular Courses
        <Link to="/popular-courses" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="/course-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/course-detail/1">Course title</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 12000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 12000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 12000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course title</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
                <span className="float-end">Views: 12000</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End Popular Courses */}
      {/*  Popular Teachers*/}
      {/* <h3 className="pb-1 mb-4 mt-5">
        Featured Teachers
        <Link to="/all-teachers" className="float-end">
          See All
        </Link>
      </h3>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <Link to="/Teacher-detail/1">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/Teacher-detail/1">Teachers Name</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teachers Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teachers Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img src="logo512.png" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Teachers Name</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End Popular Teachers */}
      {/* Student Testimonials   */}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div
        id="carouselExampleIndicators"
        className="carousel slide bg-dark text-white py-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A weown quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure className="text-center">
              <blockquote className="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* End Student Testimonials */}
    </div>
  );
}

export default Home;
