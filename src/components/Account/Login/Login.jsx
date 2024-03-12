// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { parseToNumber } from '../../../services/utils';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
const Login = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['login']);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const changeTypeLogin = (type) => {
    setValues({ ...values, typeLogin: type });
  };
  const changeDelayTimeStart = (time) => {
    setValues({ ...values, delayTimeStart: parseToNumber(time) });
  };
  const changeDelayTimeEnd = (time) => {
    setValues({ ...values, delayTimeEnd: parseToNumber(time) });
  };
  useEffect(() => {
    if (currentSetup) {
      setValues(currentSetup);
    }
  }, [currentSetup]);
  return (
    <div className="View_Login">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img
                src={backButton}
                alt="Back button"
                onClick={() => {
                  onGoBackClick(values, component, id);
                }}
              />
              <p>Login</p>
            </div>
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>Select login type</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item loginOption">
                  <Select
                    value={values.typeLogin}
                    onChange={(event) => changeTypeLogin(event.target.value)}
                    className="LoginType"
                  >
                    <MenuItem value="cookies">Cookies</MenuItem>
                    <MenuItem value="uid">UID</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="component-item delayTime">
                <p className="component-item__header">
                  Delay time <span style={{ marginLeft: '2px' }}>(s):</span>
                </p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => {
                        changeDelayTimeStart(values.delayTimeStart + 1);
                      }}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => {
                        changeDelayTimeStart(values.delayTimeStart - 1);
                      }}
                    />
                  </div>
                  <input
                    name="Start"
                    type="text"
                    value={values.delayTimeStart}
                    onChange={(event) => changeDelayTimeStart(event.target.value)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => {
                        changeDelayTimeEnd(values.delayTimeEnd + 1);
                      }}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => {
                        changeDelayTimeEnd(values.delayTimeEnd - 1);
                      }}
                    />
                  </div>
                  <input
                    name="End"
                    type="text"
                    value={values.delayTimeEnd}
                    onChange={(event) => changeDelayTimeEnd(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
