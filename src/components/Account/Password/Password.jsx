// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import { Input } from 'antd';
const Password = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['password']);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const changeTypeLogin = (type) => {
    setValues({ ...values, typeLogin: type });
  };
  const changeNewPass = (pass) => {
    setValues({ ...values, newPassword: pass });
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
              <p>Change password</p>
            </div>
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>Select URL</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item loginOption">
                  <Select
                    value={values.url}
                    onChange={(event) => changeTypeLogin(event.target.value)}
                    className="LoginType"
                  >
                    <MenuItem value="https://mbasic.facebook.com">mbasic.facebook.com</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>New password</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item loginOption">
                  <Input
                    onChange={(event) => {
                      changeNewPass(event.target.value);
                    }}
                    value={values.newPassword}
                    placeholder="Enter new password here"
                    className="editor"
                  ></Input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
