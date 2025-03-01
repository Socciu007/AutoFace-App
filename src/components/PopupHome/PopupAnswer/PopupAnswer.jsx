import React, { useEffect, useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Dialog from '@mui/material/Dialog';

const PopupAnswer = ({ type, handleSave, open, handleClose, data }) => {
  const [values, setValues] = useState(data);
  const [contentText, setContentText] = useState('');
  useEffect(() => {
    if (data) {
      if (type === 'Question 1') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[0].join('|'));
        }
      }

      if (type === 'Question 2') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[1].join('|'));
        }
      }

      if (type === 'Question 3') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[2].join('|'));
        }
      }

      if (type === 'Question 4') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[3].join('|'));
        }
      }

      if (type === 'Question 5') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[4].join('|'));
        }
      }
      if (type === 'Question 6') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[5].join('|'));
        }
      }
      if (type === 'Question 7') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[6].join('|'));
        }
      }

      if (type === 'Question 8') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[7].join('|'));
        }
      }

      if (type === 'Question 9') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[8].join('|'));
        }
      }

      if (type === 'Question 10') {
        if (data.answer && data.answer.length && data.typeAnswer === 'moreLine') {
          setContentText(data.answer[10].join('|'));
        }
      }
      console.log('content', contentText);

      setTimeout(() => {
        setValues(data);
      }, 20);
    }
  }, [data]);

  useEffect(() => {
    let updatesAnswer = [...values.answer];

    if (type === 'Question 1') {
      if (contentText.length) {
        updatesAnswer[0] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[0] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 2') {
      if (contentText.length) {
        updatesAnswer[1] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[1] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 3') {
      if (contentText.length) {
        updatesAnswer[2] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[2] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 4') {
      if (contentText.length) {
        updatesAnswer[3] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[3] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 5') {
      if (contentText.length) {
        updatesAnswer[4] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[4] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 6') {
      if (contentText.length) {
        updatesAnswer[4] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[5] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 7') {
      if (contentText.length) {
        updatesAnswer[6] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[6] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 8') {
      if (contentText.length) {
        updatesAnswer[7] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[7] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }

    if (type === 'Question 9') {
      if (contentText.length) {
        updatesAnswer[8] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[8] = [];
        setValues({ ...values, answer: updatesAnswer });
      }
    }
    if (type === 'Question 10') {
      if (contentText.length) {
        updatesAnswer[9] = contentText.split('|');
        setValues({ ...values, answer: updatesAnswer });
      } else {
        updatesAnswer[9] = [];
        setValues({ ...values, answer: updatesAnswer });
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
          <h1>{type}</h1>
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
                    Enter question here, each question is separated by “|”
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

export default PopupAnswer;
