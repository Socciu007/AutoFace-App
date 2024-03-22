// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import iconQuestion from '../../../assets/icon/icon-question.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { parseToNumber } from '../../../services/utils.js';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import { Select } from 'antd';
import PopupAnswer from '../../PopupHome/PopupAnswer/PopupAnswer.jsx';
import { Store } from 'react-notifications-component';
import notification from '../../../resources/notification.json';
const JoinGroup = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['joinGroup']);
  const [answerContent, setAnswerContent] = useState([]);
  const [textContent, setTextContent] = useState('');
  const [openAnswer, setOpenAnswer] = useState(null);

  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.text && currentSetup.text.length) {
        setTextContent(currentSetup.text.join('\n'));
      }
      if (currentSetup.answer && currentSetup.typeAnswer === 'line') {
        const newAnswerContent = [];
        for (let i = 0; i < currentSetup.answer.length; i++) {
          if (currentSetup.answer.length) {
            const answerText = currentSetup.answer[i].join('\n');
            newAnswerContent.push(answerText);
          }
        }
        setAnswerContent(newAnswerContent);
      }
      setTimeout(() => {
        setValues(currentSetup);
      }, 20);
    }
  }, [currentSetup]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  useEffect(() => {
    if (textContent.length) {
      setValues({ ...values, text: textContent.split('\n') });
    } else {
      setValues({ ...values, text: [] });
    }
  }, [textContent]);

  useEffect(() => {
    const updatedAnswerContent = answerContent.map((value) => value.split('\n'));
    setValues({ ...values, answer: updatedAnswerContent });
  }, [answerContent]);

  const changeOption = (value) => {
    setValues({ ...values, option: value });
  };

  const changeDelayTimeStart = (time) => {
    setValues({ ...values, delayTimeStart: parseToNumber(time) });
  };
  const changeDelayTimeEnd = (time) => {
    setValues({ ...values, delayTimeEnd: parseToNumber(time) });
  };

  const changeGroupStart = (group) => {
    setValues({ ...values, groupStart: parseToNumber(group) });
  };
  const changeGroupEnd = (group) => {
    setValues({ ...values, groupEnd: parseToNumber(group) });
  };

  const changeOneSelect = (value, i) => {
    const updatedOneSelect = [...values.selectArr];
    updatedOneSelect[i].select = parseToNumber(value);
    setValues({ ...values, selectArr: updatedOneSelect });
  };

  const changeMoreSelect = (value, i) => {
    const updatedMoreSelect = [...values.selectArr];
    updatedMoreSelect[i].moreSelect = value.split(',');
    setValues({ ...values, selectArr: updatedMoreSelect });
  };

  const handleAddSelect = () => {
    const newSelect = [...values.selectArr];
    newSelect.push({ select: 1, moreSelect: [1, 3] });
    setValues({ ...values, selectArr: newSelect });
  };

  const handleAddQuestion = () => {
    const newAnswer = [...answerContent];
    if (newAnswer.length < 9) {
      newAnswer.push('');
      setAnswerContent(newAnswer);
    } else {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: 'Maximum number of questions!',
      });
    }
  };

  const handleAddQuestions = () => {
    const newAnswer = [...values.answer];
    if (newAnswer.length < 9) {
      newAnswer.push([]);
      setValues({ ...values, answer: newAnswer });
    } else {
      Store.addNotification({
        ...notification,
        type: 'warning',
        message: 'Maximum number of questions!',
      });
    }
  };

  const handleDivKeywordClick = () => {
    document.getElementById('keyword').focus();
  };

  const handleDivAnswerClick = (index) => {
    const id = 'answer' + index;
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const changeAnswer = (value) => {
    setValues({ ...values, isAutoAnswer: value });
  };

  const changeSelect = (value) => {
    setValues({ ...values, isAutoSelect: value });
  };

  const handleOnchangeTypeAnswer = (value) => {
    setValues({ ...values, typeAnswer: value });
  };

  const handleCloseComment = () => {
    setOpenAnswer(null);
  };

  const handleClick = (index) => {
    setOpenAnswer(index);
  };

  const handleSave = (values) => {
    setValues(values);
  };

  const onValueChange = (text, index) => {
    const answers = text;
    const newAnswerContent = [...answerContent];
    newAnswerContent[index] = answers;
    setAnswerContent(newAnswerContent);
  };

  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');

  return (
    <div className="joinGroup">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack titleJoinGroup">
              <img
                src={backButton}
                alt="Back button"
                onClick={() => {
                  onGoBackClick(values, component, id);
                }}
              />
              <p>Join group</p>
            </div>
            <div className="component-item__joinGroup">
              <div className="component-item__header">
                <p>Select Join group type</p>
              </div>
              <div className="JoinGroupContent">
                <div className="component-item JoinGroupOption">
                  <Select
                    id="JoinGroupOption"
                    className="JoinGroupType"
                    value={values.option}
                    onChange={changeOption}
                    bordered={false}
                    options={[
                      {
                        value: 'suggestions',
                        label: 'By suggestions',
                      },
                      {
                        value: 'keywords',
                        label: 'By keywords',
                      },
                      {
                        value: 'UID',
                        label: 'By UID',
                      },
                    ]}
                  />
                </div>
                {(values.option === 'suggestions' || values.option === 'keywords' || values.option === 'UID') && (
                  <div>
                    <div className="component-item numberOfGroups">
                      <p className="component-item__header">Number of groups:</p>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img
                            src={iconIncrease}
                            alt="Increase icon"
                            onClick={() => {
                              changeGroupStart(values.groupStart + 1);
                            }}
                          />
                          <img
                            src={iconDecrease}
                            alt="Decrease icon"
                            onClick={() => {
                              changeGroupStart(values.groupStart - 1);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          name="Start"
                          value={values.groupStart}
                          onChange={(event) => changeGroupStart(event.target.value)}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img
                            src={iconIncrease}
                            alt="Increase icon"
                            onClick={() => {
                              changeGroupEnd(values.groupEnd + 1);
                            }}
                          />
                          <img
                            src={iconDecrease}
                            alt="Decrease icon"
                            onClick={() => {
                              changeGroupEnd(values.groupEnd - 1);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          name="End"
                          value={values.groupEnd}
                          onChange={(event) => changeGroupEnd(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="component-item delayTime">
                      <p className="component-item__header">
                        Delay time<span style={{ marginLeft: '2px' }}>(s):</span>
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
                    {(values.option === 'keywords' || values.option === 'UID') && (
                      <div className="KeywordContent">
                        <div className="Keyword_Header">
                          {values.option === 'keywords' && <p>Keyword list</p>}
                          {values.option === 'UID' && <p>UID list</p>}
                          <span>({values.text.length})</span>
                        </div>
                        <div className="component-item " style={{ position: 'relative' }}>
                          <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="keywordMore">
                            <Editor
                              value={textContent}
                              onValueChange={(text) => {
                                setTextContent(text);
                              }}
                              highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
                              padding={15}
                              className="editor"
                              textareaId="keyword"
                              style={{
                                background: '#f5f5f5',
                                fontSize: 15,
                              }}
                            />
                          </div>

                          <div onClick={handleDivKeywordClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
                            <p>
                              <span style={{ marginRight: '14px' }}>1</span>Enter the keyword here
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
                        <input
                          type="checkbox"
                          name="autoAnswer"
                          checked={values.isAutoAnswer}
                          onChange={(event) => changeAnswer(event.target.checked)}
                        />
                        <p>Automatically answer the questions</p>
                      </div>
                      {values.isAutoAnswer && (
                        <div className="PostContent">
                          <Select
                            id="typeProfile"
                            className="PostContent__select PostContent__details"
                            value={values.typeAnswer}
                            onChange={handleOnchangeTypeAnswer}
                            bordered={false}
                            options={[
                              {
                                value: 'line',
                                label: 'The answer is only 1 line',
                              },
                              {
                                value: 'moreLine',
                                label: 'Answer has multiple lines',
                              },
                            ]}
                          />
                        </div>
                      )}
                      {values.typeAnswer === 'moreLine' &&
                        values.answer.map((value, index) => (
                          <>
                            <div className="moreLine" key={index}>
                              <p style={{ width: '50%' }}>Question {index + 1}:</p>
                              <div className="moreLineComment" style={{ width: '80%', marginRight: '6px' }}>
                                <button onClick={() => handleClick(index)}>Add +</button>
                              </div>
                              <span>({value.length})</span>
                            </div>
                            <PopupAnswer
                              type={`Question ${index + 1}`}
                              open={openAnswer === index}
                              handleClose={handleCloseComment}
                              data={values}
                              handleSave={handleSave}
                            />
                          </>
                        ))}
                      {values.isAutoAnswer &&
                        values.typeAnswer === 'line' &&
                        answerContent.map((value, index) => {
                          return (
                            <div style={{ position: 'relative' }} className={`component-item  answerLine`} key={index}>
                              <div className="AutoAnswer_Header">
                                <p>Questions {index + 1}:</p>
                              </div>

                              <div style={{ width: '100%', height: 93, overflow: 'auto' }} className="AutoAnswerText">
                                <Editor
                                  value={value ? value : ''}
                                  onValueChange={(text) => onValueChange(text, index)}
                                  highlight={(text) => hightlightWithLineNumbers(text, languages.js, value)}
                                  padding={15}
                                  className="editor"
                                  textareaId={`answer${index}`}
                                  style={{
                                    background: '#f5f5f5',
                                    fontSize: 15,
                                  }}
                                />
                              </div>
                              <div
                                onClick={() => handleDivAnswerClick(index)}
                                className={`placeholder ${value ? 'hide' : ''}`}
                              >
                                <p>
                                  <span style={{ marginRight: '14px' }}>1</span>Enter the answer here
                                </p>
                                <p>
                                  <span>2</span>Each answer/line
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      {values.isAutoAnswer && values.typeAnswer === 'line' && (
                        <div className="moreLine">
                          <div className="moreLineComment" style={{ width: '100%' }}>
                            <button onClick={handleAddQuestion}>Add question +</button>
                          </div>
                        </div>
                      )}
                      {values.isAutoAnswer && values.typeAnswer === 'moreLine' && (
                        <div className="moreLine" style={{ gap: '20px' }}>
                          <div className="moreLineComment">
                            <button onClick={handleAddQuestions}>Add question +</button>
                          </div>
                          <span>({values.answer.length})</span>
                        </div>
                      )}
                    </div>
                    {/* <div className="AutoAnswerContent">
                      <div className="AutoAnswer_Header">
                        <input
                          type="checkbox"
                          name="autoAnswer"
                          checked={values.isAutoSelect}
                          onChange={(event) => changeSelect(event.target.checked)}
                        />
                        <p>
                          Automatically select the answer
                          <img style={{ marginLeft: '10px' }} src={iconQuestion} alt="icon Question" />
                        </p>
                      </div>
                      {values.isAutoSelect &&
                        values.selectArr.map((value, index) => {
                          return (
                            <div className="component-item numberOfGroups" key={index}>
                              <p className="component-item__header">Question {index + 1}:</p>
                              <div style={{ display: 'flex', gap: '48px' }}>
                                <div className="component-item__number">
                                  <div className="component-item__number__icon">
                                    <img
                                      src={iconIncrease}
                                      alt="Increase icon"
                                      onClick={() => {
                                        changeOneSelect(value.select + 1, index);
                                      }}
                                    />
                                    <img
                                      src={iconDecrease}
                                      alt="Decrease icon"
                                      onClick={() => {
                                        changeOneSelect(value.select - 1, index);
                                      }}
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    name="Start"
                                    value={value.select}
                                    onChange={(event) => changeOneSelect(event.target.value, index)}
                                  />
                                </div>

                                <div className="component-item__number">
                                  <input
                                    type="text"
                                    style={{ padding: '15px' }}
                                    name="End"
                                    value={value.moreSelect}
                                    onChange={(event) => changeMoreSelect(event.target.value, index)}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                      {values.isAutoSelect && (
                        <div className="moreLine">
                          <div className="moreLineComment" style={{ width: '100%' }}>
                            <button onClick={handleAddSelect}>Add question +</button>
                          </div>
                        </div>
                      )}
                    </div> */}
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
