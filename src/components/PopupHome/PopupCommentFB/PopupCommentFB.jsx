import React, { useEffect, useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Dialog from '@mui/material/Dialog';

const PopupCommentFB = ({ type, handleSave, open, handleClose, data, createPost }) => {
  const [values, setValues] = useState(data);
  const [contentText, setContentText] = useState('');
  useEffect(() => {
    if (data) {
      switch (type) {
        case 'newsfeed':
          if (data.commentStrs && data.commentStrs.length && data.typeComment === 'moreLine') {
            setContentText(data.commentStrs.join('|'));
          }
          break;
        case 'addFriend':
          if (data.comment && data.comment.length && data.typeComment === 'moreLine') {
            setContentText(data.comment.join('|'));
          }
          break;
        case 'likeComment':
          if (data.textComment && data.textComment.length && data.typeComment === 'moreLine') {
            setContentText(data.textComment.join('|'));
          }
          break;
        case 'joinGroup':
          if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
            setContentText(data.answer.join('|'));
          }
          if (data.answer1 && data.answer1.length && data.typeAnswer === 'moreLine') {
            setContentText(data.answer.join('|'));
          }
          break;
        default:
          if (data.text && data.text.length && data.typeComment === 'moreLine') {
            setContentText(data.text.join('|'));
          }
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
    } else if (type === 'addFriend') {
      if (contentText.length) {
        setValues({ ...values, comment: contentText.split('|') });
      } else {
        setValues({ ...values, comment: [] });
      }
    } else if (type === 'likeComment') {
      if (contentText.length) {
        setValues({ ...values, textComment: contentText.split('|') });
      } else {
        setValues({ ...values, textComment: [] });
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

  const makeCopys = {
    background: '#fff',
    position: 'fixed',
    maxWidth: '100% !important',
    width: '758px',
    height: '498px',
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

  const overlays = {
    background: 'rgba(255,255,255,0.9)',
  };
  const MuiDialogPapers = {
    width: '758px',
    height: '498px',
    maxHeight: '498px !important',
    minWidth: '758px !important',
    color: '#01162b !important',
  };
  const MuiDialogContainerProxys = {
    display: 'block',
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': makeCopys,
        '& .MuiBackdrop-root': overlays,
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': MuiDialogPapers,
        '& .MuiDialog-container': MuiDialogContainerProxys,
      }}
    >
      <div className="comment-popup">
        <div className="-add-proxys">
          <div className="-close-popup" onClick={handleClose}>
            <img src={closePopup} alt="icon-x"></img>
          </div>
          <h1>{createPost ? 'Content List' : 'Comment List'}</h1>
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
                    {createPost
                      ? 'Enter content here, each content is separated by “|”'
                      : 'Enter comment here, each comment is separated by “|”'}
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
