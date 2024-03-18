import React, { useEffect, useState } from 'react';
import closePopup from '../../../assets/pictures/icon-x.svg';
import './style.scss';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';

const PopupInformation = ({
  type,
  handleSave,
  open,
  handleClose,
  data,
  id,
  currentSetup,
  updateDesignScript,
  component,
}) => {
  const [values, setValues] = useState(data);
  const [contentBio, setContentBio] = useState('');
  const [contentWork, setContentWork] = useState('');
  const [contentHighSchool, setContentHighSchool] = useState('');
  const [contentColege, setContentColege] = useState('');
  const [contentCity, setContentCity] = useState('');
  const [contentHometown, setContentHometown] = useState('');
  const [contentNickName, setContentNickName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (currentSetup) {
      if (currentSetup.bio && currentSetup.bio.length) {
        setContentBio(currentSetup.bio.join('\n'));
      }
      if (currentSetup.work && currentSetup.work.length) {
        setContentWork(currentSetup.work.join('\n'));
      }
      if (currentSetup.highSchool && currentSetup.highSchool.length) {
        setContentHighSchool(currentSetup.highSchool.join('\n'));
      }
      if (currentSetup.colege && currentSetup.colege.length) {
        setContentColege(currentSetup.colege.join('\n'));
      }
      if (currentSetup.city && currentSetup.city.length) {
        setContentCity(currentSetup.city.join('\n'));
      }
      if (currentSetup.hometown && currentSetup.hometown.length) {
        setContentHometown(currentSetup.hometown.join('\n'));
      }
      if (currentSetup.nickname && currentSetup.nickname.length) {
        setContentNickName(currentSetup.nickname.join('\n'));
      }
      if (currentSetup.birthday.day && currentSetup.birthday.day.length) {
        setDay(currentSetup.birthday.day.join('\n'));
      }
      if (currentSetup.birthday.month && currentSetup.birthday.month.length) {
        setMonth(currentSetup.birthday.month.join('\n'));
      }
      if (currentSetup.birthday.year && currentSetup.birthday.year.length) {
        setYear(currentSetup.birthday.year.join('\n'));
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
    if (contentBio.length && values.typeBio === 'line') {
      setValues({ ...values, bio: contentBio.split('\n') });
    } else if (contentBio.length && values.typeBio === 'moreLine') {
      setValues({ ...values, bio: contentBio.split('|') });
    } else {
      setValues({ ...values, bio: [] });
    }
  }, [contentBio]);

  useEffect(() => {
    if (contentCity.length) {
      setValues({ ...values, city: contentCity.split('\n') });
    } else {
      setValues({ ...values, city: [] });
    }
  }, [contentCity]);

  useEffect(() => {
    if (contentColege.length) {
      setValues({ ...values, colege: contentColege.split('\n') });
    } else {
      setValues({ ...values, colege: [] });
    }
  }, [contentColege]);

  useEffect(() => {
    if (contentHighSchool.length) {
      setValues({ ...values, highSchool: contentHighSchool.split('\n') });
    } else {
      setValues({ ...values, highSchool: [] });
    }
  }, [contentHighSchool]);
  useEffect(() => {
    if (contentHometown.length) {
      setValues({ ...values, hometown: contentHometown.split('\n') });
    } else {
      setValues({ ...values, hometown: [] });
    }
  }, [contentHometown]);
  useEffect(() => {
    if (contentNickName.length) {
      setValues({ ...values, nickname: contentNickName.split('\n') });
    } else {
      setValues({ ...values, nickname: [] });
    }
  }, [contentNickName]);
  useEffect(() => {
    if (contentWork.length) {
      setValues({ ...values, work: contentWork.split('\n') });
    } else {
      setValues({ ...values, work: [] });
    }
  }, [contentWork]);

  useEffect(() => {
    if (day.length) {
      setValues({ ...values, birthday: { ...values.birthday, day: day.split('\n') } });
    } else {
      setValues({ ...values, birthday: { ...values.birthday, day: [] } });
    }
  }, [day]);

  useEffect(() => {
    if (month.length) {
      setValues({ ...values, birthday: { ...values.birthday, month: month.split('\n') } });
    } else {
      setValues({ ...values, birthday: { ...values.birthday, month: [] } });
    }
  }, [month]);

  useEffect(() => {
    if (month.length) {
      setValues({ ...values, birthday: { ...values.birthday, year: year.split('\n') } });
    } else {
      setValues({ ...values, birthday: { ...values.birthday, year: [] } });
    }
  }, [year]);

  const onChangeBioType = (e) => {
    setValues({ ...values, typeBio: e.target.value });
  };

  const hightlightWithLineNumbers = (input, language, content) =>
    highlight(input, language)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber ${content ? '' : 'hide'}'>${i + 1}</span>${line}`)
      .join('\n');
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

  const handleWriteBio = () => {
    document.getElementById('contentBio').focus();
  };
  const handleWriteBioMore = () => {
    document.getElementById('contentBio1').focus();
  };
  const handleWriteWork = () => {
    document.getElementById('contentWork').focus();
  };
  const handleWriteHome = () => {
    document.getElementById('contentHometown').focus();
  };
  const handleWriteHighSchool = () => {
    document.getElementById('contentHighSchool').focus();
  };
  const handleWriteNickName = () => {
    document.getElementById('contentNickName').focus();
  };
  const handleWriteColege = () => {
    document.getElementById('contentColege').focus();
  };
  const handleWriteCity = () => {
    document.getElementById('contentCity').focus();
  };
  const handleWriteDay = () => {
    document.getElementById('day').focus();
  };
  const handleWriteMonth = () => {
    document.getElementById('month').focus();
  };
  const handleWriteYear = () => {
    document.getElementById('year').focus();
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
    handleSave(values);
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
          <h1>
            {type === 'bio' && 'Bio List'}
            {type === 'work' && 'Work'}
            {type === 'highSchool' && 'High school'}
            {type === 'colege' && 'College'}
            {type === 'city' && 'Current city'}
            {type === 'hometown' && 'Hometown'}
            {type === 'nickName' && 'Nickname'}
            {type === 'birthday' && 'Birthday'}
          </h1>
          {type === 'bio' && values.isBio && (
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
          )}
          <div className="-add-proxys__type">
            <div className="-add-proxys-nav -list-proxys">
              {type === 'bio' && values.typeBio === 'line' && (
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
                    onClick={handleWriteBio}
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
              {type === 'bio' && values.typeBio === 'moreLine' && (
                <>
                  <div className="keywordText">
                    <Editor
                      value={contentBio}
                      onValueChange={(text) => {
                        setContentBio(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbersMore(text, languages.js, contentBio)}
                      padding={15}
                      className="editor"
                      textareaId="contentBio1"
                    />
                  </div>
                  <div
                    className="placeholder placeholderMore"
                    onClick={handleWriteBioMore}
                    style={{ display: contentBio ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>*</span>
                      Enter bio here, each bio is separated by “|”
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
              )}
              {type === 'work' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentWork}
                      onValueChange={(text) => {
                        setContentWork(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentWork)}
                      padding={15}
                      className="editor"
                      textareaId="contentWork"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteWork}
                    style={{ display: contentWork ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter work here, each work/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'highSchool' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentHighSchool}
                      onValueChange={(text) => {
                        setContentHighSchool(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentHighSchool)}
                      padding={15}
                      className="editor"
                      textareaId="contentHighSchool"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteHighSchool}
                    style={{ display: contentHighSchool ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter high school here, each high school/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'colege' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentColege}
                      onValueChange={(text) => {
                        setContentColege(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentColege)}
                      padding={15}
                      className="editor"
                      textareaId="contentColege"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteColege}
                    style={{ display: contentColege ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter college here, each college/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'city' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentCity}
                      onValueChange={(text) => {
                        setContentCity(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentCity)}
                      padding={15}
                      className="editor"
                      textareaId="contentCity"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteCity}
                    style={{ display: contentCity ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter city here, each city/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'hometown' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentHometown}
                      onValueChange={(text) => {
                        setContentHometown(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentHometown)}
                      padding={15}
                      className="editor"
                      textareaId="contentHometown"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteHome}
                    style={{ display: contentHometown ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter hometown here, each hometown/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'nickName' && (
                <>
                  <div className="informationMore">
                    <Editor
                      value={contentNickName}
                      onValueChange={(text) => {
                        setContentNickName(text);
                      }}
                      highlight={(text) => hightlightWithLineNumbers(text, languages.js, contentNickName)}
                      padding={15}
                      className="editor"
                      textareaId="contentNickName"
                    />
                  </div>
                  <div
                    className="placeholder more"
                    onClick={handleWriteNickName}
                    style={{ display: contentNickName ? 'none' : 'inline' }}
                  >
                    <p>
                      <span>1</span>
                      Enter nick name here, each nick name/line.
                    </p>
                  </div>
                </>
              )}
              {type === 'birthday' && (
                <>
                  <div className="birthday">
                    <p>Date</p>
                    <div className="keywordText">
                      <Editor
                        value={day}
                        onValueChange={(text) => {
                          setDay(text);
                        }}
                        highlight={(text) => hightlightWithLineNumbers(text, languages.js, day)}
                        padding={15}
                        className="editorBirthday"
                        textareaId="day"
                      />
                    </div>
                    <div
                      className="placeholderBirthday"
                      onClick={handleWriteDay}
                      style={{ display: day ? 'none' : 'inline' }}
                    >
                      <p>Enter date here</p>
                      <p>Each date/line.</p>
                    </div>
                  </div>
                  <div className="birthday">
                    <p>Month</p>
                    <div className="keywordText">
                      <Editor
                        value={month}
                        onValueChange={(text) => {
                          setMonth(text);
                        }}
                        highlight={(text) => hightlightWithLineNumbers(text, languages.js, month)}
                        padding={15}
                        className="editorBirthday"
                        textareaId="month"
                      />
                    </div>
                    <div
                      className="placeholderBirthday"
                      onClick={handleWriteMonth}
                      style={{ display: month ? 'none' : 'inline' }}
                    >
                      <p>
                        {/* <span>1</span> */}
                        Enter month here
                      </p>
                      <p>
                        {/* <span>2</span> */}
                        Each month/line.
                      </p>
                    </div>
                  </div>
                  <div className="birthday">
                    <p>Year</p>
                    <div className="keywordText">
                      <Editor
                        value={year}
                        onValueChange={(text) => {
                          setYear(text);
                        }}
                        highlight={(text) => hightlightWithLineNumbers(text, languages.js, year)}
                        padding={15}
                        className="editorBirthday"
                        textareaId="year"
                      />
                    </div>
                    <div
                      className="placeholderBirthday"
                      onClick={handleWriteYear}
                      style={{ display: year ? 'none' : 'inline' }}
                    >
                      <p>
                        {/* <span>1</span> */}
                        Enter year here
                      </p>
                      <p>
                        {/* <span>2</span> */}
                        Each year/line.
                      </p>
                    </div>
                  </div>
                </>
              )}
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

export default PopupInformation;
