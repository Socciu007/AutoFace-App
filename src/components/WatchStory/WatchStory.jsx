// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../assets/img/Page-1.png';
const WatchStory = () => {
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

  // Hien thi
  const [isLiked, setIsLiked] = useState(false);

  const handleCheckboxChange = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  //Hien thi comment
  const [isComment, setisComment] = useState(false);
  const handleCheckboxChangeComment = () => {
    setisComment((prevIsLiked) => !prevIsLiked);
  };

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
              <p>Watch Story</p>
            </div>
            <div className="component-item numberOfVideo">
              <p className="component-item__header">Number of stories:</p>
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
              <p className="component-item__header">Watching time/story (s):</p>
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
            <div className="component-item_like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" onChange={handleCheckboxChange} />
                <p>Randomly react:</p>
              </div>
              <div className={`component-item__content ${isLiked ? 'show' : 'hide'}`}>
                <div className="likeButton">
                  <input type="checkbox" name="likeButton" />
                  <span>Like</span>
                </div>
                <div className="loveButton">
                  <input type="checkbox" name="loveButton" />
                  <span>Love</span>
                </div>
                <div className="careButton">
                  <input type="checkbox" name="careButton" />
                  <span>Care</span>
                </div>
                <div className="wowButton">
                  <input type="checkbox" name="wowButton" />
                  <span>Wow</span>
                </div>
                <div className="hahaButton">
                  <input type="checkbox" name="hahaButton" />
                  <span>Haha</span>
                </div>
                <div className="sadButton">
                  <input type="checkbox" name="sadButton" />
                  <span>Sad</span>
                </div>
                <div className="angryButton">
                  <input type="checkbox" name="angryButton" />
                  <span>Angry</span>
                </div>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input type="checkbox" name="randomComment" onChange={handleCheckboxChangeComment} />
                <p>Randomly Comment</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#01162B" />
                  <path
                    d="M10.0119 5.97563C10.0119 6.29563 9.94792 6.58363 9.81992 6.83963C9.69192 7.08763 9.54392 7.27562 9.37592 7.40363C9.21592 7.52362 9.03192 7.66762 8.82392 7.83563C8.61592 7.99563 8.46392 8.13962 8.36792 8.26762C8.24792 8.45162 8.18792 8.65163 8.18792 8.86763C8.18792 9.09963 8.11592 9.29163 7.97192 9.44363C7.82792 9.60363 7.62792 9.68363 7.37192 9.68363C7.12392 9.68363 6.92392 9.60762 6.77192 9.45562C6.62792 9.29562 6.55592 9.09963 6.55592 8.86763C6.55592 8.57163 6.61992 8.29962 6.74792 8.05162C6.87592 7.80363 7.03192 7.59962 7.21592 7.43962C7.40792 7.27962 7.59592 7.12762 7.77992 6.98362C7.96392 6.83162 8.11992 6.66762 8.24792 6.49162C8.37592 6.31562 8.43992 6.12762 8.43992 5.92762C8.43992 5.63962 8.33192 5.39162 8.11592 5.18363C7.90792 4.96763 7.61992 4.85962 7.25192 4.85962C6.85192 4.85962 6.53992 4.99162 6.31592 5.25562C6.09992 5.51162 5.99592 5.82362 6.00392 6.19162C6.00392 6.43962 5.93592 6.64363 5.79992 6.80363C5.67192 6.96363 5.47992 7.04362 5.22392 7.04362C4.96792 7.04362 4.76792 6.96363 4.62392 6.80363C4.48792 6.64363 4.41992 6.43962 4.41992 6.19162C4.41992 5.37562 4.70392 4.72762 5.27192 4.24762C5.83992 3.75962 6.49992 3.51562 7.25192 3.51562C7.99592 3.51562 8.63992 3.73962 9.18392 4.18762C9.73592 4.63562 10.0119 5.23163 10.0119 5.97563ZM7.35992 12.0476C7.10392 12.0476 6.88792 11.9596 6.71192 11.7836C6.53592 11.6076 6.44792 11.3916 6.44792 11.1356C6.43192 10.8876 6.51992 10.6756 6.71192 10.4996C6.91192 10.3236 7.12792 10.2356 7.35992 10.2356C7.59192 10.2356 7.80392 10.3236 7.99592 10.4996C8.17192 10.6916 8.25992 10.9036 8.25992 11.1356C8.25992 11.3676 8.17192 11.5836 7.99592 11.7836C7.81992 11.9756 7.60792 12.0636 7.35992 12.0476Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={`commentContent Text ${isComment ? 'show' : 'hide'}`}>
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
                    <p>
                      <span>3</span>If the content has multiple paragraphs, each content needs to be separated by the
                      character /
                    </p>
                  </div>
                </div>
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
          <div className="componet-right__content">
            <div className="componet-right__content__footer__left"></div>
            <div className="componet-right__content__footer__right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchStory;
