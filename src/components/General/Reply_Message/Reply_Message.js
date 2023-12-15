// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
export function handleInputChange(event, setInputValue) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue); // Check if the input is a number

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);
    setInputValue(newValue);
  }
}
export function NumberOfFriend() {
  //NumberOfFriend start
  const [inputValueNumberOfFriendStart, setInputValueNumberOfFriendStart] = useState(5);
  const handleIncrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //NumberOfFriend end
  const [inputValueNumberOfFriendEnd, setInputValueNumberOfFriendEnd] = useState(10);
  const handleIncrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberOfFriendStart,
    handleIncrementNumberOfFriendStart,
    handleDecrementNumberOfFriendStart,
    inputValueNumberOfFriendEnd,
    handleIncrementNumberOfFriendEnd,
    handleDecrementNumberOfFriendEnd,
    handleInputChangeNumberOfFriendStart: (event) => handleInputChange(event, setInputValueNumberOfFriendStart),
    handleInputChangeNumberOfFriendEnd: (event) => handleInputChange(event, setInputValueNumberOfFriendEnd),
  };
}
export function DelayTime() {
  //DelayTime start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //DelayTime end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return {
    inputValueDelayTimeStart,
    handleIncrementDelayTimeStart,
    handleDecrementDelayTimeStart,
    inputValueDelayTimeEnd,
    handleIncrementDelayTimeEnd,
    handleDecrementDelayTimeEnd,
    handleInputChangeDelayTimeStart: (event) => handleInputChange(event, setInputValueDelayTimeStart),
    handleInputChangeDelayTimeEnd: (event) => handleInputChange(event, setInputValueDelayTimeEnd),
  };
}
export function MessageTextarea() {
  //cai dat cho phan message
  const [textContentMessage, setTextContentMessage] = useState('');

  const handleTextareaChangeMessage = (event) => {
    setTextContentMessage(event.target.value);
  };

  return {
    textContentMessage,
    handleTextareaChangeMessage,
  };
}
