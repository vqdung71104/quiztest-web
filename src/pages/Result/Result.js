import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Result.css';

function Result() {
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate(); // Sử dụng để điều hướng

  useEffect(() => {
    // Lấy kết quả của bài quiz từ localStorage (hoặc fetch từ json-server nếu muốn)
    const storedResult = localStorage.getItem('currentQuizResult');
    if (storedResult) {
      setResultData(JSON.parse(storedResult));
    }
  }, []);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const handleRedo = () => {
    // Điều hướng quay lại trang quiz của chủ đề vừa làm
    navigate(`/quiz/${resultData.topicName}`);
  };

  const handleFinish = () => {
    // Điều hướng đến trang /practiced-subjects
    navigate('/user');
  };

  return (
    <div>
      <h2>Kết quả bài Quiz - Chủ đề: {resultData.topicName}</h2>
      <ul className="question-list">
        {resultData.answers.map((answer, index) => (
          <li key={index} className="question-item">
            <p className="question-text">Câu {index + 1}:</p>
            <p>Đáp án đúng: {answer.correctAnswer}</p>
            <p>Bạn chọn: {answer.answer}</p>
            <p className={answer.correctAnswer === answer.answer ? "correct" : "incorrect"}>
              {answer.correctAnswer === answer.answer ? '✔️ Đúng' : '❌ Sai'}
            </p>
          </li>
        ))}
      </ul>

      {/* Nút Redo và Finish */}
      <div className="result-actions">
        <button className="redo-button" onClick={handleRedo}>Redo</button>
        <button className="finish-button" onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}

export default Result;
