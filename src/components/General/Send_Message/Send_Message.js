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
export function NumberOfPost() {
  //Value post start
  const [inputValuePostStart, setInputValuePostStart] = useState(5);
  const handleIncrementPostStart = () => {
    setInputValuePostStart((prevValue) => prevValue + 1);
  };
  const handleDecrementPostStart = () => {
    setInputValuePostStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value post end
  const [inputValuePostEnd, setInputValuePostEnd] = useState(10);
  const handleIncrementPostEnd = () => {
    setInputValuePostEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementPostEnd = () => {
    setInputValuePostEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValuePostStart,
    handleIncrementPostStart,
    handleDecrementPostStart,
    inputValuePostEnd,
    handleIncrementPostEnd,
    handleDecrementPostEnd,
    handleInputChangePostStart: (event) => handleInputChange(event, setInputValuePostStart),
    handleInputChangePostEnd: (event) => handleInputChange(event, setInputValuePostEnd),
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
