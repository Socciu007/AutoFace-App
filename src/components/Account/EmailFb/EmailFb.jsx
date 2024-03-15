// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import { MenuItem, Select } from '@mui/material';
import { parseToNumber } from '../../../services/utils';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { Input } from 'antd';

const EmailFb = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['email']);
  const [textContent, setTextContent] = useState('');
  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.emailList && currentSetup.emailList.length) {
        setTextContent(currentSetup.emailList.join('\n'));
      }
      setTimeout(() => {
        setValues(currentSetup);
      }, 50);
    }
  }, [currentSetup]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  useEffect(() => {
    if (textContent.length) {
      setValues({ ...values, emailList: textContent.split('\n'), line: textContent.split('\n').length });
    } else {
      setValues({ ...values, emailList: [], line: 0 });
    }
  }, [textContent]);

  const changeEmail = (value, type) => {
    if (type === 'add') {
      setValues({ ...values, isAdd: value, isDelete: false, isHide: false });
    }
    if (type === 'delete') {
      setValues({ ...values, isDelete: value, isAdd: false, isHide: false });
    }
    if (type === 'hide') {
      setValues({ ...values, isHide: value, isAdd: false, isDelete: false });
    }
  };

  const changeTypeLogin = (url) => {
    setValues({ ...values, urlAddMail: url });
  };

  const changeUrl = (url) => {
    setValues({ ...values, urlDeleteMail: url });
  };

  const changeTypeMail = (type) => {
    setValues({ ...values, typeEmail: type });
  };

  const changeWaitTimeOTP = (value) => {
    setValues({ ...values, waitTimeOTP: parseToNumber(value) });
  };

  const changeNewPass = (pass) => {
    setValues({ ...values, newPassword: pass });
  };

  useEffect(() => {
    if (currentSetup) {
      setValues(currentSetup);
    }
  }, [currentSetup]);
  const handleDivEmailClick = () => {
    document.getElementById('Email').focus();
  };
  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');

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
              <p>Email</p>
            </div>
            <div className="component-item Like">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomLike"
                  checked={values.isAdd}
                  onChange={(event) => changeEmail(event.target.checked, 'add')}
                />
                <span>Add email</span>
              </div>
            </div>

            <div className="component-item Like">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomLike"
                  checked={values.isDelete}
                  onChange={(event) => changeEmail(event.target.checked, 'delete')}
                />
                <span>Delete email</span>
              </div>
            </div>

            <div className="component-item Like">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomLike"
                  checked={values.isHide}
                  onChange={(event) => changeEmail(event.target.checked, 'hide')}
                />
                <span>Hide email</span>
              </div>
            </div>

            {values.isAdd && (
              <div className="component-item Notification Logintype">
                <div className="component-item__header">
                  <p>Select URL</p>
                </div>
                <div className="NotificationContent">
                  <div className="component-item loginOption">
                    <Select
                      value={values.urlAddMail}
                      onChange={(event) => changeTypeLogin(event.target.value)}
                      className="LoginType"
                    >
                      <MenuItem value="https://mbasic.facebook.com">mbasic.facebook.com</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {values.isDelete && (
              <div className="component-item Notification Logintype">
                <div className="component-item__header">
                  <p>Select URL</p>
                </div>
                <div className="NotificationContent">
                  <div className="component-item loginOption">
                    <Select
                      value={values.urlDeleteMail}
                      onChange={(event) => changeUrl(event.target.value)}
                      className="LoginType"
                    >
                      <MenuItem value="https://mbasic.facebook.com">mbasic.facebook.com</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            {(values.isDelete || values.isAdd) && values.typeLogin === 'https://facebook.com/hacked' && (
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
                      bordered={false}
                      placeholder="Enter new password here"
                      className="editor"
                    ></Input>
                  </div>
                </div>
              </div>
            )}

            {values.isAdd && (
              <div className="Email">
                <div className="component-item EmailType">
                  <div className="component-item__header">
                    <p>Select email type</p>
                  </div>
                  <div className="EmailContent">
                    <div className="component-item loginOption">
                      <Select
                        value={values.typeEmail}
                        onChange={(event) => changeTypeMail(event.target.value)}
                        className="LoginType"
                      >
                        <MenuItem value="hotmail">Hotmail</MenuItem>
                        {/* <MenuItem value="mail.tm">mail.tm</MenuItem> */}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="component-item EmailType">
                  <div className="component-item__header">
                    <p>
                      Waiting for OTP <span style={{ marginLeft: '2px' }}>(s):</span>
                    </p>
                  </div>

                  <div className="component-item__content EmailOTP">
                    <div className="component-item__number numberOTP">
                      <div className="component-item__number__icon">
                        <img
                          src={iconIncrease}
                          alt="Increase icon"
                          onClick={() => {
                            changeWaitTimeOTP(values.waitTimeOTP + 1);
                          }}
                        />
                        <img
                          src={iconDecrease}
                          alt="Decrease icon"
                          onClick={() => {
                            changeWaitTimeOTP(values.waitTimeOTP - 1);
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        name="Start"
                        value={values.waitTimeOTP}
                        onChange={(event) => changeWaitTimeOTP(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {values.isAdd && (
              <div className="component-item" style={{ display: 'block', marginTop: '-1%' }}>
                <div className="component-item__header" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <p>
                    Email list <span style={{ marginLeft: '2px' }}>(Email|Password)</span>
                  </p>
                  <span>({values.line})</span>
                </div>
                <div style={{ position: 'relative' }} className="component-item">
                  <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                    <Editor
                      value={textContent}
                      onValueChange={(text) => setTextContent(text)}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
                      padding={15}
                      className="editor"
                      textareaId="Email"
                      style={{
                        background: '#f5f5f5',
                        fontSize: 15,
                      }}
                    />
                  </div>
                  <div onClick={handleDivEmailClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
                    <p>
                      <span>1</span>Each email/line
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFb;
