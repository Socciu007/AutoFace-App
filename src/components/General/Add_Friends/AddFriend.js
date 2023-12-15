// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

export function handleInputChange(event, setValues) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue); // Check if the input is a number

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);

    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: newValue,
    }));
  }
}
export function useRangeValues(initialValues) {
  const [values, setValues] = useState(initialValues);

  const createHandlers = (prefix) => ({
    handleIncrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] + 1,
      }));
    },
    handleDecrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] > 0 ? prevValues[`${prefix}Start`] - 1 : 0,
      }));
    },
    handleIncrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] + 1,
      }));
    },
    handleDecrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] > 0 ? prevValues[`${prefix}End`] - 1 : 0,
      }));
    },
    handleInputChangeStart: (event) => handleInputChange(event, setValues),
    handleInputChangeEnd: (event) => handleInputChange(event, setValues),
  });

  const postValues = useRangeValues({ ...initialValues, prefix: 'Post' });
  const delayTimeValues = useRangeValues({ ...initialValues, prefix: 'DelayTime' });
  const requestsValues = useRangeValues({ ...initialValues, prefix: 'Requests' });
  const stopTimeValues = useRangeValues({ ...initialValues, prefix: 'StopTime' });

  return {
    ...values,
    ...requestsValues,
    ...delayTimeValues,
    ...postValues,
    ...stopTimeValues,
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
