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
export function VideoTime() {
  //ViewTime start
  const [inputValueViewTimeStart, setInputValueViewTimeStart] = useState(10);
  const handleIncrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //ViewTime end
  const [inputValueViewTimeEnd, setInputValueViewTimeEnd] = useState(30);
  const handleIncrementViewTimeEnd = () => {
    setInputValueViewTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementViewTimeEnd = () => {
    setInputValueViewTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueViewTimeStart,
    handleIncrementViewTimeStart,
    handleDecrementViewTimeStart,
    inputValueViewTimeEnd,
    handleIncrementViewTimeEnd,
    handleDecrementViewTimeEnd,
    handleInputChangeViewTimeStart: (event) => handleInputChange(event, setInputValueViewTimeStart),
    handleInputChangeViewTimeEnd: (event) => handleInputChange(event, setInputValueViewTimeEnd),
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
export function NumberPostOrUser() {
  //Number of posts/user start
  const [inputValueNumberPostOrUserStart, setInputValueNumberPostOrUserStart] = useState(1);
  const handleIncrementNumberPostOrUserStart = () => {
    setInputValueNumberPostOrUserStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostOrUserStart = () => {
    setInputValueNumberPostOrUserStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Number of posts/user end
  const [inputValueNumberPostOrUserEnd, setInputValueNumberPostOrUserEnd] = useState(3);
  const handleIncrementNumberPostOrUserEnd = () => {
    setInputValueNumberPostOrUserEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostOrUserEnd = () => {
    setInputValueNumberPostOrUserEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberPostOrUserStart,
    handleIncrementNumberPostOrUserStart,
    handleDecrementNumberPostOrUserStart,
    inputValueNumberPostOrUserEnd,
    handleIncrementNumberPostOrUserEnd,
    handleDecrementNumberPostOrUserEnd,
    handleInputChangeNumberPostOrUserStart: (event) => handleInputChange(event, setInputValueNumberPostOrUserStart),
    handleInputChangeNumberPostOrUserEnd: (event) => handleInputChange(event, setInputValueNumberPostOrUserEnd),
  };
}
export function PostUIDList() {
  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  const charCount = textContent.length;
  return {
    textContent,
    handleTextareaChange,
    charCount,
  };
}
