import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import { MenuItem, Select } from '@mui/material';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
const TwoFA = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['twoFA']);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const changeType = (e) => {
    setValues({ ...values, turnOn: e == 'true' ? true : false });
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
              <p>2FA</p>
            </div>
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>Select setting 2FA type</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item loginOption">
                  <Select
                    value={values.turnOn.toString()}
                    onChange={(event) => changeType(event.target.value)}
                    className="LoginType"
                  >
                    <MenuItem value="false">Off 2FA</MenuItem>
                    <MenuItem value="true">On 2FA</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFA;
