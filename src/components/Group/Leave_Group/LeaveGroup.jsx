// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import saveIcon from '../../../assets/img/Page-1.png';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Edit from '../../../assets/icon/icon-edit.svg';
import Debug from '../../../assets/icon/icon-debug.svg';
import RunTest from '../../../assets/icon/icon-runTest.svg';
import iconOptions from '../../../assets/icon/icon-options.svg';
const LeaveGroup = () => {
  //Value number of Groups start
  const [inputValueGroupsStart, setInputValueGroupsStart] = useState(5);
  const handleIncrementGroupsStart = () => {
    setInputValueGroupsStart((prevValue) => prevValue + 1);
  };
  const handleDecrementGroupsStart = () => {
    setInputValueGroupsStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Value number of Groups end
  const [inputValueGroupsEnd, setInputValueGroupsEnd] = useState(10);
  const handleIncrementGroupsEnd = () => {
    setInputValueGroupsEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementGroupsEnd = () => {
    setInputValueGroupsEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Delay time start
  const [inputValueDelayTimeStart, setInputValueDelayTimeStart] = useState(3);
  const handleIncrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeStart = () => {
    setInputValueDelayTimeStart((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  //Delay time end
  const [inputValueDelayTimeEnd, setInputValueDelayTimeEnd] = useState(5);
  const handleIncrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => prevValue + 1);
  };
  const handleDecrementDelayTimeEnd = () => {
    setInputValueDelayTimeEnd((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Number of members less than:
  const [inputValueNumberOfMember, setInputValueNumberOfMember] = useState(10);
  const handleIncrementNumberOfMember = () => {
    setInputValueNumberOfMember((prevValue) => prevValue + 1);
  };
  const handleDecrementNumberOfMember = () => {
    setInputValueNumberOfMember((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  //Hien thi select leave group option
  const [selectedValueLeaveGroup, setSelectedValueLeaveGroup] = useState('');

  const handleSelectChangeLeaveGroup = (event) => {
    setSelectedValueLeaveGroup(event.target.value);
  };
  useEffect(() => {
    setSelectedValueLeaveGroup('Random');
  }, []);

  //cai dat cho phan Keyword Text (khi go chu thi placeholder cua textarea se an di)
  const [KeywordContent, setKeywordContent] = useState('');

  const handleTextareaChangeKeywordContent = (event) => {
    setKeywordContent(event.target.value);
  };

  return (
    <div className="leaveGroup">
      <h1 className="createPost__title">Facebook Automation</h1>
      <div className="goBack">
        <img src={backButton} alt="Back button" />
        <p>Create a new script</p>
      </div>
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleLeaveGroup">
              <img src={backButton} alt="Back button" />
              <p>Leave group</p>
            </div>
            <div className="component-content__leaveGroup">
              <div className="component-item numberOfGroups">
                <p className="component-item__header">Number of groups:</p>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroupsStart} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroupsStart} />
                  </div>
                  <input type="text" value={inputValueGroupsStart} onChange />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementGroupsEnd} />
                    <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementGroupsEnd} />
                  </div>
                  <input type="text" value={inputValueGroupsEnd} onChange />
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
              <div className="LeaveGroup_Selection">
                <p className="component-item__header">Select Leave group type</p>
                <div className="component-item LeaveGroupOption">
                  <select
                    name="LeaveGroupOption"
                    className="LeaveGroupType"
                    onChange={handleSelectChangeLeaveGroup}
                    value={selectedValueLeaveGroup}
                  >
                    <option value="Random">Random</option>
                    <option value="Approve">Group needs Admin to approve posts</option>
                    <option value="Conditional">Conditional</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {selectedValueLeaveGroup === 'Conditional' && (
                  <div className="conditional">
                    <div className="component-item delayTime">
                      <p>Number of members less than:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={handleIncrementNumberOfMember} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={handleDecrementNumberOfMember} />
                        </div>
                        <input type="text" value={inputValueNumberOfMember} onChange style={{ background: '#FFF' }} />
                      </div>
                    </div>
                    <div className="KeywordContent">
                      <p>The group name contains the following keywords:</p>
                      <div className="component-item keywordText">
                        <textarea
                          id="KeywordContent"
                          name="KeywordContent"
                          rows="10"
                          value={KeywordContent}
                          onChange={handleTextareaChangeKeywordContent}
                        ></textarea>
                        <div className={`placeholder ${KeywordContent ? 'hide' : ''}`}>
                          <p>
                            <span>1 </span>
                            <p>Enter the keyword here</p>
                          </p>
                          <p>
                            <span>2</span>
                            <p>Each keyword/line</p>
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

export default LeaveGroup;
