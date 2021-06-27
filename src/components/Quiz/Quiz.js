import React from 'react';
import Form from '../Form/Form';
import he from 'he';

const Quiz = ({
  pointNumber,
  setPointNumber,
  quizPoints,
  shuffledOptions,
  setAnswers,
}) => {
  // (formType: string) : string
  function defFormType(type) {
    if (type === 'boolean') return 'radio';
    else if (type === 'multiple') return 'checkbox';
  }

  return (
    <div className="quiz">
      <div className="quiz__counter">
        <h2>{`Question: ${pointNumber + 1} / ${quizPoints.length}`}</h2>
      </div>
      <div className="quiz__point">
        <Form
          difficulty={quizPoints[pointNumber].difficulty}
          setPointNumber={setPointNumber}
          formType={defFormType(quizPoints[pointNumber].type)}
          question={he.decode(quizPoints[pointNumber].question)}
          options={shuffledOptions[pointNumber]}
          setAnswers={setAnswers}
        />
      </div>
    </div>
  );
};

export default Quiz;