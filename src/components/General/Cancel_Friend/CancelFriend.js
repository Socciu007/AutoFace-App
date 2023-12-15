import { useEffect, useState } from 'react';
export function handleInputChange(event, setInputValue) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue); // Check if the input is a number

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);
    setInputValue(newValue);
  }
}

export function numberOfRequests() {
  //Value number of Requests start
  const [inputValueRequestsStart, setInputValueRequestsStart] = useState(5);
  const handleIncrementRequestsStart = () => {
    setInputValueRequestsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementRequestsStart = () => {
    setInputValueRequestsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Requests end
  const [inputValueRequestsEnd, setInputValueRequestsEnd] = useState(10);
  const handleIncrementRequestsEnd = () => {
    setInputValueRequestsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementRequestsEnd = () => {
    setInputValueRequestsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueRequestsStart,
    handleIncrementRequestsStart,
    handleDecrementRequestsStart,
    inputValueRequestsEnd,
    handleIncrementRequestsEnd,
    handleDecrementRequestsEnd,
    handleInputChangeRequestsStart: (event) => handleInputChange(event, setInputValueRequestsStart),
    handleInputChangeRequestsEnd: (event) => handleInputChange(event, setInputValueRequestsEnd),
  };
}

export function delayTime() {
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

export function numberFriend() {
  //Random NumberFriend start
  const [inputValueNumberFriendStart, setInputValueNumberFriendStart] = useState(5);
  const handleIncrementNumberFriendStart = () => {
    setInputValueNumberFriendStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberFriendStart = () => {
    setInputValueNumberFriendStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random NumberFriend end
  const [inputValueNumberFriendEnd, setInputValueNumberFriendEnd] = useState(10);
  const handleIncrementNumberFriendEnd = () => {
    setInputValueNumberFriendEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberFriendEnd = () => {
    setInputValueNumberFriendEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberFriendStart,
    handleIncrementNumberFriendStart,
    handleDecrementNumberFriendStart,
    inputValueNumberFriendEnd,
    handleIncrementNumberFriendEnd,
    handleDecrementNumberFriendEnd,
    handleInputChangeNumberFriendStart: (event) => handleInputChange(event, setInputValueNumberFriendStart),
    handleInputChangeNumberFriendEnd: (event) => handleInputChange(event, setInputValueNumberFriendEnd),
  };
}

export function cancelFriendOption() {
  //Hien thi select cancel Friend option
  const [selectedValueCancelFriend, setSelectedValueCancelFriend] = useState('');

  const handleSelectChangeCancelFriend = (event) => {
    setSelectedValueCancelFriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueCancelFriend('cancelRequest');
  }, []);
  return {
    selectedValueCancelFriend,
    handleSelectChangeCancelFriend,
  };
}

export function unfriendOption() {
  //Hien thi select  Unfriend option
  const [selectedValueUnfriend, setSelectedValueUnfriend] = useState('');

  const handleSelectChangeUnfriend = (event) => {
    setSelectedValueUnfriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueUnfriend('random');
  }, []);
  return {
    selectedValueUnfriend,
    handleSelectChangeUnfriend,
  };
}

export function UIDText() {
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
