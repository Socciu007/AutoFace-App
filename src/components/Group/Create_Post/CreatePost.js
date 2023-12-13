// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
export function handleInputChange(event, setValues) {
  // Nếu giá trị mới là chuỗi rỗng, thiết lập về giá trị mặc định hoặc giá trị mong muốn
  const newValue = event.target.value === '' ? '' : parseInt(event.target.value, 10);

  // Kiểm tra xem có phải là số hay không
  if (!isNaN(newValue)) {
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
  const photoVideoValues = useRangeValues({ ...initialValues, prefix: 'PhotoVideo' });
  const friendValues = useRangeValues({ ...initialValues, prefix: 'NumberFriend' });

  return {
    ...values,
    ...postValues,
    ...delayTimeValues,
    ...photoVideoValues,
    ...friendValues,
  };
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
export function TextOfTextarea() {
  //cai dat cho phan text (khi go chu thi placeholder cua textarea se an di)
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return {
    textContent,
    handleTextareaChange,
  };
}

export function UIDListContent() {
  //cai dat cho phan UID List(khi go chu thi placeholder cua textarea se an di)
  const [UIDContent, setUIDContent] = useState('');

  const handleTextareaChangeUID = (event) => {
    setUIDContent(event.target.value);
  };
  const charCount = UIDContent.length;
  return {
    UIDContent,
    handleTextareaChangeUID,
    charCount,
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
