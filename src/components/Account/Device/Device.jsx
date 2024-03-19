import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import { Radio } from 'antd';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
const Device = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['device']);
  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const changeType = (e) => {
    setValues({ ...values, isDelete: e.target.value });
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
              <p>Trusted devices</p>
            </div>
            <div className="component-item Notification">
              <div className="component-item__header">
                <p>Select type</p>
              </div>
              <div className="NotificationContent">
                <div className="component-item loginOption">
                  <Radio.Group onChange={changeType} value={values.isDelete}>
                    <Radio value={true}>Logout all devices</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;
