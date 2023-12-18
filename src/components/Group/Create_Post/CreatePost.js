// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber && inputValue.length <= 3) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);

    const updatedValues = {
      ...values,
      [`${prefix}${event.target.name}`]: newValue,
    };

    setValues(updatedValues);
  }
}

export function useRangeValues(initialValues, prefix) {
  const [values, setValues] = useState(initialValues);

  const createHandlers = () => ({
    handleIncrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]:
          prevValues[`${prefix}Start`] + 1 <= 999 ? prevValues[`${prefix}Start`] + 1 : prevValues[`${prefix}Start`],
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
        [`${prefix}End`]:
          prevValues[`${prefix}End`] + 1 <= 999 ? prevValues[`${prefix}End`] + 1 : prevValues[`${prefix}End`],
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

export function ShowTag() {
  // Hien thi tag
  const [isTag, setIsTag] = useState(false);

  const handleCheckboxTag = () => {
    setIsTag((prevIsLiked) => !prevIsLiked);
  };
  return {
    isTag,
    handleCheckboxTag,
  };
}
export function PostOption() {
  //Hien thi select post option
  const [selectedValuePost, setSelectedValuePost] = useState('');

  const handleSelectChangePost = (event) => {
    setSelectedValuePost(event.target.value);
  };
  useEffect(() => {
    setSelectedValuePost('photoOrVideo');
  }, []);
  return {
    selectedValuePost,
    handleSelectChangePost,
  };
}
export function FriendsOption() {
  //Hien thi select Friends
  const [selectedValueFriend, setSelectedValueFriend] = useState('');

  const handleSelectChangeFriend = (event) => {
    setSelectedValueFriend(event.target.value);
  };
  useEffect(() => {
    setSelectedValueFriend('amongFriend');
  }, []);
  return {
    selectedValueFriend,
    handleSelectChangeFriend,
  };
}
export function useTextarea(initialValue) {
  //cai dat cho phan text (khi go chu thi placeholder cua textarea se an di)
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDivClick = () => {
    textareaRef.current.focus();
  };
  return {
    value,
    handleChange,
    textareaRef,
    handleDivClick,
  };
}

export function ListUIDContent() {
  //cai dat cho phan UID List(khi go chu thi placeholder cua textarea se an di)
  const [UIDListContent, setUIDContent] = useState('');
  const [lineCount, setLineCount] = useState(0);
  const textareaUIDListRef = useRef(null);
  const handleTextareaChangeUIDList = (event) => {
    const content = event.target.value;
    setUIDContent(content);
    // Đếm số lượng dòng
    const lines = content.split('\n');
    setLineCount(lines.length);
  };
  const handleTextareaUIDListPaste = (event) => {
    // Đợi một khoảng nhỏ để textarea cập nhật nội dung sau khi paste
    setTimeout(() => {
      const content = event.target.value;
      // Đếm số lượng dòng sau khi paste
      const lines = content.split('\n');
      setLineCount(lines.length);
    }, 0);
  };
  const handleDivUIDListClick = () => {
    textareaUIDListRef.current.focus();
  };
  return {
    UIDListContent,
    handleTextareaChangeUIDList,
    handleTextareaUIDListPaste,
    lineCount,
    handleDivUIDListClick,
    textareaUIDListRef,
  };
}
export function URLImg() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => file.name);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
  });

  const handleDeleteButtonClick = () => {
    setFiles([]);
  };

  return {
    files,
    getRootProps,
    getInputProps,
    handleDeleteButtonClick,
  };
}
