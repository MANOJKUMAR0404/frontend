import Home from './Home'
import Header from './Header';
import About from './About';
import Footer from './Footer';
import CourseDetail from "./CourseDetail";
import { Routes as Switch,Route} from 'react-router-dom';
import TeacherDetail from './TeacherDetail';

// User Panel
import Login from './Users/Login';
import Register from './Users/Register';
import Dashboard from './Users/Dashboard';
import MyCourses from './Users/MyCourses';
import FavoriteCourses from './Users/FavoriteCourses';
import RecommendedCourses from './Users/RecommendedCourses';
import ProfileSetting from './Users/ProfileSetting';
import ChangePassword from './Users/ChangePassword';

// Teachers Panel
import TeacherLogin from './Teachers/TeacherLogin';
import TeacherRegister from './Teachers/TeacherRegister';
import TeacherMyCourses from './Teachers/TeacherMyCourses';
import TeacherProfileSetting from './Teachers/TeacherProfileSetting';
import TeacherDashboard from './Teachers/TeacherDashboard';
import TeacherChangePassword from './Teachers/TeacherChangePassword'
import TeacherAddCourse from './Teachers/TeacherAddCourse';
import TeacherMyUsers from './Teachers/TeacherMyUsers';
import AllChapters from './Teachers/CourseChapter';
import EditChapters from './Teachers/EditChapters';

//List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import TeachersList from './TeachersList';
import CourseCategory from './CourseCategory';
import TeacherLogout from './Teachers/TeacherLogout';
import TeacherAddChapter from './Teachers/TeacherAddChapter';
import EditCourse from './Teachers/EditCourse';

//student pages
import StudentLogout from './Users/StudentLogout';
import EnrolledStudents from './Teachers/EnrolledStudents';
function Main() {
    return (
      <div className="App">
        <Header />
        <Switch>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/course-detail/:course_id' element={<CourseDetail />}></Route>
            <Route path='/user-login' element={<Login />}></Route>
            <Route path='/user-register' element={<Register />}></Route>            
            <Route path='/user-dashboard' element={<Dashboard />}></Route>
            <Route path='/my-courses' element={<MyCourses />}></Route>
            <Route path='/favorite-courses' element={<FavoriteCourses />}></Route>
            <Route path='/recommended-courses' element={<RecommendedCourses />}></Route>
            <Route path='/profile-setting' element={<ProfileSetting />}></Route>
            <Route path='/change-password' element={<ChangePassword />}></Route>
            <Route path='/Teacher-login' element={<TeacherLogin />}></Route>
            <Route path='/Teacher-logout' element={<TeacherLogout />}></Route>
            <Route path='/Teacher-register' element={<TeacherRegister />}></Route>            
            <Route path='/Teacher-dashboard' element={<TeacherDashboard />}></Route>
            <Route path='/Teacher-courses' element={<TeacherMyCourses />}></Route>
            <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />}></Route>
            <Route path='/edit-course/:course_id' element={<EditCourse />}></Route>
            <Route path='/Teacher-addchapter/:course_id' element={<TeacherAddChapter />}></Route>
            <Route path='/Teacher-MyUsers' element={<TeacherMyUsers />}></Route>
            <Route path='/Teacher-add-courses' element={<TeacherAddCourse />}></Route>
            <Route path='/Teacher-profile-setting' element={<TeacherProfileSetting />}></Route>
            <Route path='/Teacher-change-password' element={<TeacherChangePassword />}></Route>
            <Route path='/Teacher-detail/:teacher_id' element={<TeacherDetail />}></Route>
            <Route path='/Course-list' element={<AllCourses />}></Route>
            <Route path='/all-chapters/:course_id' element={<AllChapters />}></Route>
            <Route path='/edit-chapter/:chapter_id' element={<EditChapters />}></Route>
            <Route path='/popular-courses' element={<PopularCourses />}></Route>
            <Route path='/all-teachers' element={<TeachersList />}></Route>
            <Route path='/category/:category_slug' element={<CourseCategory />}></Route>
            <Route path='/user-logout' element={<StudentLogout />}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;