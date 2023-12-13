// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import { DelayTime, Notification } from './View_Notifications';
const View_Notifications = ({ onGoBackClick }) => {
  const {
    inputValueNotificationStart,
    handleIncrementNotificationStart,
    handleDecrementNotificationStart,
    inputValueNotificationEnd,
    handleIncrementNotificationEnd,
    handleDecrementNotificationEnd,
    handleInputChangeNotificationStart,
    handleInputChangeNotificationEnd,
  } = Notification();

  const {
    inputValueDelayTimeStart,
    handleIncrementDelayTimeStart,
    handleDecrementDelayTimeStart,
    inputValueDelayTimeEnd,
    handleIncrementDelayTimeEnd,
    handleDecrementDelayTimeEnd,
    handleInputChangeDelayTimeStart,
    handleInputChangeDelayTimeEnd,
  } = DelayTime();

  return (
    <div className="View_Notifications">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>View notifications</p>
            </div>
            <div className="component-item numberOfNotifications">
              <p className="component-item__header">Number of notifications</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNotificationStart} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNotificationStart} />
                </div>
                <input type="text" value={inputValueNotificationStart} onChange={handleInputChangeNotificationStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNotificationEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNotificationEnd} />
                </div>
                <input type="text" value={inputValueNotificationEnd} onChange={handleInputChangeNotificationEnd} />
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
                <input type="text" value={inputValueDelayTimeStart} onChange={handleInputChangeDelayTimeStart} />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementDelayTimeEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementDelayTimeEnd} />
                </div>
                <input type="text" value={inputValueDelayTimeEnd} onChange={handleInputChangeDelayTimeEnd} />
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
      </div>
    </div>
  );
};

export default View_Notifications;
