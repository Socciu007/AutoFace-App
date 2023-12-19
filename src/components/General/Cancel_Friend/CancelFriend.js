import { useEffect, useState, useRef } from 'react';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  const newValue = isNumber ? inputValue : '';

  const updatedValues = {
    ...values,
    [`${prefix}${event.target.name}`]: newValue,
  };

  setValues(updatedValues);
}

export function useRangeValues(initialValues, prefix) {
  const [values, setValues] = useState(initialValues);

  const createHandlers = () => ({
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
    handleInputChangeStart: (event) => handleInputChange(event, setValues, prefix, values),
    handleInputChangeEnd: (event) => handleInputChange(event, setValues, prefix, values),
  });

  return { ...values, ...createHandlers() };
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
  const textareaRef = useRef(null);

  const handleTextareaChangeUIDContent = (event) => {
    setUIDContent(event.target.value);
  };
  const handleDivClick = () => {
    textareaRef.current.focus();
  };
  return {
    UIDContent,
    handleTextareaChangeUIDContent,
    handleDivClick,
    textareaRef,
  };
}
