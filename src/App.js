import React from 'react';
import {  Route, Routes, Link} from 'react-router-dom';
import './App.css';
import { publicRoutes,privateRoutes } from './routes'; 

function App() {
  return (

          <div>
            <div className="header">
              <div className="activity-title">
                <h1>Quiz</h1>
              </div>
    
              <div className="page-title">
                <Link to="/">
                   <h2 className="home-h2">Home</h2>
                </Link>           
              </div>
    
              <div className="other-title">
                <Link to="/login">
                  <button className="other-title-button">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="other-title-button">Sign Up</button>
                </Link>
              </div>
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

export default App;