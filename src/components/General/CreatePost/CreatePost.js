import { useEffect, useRef, useState } from 'react';
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

export function showTag() {
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
    setSelectedValuePost('background');
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

//cai dat cho phan text (khi go chu thi placeholder cua textarea se an di)
export function useTextarea(initialValue) {
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
