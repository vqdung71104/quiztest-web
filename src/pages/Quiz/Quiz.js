import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css';

function Quiz() {
  const { topicName } = useParams();  // Lấy tên chủ đề từ URL
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted] = useState(false);  // Giữ trạng thái đã submit (chỉ sử dụng submitted)
  const navigate = useNavigate();  // Dùng để điều hướng

  useEffect(() => {
    // Fetch dữ liệu từ file database.json trong thư mục public
    fetch("/database.json")
      .then(response => response.json())
      .then(data => {
        // Lọc các câu hỏi theo tên chủ đề
        const topic = data.topics.find(t => t.name === topicName);
        if (topic) {
          const filtered = data.questions.filter(q => q.topicId === parseInt(topic.id));
          setFilteredQuestions(filtered);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [topicName]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    // Kiểm tra xem tất cả câu hỏi đã được trả lời chưa
    const allAnswered = filteredQuestions.every(q => selectedAnswers[q.id] !== undefined);

    if (!allAnswered) {
      alert("Bạn cần trả lời tất cả các câu hỏi!");
      return;
    }

    // Lưu kết quả làm bài vào localStorage hoặc json-server
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage (giả định user đã login)
    const userAnswers = filteredQuestions.map(question => ({
      questionId: question.id,
      answer: selectedAnswers[question.id],
      correctAnswer: question.correctAnswer
    }));

    const resultData = {
      userId: parseInt(userId),
      topicName: topicName,
      answers: userAnswers
    };

    // Lưu kết quả vào localStorage (có thể thay bằng json-server nếu muốn)
    localStorage.setItem('currentQuizResult', JSON.stringify(resultData));

    // Sau khi submit, điều hướng sang trang /result
    navigate("/result");
  };

  return (
    <div>
      <h2 className="title">Chủ đề về {topicName}</h2>
      <ul className="question-list">
        {filteredQuestions.map((question, index) => (
          <li key={index} className="question-item">
            <p className="question-text">Câu {index + 1}: {question.question}</p>
            <ul className="answers-list">
              {question.answers.map((item, answerIndex) => {
                const isCorrect = question.correctAnswer === answerIndex;
                const userSelected = selectedAnswers[question.id] === answerIndex;

                return (
                  <li key={answerIndex} className={`answer-item ${submitted && userSelected ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
                    <input
                      type="radio"
                      id={`q${index}-a${answerIndex}`}
                      name={`question${index}`}
                      onChange={() => handleAnswerChange(question.id, answerIndex)}
                      disabled={submitted} // Không cho chọn đáp án khi đã submit
                      checked={selectedAnswers[question.id] === answerIndex}
                    />
                    <label htmlFor={`q${index}-a${answerIndex}`}>
                      {item} {submitted && userSelected && (isCorrect ? '✔️' : '❌')}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      {!submitted && (
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
}

export default Quiz;
