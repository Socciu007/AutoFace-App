import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
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

// Show react,show comment,show share
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

export function CommentOption() {
  //Hien thi select
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    setSelectedValue('text');
  }, []);

  return {
    selectedValue,
    handleSelectChange,
  };
}
export function CommentTextarea() {
  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');
  const handleTextareaChange = (value) => {
    setTextContent(value);
  };
  const handleDivClick = () => {
    document.getElementById('codeArea').focus();
  };
  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${textContent ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');

  return {
    textContent,
    handleTextareaChange,
    handleDivClick,
    hightlightWithLineNumbers,
  };
}
export function URLImg() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => file.name);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
  });

  const handleDeleteButtonClick = () => {
    setFiles([]);
  };

  return {
    files,
    getRootProps,
    getInputProps,
    handleDeleteButtonClick,
  };
}
