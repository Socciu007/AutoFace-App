// eslint-disable-next-line no-unused-vars
import React from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import downButton from '../../../assets/icon/icon-down.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { AnswerTextarea, CancelFriendOption, KeywordTextarea, ShowAutoAnswer, useRangeValues } from './JoinGroup.js';
const JoinGroup = ({ onGoBackClick }) => {
  const initialValues = {
    NumberGroupStart: 5,
    NumberGroupEnd: 10,
    DelayTimeStart: 5,
    DelayTimeEnd: 10,
  };

  const numberGroupValues = useRangeValues(initialValues, 'NumberGroup');
  const delayTimeValues = useRangeValues(initialValues, 'DelayTime');

  const { selectedValueJoinGroup, handleSelectChangeJoinGroup } = CancelFriendOption();

  const {
    KeywordContent,
    handleTextareaChangeKeywordContent,
    handleKeywordTextareaPaste,
    lineCount,
    handleDivKeywordClick,
    hightlightWithLineNumbersKeyword,
    setKeywordContent,
  } = KeywordTextarea();

  const { AnswerContent, handleTextareaChangeAnswerContent, handleDivAnswerClick, hightlightWithLineNumbers } =
    AnswerTextarea();

  const { isAutoAnswer, handleCheckboxChangeAutoAnswer } = ShowAutoAnswer();
  return (
    <div className="joinGroup">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleJoinGroup">
              <img src={backButton} alt="Back button" onClick={() => onGoBackClick(true)} />
              <p>Join group</p>
            </div>
            <div className="component-item__joinGroup">
              <div className="component-item__header">
                <p>Select Join group type</p>
              </div>
              <div className="JoinGroupContent">
                <div className="component-item JoinGroupOption">
                  <select
                    name="JoinGroupOption"
                    className="JoinGroupType"
                    onChange={handleSelectChangeJoinGroup}
                    value={selectedValueJoinGroup}
                  >
                    <option value="suggestions">By suggestions</option>
                    <option value="keywords">By keywords</option>
                    <option value="UID">By UID</option>
                  </select>
                  <img src={downButton} alt="Down Button" />
                </div>
                {(selectedValueJoinGroup === 'suggestions' ||
                  selectedValueJoinGroup === 'keywords' ||
                  selectedValueJoinGroup === 'UID') && (
                  <div>
                    <div className="component-item numberOfGroups">
                      <p className="component-item__header">Number of groups:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={numberGroupValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={numberGroupValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          name="Start"
                          value={numberGroupValues.NumberGroupStart}
                          onChange={(event) => numberGroupValues.handleInputChangeStart(event)}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={numberGroupValues.handleIncrementEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={numberGroupValues.handleDecrementEnd} />
                        </div>
                        <input
                          type="text"
                          name="End"
                          value={numberGroupValues.NumberGroupEnd}
                          onChange={(event) => numberGroupValues.handleInputChangeEnd(event)}
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
                    {(selectedValueJoinGroup === 'keywords' || selectedValueJoinGroup === 'UID') && (
                      <div className="KeywordContent">
                        <div className="Keyword_Header">
                          {selectedValueJoinGroup === 'keywords' && <p>Keyword list</p>}
                          {selectedValueJoinGroup === 'UID' && <p>UID list</p>}
                          <span>({lineCount})</span>
                        </div>
                        <div className="component-item " style={{ position: 'relative' }}>
                          <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="keywordText">
                            <Editor
                              onChange={handleTextareaChangeKeywordContent}
                              onPaste={handleKeywordTextareaPaste}
                              value={KeywordContent}
                              onValueChange={(KeywordContent) => setKeywordContent(KeywordContent)}
                              highlight={(KeywordContent) =>
                                hightlightWithLineNumbersKeyword(KeywordContent, languages.js)
                              }
                              padding={15}
                              className="editor"
                              textareaId="keyword"
                              style={{
                                background: '#f5f5f5',
                                fontSize: 15,
                              }}
                            />
                          </div>

                          <div
                            onClick={handleDivKeywordClick}
                            className={`placeholder ${KeywordContent ? 'hide' : ''}`}
                          >
                            <p>
                              <span>1</span>Enter the keyword here
                            </p>
                            <p>
                              <span>2</span>Each keyword/line
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="AutoAnswerContent">
                      <div className="AutoAnswer_Header">
                        <input type="checkbox" name="autoAnswer" onChange={handleCheckboxChangeAutoAnswer} />
                        <p>Automatically answer the questions</p>
                      </div>
                      <div className={`component-item  ${isAutoAnswer ? 'show' : 'hide'}`}>
                        <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="AutoAnswerText">
                          <Editor
                            value={AnswerContent}
                            onValueChange={handleTextareaChangeAnswerContent}
                            highlight={(AnswerContent) => hightlightWithLineNumbers(AnswerContent, languages.js)}
                            padding={15}
                            className="editor"
                            textareaId="answer"
                            style={{
                              background: '#f5f5f5',
                              fontSize: 15,
                            }}
                          />
                        </div>
                        <div onClick={handleDivAnswerClick} className={`placeholder ${AnswerContent ? 'hide' : ''}`}>
                          <p>
                            <span>1</span>Enter the answer here
                          </p>
                          <p>
                            <span>2</span>Each answer/line
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

export default JoinGroup;
