import React from 'react';

export const formatData = (data, questions) => {
  const formattedData = {};
  for (let idx of Object.keys(data)) {
    const question = questions[idx];
    if (question) {
      formattedData[question.fieldName] = data[idx];
    } else {
      const [questionIdx, choiceIdx] = idx.split("-");
      const { fieldName, possibleValues } = questions[questionIdx];
      const answer = possibleValues[choiceIdx];
      if (!formattedData[fieldName]) {
        formattedData[fieldName] = [];
      }
      if (data[idx]) {
        const newValue = formattedData[fieldName].concat([answer]);
        formattedData[fieldName] = newValue;
      }
    }
  };
  return formattedData;
}

export const formatAnswerText = (text, limit) => {
  if (text.length > limit) {
    const words = text.split(" ");
    let lines = [];
    let textLine = "";
    for (let i = 0; i < words.length; i++) {
      if (textLine.length + words[i].length + 1 <= limit) {
        textLine = `${textLine} ${words[i]}`;
      } else {
        lines.push(textLine);
        textLine = words[i];
      }
    }
    if (textLine) {
      lines.push(textLine);
    }
    return (
      <div className="multiline-chip">
        { lines.map(text => <div key={text}>{text}</div>) }
      </div>
    )
  }

  return text;
}
