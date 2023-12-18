// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber && inputValue.length <= 3) {
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
        [`${prefix}Start`]:
          prevValues[`${prefix}Start`] + 1 <= 999 ? prevValues[`${prefix}Start`] + 1 : prevValues[`${prefix}Start`],
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
        [`${prefix}End`]:
          prevValues[`${prefix}End`] + 1 <= 999 ? prevValues[`${prefix}End`] + 1 : prevValues[`${prefix}End`],
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
  const textareaKeywordRef = useRef(null);

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
  const handleDivKeywordClick = () => {
    textareaKeywordRef.current.focus();
  };
  return {
    KeywordContent,
    handleTextareaChangeKeywordContent,
    handleKeywordTextareaPaste,
    lineCount,
    handleDivKeywordClick,
    textareaKeywordRef,
  };
}
export function AnswerTextarea() {
  //cai dat cho phan Answer question (khi go chu thi placeholder cua textarea se an di)
  const [AnswerContent, setAnswerContent] = useState('');
  const textareaAnswerRef = useRef(null);

  const handleTextareaChangeAnswerContent = (event) => {
    setAnswerContent(event.target.value);
  };
  const handleDivAnswerClick = () => {
    textareaAnswerRef.current.focus();
  };
  return {
    AnswerContent,
    handleTextareaChangeAnswerContent,
    handleDivAnswerClick,
    textareaAnswerRef,
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
