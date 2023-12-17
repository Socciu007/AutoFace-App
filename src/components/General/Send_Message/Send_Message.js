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

export function PostOption() {
  //Hien thi select Friend option
  const [selectedValueFriend, setSelectedValueFriend] = useState('');

  const handleSelectChangeFriend = (event) => {
    setSelectedValueFriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueFriend('randomFriend');
  }, []);
  return {
    selectedValueFriend,
    handleSelectChangeFriend,
  };
}
export function MessageTextarea() {
  //cai dat cho phan message (khi go chu thi placeholder cua textarea se an di)
  const [messagesContent, setMessageContent] = useState('');

  const handleTextareaChangeMessages = (event) => {
    setMessageContent(event.target.value);
  };
  return {
    messagesContent,
    handleTextareaChangeMessages,
  };
}
export function UIDTextarea() {
  //cai dat cho phan text comment(khi go chu thi placeholder cua textarea se an di)
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return {
    textContent,
    handleTextareaChange,
  };
}
