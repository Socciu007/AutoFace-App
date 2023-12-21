// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
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

export function useTextarea(initialValue, id) {
  //cai dat cho phan text comment
  const [value, setValue] = useState(initialValue);
  const [lineCount, setLineCount] = useState(0);

  const handleChange = (event) => {
    // Đếm số lượng dòng
    const lines = event.target.value.split('\n');
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
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${value ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const handleDivClick = () => {
    document.getElementById(id).focus();
  };
  return {
    value,
    handleChange,
    handleTextareaPaste,
    lineCount,
    handleDivClick,
    hightlightWithLineNumbers,
    setValue,
  };
}

// Show react,show comment,show text,show share
export function useShowCheckbox(initialState, featureName) {
  const [isFeatureVisible, setIsFeatureVisible] = useState(initialState);

  const handleCheckboxChange = () => {
    setIsFeatureVisible((prevState) => !prevState);
  };

  return {
    [`is${featureName}`]: isFeatureVisible,
    [`handleCheckboxChange${featureName}`]: handleCheckboxChange,
  };
}
