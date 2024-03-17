// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import { MenuItem, Select } from '@mui/material';

const Name = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['name']);
  const [textContent, setTextContent] = useState('');
  const [firstNameContent, setFirstNameContent] = useState('');
  const [midleNameContent, setMidleNameContent] = useState('');
  const [surNameContent, setSurNameContent] = useState('');

  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.nameList && currentSetup.nameList.length) {
        setTextContent(currentSetup.nameList.join('\n'));
      }
      if (currentSetup.firstName && currentSetup.firstName.length) {
        setFirstNameContent(currentSetup.firstName.join('\n'));
      }
      if (currentSetup.midleName && currentSetup.midleName.length) {
        setMidleNameContent(currentSetup.midleName.join('\n'));
      }
      if (currentSetup.surName && currentSetup.surName.length) {
        setSurNameContent(currentSetup.surName.join('\n'));
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
      setValues({ ...values, nameList: textContent.split('\n') });
    } else {
      setValues({ ...values, nameList: [] });
    }
  }, [textContent]);

  useEffect(() => {
    if (firstNameContent.length) {
      setValues({ ...values, firstName: firstNameContent.split('\n') });
    } else {
      setValues({ ...values, firstName: [] });
    }
  }, [firstNameContent]);

  useEffect(() => {
    if (midleNameContent.length) {
      setValues({ ...values, midleName: midleNameContent.split('\n') });
    } else {
      setValues({ ...values, midleName: [] });
    }
  }, [midleNameContent]);

  useEffect(() => {
    if (surNameContent.length) {
      setValues({ ...values, surName: surNameContent.split('\n') });
    } else {
      setValues({ ...values, surName: [] });
    }
  }, [surNameContent]);

  const changeOption = (value) => {
    setValues({ ...values, changeName: value });
  };

  const handleDivListNameClick = () => {
    document.getElementById('listName').focus();
  };

  const handleDivFirstNameClick = () => {
    document.getElementById('firstName').focus();
  };

  const handleDivMidleNameClick = () => {
    document.getElementById('midleName').focus();
  };

  const handleDivSurNameClick = () => {
    document.getElementById('surName').focus();
  };

  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');

  return (
    <div className="Name">
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
              <p>Name</p>
            </div>
            <div className="PostUIDList">
              <div className="selectComment__header">
                <p>Select {'"Change name"'} type</p>
              </div>
              <Select
                name="postOption"
                className="component-item PostType"
                onChange={(event) => changeOption(event.target.value)}
                value={values.changeName}
              >
                <MenuItem value="randomly">Randomly</MenuItem>
                <MenuItem value="fullName">List (Full name)</MenuItem>
                <MenuItem value="unFullName">List (First name, middle name, surname)</MenuItem>
              </Select>
            </div>
            {values.changeName === 'fullName' && (
              <div className="PostUIDList">
                <p className="selectComment__header">
                  Name list
                  <span>({values.nameList.length})</span>
                </p>
                <div className="component-item" style={{ position: 'relative' }}>
                  <div className=" text" style={{ width: '100%', height: 318, overflow: 'auto' }}>
                    <Editor
                      value={textContent}
                      onValueChange={(text) => {
                        setTextContent(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
                      padding={15}
                      className="editor"
                      textareaId="listName"
                      style={{
                        background: '#f5f5f5',
                        fontSize: 15,
                      }}
                    />
                  </div>
                  <div onClick={handleDivListNameClick} className={`placeholderFull ${textContent ? 'hide' : ''}`}>
                    <p>
                      <span>1</span>Each name/line
                    </p>
                  </div>
                </div>
              </div>
            )}
            {values.changeName === 'unFullName' && (
              <div className="PostUIDList">
                <p className="selectComment__header">
                  First name
                  <span>({values.firstName.length})</span>
                </p>
                <div className="component-item" style={{ position: 'relative' }}>
                  <div className=" text" style={{ width: '100%', height: 112, overflow: 'auto' }}>
                    <Editor
                      value={firstNameContent}
                      onValueChange={(text) => {
                        setFirstNameContent(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, firstNameContent)}
                      padding={15}
                      className="editor"
                      textareaId="firstName"
                      style={{
                        background: '#f5f5f5',
                        fontSize: 15,
                      }}
                    />
                  </div>
                  <div onClick={handleDivFirstNameClick} className={`placeholder ${firstNameContent ? 'hide' : ''}`}>
                    <p>
                      <span>1</span>Each name/line
                    </p>
                  </div>
                </div>
              </div>
            )}
            {values.changeName === 'unFullName' && (
              <div className="PostUIDList">
                <p className="selectComment__header">
                  Middle name
                  <span>({values.midleName.length})</span>
                </p>
                <div className="component-item" style={{ position: 'relative' }}>
                  <div className=" text" style={{ width: '100%', height: 112, overflow: 'auto' }}>
                    <Editor
                      value={midleNameContent}
                      onValueChange={(text) => {
                        setMidleNameContent(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, midleNameContent)}
                      padding={15}
                      className="editor"
                      textareaId="midleName"
                      style={{
                        background: '#f5f5f5',
                        fontSize: 15,
                      }}
                    />
                  </div>
                  <div onClick={handleDivMidleNameClick} className={`placeholder ${midleNameContent ? 'hide' : ''}`}>
                    <p>
                      <span>1</span>Each name/line
                    </p>
                  </div>
                </div>
              </div>
            )}
            {values.changeName === 'unFullName' && (
              <div className="PostUIDList">
                <p className="selectComment__header">
                  Surname
                  <span>({values.surName.length})</span>
                </p>
                <div className="component-item" style={{ position: 'relative' }}>
                  <div className=" text" style={{ width: '100%', height: 112, overflow: 'auto' }}>
                    <Editor
                      value={surNameContent}
                      onValueChange={(text) => {
                        setSurNameContent(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, surNameContent)}
                      padding={15}
                      className="editor"
                      textareaId="surName"
                      style={{
                        background: '#f5f5f5',
                        fontSize: 15,
                      }}
                    />
                  </div>
                  <div onClick={handleDivSurNameClick} className={`placeholder ${surNameContent ? 'hide' : ''}`}>
                    <p>
                      <span>1</span>Each name/line
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

export default Name;
