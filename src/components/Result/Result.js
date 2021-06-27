import React from 'react';
import { useState } from 'react';
import he from 'he';

const Result = ({ quizPoints, shuffledOptions, answers }) => {
  const difficultyGrades = {
    easy: 0,
    medium: 1,
    hard: 2,
  };

  function reduce(quizPoints, shuffledOptions, answers) {
    return quizPoints.map((point, index) => {
      return {
        showedOptions: shuffledOptions[index],
        userAnswer: answers[index],
        rightAnswer: point.correct_answer,
        difficulty: point.difficulty,
        question: point.question,
      };
    });
  }

  function difficultySort(arr) {
    return arr.sort(
      (a, b) => difficultyGrades[a.difficulty] - difficultyGrades[b.difficulty]
    );
  }

  const [results] = useState(
    difficultySort(reduce(quizPoints, shuffledOptions, answers))
  );

  return (
    <div className="result">
      <h2>Results: </h2>
      <div>
        <b>
          <em>User answer</em>
        </b>{' '}
        <ins>Right answer</ins>
      </div>
      {results ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <form>
                <fieldset>
                  {/* "middle" required in the task */}
                  <legend>
                    {`(${
                      result.difficulty === 'medium'
                        ? 'middle'
                        : result.difficulty
                    }) ${he.decode(result.question)}`}
                  </legend>
                  {result.showedOptions.map((item) => (
                    <div key={item}>
                      {((dItem) => {
                        if (item === result.rightAnswer && result.userAnswer.includes(item)) {
                          return <ins><b><em>{dItem}</em></b></ins>; 
                        } else if (item === result.rightAnswer) {
                          return <ins>{dItem}</ins>; 
                        } else if (result.userAnswer.includes(item)) {
                          return <b><em>{dItem}</em></b>; 
                        } else {
                          return <div>{dItem}</div>;
                        }
                      })(he.decode(item))}
                    </div>
                  ))}
                </fieldset>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <div>Resulting...</div>
      )}
    </div>
  );
};

export default Result;