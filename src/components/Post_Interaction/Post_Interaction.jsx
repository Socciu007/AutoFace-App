// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../assets/img/Page-1.png';
import iconDecrease from '../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../assets/icon/icon-Increase.svg';
import backButton from '../../assets/icon/icon-back.svg';
import Edit from '../../assets/icon/icon-edit.svg';
import Debug from '../../assets/icon/icon-debug.svg';
import RunTest from '../../assets/icon/icon-runTest.svg';
import iconOptions from '../../assets/icon/icon-options.svg';

const Post_Interaction = () => {
  //ViewTime start
  const [inputValueViewTimeStart, setInputValueViewTimeStart] = useState(10);
  const handleIncrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementViewTimeStart = () => {
    setInputValueViewTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //ViewTime end
  const [inputValueViewTimeEnd, setInputValueViewTimeEnd] = useState(30);
  const handleIncrementViewTimeEnd = () => {
    setInputValueViewTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementViewTimeEnd = () => {
    setInputValueViewTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //DelayTime start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //DelayTime end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Number of posts/user start
  const [inputValueNumberPostOrUserStart, setInputValueNumberPostOrUserStart] = useState(1);
  const handleIncrementNumberPostOrUserStart = () => {
    setInputValueNumberPostOrUserStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostOrUserStart = () => {
    setInputValueNumberPostOrUserStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Number of posts/user end
  const [inputValueNumberPostOrUserEnd, setInputValueNumberPostOrUserEnd] = useState(3);
  const handleIncrementNumberPostOrUserEnd = () => {
    setInputValueNumberPostOrUserEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberPostOrUserEnd = () => {
    setInputValueNumberPostOrUserEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //cai dat cho phan text comment
  const [textContent, setTextContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextContent(event.target.value);
  };
  return (
    <div className="Post_Interaction">
      <h1 className="watch-video__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>Post interaction</p>
            </div>
            <div className="PostUIDList">
              <p className="selectComment__header">
                Post UID list
                <span>(0)</span>
              </p>
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

            <div className="component-item viewTime">
              <p className="component-item__header">
                View time<span> (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementViewTimeStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementViewTimeStart} />
                </div>
                <input type="text" value={inputValueViewTimeStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementViewTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementViewTimeEnd} />
                </div>
                <input type="text" value={inputValueViewTimeEnd} onChange />
              </div>
            </div>

            <div className="component-item delayTime">
              <p className="component-item__header">
                Delay time<span> (s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeStart} />
                </div>
                <input type="text" value={inputValueDelayTimeStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                </div>
                <input type="text" value={inputValueDelayTimeEnd} onChange />
              </div>
            </div>

            <div className="component-item numberPostOrUser">
              <p className="component-item__header">Number of posts/user:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostOrUserStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostOrUserStart} />
                </div>
                <input type="text" value={inputValueNumberPostOrUserStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberPostOrUserEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberPostOrUserEnd} />
                </div>
                <input type="text" value={inputValueNumberPostOrUserEnd} onChange />
              </div>
            </div>

            <div className="component-item Like">
              <div className="component-item__header">
                <input type="checkbox" name="randomLike" />
                <p>Random Like</p>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input type="checkbox" name="randomShare" />
                <p>Share to Feed</p>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input type="checkbox" name="randomComment" />
                <p>Randomly Comment</p>
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

              <img src={Edit} alt="Edit button" />
            </div>
            <div className="componet-right__header__function">
              <img src={Debug} alt="Debug button" />
              <img src={RunTest} alt="Run test button" />
              <img src={iconOptions} alt="icon option" />
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

export default Post_Interaction;
