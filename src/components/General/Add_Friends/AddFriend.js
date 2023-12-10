// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';

export function handleInputChange(event, setInputValue) {
  // Nếu giá trị mới là chuỗi rỗng, thiết lập về giá trị mặc định hoặc giá trị mong muốn
  const newValue = event.target.value === '' ? '' : parseInt(event.target.value, 10);

  // Kiểm tra xem có phải là số hay không
  if (!isNaN(newValue)) {
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

export function stopAfterWarning() {
  //Stop after Facebook warning (times)
  const [inputValueStopTime, setInputValueStopTime] = useState(5);
  const handleIncrementStopTime = () => {
    setInputValueStopTime((prevValue) => prevValue + 1);
  };
  const handleDecrementStopTime = () => {
    setInputValueStopTime((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return {
    inputValueStopTime,
    handleIncrementStopTime,
    handleDecrementStopTime,
    handleInputChangeStopTime: (event) => handleInputChange(event, setInputValueStopTime),
  };
}

export function NumberPost() {
  //Random NumberPost start
  const [inputValueNumberPostStart, setInputValueNumberPostStart] = useState(5);
  const handleIncrementNumberPostStart = () => {
    setInputValueNumberPostStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostStart = () => {
    setInputValueNumberPostStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random NumberPost end
  const [inputValueNumberPostEnd, setInputValueNumberPostEnd] = useState(10);
  const handleIncrementNumberPostEnd = () => {
    setInputValueNumberPostEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostEnd = () => {
    setInputValueNumberPostEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return {
    inputValueNumberPostStart,
    handleIncrementNumberPostStart,
    handleDecrementNumberPostStart,
    inputValueNumberPostEnd,
    handleIncrementNumberPostEnd,
    handleDecrementNumberPostEnd,
    handleInputChangeNumberPostStart: (event) => handleInputChange(event, setInputValueNumberPostStart),
    handleInputChangeNumberPostEnd: (event) => handleInputChange(event, setInputValueNumberPostEnd),
  };
}

export function AddFriendOption() {
  //Hien thi select addfriend option
  const [selectedValueTypeAddFriend, setSelectedValueType] = useState('suggestions');
  const [textContentAddFriendRequest, setTextContentAddFriendRequest] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSelectorChange = (event) => {
    const value = event.target.value;
    setSelectedValueType(value);

    switch (value) {
      case 'UID':
        setPlaceholderText('Enter the UID list here\nEach UID/line');
        break;
      case 'UIDList':
        setPlaceholderText('Enter the UID list here\nEach UID/line');
        break;
      case 'keywords':
        setPlaceholderText('Enter the keyword list here\nEach keyword/line');
        break;
      case 'groupMembers':
        setPlaceholderText('Enter the group UID here\nEach UID/line');
        break;
      case 'friendOfUID':
        setPlaceholderText('Enter the UID here\nEach UID/line');
        break;
      default:
        setPlaceholderText('');
    }
  };

  useEffect(() => {
    // Update giá trị của placeholderText khi component được tạo ra
    handleSelectorChange({ target: { value: selectedValueTypeAddFriend } });
  }, []); // Chạy useEffect chỉ khi component được tạo ra

  useEffect(() => {
    // Update style khi có sự thay đổi trong textarea
    const placeholder = document.getElementById('placeholderTypeAddFriend');
    if (placeholder) {
      placeholder.style.display = textContentAddFriendRequest ? 'none' : 'block';
    }
  }, [textContentAddFriendRequest]);

  return {
    setTextContentAddFriendRequest,
    placeholderText,
    handleSelectorChange,
    selectedValueTypeAddFriend,
    textContentAddFriendRequest,
  };
}

export function TextComment() {
  //cai dat cho phan text comment khi go text vao
  const [textContentComment, setTextContentComment] = useState('');

  const handleTextareaChangeComment = (event) => {
    setTextContentComment(event.target.value);
  };

  return {
    textContentComment,
    handleTextareaChangeComment,
  };
}

export function Interact() {
  // Hien thi Interact
  const [isInteract, setIsInteract] = useState(false);

  const handleCheckboxInteract = () => {
    setIsInteract((prevIsInteract) => !prevIsInteract);
  };

  return {
    isInteract,
    handleCheckboxInteract,
  };
}

export function Comment() {
  // Hien thi Comment khi ấn vào check box
  const [isComment, setIsComment] = useState(false);

  const handleCheckboxComment = () => {
    setIsComment((prevIsComment) => !prevIsComment);
  };

  return {
    isComment,
    handleCheckboxComment,
  };
}
