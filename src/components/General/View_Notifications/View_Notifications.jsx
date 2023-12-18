// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';

import { useRangeValues } from './View_Notifications';
const View_Notifications = ({ onGoBackClick }) => {
  const initialValues = {
    NotificationStart: 5,
    NotificationEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const notificationValues = useRangeValues(initialValues, 'Notification');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

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
                  <img src={iconIncrease} alt="Increase icon" onClick={notificationValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={notificationValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={notificationValues.NotificationStart}
                  onChange={(event) => notificationValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={notificationValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={notificationValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={notificationValues.NotificationEnd}
                  onChange={(event) => notificationValues.handleInputChangeEnd(event)}
                />
              </div>
            </div>
            <div className="component-item delayTime">
              <p className="component-item__header">
                Waiting time <span style={{ marginLeft: '2px' }}>(s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrement} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrement} />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={delayTimeValues.DelayTimeStart}
                  onChange={(event) => delayTimeValues.handleInputChangeStart(event)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrementEnd} />
                  <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrementEnd} />
                </div>
                <input
                  type="text"
                  name="End"
                  value={delayTimeValues.DelayTimeEnd}
                  onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                />
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
