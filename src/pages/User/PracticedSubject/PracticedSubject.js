import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './PracticedSubject.css';

function PracticedSubject() {
  const [practicedTopics, setPracticedTopics] = useState([]);
  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

  useEffect(() => {
    fetch("/database.json")
      .then(response => response.json())
      .then(data => {
        // Lọc ra các chủ đề mà user đã học
        const userAnswers = data.answers.filter(answer => answer.userId === parseInt(userId));
        const userTopics = userAnswers.map(answer => answer.topicId);
        const practicedTopics = data.topics.filter(topic => userTopics.includes(parseInt(topic.id)));

        setPracticedTopics(practicedTopics);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, [userId]);

  return (
    <div>
      <h2 className="title">Practiced Subjects</h2>
      <h2 className="title-2">Bài Quiz chủ đề:</h2>
      <ul>
        {practicedTopics.map(topic => (
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

export default PracticedSubject;
