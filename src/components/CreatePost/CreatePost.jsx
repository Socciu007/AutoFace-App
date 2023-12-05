// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../assets/img/Page-1.png';
const CreatePost = () => {
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

  // Hien thi
  const [isLiked, setIsLiked] = useState(false);

  const handleCheckboxChange = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };
  //Hien thi share
  const [isShare, setIsShared] = useState(false);
  const handleCheckboxChangeShare = () => {
    setIsShared((prevIsLiked) => !prevIsLiked);
  };

  //Hien thi comment
  const [isComment, setisComment] = useState(false);
  const handleCheckboxChangeComment = () => {
    setisComment((prevIsLiked) => !prevIsLiked);
  };

  //Hien thi select
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    setSelectedValue('text');
  }, []);

  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return (
    <div className="watch-video">
      <h1 className="watch-video__title">Facebook Automation</h1>
      <div className="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
          <path
            d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
            stroke="#01162B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="15" fill="#F5F5F5" />
                <path
                  d="M14.25 20.25L9 15.75M9 15.75L14.25 11.25M9 15.75L20.625 15.75"
                  stroke="#01162B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Create post</p>
            </div>
            <div className="component-item numberOfVideo">
              <p className="component-item__header">Number of posts:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleIncrementVideoStart}
                  >
                    <path
                      d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                      fill="#01162B"
                    />
                  </svg>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleDecrementVideoStart}
                  >
                    <path
                      d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                      fill="#01162B"
                    />
                  </svg>
                </div>
                <input type="text" value={inputValueVideoStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleIncrementVideoEnd}
                  >
                    <path
                      d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                      fill="#01162B"
                    />
                  </svg>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleDecrementVideoEnd}
                  >
                    <path
                      d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                      fill="#01162B"
                    />
                  </svg>
                </div>
                <input type="text" value={inputValueVideoEnd} onChange />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">
                Delay time <span>(s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleIncrementWatchVideoStart}
                  >
                    <path
                      d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                      fill="#01162B"
                    />
                  </svg>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleDecrementWatchVideoStart}
                  >
                    <path
                      d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                      fill="#01162B"
                    />
                  </svg>
                </div>
                <input type="text" value={inputValueWatchVideoStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleIncrementWatchVideoEnd}
                  >
                    <path
                      d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                      fill="#01162B"
                    />
                  </svg>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleDecrementWatchVideoEnd}
                  >
                    <path
                      d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                      fill="#01162B"
                    />
                  </svg>
                </div>
                <input type="text" value={inputValueWatchVideoEnd} onChange />
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <p>Post options</p>
              </div>
              <div className="commentContent">
                <div className="component-item optionComment">
                  <select
                    name="optionComment"
                    className="commentType"
                    onChange={handleSelectChange}
                    value={selectedValue}
                  >
                    <option value="text">Using background</option>
                    <option value="photoOrVideo">Text, Photo/video</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#01162B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {(selectedValue === 'text' || selectedValue === 'photoOrVideo') && (
                  <div className="Text">
                    <p className="selectComment__header">Text</p>
                    <div className="component-item text">
                      <textarea
                        id="textContent"
                        name="textContent"
                        rows="10"
                        value={textContent}
                        onChange={handleTextareaChange}
                      ></textarea>
                      <div className={`placeholder ${textContent ? 'hide' : ''}`}>
                        <p>
                          <span>1</span>Enter the content here
                        </p>
                        <p>
                          <span>2</span>Each content/line
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedValue === 'photoOrVideo' && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>
                    <div className="component-item numberOfVideo">
                      <p className="component-item__header numberOfVideoText">Number of photo/video:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleIncrementPhotoVideoStart}
                          >
                            <path
                              d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                              fill="#01162B"
                            />
                          </svg>

                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleDecrementPhotoVideoStart}
                          >
                            <path
                              d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                              fill="#01162B"
                            />
                          </svg>
                        </div>
                        <input type="text" value={inputValuePhotoVideoStart} onChange />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleIncrementPhotoVideoEnd}
                          >
                            <path
                              d="M3.97142 0.467669C4.17141 0.225192 4.54288 0.225192 4.74287 0.467669L8.32177 4.80686C8.59075 5.13298 8.35878 5.625 7.93605 5.625L0.778241 5.625C0.355507 5.625 0.123534 5.13298 0.392513 4.80686L3.97142 0.467669Z"
                              fill="#01162B"
                            />
                          </svg>

                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleDecrementPhotoVideoEnd}
                          >
                            <path
                              d="M4.74245 5.53233C4.54246 5.77481 4.17099 5.77481 3.971 5.53233L0.392095 1.19314C0.123116 0.867021 0.355088 0.374999 0.777822 0.374999L7.93563 0.375C8.35836 0.375 8.59033 0.867022 8.32135 1.19314L4.74245 5.53233Z"
                              fill="#01162B"
                            />
                          </svg>
                        </div>
                        <input type="text" value={inputValuePhotoVideoEnd} onChange />
                      </div>
                    </div>
                    <div className="component-item dragVideoOrPhoto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <g opacity="0.5">
                          <path
                            d="M25.0002 4.11734C24.9464 4.31366 24.9036 4.51366 24.8352 4.70445C24.7191 5.03145 24.4387 5.18176 24.149 5.08912C23.868 4.99955 23.7073 4.72163 23.7941 4.40445C23.9401 3.87316 23.9547 3.34801 23.8313 2.81058C23.7611 2.50322 23.9346 2.22101 24.1967 2.15107C24.5101 2.06764 24.768 2.21242 24.8792 2.5431C24.9281 2.68911 24.9605 2.84126 25.0002 2.99034C25.0002 3.36641 25.0002 3.74187 25.0002 4.11734Z"
                            fill="#01162B"
                          />
                          <path
                            d="M12.6552 21.7923C12.6167 21.6493 12.5287 21.5966 12.4621 21.5291C11.2963 20.3561 10.1299 19.1837 8.96172 18.0131C8.57862 17.6297 8.31712 17.1966 8.34706 16.6291C8.38188 15.9763 8.68066 15.4904 9.27149 15.215C9.86294 14.9389 10.4446 14.9898 10.9762 15.3763C11.3196 15.626 11.5927 15.9561 11.8908 16.2567C12.0161 16.3837 12.0766 16.38 12.178 16.2254C12.4908 15.7499 12.9515 15.5131 13.51 15.4812C13.6798 15.4714 13.7654 15.4266 13.8289 15.2579C14.1228 14.4788 14.8566 14.0604 15.676 14.2051C15.8458 14.2352 15.9155 14.2008 15.9888 14.0456C16.414 13.145 17.6415 12.7916 18.3876 13.442C19.403 14.3272 20.4417 15.2199 21.1254 16.4107C22.0719 18.0579 22.1776 19.7947 21.4254 21.5371C20.6574 23.3156 19.2888 24.4162 17.4075 24.8635C17.0037 24.9592 16.5912 25.0009 16.1745 25.0003C14.1417 24.9984 12.1096 25.0003 10.0768 24.999C9.55133 24.9984 9.35703 24.7929 9.37292 24.2647C9.40836 23.08 10.4874 21.9395 11.6599 21.8328C11.9843 21.8021 12.3081 21.8045 12.6552 21.7923ZM13.6328 23.8954C14.454 23.8954 15.2745 23.896 16.0957 23.8954C16.3395 23.8954 16.5815 23.8819 16.8246 23.8518C20.1986 23.4273 21.9619 19.4082 19.9755 16.6346C19.3658 15.7824 18.566 15.1021 17.8169 14.3781C17.6922 14.2573 17.5279 14.2027 17.3434 14.2493C16.9077 14.3597 16.7941 14.7561 17.0758 15.1978C17.2658 15.4959 17.2499 15.78 17.0318 15.9708C16.8039 16.1702 16.5026 16.1518 16.2405 15.9119C16.0847 15.7689 15.943 15.6101 15.7872 15.4665C15.5342 15.2328 15.1908 15.2297 14.9788 15.4512C14.7662 15.6732 14.7735 15.9831 15.0088 16.2438C15.145 16.3947 15.2965 16.5321 15.4358 16.6806C15.6949 16.9561 15.7181 17.2843 15.5 17.5088C15.2666 17.7499 14.9489 17.7272 14.6611 17.4487C14.4332 17.2272 14.209 17.0027 13.9792 16.7837C13.8393 16.6505 13.6774 16.5634 13.4739 16.5978C13.2644 16.6334 13.1116 16.7487 13.0407 16.9487C12.9589 17.1794 13.0267 17.3861 13.1929 17.5555C13.557 17.9285 13.9279 18.2947 14.2939 18.6659C14.3733 18.7469 14.4527 18.8315 14.5138 18.926C14.666 19.1616 14.6318 19.4346 14.4387 19.6162C14.2542 19.7898 13.9866 19.8137 13.766 19.6622C13.6597 19.5892 13.5644 19.4978 13.4727 19.4058C12.4884 18.4199 11.5059 17.4328 10.5234 16.4456C10.4373 16.3591 10.3536 16.269 10.2436 16.2119C10.034 16.1033 9.83422 16.1291 9.64787 16.2647C9.45174 16.4076 9.41447 16.6125 9.46151 16.8334C9.49695 16.9996 9.62465 17.1113 9.73952 17.2272C11.2743 18.7683 12.8086 20.3095 14.344 21.8499C14.545 22.0512 14.6953 22.2659 14.5664 22.5659C14.4442 22.8506 14.2035 22.9039 13.9224 22.9003C13.3212 22.8923 12.7193 22.8911 12.1181 22.9003C11.5236 22.9088 11.0196 23.1082 10.6933 23.642C10.653 23.7082 10.5705 23.7769 10.6224 23.8592C10.6646 23.9266 10.7574 23.8947 10.8283 23.8947C11.7631 23.8953 12.698 23.8954 13.6328 23.8954Z"
                            fill="#01162B"
                          />
                          <path
                            d="M3.71227 21.3274C1.77419 21.3274 0.151387 19.8495 0.0114686 18.0035C-0.138836 16.0133 1.20352 14.2961 3.14038 14.0102C3.60963 13.9409 4.0807 13.9532 4.53956 14.0869C4.71797 14.1391 4.79679 14.0961 4.853 13.9139C4.91716 13.7053 5.01675 13.5047 5.12123 13.3121C5.27276 13.0336 5.56176 12.9391 5.82754 13.0612C6.08966 13.182 6.20331 13.4655 6.09699 13.763C6.01756 13.9851 5.92469 14.2029 5.83182 14.4194C5.76644 14.5722 5.80982 14.671 5.93874 14.7734C6.66339 15.3483 7.09841 16.0998 7.27377 17.009C7.64831 18.9507 6.28335 20.9373 4.34099 21.2734C4.11614 21.3139 3.8913 21.3366 3.71227 21.3274ZM3.65362 20.228C4.93854 20.2814 6.23935 19.1876 6.2418 17.6366C6.24424 16.2391 5.06502 15.0771 3.66584 15.0655C2.28071 15.0538 1.10882 16.2293 1.10271 17.636C1.0966 19.082 2.22022 20.2238 3.65362 20.228Z"
                            fill="#01162B"
                          />
                          <path
                            d="M18.8211 3.15733C18.7954 3.38064 18.796 3.6469 18.8082 3.91561C18.8254 4.29291 18.606 4.47574 18.2382 4.53524C17.882 4.59291 17.5374 4.72236 17.1885 4.82114C17.0871 4.84997 16.9881 4.88985 16.8854 4.91193C16.5775 4.9788 16.3019 4.83402 16.2176 4.56715C16.1254 4.27512 16.2555 3.99721 16.5604 3.87573C16.839 3.76469 17.1268 3.67083 17.4237 3.6242C17.6101 3.59475 17.6895 3.50334 17.6993 3.3199C17.7066 3.17389 17.7225 3.02665 17.7561 2.88493C17.83 2.56898 18.0744 2.3788 18.3439 2.4107C18.639 2.44567 18.8199 2.6745 18.8217 3.015C18.8211 3.04812 18.8211 3.08064 18.8211 3.15733Z"
                            fill="#01162B"
                          />
                          <path
                            d="M10.2672 8.86544C10.2574 9.03476 10.1865 9.18752 10.0552 9.30654C9.81445 9.52434 9.57555 9.74458 9.32443 9.94949C9.05193 10.1722 8.75193 10.1526 8.54297 9.91943C8.34317 9.6955 8.34806 9.38937 8.59124 9.15378C8.86435 8.88937 9.13014 8.60961 9.45641 8.40838C9.80529 8.19366 10.2593 8.45194 10.2672 8.86544Z"
                            fill="#01162B"
                          />
                          <path
                            d="M22.1675 7.13325C21.8529 7.13264 21.6378 6.97436 21.581 6.74368C21.515 6.47619 21.6183 6.21055 21.8682 6.11055C22.1999 5.97742 22.5268 5.8357 22.8519 5.68846C23.0963 5.57803 23.3523 5.67067 23.4928 5.88355C23.6425 6.11055 23.626 6.38785 23.4121 6.57129C23.0388 6.89215 22.5855 7.04368 22.1675 7.13325Z"
                            fill="#01162B"
                          />
                          <path
                            d="M13.9448 6.33549C13.6967 6.32874 13.5274 6.21279 13.4334 5.98703C13.3411 5.76555 13.3826 5.55512 13.5604 5.41034C13.8947 5.13856 14.2735 4.92935 14.6688 4.7631C14.9138 4.66003 15.1722 4.77966 15.2987 4.99623C15.4191 5.20297 15.3995 5.49684 15.2114 5.64531C14.8606 5.92138 14.469 6.13549 14.0608 6.31709C14.0254 6.33365 13.9814 6.33058 13.9448 6.33549Z"
                            fill="#01162B"
                          />
                          <path
                            d="M12.1636 6.40332C12.3939 6.40823 12.5717 6.48921 12.6658 6.69719C12.7642 6.91559 12.7581 7.13829 12.5778 7.30639C12.2754 7.58921 11.9375 7.83093 11.5813 8.03952C11.3687 8.16406 11.1151 8.10271 10.9593 7.93155C10.7882 7.74443 10.7387 7.46835 10.8952 7.28308C11.2068 6.91375 11.6137 6.65854 12.0316 6.42541C12.0713 6.40332 12.1263 6.40884 12.1636 6.40332Z"
                            fill="#01162B"
                          />
                          <path
                            d="M20.7281 0.634276C20.7361 0.853295 20.6353 1.01465 20.4483 1.11219C20.1599 1.26311 19.888 1.43857 19.6186 1.62078C19.3833 1.78029 19.0748 1.73428 18.9123 1.5398C18.7259 1.31649 18.7308 0.999921 18.9471 0.787037C19.2587 0.480288 19.6284 0.257588 20.0426 0.123232C20.3909 0.0109616 20.7239 0.268631 20.7281 0.634276Z"
                            fill="#01162B"
                          />
                          <path
                            d="M19.2588 5.27765C19.3566 5.27213 19.4764 5.34207 19.5851 5.4298C19.8069 5.60955 20.0452 5.76231 20.2896 5.90894C20.5859 6.08624 20.6776 6.39299 20.5328 6.65986C20.3928 6.91814 20.0947 7.00833 19.7916 6.87459C19.4391 6.71876 19.1238 6.50219 18.8501 6.23103C18.6766 6.05863 18.6008 5.8482 18.7102 5.60771C18.8061 5.39606 18.9717 5.28072 19.2588 5.27765Z"
                            fill="#01162B"
                          />
                          <path
                            d="M8.00083 11.0904C8.00389 11.1793 7.95317 11.3069 7.86091 11.4155C7.65012 11.664 7.44116 11.9137 7.2212 12.1536C6.98963 12.4057 6.66825 12.4358 6.43851 12.2413C6.20695 12.0456 6.17701 11.7161 6.38902 11.4529C6.60837 11.1806 6.83994 10.9167 7.08128 10.664C7.24747 10.4904 7.46193 10.4486 7.68617 10.5517C7.8878 10.6437 8.00022 10.8039 8.00083 11.0904Z"
                            fill="#01162B"
                          />
                          <path
                            d="M23.6983 0.993783C23.6983 1.39746 23.3183 1.65697 22.9523 1.48151C22.6383 1.33059 22.3315 1.16556 22.0114 1.02507C21.7383 0.904825 21.6374 0.617095 21.7364 0.347769C21.8305 0.0913266 22.1104 -0.0552996 22.392 0.0195473C22.78 0.122615 23.1356 0.301757 23.4607 0.536726C23.6128 0.645316 23.7057 0.795623 23.6983 0.993783Z"
                            fill="#01162B"
                          />
                        </g>
                      </svg>
                      <p>Drag the photo/video folder here</p>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        name="dragVideoOrPhotoInput"
                        id="dragVideoOrPhotoInput"
                        className="dragVideoOrPhotoInput"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="componet-right">
          <div className="componet-right__header">
            <div className="componet-right__header__inputBox">
              <input
                type="text"
                name="nameScenario"
                id="nameScenario"
                className="nameScenario"
                placeholder="Enter name here"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9.44477 1.86878C10.0863 1.22721 11.1265 1.22721 11.7681 1.86878C12.4097 2.51036 12.4097 3.55056 11.7681 4.19213L4.91137 11.0489L2.12335 11.5136L2.58802 8.72553L9.44477 1.86878Z"
                  stroke="#01162B"
                />
                <line x1="8.32523" y1="2.54488" x2="11.0922" y2="5.31182" stroke="#01162B" />
              </svg>
            </div>
            <div className="componet-right__header__function">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#F5F5F5" />
                <path
                  d="M14 16.7368H16.3684V15.9474H17.1579V15.1579H17.9474V14.3684H17.1579V13.5789H16.3684V12.7895H17.1579V12H17.9474V12.7895H18.7368V13.5789H19.5263V14.3684H21.1053V13.5789H21.8947V12.7895H22.6842V12H23.4737V12.7895H24.2632V13.5789H23.4737V14.3684H22.6842V15.1579H23.4737V15.9474H24.2632V16.7368H26.6316V18.3158H25.0526V19.8947H26.6316V21.4737H25.0526V23.0526H26.6316V24.6316H24.2632V25.4211H23.4737V26.2105H22.6842V27H17.9474V26.2105H17.1579V25.4211H16.3684V24.6316H14V23.0526H15.5789V21.4737H14V19.8947H15.5789V18.3158H14V16.7368ZM21.8947 25.4211V24.6316H22.6842V23.8421H23.4737V17.5263H22.6842V16.7368H21.8947V15.9474H18.7368V16.7368H17.9474V17.5263H17.1579V23.8421H17.9474V24.6316H18.7368V25.4211H21.8947ZM18.7368 21.4737H21.8947V23.0526H18.7368V21.4737ZM18.7368 18.3158H21.8947V19.8947H18.7368V18.3158Z"
                  fill="#01162B"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#F5F5F5" />
                <path
                  d="M25.2545 18.3685L25.2544 18.3684L16.6962 13.159C16.6961 13.159 16.696 13.1589 16.6959 13.1589C16.0244 12.7506 15 13.2023 15 14.2906V24.7091C15 25.7989 16.0238 26.2496 16.6961 25.8407L25.2545 18.3685ZM25.2545 18.3685C26.0578 18.8574 26.0579 20.1448 25.2546 20.6338C25.2545 20.6338 25.2545 20.6338 25.2545 20.6338L16.6962 25.8407L25.2545 18.3685Z"
                  stroke="#01162B"
                  strokeWidth="2"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="15" viewBox="0 0 3 15" fill="none">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#01162B" />
                <circle cx="1.5" cy="7.5" r="1.5" fill="#01162B" />
                <circle cx="1.5" cy="13.5" r="1.5" fill="#01162B" />
              </svg>
              <button type="submit" className="btnSave">
                <img src={saveIcon} alt="SaveButton" />
                <span>Save</span>
              </button>
            </div>
          </div>
          <div className="componet-right__content"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
