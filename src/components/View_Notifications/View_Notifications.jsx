// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import saveIcon from '../../assets/img/Page-1.png';
import iconDecrease from '../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../assets/icon/icon-Increase.svg';
import backButton from '../../assets/icon/icon-back.svg';
import downButton from '../../assets/icon/icon-down.svg';
import Edit from '../../assets/icon/icon-edit.svg';
import Debug from '../../assets/icon/icon-debug.svg';
import RunTest from '../../assets/icon/icon-runTest.svg';
import iconOptions from '../../assets/icon/icon-options.svg';
const View_Notifications = () => {
  //Value Notification start
  const [inputValueNotificationStart, setInputValueNotificationStart] = useState(5);
  const handleIncrementNotificationStart = () => {
    setInputValueNotificationStart((prevValue) => prevValue + 1);
  };
  const handleDecrementNotificationStart = () => {
    setInputValueNotificationStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value Notification end
  const [inputValueNotificationEnd, setInputValueNotificationEnd] = useState(10);
  const handleIncrementNotificationEnd = () => {
    setInputValueNotificationEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementNotificationEnd = () => {
    setInputValueNotificationEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

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

  return (
    <div className="sendMessage">
      <h1 className="createNotification__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" />
              <p>View notifications</p>
            </div>
            <div className="component-item numberOfNotifications">
              <p className="component-item__header">Number of notifications</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNotificationStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNotificationStart} />
                </div>
                <input type="text" value={inputValueNotificationStart} onChange />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNotificationEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNotificationEnd} />
                </div>
                <input type="text" value={inputValueNotificationEnd} onChange />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Waiting time <span>(s):</span>
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
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>Notification options</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item notificationOption">
                  <select name="NotificationOption" className="NotificationType">
                    <option value="randomFriend">Randomly</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
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

export default View_Notifications;
