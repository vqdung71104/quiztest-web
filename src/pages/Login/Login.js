import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRoutes, privateRoutes } from '../../routes'; 
import { Route, Routes } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("/database.json")
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userName = e.target.name.value;
    const password = e.target.pass.value;

    const user = users.find(u => u.fullName === userName && u.password === password);

    if (user) {
      localStorage.setItem('userId', user.id); // Lưu userId vào localStorage
      navigate("/user"); // Chuyển hướng đến trang /user
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label class="form-label" htmlFor="name">Tên đăng nhập:</label>
        <input class="form-input" id="name" name="name" type="text" />

        <label class="form-label" htmlFor="pass">Mật khẩu:</label>
        <input class="form-input" name="pass" type="password" />

        <input class="form-submit" type="submit" name="submit" value="Đăng Nhập" />
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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

export default Login;
