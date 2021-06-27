import React from 'react';
import { useState } from 'react';
import he from 'he';

const Form = ({
  difficulty,
  setPointNumber,
  formType,
  question,
  options,
  setAnswers,
}) => {
  const [answer, setAnswer] = useState(null);
  const [checkBoxes, setCheckBoxes] = useState(
    new Array(options.length).fill(false)
  );

  // (position: number) : void
  function handleCheckbox(position) {
    // checkbox state
    const updatedCheckbox = checkBoxes.map((item, index) => {
      return index === position ? !item : item;
    });
    setCheckBoxes(updatedCheckbox);
    setAnswer(options.filter((option, index) => updatedCheckbox[index]));
  }

  // (position: number) : void
  function handleRadio(position) {
    // radio state
    const updatedCheckbox = checkBoxes.map((item, index) => {
      return index !== position ? false : true;
    });
    setCheckBoxes(updatedCheckbox);
    setAnswer([options[position]]);
  }

  // (position: number) : void
  async function handleOnChange(position) {
    if (formType === 'checkbox') {
      handleCheckbox(position);
    } else if (formType === 'radio') {
      handleRadio(position);
    }
  }

  async function handleOnClick(e) {
    e.preventDefault();
    if (answer) {
      setCheckBoxes((prev) => prev.map((p) => false));
      setAnswer(null);
      setAnswers((prev) => [...prev, answer]);
      setPointNumber((prev) => prev + 1);
    }
  }

  return (
    <form className="quiz__checkbox" onSubmit={handleOnClick}>
      <fieldset>
        {/* "middle" required in the task */}
        <legend className="quiz__question">{`(${
          difficulty === 'medium' ? 'middle' : difficulty
        }) ${question}`}</legend>
        {options.map((item, index) => (
          <div key={index} className={`quiz__point_item_${index}`}>
            <input
              type={formType}
              id={`item_${index}`}
              name={formType}
              value={item}
              checked={checkBoxes[index]}
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor={`item_${index}`}>{he.decode(item)}</label>
          </div>
        ))}
        <div>
          <button type="submit">Send</button>
        </div>
      </fieldset>
    </form>
  );
};

export default Form;