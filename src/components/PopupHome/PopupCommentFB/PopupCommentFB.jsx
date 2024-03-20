import React, { useEffect, useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Dialog from '@mui/material/Dialog';

const PopupCommentFB = ({ type, handleSave, open, handleClose, data }) => {
  const [values, setValues] = useState(data);
  const [contentText, setContentText] = useState('');
  useEffect(() => {
    if (data) {
      if (data.text && data.text.length && data.typeComment === 'moreLine') {
        setContentText(data.text.join('|'));
      }
      if (data.commentStrs && data.commentStrs.length && data.typeComment === 'moreLine') {
        setContentText(data.commentStrs.join('|'));
      }
      setTimeout(() => {
        setValues(data);
      }, 20);
    }
  }, [data]);

  useEffect(() => {
    if (type === 'newsfeed') {
      if (contentText.length) {
        setValues({ ...values, commentStrs: contentText.split('|') });
      } else {
        setValues({ ...values, commentStrs: [] });
      }
    } else {
      if (contentText.length) {
        setValues({ ...values, text: contentText.split('|') });
      } else {
        setValues({ ...values, text: [] });
      }
    }
  }, [contentText]);

  const hightlightWithLineNumbersMore = (input, language, content) =>
    highlight(input, language)
      .split('|')
      .map(
        (line, i) =>
          `<span class='editorLineNumber ${content ? '' : 'hide'}'>${content && i === 0 ? '' : '<br />'}${
            i + 1
          }</span>${line}`,
      )
      .join('|');

  const handleWriteBioMore = () => {
    document.getElementById('contentBio1').focus();
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
  const handleClick = async () => {
    setTimeout(() => {
      handleSave({ ...values });
    }, 20);
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
      <div className="comment-popup">
        <div className="-add-proxys">
          <div className="-close-popup" onClick={handleClose}>
            <img src={closePopup} alt="icon-x"></img>
          </div>
          <h1>Comment List</h1>
          <div className="-add-proxys__type">
            <div className="-add-proxys-nav -list-proxys">
              <>
                <div className="keywordText">
                  <Editor
                    value={contentText}
                    onValueChange={(text) => {
                      setContentText(text);
                    }}
                    highlight={(text) => hightlightWithLineNumbersMore(text, languages.js, contentText)}
                    padding={15}
                    className="editor"
                    textareaId="contentBio1"
                  />
                </div>
                <div
                  className="placeholder placeholderMore"
                  onClick={handleWriteBioMore}
                  style={{ display: contentText ? 'none' : 'inline' }}
                >
                  <p>
                    <span>*</span>
                    Enter comment here, each comment is separated by “|”
                  </p>
                  <p>For examples:</p>
                  <p>
                    <span>1</span>
                    I love my family. <br />
                    Jace, Micheal and July. <br />|
                  </p>
                  <p>
                    <span>2</span>
                    Life is a maze. <br />
                    And love is a riddle. <br />|
                  </p>
                  <p>
                    <span>3</span>
                    So cut the headlights, summer's a knife
                    <br />
                    I'm always waiting for you just to cut to the bone
                  </p>
                </div>
              </>
            </div>
            <div onClick={handleClick} className="-list-proxys__save">
              Save
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PopupCommentFB;
