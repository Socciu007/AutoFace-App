// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
export function handleInputChange(event, setInputValue) {
  // Nếu giá trị mới là chuỗi rỗng, thiết lập về giá trị mặc định hoặc giá trị mong muốn
  const newValue = event.target.value === '' ? '' : parseInt(event.target.value, 10);

  // Kiểm tra xem có phải là số hay không
  if (!isNaN(newValue)) {
    setInputValue(newValue);
  }
}
export function viewTime() {
  //ViewTime start
  const [inputValueViewTimeStart, setInputValueViewTimeStart] = useState(3);
  const handleIncrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //ViewTime end
  const [inputValueViewTimeEnd, setInputValueViewTimeEnd] = useState(5);
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
export function delayTime() {
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

export function UIDTextarea() {
  //cai dat cho phan UID List
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return {
    textContent,
    handleTextareaChange,
  };
}
