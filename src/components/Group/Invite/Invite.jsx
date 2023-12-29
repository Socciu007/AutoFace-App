// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InviteOption, UIDTextarea, useRangeValues } from './Invite';
const Invite = ({ onGoBackClick }) => {
  const initialValues = {
    Group_FriendsStart: 5,
    Group_FriendsEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const group_FriendsValues = useRangeValues(initialValues, 'Group_Friends');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const { selectedValueInvite, handleSelectChangeInvite } = InviteOption();

  const {
    UIDContent,
    handleTextareaChangeUIDContent,
    handleTextareaPaste,
    lineCount,
    handleDivClick,
    hightlightWithLineNumbers,
    setUIDContent,
  } = UIDTextarea();

  return (
    <div className="invite">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleInvite">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Invite</p>
            </div>
            <div className="component-content__invite">
              <div className="component-item numberOfGroup_Friends">
                <p className="component-item__header">Number of friends/group:</p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={group_FriendsValues.handleIncrement} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={group_FriendsValues.handleDecrement} />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={group_FriendsValues.Group_FriendsStart}
                    onChange={(event) => group_FriendsValues.handleInputChangeStart(event)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={group_FriendsValues.handleIncrementEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={group_FriendsValues.handleDecrementEnd} />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={group_FriendsValues.Group_FriendsEnd}
                    onChange={(event) => group_FriendsValues.handleInputChangeEnd(event)}
                  />
                </div>
              </div>
              <div className="component-item delayTime">
                <p className="component-item__header">
                  Delay time<span style={{ marginLeft: '2px' }}>(s):</span>
                </p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={delayTimeValues.handleIncrement} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={delayTimeValues.handleDecrement} />
                  </div>
                  <input
                    name="Start"
                    type="text"
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
                    name="End"
                    type="text"
                    value={delayTimeValues.DelayTimeEnd}
                    onChange={(event) => delayTimeValues.handleInputChangeEnd(event)}
                  />
                </div>
              </div>
              <div className="component-item__header">
                <p>Select Invite type</p>
              </div>
              <div className="InviteContent">
                <div className="component-item InviteOption">
                  <Select
                    name="InviteOption"
                    className="InviteType"
                    onChange={handleSelectChangeInvite}
                    value={selectedValueInvite}
                  >
                    <MenuItem value="random">Random</MenuItem>
                    <MenuItem value="suggestions">By suggestions</MenuItem>
                  </Select>
                </div>
                {(selectedValueInvite === 'suggestions' || selectedValueInvite === 'random') && (
                  <div>
                    <div className="UIDContent">
                      <div className="UID_Header">
                        <p>Group UID list</p>
                        <span>({lineCount})</span>
                      </div>
                      <div className="component-item " style={{ position: 'relative' }}>
                        <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="UIDText">
                          <Editor
                            onChange={handleTextareaChangeUIDContent}
                            onPaste={handleTextareaPaste}
                            value={UIDContent}
                            onValueChange={(UIDContent) => setUIDContent(UIDContent)}
                            highlight={(UIDContent) => hightlightWithLineNumbers(UIDContent, languages.js)}
                            padding={15}
                            className="editor"
                            textareaId="codeArea"
                            style={{
                              background: '#f5f5f5',
                              fontSize: 15,
                            }}
                          />
                        </div>
                        <div onClick={handleDivClick} className={`placeholder ${UIDContent ? 'hide' : ''}`}>
                          <p>
                            <span>1</span>Enter the UID here
                          </p>
                          <p>
                            <span>2</span>Each UID/line
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
