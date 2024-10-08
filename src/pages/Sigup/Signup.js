import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from '../../routes'; 
import { Route,Routes } from "react-router-dom";
import './Signup.css'

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch danh sách user hiện tại để tính id mới
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Lưu lại danh sách users hiện có
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra email hợp lệ
    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }

    // Tạo id mới bằng tổng số user đã có + 1
    const newId = users.length + 1;

    // Tạo dữ liệu người dùng mới
    const newUser = {
      id: newId.toString(), // Chuyển id thành chuỗi
      fullName: username,
      email: email,
      password: password,
      token: Math.random().toString(36).substr(2), // Tạo token ngẫu nhiên
    };

    // Gọi API json-server để thêm người dùng mới vào database.json
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Đăng ký thành công, chuyển hướng đến trang login
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Đã xảy ra lỗi khi đăng ký");
      });
  };

  return ( 
    <div>
      <form class="signup-form" onSubmit={handleSubmit}>
        <label class="form-label" htmlFor="email">Email:</label>
        <input class="form-input"
          id="email" 
          name="email" 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label class="form-label" htmlFor="name">Tên đăng nhập:</label>
        <input class="form-input"
          id="name" 
          name="name" 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />

        <label class="form-label">Mật khẩu:</label>
        <input class="form-input"
          name="pass" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <label class="form-label">Nhập lại mật khẩu:</label>
        <input class="form-input"
          name="confirmPass" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input class="form-submit" type="submit" name="submit" value="Đăng ký" />
      </form>

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

export default Signup;
