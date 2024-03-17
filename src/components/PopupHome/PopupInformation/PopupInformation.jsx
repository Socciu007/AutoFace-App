import React, { useEffect, useState, useRef } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Store } from 'react-notifications-component';
// import { dbGetLocally, dbSetLocally } from '../../sender';
// import { storageScripts } from '../../common/const.config.js';
import notification from '../../../resources/notification.json';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';

const PopupInformation = ({ open, handleClose, data, id, currentSetup, updateDesignScript, component }) => {
  const [values, setValues] = useState(data);
  const [contentBio, setContentBio] = useState('');

  // useEffect(() => {
  //   setContentBio(values.bio);
  // }, [open]);
  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.bio && currentSetup.bio.length) {
        setContentBio(currentSetup.bio.join('\n'));
      }

      setTimeout(() => {
        setValues(currentSetup);
      }, 20);
    }
  }, [currentSetup, open]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  useEffect(() => {
    if (contentBio.length) {
      setValues({ ...values, bio: contentBio.split('\n') });
    } else {
      setValues({ ...values, bio: [] });
    }
  }, [contentBio]);

  const onChangeBioType = (e) => {
    setValues({ ...values, typeBio: e.target.value });
  };

  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
  const handleWriteText = () => {
    document.getElementById('contentBio').focus();
  };
  const makeCopy = {
    background: '#fff',
    position: 'fixed',
    maxWidth: '100% !important',
    width: '498px',
    height: '679px',
    top: '50%',
    left: '50%',
    transform: ' translate(-50%, -50%)',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    flexShrink: '0',
    zIndex: '99',
    margin: '0',
    overflow: 'inherit !important',
  };

  const changeSave = async () => {
    handleClose();
  };

  const overlay = {
    background: 'rgba(255,255,255,0.9)',
  };
  const MuiDialogPaper = {
    width: '758px',
    height: '498px',
    maxHeight: '498px !important',
    minWidth: '758px !important',
    color: '#01162b !important',
  };
  const MuiDialogContainerProxy = {
    display: 'block',
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': makeCopy,
        '& .MuiBackdrop-root': overlay,
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPaper,
        '& .MuiDialog-container': MuiDialogContainerProxy,
      }}
    >
      <div className="information-popup">
        <div className="-add-proxys">
          <div className="-close-popup" onClick={handleClose}>
            <img src={closePopup} alt="icon-x"></img>
          </div>
          <h1>Bio List</h1>
          <div className="-add-proxys__type" style={{ marginTop: '25px' }}>
            <div className="-add-proxys-nav">
              <Select
                name="typeBio"
                className="-add-proxys-nav__select -add-proxys-nav__details"
                onChange={onChangeBioType}
                value={values.typeBio}
              >
                <MenuItem value="line">Each content/line</MenuItem>
                <MenuItem value="moreLine">Content has more lines</MenuItem>
              </Select>
            </div>
          </div>
          <div className="-add-proxys__type">
            <div className="-add-proxys-nav -list-proxys">
              {values.typeBio === 'line' && (
                <>
                  <div className="keywordText">
                    <Editor
                      value={contentBio}
                      onValueChange={(text) => {
                        setContentBio(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentBio)}
                      padding={15}
                      className="editor"
                      textareaId="contentBio"
                    />
                  </div>
                  <div
                    className="placeholder"
                    onClick={handleWriteText}
                    style={{ display: contentBio ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter bio here, each bio/line.
                    </p>
                    <p>
                      <span>2</span>
                      If each bio has more lines, you should choose “Content has more lines”.
                    </p>
                  </div>
                </>
              )}
              {values.typeBio === 'moreLine' && (
                <>
                  <div className="keywordText">
                    <Editor
                      value={contentBio}
                      onValueChange={(text) => {
                        setContentBio(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentBio)}
                      padding={15}
                      className="editor"
                      textareaId="contentBio"
                    />
                  </div>
                  <div
                    className="placeholder"
                    onClick={handleWriteText}
                    style={{ display: contentBio ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter bio here, each bio/line.
                    </p>
                    <p>
                      <span>2</span>
                      If each bio has more lines, you should choose “Content has more lines”.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div onClick={() => changeSave()} className="-list-proxys__save">
              Save
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PopupInformation;
