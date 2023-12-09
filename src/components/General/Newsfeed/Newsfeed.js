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
export function ScrollTime() {
  //Scroll Time start
  const [inputValueScrollTimeStart, setInputValueScrollTimeStart] = useState(5);
  const handleIncrementScrollTimeStart = () => {
    setInputValueScrollTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementScrollTimeStart = () => {
    setInputValueScrollTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Scroll Time end
  const [inputValueScrollTimeEnd, setInputValueScrollTimeEnd] = useState(10);
  const handleIncrementScrollTimeEnd = () => {
    setInputValueScrollTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementScrollTimeEnd = () => {
    setInputValueScrollTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueScrollTimeStart,
    handleIncrementScrollTimeStart,
    handleDecrementScrollTimeStart,
    inputValueScrollTimeEnd,
    handleIncrementScrollTimeEnd,
    handleDecrementScrollTimeEnd,
    handleInputChangeScrollTimeStart: (event) => handleInputChange(event, setInputValueScrollTimeStart),
    handleInputChangeScrollTimeEnd: (event) => handleInputChange(event, setInputValueScrollTimeEnd),
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
export function RandomLike() {
  //Random Like start
  const [inputValueLikeStart, setInputValueLikeStart] = useState(5);
  const handleIncrementLikeStart = () => {
    setInputValueLikeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementLikeStart = () => {
    setInputValueLikeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random Like end
  const [inputValueLikeEnd, setInputValueLikeEnd] = useState(10);
  const handleIncrementLikeEnd = () => {
    setInputValueLikeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementLikeEnd = () => {
    setInputValueLikeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueLikeStart,
    handleIncrementLikeStart,
    handleDecrementLikeStart,
    inputValueLikeEnd,
    handleIncrementLikeEnd,
    handleDecrementLikeEnd,
    handleInputChangeLikeStart: (event) => handleInputChange(event, setInputValueLikeStart),
    handleInputChangeLikeEnd: (event) => handleInputChange(event, setInputValueLikeEnd),
  };
}
export function RandomShare() {
  //Random Share start
  const [inputValueShareStart, setInputValueShareStart] = useState(5);
  const handleIncrementShareStart = () => {
    setInputValueShareStart((prevValue) => prevValue + 1);
  };
  const handleDecrementShareStart = () => {
    setInputValueShareStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random Share end
  const [inputValueShareEnd, setInputValueShareEnd] = useState(10);
  const handleIncrementShareEnd = () => {
    setInputValueShareEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementShareEnd = () => {
    setInputValueShareEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueShareStart,
    handleIncrementShareStart,
    handleDecrementShareStart,
    inputValueShareEnd,
    handleIncrementShareEnd,
    handleDecrementShareEnd,
    handleInputChangeShareStart: (event) => handleInputChange(event, setInputValueShareStart),
    handleInputChangeShareEnd: (event) => handleInputChange(event, setInputValueShareEnd),
  };
}
export function RandomComment() {
  //Random CommentVideo start
  const [inputValueCommentVideoStart, setInputValueCommentVideoStart] = useState(5);
  const handleIncrementCommentVideoStart = () => {
    setInputValueCommentVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementCommentVideoStart = () => {
    setInputValueCommentVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random CommentVideo end
  const [inputValueCommentVideoEnd, setInputValueCommentVideoEnd] = useState(10);
  const handleIncrementCommentVideoEnd = () => {
    setInputValueCommentVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementCommentVideoEnd = () => {
    setInputValueCommentVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueCommentVideoStart,
    handleIncrementCommentVideoStart,
    handleDecrementCommentVideoStart,
    inputValueCommentVideoEnd,
    handleIncrementCommentVideoEnd,
    handleDecrementCommentVideoEnd,
    handleInputChangeCommentVideoStart: (event) => handleInputChange(event, setInputValueCommentVideoStart),
    handleInputChangeCommentVideoEnd: (event) => handleInputChange(event, setInputValueCommentVideoEnd),
  };
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
