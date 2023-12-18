// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber && inputValue.length < 3) {
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

export function InviteOption() {
  //Hien thi select Invite option
  const [selectedValueInvite, setSelectedValueInvite] = useState('');

  const handleSelectChangeInvite = (event) => {
    setSelectedValueInvite(event.target.value);
  };
  useEffect(() => {
    setSelectedValueInvite('random');
  }, []);
  return {
    selectedValueInvite,
    handleSelectChangeInvite,
  };
}
export function UIDTextarea() {
  //cai dat cho phan UID Text (khi go chu thi placeholder cua textarea se an di)
  const [UIDContent, setUIDContent] = useState('');
  const [lineCount, setLineCount] = useState(0);
  const textareaRef = useRef(null);
  const handleTextareaChangeUIDContent = (event) => {
    const content = event.target.value;
    setUIDContent(content);
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
    UIDContent,
    handleTextareaChangeUIDContent,
    handleTextareaPaste,
    lineCount,
    handleDivClick,
    textareaRef,
  };
}
