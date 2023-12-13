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
export function NumberStory() {
  //Story start
  const [inputValueNumberStoryStart, setInputValueNumberStoryStart] = useState(5);
  const handleIncrementNumberStoryStart = () => {
    setInputValueNumberStoryStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberStoryStart = () => {
    setInputValueNumberStoryStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Story end
  const [inputValueNumberStoryEnd, setInputValueNumberStoryEnd] = useState(10);
  const handleIncrementNumberStoryEnd = () => {
    setInputValueNumberStoryEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberStoryEnd = () => {
    setInputValueNumberStoryEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberStoryStart,
    handleIncrementNumberStoryStart,
    handleDecrementNumberStoryStart,
    inputValueNumberStoryEnd,
    handleIncrementNumberStoryEnd,
    handleDecrementNumberStoryEnd,
    handleInputChangeNumberStoryStart: (event) => handleInputChange(event, setInputValueNumberStoryStart),
    handleInputChangeNumberStoryEnd: (event) => handleInputChange(event, setInputValueNumberStoryEnd),
  };
}
export function TimeWatchStory() {
  //Watching time/story (s) start
  const [inputValueTimeWatchStoryStart, setInputValueTimeWatchStoryStart] = useState(5);
  const handleIncrementTimeWatchStoryStart = () => {
    setInputValueTimeWatchStoryStart((prevValue) => prevValue + 1);
  };
  const handleDecrementTimeWatchStoryStart = () => {
    setInputValueTimeWatchStoryStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Watching time/story (s) end
  const [inputValueTimeWatchStoryEnd, setInputValueTimeWatchStoryEnd] = useState(10);
  const handleIncrementTimeWatchStoryEnd = () => {
    setInputValueTimeWatchStoryEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementTimeWatchStoryEnd = () => {
    setInputValueTimeWatchStoryEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return {
    inputValueTimeWatchStoryStart,
    handleIncrementTimeWatchStoryStart,
    handleDecrementTimeWatchStoryStart,
    inputValueTimeWatchStoryEnd,
    handleIncrementTimeWatchStoryEnd,
    handleDecrementTimeWatchStoryEnd,
    handleInputChangeTimeWatchStoryStart: (event) => handleInputChange(event, setInputValueTimeWatchStoryStart),
    handleInputChangeTimeWatchStoryEnd: (event) => handleInputChange(event, setInputValueTimeWatchStoryEnd),
  };
}
export function ShowReact() {
  // Hien thi react
  const [isReact, setIsReact] = useState(false);

  const handleCheckboxChangeReact = () => {
    setIsReact((prevIsReact) => !prevIsReact);
  };

  return {
    isReact,
    handleCheckboxChangeReact,
  };
}
export function ShowComment() {
  //Hien thi comment
  const [isComment, setisComment] = useState(false);
  const handleCheckboxChangeComment = () => {
    setisComment((prevIsLiked) => !prevIsLiked);
  };

  return {
    isComment,
    handleCheckboxChangeComment,
  };
}
export function TextareaComment() {
  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return {
    textContent,
    handleTextareaChange,
  };
}
