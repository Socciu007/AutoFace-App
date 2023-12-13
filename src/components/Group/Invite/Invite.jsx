// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
import iconSave from '../../../assets/icon/icon-save.svg';

import { DelayTime, InviteOption, NumberGroup_Friends, UIDTextarea } from './Invite';
const Invite = () => {
  const {
    inputValueGroup_FriendsStart,
    handleIncrementGroup_FriendsStart,
    handleDecrementGroup_FriendsStart,
    inputValueGroup_FriendsEnd,
    handleIncrementGroup_FriendsEnd,
    handleDecrementGroup_FriendsEnd,
    handleInputChangeGroup_FriendsStart,
    handleInputChangeGroup_FriendsEnd,
  } = NumberGroup_Friends();

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

  const { selectedValueInvite, handleSelectChangeInvite } = InviteOption();

  const { UIDContent, handleTextareaChangeUIDContent } = UIDTextarea();

  return (
    <div className="invite">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleInvite">
              <img src={backButton} alt="Back button" />
              <p>Invite</p>
            </div>
            <div className="component-content__invite">
              <div className="component-item numberOfGroup_Friends">
                <p className="component-item__header">Number of friends/group:</p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroup_FriendsStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroup_FriendsStart} />
                  </div>
                  <input
                    type="text"
                    value={inputValueGroup_FriendsStart}
                    onChange={handleInputChangeGroup_FriendsStart}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroup_FriendsEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroup_FriendsEnd} />
                  </div>
                  <input type="text" value={inputValueGroup_FriendsEnd} onChange={handleInputChangeGroup_FriendsEnd} />
                </div>
              </div>
              <div className="component-item delayTime">
                <p className="component-item__header">
                  Delay time<span>(s):</span>
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
              <div className="component-item__header">
                <p>Select Invite type</p>
              </div>
              <div className="InviteContent">
                <div className="component-item InviteOption">
                  <select
                    name="InviteOption"
                    className="InviteType"
                    onChange={handleSelectChangeInvite}
                    value={selectedValueInvite}
                  >
                    <option value="random">Random</option>
                    <option value="suggestions">By suggestions</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValueInvite === 'suggestions' || selectedValueInvite === 'random') && (
                  <div>
                    <div className="UIDContent">
                      <div className="UID_Header">
                        <p>Group UID list</p>
                        <span>(0)</span>
                      </div>
                      <div className="component-item UIDText">
                        <textarea
                          id="UIDContent"
                          name="UIDContent"
                          rows="10"
                          value={UIDContent}
                          onChange={handleTextareaChangeUIDContent}
                        ></textarea>
                        <div className={`placeholder ${UIDContent ? 'hide' : ''}`}>
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
                <img src={iconSave} alt="SaveButton" />
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

export default Invite;
