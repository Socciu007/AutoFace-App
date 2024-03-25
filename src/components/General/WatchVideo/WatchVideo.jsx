// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import DragButton from '../../../assets/icon/icon-drag.svg';
import DeleteButton from '../../../assets/icon/icon-Delete.svg';
import iconQuestion from '../../../assets/icon/icon-question.svg';
import { Select } from 'antd';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useDropzone } from 'react-dropzone';
import { parseToNumber } from '../../../services/utils';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import PopupCommentFB from '../../PopupHome/PopupCommentFB/PopupCommentFB';

const WatchVideo = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [watchVideoData, setWatchVideoData] = useState(DefaultSciptSettings['watchVideo']);
  const [openComment, setOpenComment] = useState(false);
  const [textContent, setTextContent] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    noClick: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/bmp': ['.bmp'],
      'image/gif': ['.gif'],
      'image/tiff': ['.tif', '.tiff'],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        console.log(file);
        return file.path;
      });

      setWatchVideoData({ ...watchVideoData, photos: [...watchVideoData.photos, ...newFiles] });
    },
  });

  const handleDeleteButtonClick = () => {
    setWatchVideoData({ ...watchVideoData, photos: [] });
  };

  useEffect(() => {
    updateDesignScript(watchVideoData, component, id);
  }, [watchVideoData]);

  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.text && currentSetup.text.length && currentSetup.typeComment === 'line') {
        setTextContent(currentSetup.text.join('\n'));
      }
      setTimeout(() => {
        setWatchVideoData(currentSetup);
      }, 20);
    }
  }, [currentSetup]);

  useEffect(() => {
    if (textContent.length) {
      setWatchVideoData({ ...watchVideoData, text: textContent.split('\n') });
    }
  }, [textContent]);
  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');

  const handleDivClick = () => {
    document.getElementById('codeArea').focus();
  };

  const changeVideoStart = (video) => {
    setWatchVideoData({ ...watchVideoData, videoStart: parseToNumber(video) });
  };

  const changeVideoEnd = (video) => {
    setWatchVideoData({ ...watchVideoData, videoEnd: parseToNumber(video) });
  };

  const changeDelayTimeStart = (time) => {
    setWatchVideoData({ ...watchVideoData, delayTimeStart: parseToNumber(time) });
  };
  const changeDelayTimeEnd = (time) => {
    setWatchVideoData({ ...watchVideoData, delayTimeEnd: parseToNumber(time) });
  };

  const changeLikeStart = (like) => {
    setWatchVideoData({ ...watchVideoData, likeStart: parseToNumber(like) });
  };
  const changeLikeEnd = (like) => {
    setWatchVideoData({ ...watchVideoData, likeEnd: parseToNumber(like) });
  };

  const changeShareStart = (share) => {
    setWatchVideoData({ ...watchVideoData, shareStart: parseToNumber(share) });
  };
  const changeShareEnd = (share) => {
    setWatchVideoData({ ...watchVideoData, shareEnd: parseToNumber(share) });
  };

  const changeCommentStart = (comment) => {
    setWatchVideoData({ ...watchVideoData, commentStart: parseToNumber(comment) });
  };
  const changeCommentEnd = (comment) => {
    setWatchVideoData({ ...watchVideoData, commentEnd: parseToNumber(comment) });
  };

  const changeLike = (value) => {
    setWatchVideoData({ ...watchVideoData, isLiked: value });
  };

  const changeShare = (value) => {
    setWatchVideoData({ ...watchVideoData, isShare: value });
  };

  const changeComment = (value) => {
    setWatchVideoData({ ...watchVideoData, isComment: value });
  };

  const changeOption = (value) => {
    setWatchVideoData({ ...watchVideoData, option: value });
  };

  const handleOnchangeTypeComment = (value) => {
    setWatchVideoData({ ...watchVideoData, typeComment: value, text: [] });
  };

  const handleSave = (watchVideoData) => {
    setWatchVideoData(watchVideoData);
  };

  const handleClick = () => {
    setOpenComment(true);
  };

  const handleClose = () => {
    setOpenComment(false);
  };

  return (
    <div className="watch-video">
      <div className="component_container">
        <div className="scrollable-container">
          <div className="component-left">
            <div className="goBack">
              <img
                src={backButton}
                alt="Back button"
                onClick={() => {
                  onGoBackClick(watchVideoData, component, id);
                }}
              />
              <p>Watch video</p>
            </div>
            <div className="component-item numberOfVideo">
              <p className="component-item__header">Number of videos:</p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img
                    src={iconIncrease}
                    alt="Increase icon"
                    onClick={() => {
                      changeVideoStart(watchVideoData.videoStart + 1);
                    }}
                  />
                  <img
                    src={iconDecrease}
                    alt="Decrease icon"
                    onClick={() => {
                      changeVideoStart(watchVideoData.videoStart - 1);
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="Start"
                  value={watchVideoData.videoStart}
                  onChange={(event) => changeVideoStart(event.target.value)}
                />
              </div>
              <span>to</span>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img
                    src={iconIncrease}
                    alt="Increase icon"
                    onClick={() => {
                      changeVideoEnd(watchVideoData.videoEnd + 1);
                    }}
                  />
                  <img
                    src={iconDecrease}
                    alt="Decrease icon"
                    onClick={() => {
                      changeVideoEnd(watchVideoData.videoEnd - 1);
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="End"
                  value={watchVideoData.videoEnd}
                  onChange={(event) => changeVideoEnd(event.target.value)}
                />
              </div>
            </div>
            <div className="component-item watchingTime">
              <p className="component-item__header">
                Watching time/video <span style={{ marginLeft: '2px' }}>(s):</span>
              </p>
              <div className="component-item__number">
                <div className="component-item__number__icon">
                  <img
                    src={iconIncrease}
                    alt="Increase icon"
                    onClick={() => {
                      changeDelayTimeStart(watchVideoData.delayTimeStart + 1);
                    }}
                  />
                  <img
                    src={iconDecrease}
                    alt="Decrease icon"
                    onClick={() => {
                      changeDelayTimeStart(watchVideoData.delayTimeStart - 1);
                    }}
                  />
                </div>
                <input
                  name="Start"
                  type="text"
                  value={watchVideoData.delayTimeStart}
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
                      changeDelayTimeEnd(watchVideoData.delayTimeEnd + 1);
                    }}
                  />
                  <img
                    src={iconDecrease}
                    alt="Decrease icon"
                    onClick={() => {
                      changeDelayTimeEnd(watchVideoData.delayTimeEnd - 1);
                    }}
                  />
                </div>
                <input
                  name="End"
                  type="text"
                  value={watchVideoData.delayTimeEnd}
                  onChange={(event) => changeDelayTimeEnd(event.target.value)}
                />
              </div>
            </div>
            <div className="component-item Like">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomLike"
                  checked={watchVideoData.isLiked}
                  onChange={(event) => {
                    changeLike(event.target.checked);
                  }}
                />
                <p>
                  Random Like{' '}
                  <span
                    style={{ marginLeft: '2px' }}
                    className={`span__content ${watchVideoData.isLiked ? 'show' : 'hide'}`}
                  >
                    (video)
                  </span>
                  :
                </p>
              </div>
              <div className={`component-item__content ${watchVideoData.isLiked ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => {
                        changeLikeStart(watchVideoData.likeStart + 1);
                      }}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => {
                        changeLikeStart(watchVideoData.likeStart - 1);
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={!watchVideoData.isLiked ? 0 : watchVideoData.likeStart}
                    onChange={(event) => changeLikeStart(event.target.value)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => {
                        changeLikeEnd(watchVideoData.likeEnd + 1);
                      }}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => {
                        changeLikeEnd(watchVideoData.likeEnd - 1);
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={!watchVideoData.isLiked ? 0 : watchVideoData.likeEnd}
                    onChange={(event) => changeLikeEnd(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="component-item share">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomShare"
                  checked={watchVideoData.isShare}
                  onChange={(event) => {
                    changeShare(event.target.checked);
                  }}
                />
                <p>
                  Share to Feed{' '}
                  <span
                    style={{ marginLeft: '2px' }}
                    className={`span__content ${watchVideoData.isShare ? 'show' : 'hide'}`}
                  >
                    (video)
                  </span>
                  :
                </p>
              </div>
              <div className={`component-item__content ${watchVideoData.isShare ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => changeShareStart(watchVideoData.shareStart + 1)}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => changeShareStart(watchVideoData.shareStart - 1)}
                    />
                  </div>
                  <input
                    type="text"
                    name="Start"
                    value={!watchVideoData.isShare ? 0 : watchVideoData.shareStart}
                    onChange={(event) => changeShareStart(event.target.value)}
                  />
                </div>
                <span>to</span>
                <div className="component-item__number">
                  <div className="component-item__number__icon">
                    <img
                      src={iconIncrease}
                      alt="Increase icon"
                      onClick={() => changeShareEnd(watchVideoData.shareEnd + 1)}
                    />
                    <img
                      src={iconDecrease}
                      alt="Decrease icon"
                      onClick={() => changeShareEnd(watchVideoData.shareEnd - 1)}
                    />
                  </div>
                  <input
                    type="text"
                    name="End"
                    value={!watchVideoData.isShare ? 0 : watchVideoData.shareEnd}
                    onChange={(event) => changeShareEnd(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="component-item comment">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="randomComment"
                  checked={watchVideoData.isComment}
                  onChange={(event) => {
                    changeComment(event.target.checked);
                  }}
                />
                <p>Randomly Comment</p>
              </div>
              <div className={`commentContent ${watchVideoData.isComment ? 'show' : 'hide'}`}>
                <div className="component-item comment__numberOfVideo">
                  <p className="component-item__header">Number of videos:</p>
                  <div className="component-item__content">
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img
                          src={iconIncrease}
                          alt="Increase icon"
                          onClick={() => {
                            changeCommentStart(watchVideoData.commentStart + 1);
                          }}
                        />
                        <img
                          src={iconDecrease}
                          alt="Decrease icon"
                          onClick={() => {
                            changeCommentStart(watchVideoData.commentStart - 1);
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        name="Start"
                        value={!watchVideoData.isComment ? 0 : watchVideoData.commentStart}
                        onChange={(event) => changeCommentStart(event.target.value)}
                      />
                    </div>
                    <span>to</span>
                    <div className="component-item__number">
                      <div className="component-item__number__icon">
                        <img
                          src={iconIncrease}
                          alt="Increase icon"
                          onClick={() => {
                            changeCommentEnd(watchVideoData.commentEnd + 1);
                          }}
                        />
                        <img
                          src={iconDecrease}
                          alt="Decrease icon"
                          onClick={() => {
                            changeCommentEnd(watchVideoData.commentEnd - 1);
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        name="End"
                        value={!watchVideoData.isComment ? 0 : watchVideoData.commentEnd}
                        onChange={(event) => changeCommentEnd(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <p className="selectComment__header">Select Comment type</p>
                <div className="component-item optionComment">
                  <Select
                    name="optionComment"
                    id="typeProfile"
                    className="commentType"
                    value={watchVideoData.option}
                    onChange={changeOption}
                    bordered={false}
                    options={[
                      {
                        value: 'text',
                        label: 'Text',
                      },
                      {
                        value: 'photoOrVideo',
                        label: 'Photo/video',
                      },
                      {
                        value: 'all',
                        label: 'Text & Photo/video',
                      },
                    ]}
                  />
                </div>
                {(watchVideoData.option === 'text' || watchVideoData.option === 'all') && (
                  <div className="component-item optionComment">
                    <Select
                      id="typeProfile"
                      className="commentType"
                      value={watchVideoData.typeComment}
                      onChange={handleOnchangeTypeComment}
                      bordered={false}
                      options={[
                        {
                          value: 'line',
                          label: 'The comment is only 1 line',
                        },
                        {
                          value: 'moreLine',
                          label: 'Comment has multiple lines',
                        },
                      ]}
                    />
                  </div>
                )}
                {(watchVideoData.option === 'text' || watchVideoData.option === 'all') &&
                  watchVideoData.typeComment === 'line' && (
                    <div className="Text">
                      {/* <p className="selectComment__header">Text</p>s */}
                      <div className="component-item" style={{ position: 'relative' }}>
                        <div style={{ width: '100%', height: 204, overflow: 'auto' }} className="text">
                          <Editor
                            value={textContent}
                            onValueChange={(text) => {
                              setTextContent(text);
                            }}
                            highlight={(text) => hightlightWithLineNumbers(text, languages.js, textContent)}
                            padding={15}
                            className="editor"
                            textareaId="codeArea"
                            style={{
                              background: '#f5f5f5',
                              fontSize: 15,
                            }}
                          />
                        </div>
                        <div onClick={handleDivClick} className={`placeholder ${textContent ? 'hide' : ''}`}>
                          <p>
                            <span style={{ marginRight: '14px' }}>1</span>Enter the content here
                          </p>
                          <p>
                            <span>2</span>Each content/line
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                {(watchVideoData.option === 'text' || watchVideoData.option === 'all') &&
                  watchVideoData.typeComment === 'moreLine' && (
                    <div className="moreLine">
                      <div className="moreLineComment">
                        <button onClick={handleClick}>Add +</button>
                      </div>
                      <span>({watchVideoData.text.length})</span>
                    </div>
                  )}
                {watchVideoData.isComment && watchVideoData.typeComment === 'moreLine' && (
                  <PopupCommentFB
                    open={openComment}
                    data={watchVideoData}
                    handleClose={handleClose}
                    handleSave={handleSave}
                  />
                )}
                {(watchVideoData.option === 'photoOrVideo' || watchVideoData.option === 'all') && (
                  <div className="photoOrVideo">
                    <p className="component-item__header">Photo/video</p>
                    {watchVideoData.photos.length === 0 ? (
                      <div {...getRootProps({ className: 'component-item dragVideoOrPhoto' })}>
                        <input {...getInputProps()} />
                        <img className="mx-auto h-40" src={DragButton} alt="addfile" />
                        <p>Drag the photo/video folder here</p>
                      </div>
                    ) : (
                      <div className={`folderPhoto`}>
                        <div className="URLImg">
                          <span style={{ opacity: '0.5' }}>Folder:</span>
                          <div style={{ width: '100%' }}>
                            {watchVideoData.photos.map((fileName, index) => (
                              <span key={index}>{fileName}</span>
                            ))}
                          </div>
                        </div>
                        <img src={DeleteButton} alt="Delete Button" onClick={handleDeleteButtonClick} />
                      </div>
                    )}
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

export default WatchVideo;
