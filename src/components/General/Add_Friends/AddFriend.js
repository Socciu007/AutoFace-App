// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';

// export function handleInputChange(event, setValues, prefix, values) {
//   const inputValue = event.target.value;
//   const isNumber = /^\d*$/.test(inputValue);

//   if (isNumber && inputValue.length <= 3) {
//     const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);

//     const updatedValues = {
//       ...values,
//       [`${prefix}${event.target.name}`]: newValue,
//     };

//     setValues(updatedValues);
//   }
// }

export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber) {
    // Limit the input to a maximum of 3 digits followed by "..."
    const newValue = inputValue.length <= 5 ? inputValue : `${inputValue.slice(0, 5)}...`;

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

export function AddFriendOption() {
  //Hien thi select addfriend option
  const [selectedValueTypeAddFriend, setSelectedValueType] = useState('suggestions');
  const [textContentAddFriendRequest, setTextContentAddFriendRequest] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const textareaRef = useRef(null);

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
  const handleDivClick = () => {
    textareaRef.current.focus();
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
    handleDivClick,
    textareaRef,
  };
}

export function TextComment() {
  const [textContentComment, setTextContentComment] = useState('');
  const textareaCommentRef = useRef(null);

  const handleTextareaChangeComment = (event) => {
    const inputValue = event.target.value;

    // Kiểm tra xem nội dung có rỗng không
    if (inputValue.trim() === '') {
      // Nếu rỗng, hiển thị lại placeholder và cập nhật state
      setTextContentComment(''); // Hoặc bạn có thể gán giá trị placeholder khác nếu cần
    } else {
      // Nếu không rỗng, thực hiện thêm số đầu dòng như cũ
      const lines = inputValue.split('\n');
      const numberedLines = lines.map((line, index) => {
        if (!/^\d+\./.test(line)) {
          return `${index + 1}. ${line}`;
        }
        return line;
      });
      const newTextContent = numberedLines.join('\n');
      setTextContentComment(newTextContent);
    }
  };

  const handleCommentDivClick = () => {
    textareaCommentRef.current.focus();
  };

  return {
    textContentComment,
    handleTextareaChangeComment,
    textareaCommentRef,
    handleCommentDivClick,
  };
}

// Show Interact,show comment
export function useShowCheckbox(initialState, featureName) {
  const [isFeatureVisible, setIsFeatureVisible] = useState(initialState);

  const handleCheckboxChange = () => {
    setIsFeatureVisible((prevState) => !prevState);
  };

  return {
    [`is${featureName}`]: isFeatureVisible,
    [`handleCheckboxChange${featureName}`]: handleCheckboxChange,
  };
}
