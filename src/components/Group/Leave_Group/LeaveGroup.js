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
export function NumberOfMember() {
  //Number of members less than:
  const [inputValueNumberOfMember, setInputValueNumberOfMember] = useState(10);
  const handleIncrementNumberOfMember = () => {
    setInputValueNumberOfMember((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfMember = () => {
    setInputValueNumberOfMember((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberOfMember,
    handleIncrementNumberOfMember,
    handleDecrementNumberOfMember,
    handleInputChangeNumberOfMember: (event) => handleInputChange(event, setInputValueNumberOfMember),
  };
}
export function LeaveGroupOption() {
  //Hien thi select leave group option
  const [selectedValueLeaveGroup, setSelectedValueLeaveGroup] = useState('');

  const handleSelectChangeLeaveGroup = (event) => {
    setSelectedValueLeaveGroup(event.target.value);
  };
  useEffect(() => {
    setSelectedValueLeaveGroup('Random');
  }, []);
  return {
    selectedValueLeaveGroup,
    handleSelectChangeLeaveGroup,
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
