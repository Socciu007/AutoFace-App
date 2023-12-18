// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
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

export function UIDTextarea() {
  //cai dat cho phan UID List
  const [textContent, setTextContent] = useState('');
  const textareaRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);

  const handleTextareaChange = (event) => {
    const content = event.target.value;
    setTextContent(content);
    // Đếm số lượng dòng
    const lines = content.split('\n');
    setLineCount(lines.length);
  };
  const handleTextareaPaste = (event) => {
    // Đợi một khoảng nhỏ để textarea cập nhật nội dung sau khi paste
    setTimeout(() => {
      const content = event.target.value;
      // Đếm số lượng dòng sau khi paste
      const lines = content.split('\n');
      setLineCount(lines.length);
    }, 0);
  };
  const handleDivClick = () => {
    textareaRef.current.focus();
  };
  return {
    textContent,
    handleTextareaChange,
    handleTextareaPaste,
    lineCount,
    handleDivClick,
    textareaRef,
  };
}
