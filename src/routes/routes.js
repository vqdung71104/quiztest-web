import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Sigup/Signup';
import User from '../pages/User/User';
import PracticeSubject from '../pages/User/PracticeSubject/PracticeSubject';
import PracticedSubject from '../pages/User/PracticedSubject/PracticedSubject';
import Quiz from '../pages/Quiz/Quiz';
import Result from '../pages/Result/Result';


const publicRoutes = [
   { path: '/', element: <Home /> },              // Sử dụng element
   { path: '/login', element: <Login /> },        // Sử dụng element
   { path: '/signup', element: <Signup /> },      // Sửa đường dẫn component và sử dụng element
   { path: '/quiz/:topicName', element: <Quiz /> }  // Sử dụng element cho component Quiz
]

const privateRoutes = [
   { path: '/user', element: <User /> },                  // Sử dụng element và thêm dấu '/'
   { path: '/practice-subjects', element: <PracticeSubject /> },  // Sử dụng element và thêm dấu '/'
   { path: '/practiced-subjects', element: <PracticedSubject /> }, // Sử dụng element và thêm dấu '/'
   { path: '/result', element: <Result /> },  // Thêm route cho trang /result
]

export {publicRoutes, privateRoutes} 