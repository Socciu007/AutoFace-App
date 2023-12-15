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
export function Notification() {
  //Value number of Notification start
  const [inputValueNotificationStart, setInputValueNotificationStart] = useState(5);
  const handleIncrementNotificationStart = () => {
    setInputValueNotificationStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNotificationStart = () => {
    setInputValueNotificationStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Notification end
  const [inputValueNotificationEnd, setInputValueNotificationEnd] = useState(10);
  const handleIncrementNotificationEnd = () => {
    setInputValueNotificationEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNotificationEnd = () => {
    setInputValueNotificationEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNotificationStart,
    handleIncrementNotificationStart,
    handleDecrementNotificationStart,
    inputValueNotificationEnd,
    handleIncrementNotificationEnd,
    handleDecrementNotificationEnd,
    handleInputChangeNotificationStart: (event) => handleInputChange(event, setInputValueNotificationStart),
    handleInputChangeNotificationEnd: (event) => handleInputChange(event, setInputValueNotificationEnd),
  };
}
export function DelayTime() {
  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(5);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(10);
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
