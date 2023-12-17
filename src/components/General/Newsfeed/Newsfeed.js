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

export function ShowLike() {
  // Hien thi like
  const [isLiked, setIsLiked] = useState(false);

  const handleCheckboxChangeLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };
  return {
    isLiked,
    handleCheckboxChangeLike,
  };
}
export function ShowShare() {
  //Hien thi share
  const [isShare, setIsShared] = useState(false);
  const handleCheckboxChangeShare = () => {
    setIsShared((prevIsShared) => !prevIsShared);
  };
  return {
    isShare,
    handleCheckboxChangeShare,
  };
}
export function ShowComment() {
  //Hien thi comment
  const [isComment, setisComment] = useState(false);
  const handleCheckboxChangeComment = () => {
    setisComment((prevIsCommented) => !prevIsCommented);
  };
  return {
    isComment,
    handleCheckboxChangeComment,
  };
}
export function ShowText() {
  //Hien thi o text
  const [isText, setIsText] = useState(false);

  const handleCheckboxChangeText = () => {
    setIsText((prevIsText) => !prevIsText);
  };

  return {
    isText,
    handleCheckboxChangeText,
  };
}
export function ShowTextarea() {
  //cai dat cho phan textarea cua Text
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };

  return {
    textContent,
    handleTextareaChange,
  };
}
