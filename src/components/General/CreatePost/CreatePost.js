import { useEffect, useState } from 'react';
export function handleInputChange(event, setInputValue) {
  // Nếu giá trị mới là chuỗi rỗng, thiết lập về giá trị mặc định hoặc giá trị mong muốn
  const newValue = event.target.value === '' ? '' : parseInt(event.target.value, 10);

  // Kiểm tra xem có phải là số hay không
  if (!isNaN(newValue)) {
    setInputValue(newValue);
  }
}
export function numberOfPost() {
  //Value post start
  const [inputValuePostStart, setInputValuePostStart] = useState(5);
  const handleIncrementPostStart = () => {
    setInputValuePostStart((prevValue) => prevValue + 1);
  };
  const handleDecrementPostStart = () => {
    setInputValuePostStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value post end
  const [inputValuePostEnd, setInputValuePostEnd] = useState(10);
  const handleIncrementPostEnd = () => {
    setInputValuePostEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementPostEnd = () => {
    setInputValuePostEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValuePostStart,
    handleIncrementPostStart,
    handleDecrementPostStart,
    inputValuePostEnd,
    handleIncrementPostEnd,
    handleDecrementPostEnd,
    handleInputChangePostStart: (event) => handleInputChange(event, setInputValuePostStart),
    handleInputChangePostEnd: (event) => handleInputChange(event, setInputValuePostEnd),
  };
}

export function delayTime() {
  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(5);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(10);
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

export function photoVideo() {
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

export function numberOfFriend() {
  //Random Number of friends start
  const [inputValueNumberOfFriendStart, setInputValueNumberOfFriendStart] = useState(5);
  const handleIncrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendStart = () => {
    setInputValueNumberOfFriendStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Random Number of friends end
  const [inputValueNumberOfFriendEnd, setInputValueNumberOfFriendEnd] = useState(10);
  const handleIncrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfFriendEnd = () => {
    setInputValueNumberOfFriendEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  return {
    inputValueNumberOfFriendStart,
    handleIncrementNumberOfFriendStart,
    handleDecrementNumberOfFriendStart,
    inputValueNumberOfFriendEnd,
    handleIncrementNumberOfFriendEnd,
    handleDecrementNumberOfFriendEnd,
    handleInputChangeNumberOfFriendStart: (event) => handleInputChange(event, setInputValueNumberOfFriendStart),
    handleInputChangeNumberOfFriendEnd: (event) => handleInputChange(event, setInputValueNumberOfFriendEnd),
  };
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

export function TextBackGround() {
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

export function URLImg() {
  //Hien thi duong dan cua anh
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleIconClick = () => {
    if (!isFileSelected) {
      document.getElementById('dragVideoOrPhotoInput').click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    // Kiểm tra xem có file được chọn không và chưa thực hiện hiển thị
    if (selectedFile && !isFileSelected) {
      setIsFileSelected(true);
    }
  }, [selectedFile, isFileSelected]);
  return {
    handleIconClick,
    handleFileChange,
    isFileSelected,
    selectedFile,
  };
}
