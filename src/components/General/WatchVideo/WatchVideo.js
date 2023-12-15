import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function handleInputChange(event, setInputValue) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue); // Check if the input is a number

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);
    setInputValue(newValue);
  }
}
export function NumberVideo() {
  //Video start
  const [inputValueVideoStart, setInputValueVideoStart] = useState(5);
  const handleIncrementVideoStart = () => {
    setInputValueVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementVideoStart = () => {
    setInputValueVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Video end
  const [inputValueVideoEnd, setInputValueVideoEnd] = useState(10);
  const handleIncrementVideoEnd = () => {
    setInputValueVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementVideoEnd = () => {
    setInputValueVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueVideoStart,
    handleIncrementVideoStart,
    handleDecrementVideoStart,
    inputValueVideoEnd,
    handleIncrementVideoEnd,
    handleDecrementVideoEnd,
    handleInputChangeVideoStart: (event) => handleInputChange(event, setInputValueVideoStart),
    handleInputChangeVideoEnd: (event) => handleInputChange(event, setInputValueVideoEnd),
  };
}
export function TimeWatchVideo() {
  //Watching time/video (s) start
  const [inputValueWatchVideoStart, setInputValueWatchVideoStart] = useState(5);
  const handleIncrementWatchVideoStart = () => {
    setInputValueWatchVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementWatchVideoStart = () => {
    setInputValueWatchVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Watching time/video (s) end
  const [inputValueWatchVideoEnd, setInputValueWatchVideoEnd] = useState(10);
  const handleIncrementWatchVideoEnd = () => {
    setInputValueWatchVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementWatchVideoEnd = () => {
    setInputValueWatchVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueWatchVideoStart,
    handleIncrementWatchVideoStart,
    handleDecrementWatchVideoStart,
    inputValueWatchVideoEnd,
    handleIncrementWatchVideoEnd,
    handleDecrementWatchVideoEnd,
    handleInputChangeWatchVideoStart: (event) => handleInputChange(event, setInputValueWatchVideoStart),
    handleInputChangeWatchVideoEnd: (event) => handleInputChange(event, setInputValueWatchVideoEnd),
  };
}
export function NumberLike() {
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
export function NumberShare() {
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
export function NumberCommentVideo() {
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
export function NumberPhotoVideo() {
  //Random PhotoVideo start
  const [inputValuePhotoVideoStart, setInputValuePhotoVideoStart] = useState(5);
  const handleIncrementPhotoVideoStart = () => {
    setInputValuePhotoVideoStart((prevValue) => prevValue + 1);
  };
  const handleDecrementPhotoVideoStart = () => {
    setInputValuePhotoVideoStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random PhotoVideo end
  const [inputValuePhotoVideoEnd, setInputValuePhotoVideoEnd] = useState(10);
  const handleIncrementPhotoVideoEnd = () => {
    setInputValuePhotoVideoEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementPhotoVideoEnd = () => {
    setInputValuePhotoVideoEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return {
    inputValuePhotoVideoStart,
    handleIncrementPhotoVideoStart,
    handleDecrementPhotoVideoStart,
    inputValuePhotoVideoEnd,
    handleIncrementPhotoVideoEnd,
    handleDecrementPhotoVideoEnd,
    handleInputChangePhotoVideoStart: (event) => handleInputChange(event, setInputValuePhotoVideoStart),
    handleInputChangePhotoVideoEnd: (event) => handleInputChange(event, setInputValuePhotoVideoEnd),
  };
}
export function ShowLike() {
  // Hien thi
  const [isLiked, setIsLiked] = useState(false);

  const handleCheckboxChange = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return {
    isLiked,
    handleCheckboxChange,
  };
}
export function ShowShare() {
  //Hien thi share
  const [isShare, setIsShared] = useState(false);
  const handleCheckboxChangeShare = () => {
    setIsShared((prevIsLiked) => !prevIsLiked);
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
    setisComment((prevIsLiked) => !prevIsLiked);
  };

  return {
    isComment,
    handleCheckboxChangeComment,
  };
}
export function CommentOption() {
  //Hien thi select
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    setSelectedValue('text');
  }, []);

  return {
    selectedValue,
    handleSelectChange,
  };
}
export function CommentTextarea() {
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
