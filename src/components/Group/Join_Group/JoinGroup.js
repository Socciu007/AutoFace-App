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
export function NumberGroup() {
  //Value number of Groups start
  const [inputValueGroupsStart, setInputValueGroupsStart] = useState(5);
  const handleIncrementGroupsStart = () => {
    setInputValueGroupsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementGroupsStart = () => {
    setInputValueGroupsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Groups end
  const [inputValueGroupsEnd, setInputValueGroupsEnd] = useState(10);
  const handleIncrementGroupsEnd = () => {
    setInputValueGroupsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementGroupsEnd = () => {
    setInputValueGroupsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueGroupsStart,
    handleIncrementGroupsStart,
    handleDecrementGroupsStart,
    inputValueGroupsEnd,
    handleIncrementGroupsEnd,
    handleDecrementGroupsEnd,
    handleInputChangeGroupsStart: (event) => handleInputChange(event, setInputValueGroupsStart),
    handleInputChangeGroupsEnd: (event) => handleInputChange(event, setInputValueGroupsEnd),
  };
}
export function DelayTime() {
  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
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
export function CancelFriendOption() {
  //Hien thi select cancel Friend option
  const [selectedValueJoinGroup, setSelectedValueJoinGroup] = useState('');

  const handleSelectChangeJoinGroup = (event) => {
    setSelectedValueJoinGroup(event.target.value);
  };
  useEffect(() => {
    setSelectedValueJoinGroup('suggestions');
  }, []);
  return {
    selectedValueJoinGroup,
    handleSelectChangeJoinGroup,
  };
}
export function KeywordTextarea() {
  //cai dat cho phan Keyword Text (khi go chu thi placeholder cua textarea se an di)
  const [KeywordContent, setKeywordContent] = useState('');

  const handleTextareaChangeKeywordContent = (event) => {
    setKeywordContent(event.target.value);
  };
  return {
    KeywordContent,
    handleTextareaChangeKeywordContent,
  };
}
export function AnswerTextarea() {
  //cai dat cho phan Answer question (khi go chu thi placeholder cua textarea se an di)
  const [AnswerContent, setAnswerContent] = useState('');

  const handleTextareaChangeAnswerContent = (event) => {
    setAnswerContent(event.target.value);
  };
  return {
    AnswerContent,
    handleTextareaChangeAnswerContent,
  };
}
export function ShowAutoAnswer() {
  //Hien thi textarea auto answer question
  const [isAutoAnswer, setisAutoAnswer] = useState(false);
  const handleCheckboxChangeAutoAnswer = () => {
    setisAutoAnswer((prevIsAutoAnswer) => !prevIsAutoAnswer);
  };
  return {
    isAutoAnswer,
    handleCheckboxChangeAutoAnswer,
  };
}
