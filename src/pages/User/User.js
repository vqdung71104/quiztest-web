import { useNavigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from '../../routes'; // Thêm privateRoutes
import { Route, Routes } from "react-router-dom";
import './User.css';


function User() {
  const navigate = useNavigate();

  const handleSubject1 = (e) => {
    e.preventDefault();
    // Logic xác thực (nếu có), sau đó điều hướng đến /user
    navigate("/practice-subjects");
  };

  const handleSubject2 = (e) => {
     e.preventDefault();
    // Logic xác thực (nếu có), sau đó điều hướng đến /user
    navigate("/practiced-subjects");
  };



  return ( 
    <div>
      <div className="user-title">
        <p>Chúc mừng bạn đã đăng nhập thành công</p>
      </div>
      
      <div className="practice-choice-button">
     
          <button className="user-button" onClick={handleSubject1}>Danh sách chủ đề ôn luyện</button>
         
          <button className="user-button" onClick={handleSubject2}>Danh sách chủ đề đã ôn luyện</button>
       
      </div>

      <div className="user-title-2">
        <h2 className="user-title-2-h2">Website trắc nghiệm online thực hiện các bài test kiểm tra, đánh giá kiến thức.</h2>
      </div>

      
      <Routes>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>

    </div>
 
  );
}



export default User
