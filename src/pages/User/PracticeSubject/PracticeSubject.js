import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './PracticeSubject.css';


function PracticeSubject() {
  const [topics, setTopics] = useState([]);
  


  useEffect(() => {
    // Fetch dữ liệu từ file database.json trong thư mục public
    fetch("/database.json")
      .then(response => response.json())
      .then(data => {
        setTopics(data.topics); // Lấy mảng topics từ dữ liệu JSON
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);



  return (
    <div>
      <h2 className="title">PracticeSubject</h2>
      <h2 className="title-2">Bài Quiz chủ đề:</h2>
      <ul>
        {topics.map(topic => (
          <li className="nav-link" key={topic.id}>
            <NavLink to={`/quiz/${topic.name}`}>
              {topic.name}
            </NavLink>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PracticeSubject;
