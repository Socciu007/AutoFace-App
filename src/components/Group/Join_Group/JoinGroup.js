// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);

    const updatedValues = {
      ...values,
      [`${prefix}${event.target.name}`]: newValue,
    };

    setValues(updatedValues);
  }
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

export function CancelFriendOption() {
  //Hien thi select cancel Friend option
  const [selectedValueJoinGroup, setSelectedValueJoinGroup] = useState('');

  const handleSelectChangeJoinGroup = (event) => {
    setSelectedValueJoinGroup(event.target.value);
  };
  useEffect(() => {
    setSelectedValueJoinGroup('suggestions');
  }, []);
  return {
    selectedValueJoinGroup,
    handleSelectChangeJoinGroup,
  };
}
export function KeywordTextarea() {
  //cai dat cho phan Keyword Text (khi go chu thi placeholder cua textarea se an di)
  const [KeywordContent, setKeywordContent] = useState('');
  const [lineCount, setLineCount] = useState(0);

  const handleTextareaChangeKeywordContent = (event) => {
    const content = event.target.value;
    setKeywordContent(event.target.value);
    // Đếm số lượng dòng
    const lines = content.split('\n');
    setLineCount(lines.length);
  };
  const handleKeywordTextareaPaste = (event) => {
    // Đợi một khoảng nhỏ để textarea cập nhật nội dung sau khi paste
    setTimeout(() => {
      const content = event.target.value;
      // Đếm số lượng dòng sau khi paste
      const lines = content.split('\n');
      setLineCount(lines.length);
    }, 0);
  };
  return {
    KeywordContent,
    handleTextareaChangeKeywordContent,
    handleKeywordTextareaPaste,
    lineCount,
  };
}
export function AnswerTextarea() {
  //cai dat cho phan Answer question (khi go chu thi placeholder cua textarea se an di)
  const [AnswerContent, setAnswerContent] = useState('');

  const handleTextareaChangeAnswerContent = (event) => {
    setAnswerContent(event.target.value);
  };
  return {
    AnswerContent,
    handleTextareaChangeAnswerContent,
  };
}
export function ShowAutoAnswer() {
  //Hien thi textarea auto answer question
  const [isAutoAnswer, setisAutoAnswer] = useState(false);
  const handleCheckboxChangeAutoAnswer = () => {
    setisAutoAnswer((prevIsAutoAnswer) => !prevIsAutoAnswer);
  };
  return {
    isAutoAnswer,
    handleCheckboxChangeAutoAnswer,
  };
}
