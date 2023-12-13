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
export function NumberGroup_Friends() {
  //Value number of Group_Friends start
  const [inputValueGroup_FriendsStart, setInputValueGroup_FriendsStart] = useState(5);
  const handleIncrementGroup_FriendsStart = () => {
    setInputValueGroup_FriendsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementGroup_FriendsStart = () => {
    setInputValueGroup_FriendsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Group_Friends end
  const [inputValueGroup_FriendsEnd, setInputValueGroup_FriendsEnd] = useState(10);
  const handleIncrementGroup_FriendsEnd = () => {
    setInputValueGroup_FriendsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementGroup_FriendsEnd = () => {
    setInputValueGroup_FriendsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueGroup_FriendsStart,
    handleIncrementGroup_FriendsStart,
    handleDecrementGroup_FriendsStart,
    inputValueGroup_FriendsEnd,
    handleIncrementGroup_FriendsEnd,
    handleDecrementGroup_FriendsEnd,
    handleInputChangeGroup_FriendsStart: (event) => handleInputChange(event, setInputValueGroup_FriendsStart),
    handleInputChangeGroup_FriendsEnd: (event) => handleInputChange(event, setInputValueGroup_FriendsEnd),
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
export function InviteOption() {
  //Hien thi select Invite option
  const [selectedValueInvite, setSelectedValueInvite] = useState('');

  const handleSelectChangeInvite = (event) => {
    setSelectedValueInvite(event.target.value);
  };
  useEffect(() => {
    setSelectedValueInvite('random');
  }, []);
  return {
    selectedValueInvite,
    handleSelectChangeInvite,
  };
}
export function UIDTextarea() {
  //cai dat cho phan UID Text (khi go chu thi placeholder cua textarea se an di)
  const [UIDContent, setUIDContent] = useState('');

  const handleTextareaChangeUIDContent = (event) => {
    setUIDContent(event.target.value);
  };
  return {
    UIDContent,
    handleTextareaChangeUIDContent,
  };
}
