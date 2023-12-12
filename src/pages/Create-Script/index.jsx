import React, { useEffect, useState } from "react";
import "./style.scss";
import DnDFlow from "../../components/drag/drag";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icon/icon-search.svg";
import back from "../../assets/icon/icon-back.svg";
import newNote from "../../assets/icon/icon-newNote.svg";
import debug from "../../assets/icon/icon-debug.svg";
import runTest from "../../assets/icon/icon-runTest.svg";
import option from "../../assets/icon/icon-options.svg";
import save from "../../assets/icon/icon-save.svg";
import watchStory from "../../assets/icon/icon-watchStoryGeneral.svg";
import watchVideo from "../../assets/icon/icon-watchVideoGeneral.svg";
import newsfeed from "../../assets/icon/icon-newsfeedGeneral.svg";
import createPost from "../../assets/icon/icon-createPostGeneral.svg";
import postInteract from "../../assets/icon/icon-postInteractGeneral.svg";
import deletePost from "../../assets/icon/icon-deletePostGeneral.svg";
import viewNoti from "../../assets/icon/icon-viewNotiGeneral.svg";
import sendMsg from "../../assets/icon/icon-sendMsgGeneral.svg";
import reply from "../../assets/icon/icon-replyGeneral.svg";
import addFriend from "../../assets/icon/icon-addFriendGeneral.svg";
import cancel from "../../assets/icon/icon-cancelGeneral.svg";
const CreateScript = () => {
  const [message, setMessage] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event);
  };
  const [activeCategory, setActiveCategory] = useState(1);
  const navigate = useNavigate();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const handleReturnClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate("/");
  };
  const handleCategoryClick = (categoryNumber) => {
    setActiveCategory(
      categoryNumber === activeCategory ? null : categoryNumber
    );
  };
  return (
    <>
      <div className='create-script'>
        <h1>{message}</h1>
        <div className='create-script__title'>
          <button onClick={handleReturnClick}>
            <img src={back} alt='Return' />
          </button>
          <p>Create a new script</p>
        </div>
        <div className='create-script__content'>
          <div className='scrollable-container'>
            <div className='left-content'>
              <div className='left-content__top'>
                <div className='search'>
                  <img src={search} alt='Icon-search' />
                  <input
                    className='inputSearch'
                    placeholder='Search...'
                  ></input>
                </div>
              </div>
              <div className='left-content__category'>
                <button
                  className={
                    activeCategory === 1 ? "categoryActive" : "categoryBtn"
                  }
                  onClick={() => handleCategoryClick(1)}
                >
                  General
                </button>
                <button
                  className={
                    activeCategory === 2 ? "categoryActive" : "categoryBtn"
                  }
                  onClick={() => handleCategoryClick(2)}
                >
                  Group
                </button>
                <button
                  className={
                    activeCategory === 3 ? "categoryActive" : "categoryBtn"
                  }
                  onClick={() => handleCategoryClick(3)}
                >
                  Seeding
                </button>
                <hr />
              </div>
              <div className='left-content__container'>
                <div
                  className={activeCategory === 1 ? "grid-container" : "hide"}
                >
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchStory")}
                    draggable
                  >
                    <img src={watchStory} alt='watch Story General' />
                    <p>Watch story</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchVideo")}
                    draggable
                  >
                    <img src={watchVideo} alt='watch Video General' />
                    <p>Watch video</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "newsFeed")}
                    draggable
                  >
                    <img src={newsfeed} alt='watch newsfeed General' />
                    <p>Newsfeed</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "createPost")}
                    draggable
                  >
                    <img src={createPost} alt='watch newsfeed General' />
                    <p>Create post</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "postInteract")}
                    draggable
                  >
                    <img src={postInteract} alt='watch newsfeed General' />
                    <p>Post interaction</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "deletePost")}
                    draggable
                  >
                    <img src={deletePost} alt='watch newsfeed General' />
                    <p>Delete post</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "viewNoti")}
                    draggable
                  >
                    <img src={viewNoti} alt='watch newsfeed General' />
                    <p>View notifications</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "sendMsg")}
                    draggable
                  >
                    <img src={sendMsg} alt='watch newsfeed General' />
                    <p>Send message</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "replyMsg")}
                    draggable
                  >
                    <img src={reply} alt='watch newsfeed General' />
                    <p>Reply message</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "addFriend")}
                    draggable
                  >
                    <img src={addFriend} alt='watch newsfeed General' />
                    <p>Add friend</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "cancelFriend")}
                    draggable
                  >
                    <img src={cancel} alt='watch newsfeed General' />
                    <p>Cancel friend</p>
                  </div>
                </div>
                <div
                  className={activeCategory === 2 ? "grid-container" : "hide"}
                >
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchStory")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M0.75 2C0.75 1.39686 1.3388 0.75 2.27273 0.75H6.81818C7.7521 0.75 8.34091 1.39686 8.34091 2V18.182L6.93303 16.7661C6.60456 16.4357 6.15793 16.25 5.69207 16.25H2.27273C1.3388 16.25 0.75 15.6031 0.75 15V2Z'
                        stroke='#01162B'
                        strokeWidth='1.5'
                      />
                      <path
                        d='M19.25 2C19.25 1.39686 18.6612 0.75 17.7273 0.75H13.1818C12.2479 0.75 11.6591 1.39686 11.6591 2V18.182L13.067 16.7661C13.3954 16.4357 13.8421 16.25 14.3079 16.25H17.7273C18.6612 16.25 19.25 15.6031 19.25 15V2Z'
                        stroke='#01162B'
                        strokeWidth='1.5'
                      />
                    </svg>
                    <p>Watch story</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchVideo")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='20'
                      viewBox='0 0 22 20'
                      fill='none'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M18.1818 1.81818H3.63636C2.63221 1.81818 1.81818 2.63221 1.81818 3.63636V12.7273C1.81818 13.7314 2.63221 14.5455 3.63636 14.5455H18.1818C19.186 14.5455 20 13.7314 20 12.7273V3.63636C20 2.63221 19.186 1.81818 18.1818 1.81818ZM3.63636 0C1.62806 0 0 1.62806 0 3.63636V12.7273C0 14.7356 1.62806 16.3636 3.63636 16.3636H18.1818C20.1901 16.3636 21.8182 14.7356 21.8182 12.7273V3.63636C21.8182 1.62806 20.1901 0 18.1818 0H3.63636Z'
                        fill='#01162B'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.54545 19.0909C4.54545 18.5888 4.95247 18.1818 5.45455 18.1818H16.3636C16.8657 18.1818 17.2727 18.5888 17.2727 19.0909C17.2727 19.593 16.8657 20 16.3636 20H5.45455C4.95247 20 4.54545 19.593 4.54545 19.0909Z'
                        fill='#01162B'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M10 7.06017V9.30346L11.8694 8.18182L10 7.06017ZM8.18182 6.0968C8.18182 5.10751 9.26106 4.49646 10.1094 5.00544L13.5844 7.09046C14.4083 7.5848 14.4083 8.77884 13.5844 9.27317L10.1094 11.3582C9.26105 11.8672 8.18182 11.2561 8.18182 10.2668V6.0968Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Watch video</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "newsFeed")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                    >
                      <path
                        d='M1 11.2039C1 8.91549 1 7.77128 1.5192 6.82274C2.0384 5.87421 2.98695 5.28551 4.88403 4.10813L6.88403 2.86687C8.88939 1.62229 9.8921 1 11 1C12.1079 1 13.1106 1.62229 15.116 2.86687L17.116 4.10812C19.0131 5.28551 19.9616 5.87421 20.4808 6.82274C21 7.77128 21 8.91549 21 11.2039V12.725C21 16.6258 21 18.5763 19.8284 19.7881C18.6569 21 16.7712 21 13 21H9C5.22876 21 3.34315 21 2.17157 19.7881C1 18.5763 1 16.6258 1 12.725V11.2039Z'
                        stroke='#01162B'
                        strokeWidth='2'
                      />
                    </svg>
                    <p>Newsfeed</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "createPost")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='37'
                      height='26'
                      viewBox='0 0 37 26'
                      fill='none'
                    >
                      <path
                        d='M21 25H4.63636C2.63636 25 1 23.3636 1 21.3636V8.63636C1 6.63636 2.63636 5 4.63636 5H21C23 5 24.6364 6.63636 24.6364 8.63636V21.3636C24.6364 23.3636 23 25 21 25Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.9995 10.4541H5.54492V15.9086H10.9995V10.4541Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M14.6367 15.9092H20.0913'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.54492 19.5459H20.0904'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M29.1705 3.5184C29.5372 3.5184 29.9038 3.51107 30.2704 3.52207C30.464 3.52793 30.5242 3.4524 30.522 3.26395C30.5146 2.58639 30.5168 1.90809 30.522 1.23053C30.5256 0.520701 31.0125 0.0066629 31.6835 6.32672e-05C32.3904 -0.00653636 32.9066 0.503834 32.914 1.22759C32.9198 1.88756 32.9242 2.54752 32.914 3.20748C32.9096 3.44287 32.9741 3.53087 33.2212 3.525C33.8812 3.5096 34.5411 3.51693 35.196 3.5206C35.8904 3.5206 36.4213 4.0339 36.4294 4.6902C36.4324 4.85115 36.4031 5.01107 36.3432 5.16049C36.2833 5.3099 36.194 5.44578 36.0807 5.56005C35.9673 5.67432 35.8321 5.76466 35.6832 5.82572C35.5342 5.88679 35.3745 5.91733 35.2136 5.91553C34.5463 5.9258 33.879 5.9258 33.2117 5.91553C32.9822 5.91186 32.911 5.98886 32.9147 6.21691C32.925 6.89448 32.9279 7.57277 32.9147 8.25033C32.9131 8.54025 32.8063 8.81973 32.6142 9.03684C32.422 9.25395 32.1576 9.39392 31.87 9.43076C31.5824 9.46759 31.2913 9.39877 31.0506 9.23709C30.81 9.07542 30.6362 8.83187 30.5616 8.55172C30.5317 8.42693 30.5196 8.29856 30.5256 8.1704C30.5256 7.52951 30.5154 6.88788 30.53 6.24698C30.5359 5.99986 30.4692 5.9082 30.2088 5.91406C29.5423 5.93093 28.8743 5.92653 28.207 5.91406C27.939 5.9152 27.6784 5.82679 27.4665 5.66286C27.2546 5.49894 27.1035 5.26891 27.0373 5.00931C26.9711 4.7497 26.9935 4.47541 27.101 4.23C27.2085 3.98459 27.3949 3.78214 27.6306 3.65479C27.7912 3.56506 27.9724 3.51904 28.1564 3.52133C28.4944 3.52133 28.8325 3.52133 29.1705 3.52133V3.5184Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Create post</p>
                  </div>
                </div>
                <div
                  className={activeCategory === 3 ? "grid-container" : "hide"}
                >
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchStory")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M0.75 2C0.75 1.39686 1.3388 0.75 2.27273 0.75H6.81818C7.7521 0.75 8.34091 1.39686 8.34091 2V18.182L6.93303 16.7661C6.60456 16.4357 6.15793 16.25 5.69207 16.25H2.27273C1.3388 16.25 0.75 15.6031 0.75 15V2Z'
                        stroke='#01162B'
                        strokeWidth='1.5'
                      />
                      <path
                        d='M19.25 2C19.25 1.39686 18.6612 0.75 17.7273 0.75H13.1818C12.2479 0.75 11.6591 1.39686 11.6591 2V18.182L13.067 16.7661C13.3954 16.4357 13.8421 16.25 14.3079 16.25H17.7273C18.6612 16.25 19.25 15.6031 19.25 15V2Z'
                        stroke='#01162B'
                        strokeWidth='1.5'
                      />
                    </svg>
                    <p>Watch story</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "watchVideo")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='20'
                      viewBox='0 0 22 20'
                      fill='none'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M18.1818 1.81818H3.63636C2.63221 1.81818 1.81818 2.63221 1.81818 3.63636V12.7273C1.81818 13.7314 2.63221 14.5455 3.63636 14.5455H18.1818C19.186 14.5455 20 13.7314 20 12.7273V3.63636C20 2.63221 19.186 1.81818 18.1818 1.81818ZM3.63636 0C1.62806 0 0 1.62806 0 3.63636V12.7273C0 14.7356 1.62806 16.3636 3.63636 16.3636H18.1818C20.1901 16.3636 21.8182 14.7356 21.8182 12.7273V3.63636C21.8182 1.62806 20.1901 0 18.1818 0H3.63636Z'
                        fill='#01162B'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.54545 19.0909C4.54545 18.5888 4.95247 18.1818 5.45455 18.1818H16.3636C16.8657 18.1818 17.2727 18.5888 17.2727 19.0909C17.2727 19.593 16.8657 20 16.3636 20H5.45455C4.95247 20 4.54545 19.593 4.54545 19.0909Z'
                        fill='#01162B'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M10 7.06017V9.30346L11.8694 8.18182L10 7.06017ZM8.18182 6.0968C8.18182 5.10751 9.26106 4.49646 10.1094 5.00544L13.5844 7.09046C14.4083 7.5848 14.4083 8.77884 13.5844 9.27317L10.1094 11.3582C9.26105 11.8672 8.18182 11.2561 8.18182 10.2668V6.0968Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Watch video</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "newsFeed")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                    >
                      <path
                        d='M1 11.2039C1 8.91549 1 7.77128 1.5192 6.82274C2.0384 5.87421 2.98695 5.28551 4.88403 4.10813L6.88403 2.86687C8.88939 1.62229 9.8921 1 11 1C12.1079 1 13.1106 1.62229 15.116 2.86687L17.116 4.10812C19.0131 5.28551 19.9616 5.87421 20.4808 6.82274C21 7.77128 21 8.91549 21 11.2039V12.725C21 16.6258 21 18.5763 19.8284 19.7881C18.6569 21 16.7712 21 13 21H9C5.22876 21 3.34315 21 2.17157 19.7881C1 18.5763 1 16.6258 1 12.725V11.2039Z'
                        stroke='#01162B'
                        strokeWidth='2'
                      />
                    </svg>
                    <p>Newsfeed</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "createPost")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='37'
                      height='26'
                      viewBox='0 0 37 26'
                      fill='none'
                    >
                      <path
                        d='M21 25H4.63636C2.63636 25 1 23.3636 1 21.3636V8.63636C1 6.63636 2.63636 5 4.63636 5H21C23 5 24.6364 6.63636 24.6364 8.63636V21.3636C24.6364 23.3636 23 25 21 25Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.9995 10.4541H5.54492V15.9086H10.9995V10.4541Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M14.6367 15.9092H20.0913'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.54492 19.5459H20.0904'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M29.1705 3.5184C29.5372 3.5184 29.9038 3.51107 30.2704 3.52207C30.464 3.52793 30.5242 3.4524 30.522 3.26395C30.5146 2.58639 30.5168 1.90809 30.522 1.23053C30.5256 0.520701 31.0125 0.0066629 31.6835 6.32672e-05C32.3904 -0.00653636 32.9066 0.503834 32.914 1.22759C32.9198 1.88756 32.9242 2.54752 32.914 3.20748C32.9096 3.44287 32.9741 3.53087 33.2212 3.525C33.8812 3.5096 34.5411 3.51693 35.196 3.5206C35.8904 3.5206 36.4213 4.0339 36.4294 4.6902C36.4324 4.85115 36.4031 5.01107 36.3432 5.16049C36.2833 5.3099 36.194 5.44578 36.0807 5.56005C35.9673 5.67432 35.8321 5.76466 35.6832 5.82572C35.5342 5.88679 35.3745 5.91733 35.2136 5.91553C34.5463 5.9258 33.879 5.9258 33.2117 5.91553C32.9822 5.91186 32.911 5.98886 32.9147 6.21691C32.925 6.89448 32.9279 7.57277 32.9147 8.25033C32.9131 8.54025 32.8063 8.81973 32.6142 9.03684C32.422 9.25395 32.1576 9.39392 31.87 9.43076C31.5824 9.46759 31.2913 9.39877 31.0506 9.23709C30.81 9.07542 30.6362 8.83187 30.5616 8.55172C30.5317 8.42693 30.5196 8.29856 30.5256 8.1704C30.5256 7.52951 30.5154 6.88788 30.53 6.24698C30.5359 5.99986 30.4692 5.9082 30.2088 5.91406C29.5423 5.93093 28.8743 5.92653 28.207 5.91406C27.939 5.9152 27.6784 5.82679 27.4665 5.66286C27.2546 5.49894 27.1035 5.26891 27.0373 5.00931C26.9711 4.7497 26.9935 4.47541 27.101 4.23C27.2085 3.98459 27.3949 3.78214 27.6306 3.65479C27.7912 3.56506 27.9724 3.51904 28.1564 3.52133C28.4944 3.52133 28.8325 3.52133 29.1705 3.52133V3.5184Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Create post</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "postInteract")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='37'
                      height='26'
                      viewBox='0 0 37 26'
                      fill='none'
                    >
                      <path
                        d='M21 25H4.63636C2.63636 25 1 23.3636 1 21.3636V8.63636C1 6.63636 2.63636 5 4.63636 5H21C23 5 24.6364 6.63636 24.6364 8.63636V21.3636C24.6364 23.3636 23 25 21 25Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.9995 10.4541H5.54492V15.9086H10.9995V10.4541Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M14.6367 15.9092H20.0913'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.54492 19.5459H20.0904'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M36.7799 6.59335L34.1244 3.93787L35.1866 2.87567C35.2814 2.78081 35.349 2.66232 35.3825 2.53251C35.4161 2.40269 35.4142 2.26627 35.3773 2.1374C35.3403 2.00852 35.2695 1.89188 35.1723 1.79958C35.075 1.70728 34.9549 1.64267 34.8243 1.61246L27.9199 0.0191192C27.7958 -0.00942704 27.6665 -0.00595868 27.5441 0.0291985C27.4216 0.0643556 27.3102 0.130048 27.2201 0.220107C27.1301 0.310166 27.0644 0.421636 27.0292 0.544051C26.994 0.666465 26.9906 0.795807 27.0191 0.919931L28.6124 7.82423C28.6426 7.95486 28.7072 8.07502 28.7995 8.17227C28.8918 8.26951 29.0085 8.34029 29.1373 8.37726C29.2662 8.41423 29.4026 8.41605 29.5325 8.38253C29.6623 8.349 29.7808 8.28136 29.8756 8.18661L30.9378 7.12441L33.5933 9.77993C33.663 9.8497 33.7458 9.90504 33.837 9.9428C33.9281 9.98056 34.0258 10 34.1244 10C34.2231 10 34.3207 9.98056 34.4119 9.9428C34.503 9.90504 34.5858 9.8497 34.6555 9.77993L36.7799 7.65556C36.8497 7.58583 36.905 7.50304 36.9428 7.41191C36.9806 7.32078 37 7.2231 37 7.12446C37 7.02582 36.9806 6.92814 36.9428 6.83701C36.905 6.74588 36.8497 6.66308 36.7799 6.59335ZM34.1244 8.18666L31.4689 5.53115C31.3992 5.46138 31.3164 5.40604 31.2253 5.36828C31.1341 5.33052 31.0365 5.31108 30.9378 5.31108C30.8392 5.31108 30.7415 5.33052 30.6504 5.36828C30.5592 5.40604 30.4764 5.46138 30.4067 5.53115L29.7714 6.16641L28.7533 1.75327L33.1664 2.77146L32.5311 3.40674C32.4614 3.47647 32.406 3.55926 32.3682 3.65039C32.3305 3.74152 32.3111 3.8392 32.3111 3.93784C32.3111 4.03648 32.3305 4.13415 32.3682 4.22528C32.406 4.31641 32.4614 4.39921 32.5311 4.46894L35.1866 7.12446L34.1244 8.18666Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Post interaction</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "deletePost")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='39'
                      height='28'
                      viewBox='0 0 39 28'
                      fill='none'
                    >
                      <path
                        d='M21 27H4.63636C2.63636 27 1 25.3636 1 23.3636V10.6364C1 8.63636 2.63636 7 4.63636 7H21C23 7 24.6364 8.63636 24.6364 10.6364V23.3636C24.6364 25.3636 23 27 21 27Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M10.9995 12.4551H5.54492V17.9096H10.9995V12.4551Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M14.6367 17.9092H20.0913'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.54492 21.5459H20.0904'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M30.7656 4.07149C31.0249 4.33075 31.2893 4.58482 31.5408 4.85186C31.6736 4.9929 31.7695 4.98201 31.9012 4.84719C32.3751 4.3629 32.8563 3.88483 33.339 3.40935C33.8436 2.91002 34.5513 2.89083 35.0304 3.36061C35.535 3.85579 35.5391 4.58171 35.0325 5.09867C34.57 5.56949 34.1064 6.03926 33.6325 6.49867C33.463 6.662 33.4464 6.76985 33.6253 6.94044C34.1028 7.39622 34.5643 7.86807 35.0247 8.33369C35.5158 8.82473 35.5282 9.56309 35.0698 10.0329C34.9582 10.1488 34.8244 10.2412 34.6764 10.3045C34.5284 10.3678 34.3692 10.4007 34.2082 10.4014C34.0472 10.402 33.8878 10.3703 33.7393 10.3082C33.5908 10.246 33.4563 10.1547 33.3437 10.0396C32.8646 9.57502 32.3928 9.10317 31.9282 8.62406C31.7685 8.45917 31.6637 8.46332 31.5051 8.62717C31.0332 9.11354 30.5556 9.59524 30.0672 10.065C29.8611 10.2689 29.5879 10.391 29.2985 10.4086C29.0092 10.4263 28.7232 10.3383 28.4938 10.161C28.2644 9.9837 28.1072 9.72915 28.0514 9.44466C27.9955 9.16017 28.0448 8.86508 28.1902 8.61421C28.2573 8.50489 28.3395 8.40556 28.4344 8.31917C28.8876 7.86599 29.334 7.40503 29.7976 6.96222C29.9765 6.79163 29.9941 6.67963 29.8059 6.4997C29.3226 6.0403 28.8534 5.56482 28.3903 5.08415C28.2001 4.89551 28.0783 4.64871 28.0444 4.38295C28.0104 4.11719 28.0663 3.84771 28.203 3.61732C28.3397 3.38692 28.5495 3.20882 28.7991 3.11129C29.0486 3.01377 29.3236 3.00242 29.5803 3.07905C29.7573 3.12913 29.918 3.22479 30.0465 3.35646C30.2855 3.5955 30.5245 3.83453 30.7636 4.07357L30.7656 4.07149Z'
                        fill='#01162B'
                      />
                    </svg>
                    <p>Delete post</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "viewNoti")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='22'
                      viewBox='0 0 18 22'
                      fill='none'
                    >
                      <path
                        d='M8.99796 1.96387C5.70769 1.96387 3.03375 4.63781 3.03375 7.92805V10.8008C3.03375 11.4071 2.7753 12.3316 2.46715 12.8485L1.32402 14.7471C0.61826 15.92 1.10533 17.2222 2.39757 17.6596C6.68184 19.091 11.3041 19.091 15.5884 17.6596C16.7912 17.262 17.318 15.8405 16.6619 14.7471L15.5188 12.8485C15.2206 12.3316 14.9621 11.4071 14.9621 10.8008V7.92805C14.9621 4.64775 12.2783 1.96387 8.99796 1.96387Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                      />
                      <path
                        d='M10.8361 2.25248C10.528 2.16302 10.2099 2.09343 9.88185 2.05367C8.92758 1.93439 8.01307 2.00397 7.1582 2.25248C7.44647 1.5169 8.16217 1 8.99716 1C9.83214 1 10.5478 1.5169 10.8361 2.25248Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M11.9798 18.0176C11.9798 19.6577 10.6378 20.9997 8.9977 20.9997C8.18259 20.9997 7.42713 20.6617 6.89037 20.1249C6.3536 19.5881 6.01562 18.8327 6.01562 18.0176'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                      />
                    </svg>
                    <p>View notifications</p>
                  </div>
                  <div
                    className='card'
                    onDragStart={(event) => onDragStart(event, "sendMsg")}
                    draggable
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                    >
                      <path
                        d='M18.0711 3.92895C14.1658 0.0236849 7.83419 0.0236849 3.92893 3.92895C0.548669 7.30921 0.0942105 12.5074 2.56583 16.3765L1.97988 19.3862C1.90664 19.7624 2.23758 20.0934 2.6138 20.0201L5.62352 19.4342C9.49256 21.9058 14.6908 21.4513 18.0711 18.0711C21.9763 14.1658 21.9763 7.83421 18.0711 3.92895Z'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M15.7782 9.28027L12.5294 12.5292L9.56727 9.56703L6.31836 12.8158'
                        stroke='#01162B'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p>Send message</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='right-content'>
            <div className='right-content__edit'>
              <div className='edit-input'>
                <input type='text' placeholder='Enter name' />
              </div>
              <div className='note-input'>
                <img src={newNote} alt='new Note' />
                <input type='text' placeholder='New note' />
              </div>
              <button className='debug'>
                <img src={debug} alt='Debug' />
              </button>
              <button className='test'>
                <img src={runTest} alt='Debug' />
              </button>
              <button className='more'>
                <img src={option} alt='More' />
              </button>
              <button className='saveBtn'>
                <img src={save} alt='Save' />
                SAVE
              </button>
            </div>
            <div className='right-content__container'>
              <DnDFlow onMessageChange={handleMessageChange}></DnDFlow>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateScript;
