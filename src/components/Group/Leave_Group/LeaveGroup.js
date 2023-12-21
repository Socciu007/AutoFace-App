// eslint-disable-next-line no-unused-vars
import { highlight, languages } from 'prismjs/components/prism-core';
import React, { useEffect, useRef, useState } from 'react';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  const newValue = isNumber ? inputValue : '';

  const updatedValues = {
    ...values,
    [`${prefix}${event.target.name}`]: newValue,
  };

  setValues(updatedValues);
}

export function useRangeValues(initialValues, prefix) {
  const [values, setValues] = useState(initialValues);

  const createHandlers = () => ({
    handleIncrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] + 1,
      }));
    },
    handleDecrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] > 0 ? prevValues[`${prefix}Start`] - 1 : 0,
      }));
    },
    handleIncrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] + 1,
      }));
    },
    handleDecrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] > 0 ? prevValues[`${prefix}End`] - 1 : 0,
      }));
    },
    handleInputChangeStart: (event) => handleInputChange(event, setValues, prefix, values),
    handleInputChangeEnd: (event) => handleInputChange(event, setValues, prefix, values),
  });

  return { ...values, ...createHandlers() };
}

export function LeaveGroupOption() {
  //Hien thi select leave group option
  const [selectedValueLeaveGroup, setSelectedValueLeaveGroup] = useState('');

  const handleSelectChangeLeaveGroup = (event) => {
    setSelectedValueLeaveGroup(event.target.value);
  };
  useEffect(() => {
    setSelectedValueLeaveGroup('Random');
  }, []);
  return {
    selectedValueLeaveGroup,
    handleSelectChangeLeaveGroup,
  };
}
export function KeywordTextarea() {
  //cai dat cho phan Keyword Text (khi go chu thi placeholder cua textarea se an di)
  const [KeywordContent, setKeywordContent] = useState('');

  const handleTextareaChangeKeywordContent = (value) => {
    setKeywordContent(value);
  };
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${KeywordContent ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const handleDivClick = () => {
    document.getElementById('codeArea').focus();
  };
  return {
    KeywordContent,
    handleTextareaChangeKeywordContent,
    handleDivClick,
    hightlightWithLineNumbers,
  };
}
