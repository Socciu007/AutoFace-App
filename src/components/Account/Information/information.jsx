// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import iconDecrease from '../../../assets/icon/icon-Decrease.svg';
import iconIncrease from '../../../assets/icon/icon-Increase.svg';
import backButton from '../../../assets/icon/icon-back.svg';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import PopupInformation from '../../PopupHome/PopupInformation/PopupInformation.jsx';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';

const Information = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [openBio, setOpenBio] = useState(false);
  const [openWork, setOpenWork] = useState(false);
  const [openBirthday, setOpenBirthday] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openCollege, setOpenCollege] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openHighSchool, setOpenHighSchool] = useState(false);
  const [openHometown, setOpenHometown] = useState(false);
  const [openNickname, setOpenNickname] = useState(false);
  const [openRelationship, setOpenRelationship] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [values, setValues] = useState(DefaultSciptSettings['infomation']);

  useEffect(() => {
    if (currentSetup) {
      setTimeout(() => {
        setValues(currentSetup);
      }, 20);
    }
  }, [currentSetup]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const handleChangeWork = (value) => {
    setTimeout(() => {
      setValues({ ...values, isWork: value });
    }, 20);
  };
  const handleCloseWork = () => {
    setOpenWork(false);
  };

  const handleChangeBio = (value) => {
    setTimeout(() => {
      setValues({ ...values, isBio: value });
    }, 20);
  };

  const handleCloseBio = () => {
    setOpenBio(false);
  };

  const handleChangeBirthday = (value) => {
    setTimeout(() => {
      setValues({ ...values, isBirthday: value });
    }, 20);
  };
  const handleCloseBirthday = () => {
    setOpenBirthday(false);
  };

  const handleChangeCity = (value) => {
    setValues({ ...values, isCity: value });
  };
  const handleCloseCity = () => {
    setOpenCity(false);
  };

  const handleChangeColege = (value) => {
    setValues({ ...values, isColege: value });
  };
  const handleCloseCollege = () => {
    setOpenCollege(false);
  };

  const handleChangeGender = (value) => {
    setValues({ ...values, isGender: value });
  };
  const handleCloseGender = () => {
    setOpenGender(false);
  };

  const handleChangeHighSchool = (value) => {
    setValues({ ...values, isHighSchool: value });
  };
  const handleCloseHighSchool = () => {
    setOpenHighSchool(false);
  };

  const handleChangeHometown = (value) => {
    setValues({ ...values, isHometown: value });
  };
  const handleCloseHometown = () => {
    setOpenHometown(false);
  };

  const handleChangeNickname = (value) => {
    setValues({ ...values, isNickname: value });
  };
  const handleCloseNickname = () => {
    setOpenNickname(false);
  };

  const handleChangeRelationship = (value) => {
    setValues({ ...values, isRelationship: value });
  };
  const handleCloseRelationship = () => {
    setOpenRelationship(false);
  };

  const handleSave = (values) => {
    setValues(values);
  };
  console.log('data', values);

  return (
    <div className="information">
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
              <p>Information</p>
            </div>
            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="bio"
                  checked={values.isBio}
                  onChange={(event) => handleChangeBio(event.target.checked)}
                />
                <p>Bio</p>
              </div>
              <div className={`component-item__content ${values.isBio ? 'show' : 'hide'}`}>
                <span>({values.bio.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenBio(true)}>Add +</button>
                </div>
                {values.isBio && (
                  <PopupInformation
                    type="bio"
                    open={openBio}
                    handleClose={handleCloseBio}
                    handleSave={handleSave}
                    data={values}
                    id={id}
                    currentSetup={currentSetup}
                    updateDesignScript={updateDesignScript}
                    component={component}
                  />
                )}
              </div>
            </div>
            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isWork"
                  checked={values.isWork}
                  onChange={(event) => handleChangeWork(event.target.checked)}
                />
                <p>Work</p>
              </div>
              <div className={`component-item__content ${values.isWork ? 'show' : 'hide'}`}>
                <span>({values.work.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenWork(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="work"
                  open={openWork}
                  handleClose={handleCloseWork}
                  handleSave={handleSave}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isHighSchool"
                  checked={values.isHighSchool}
                  onChange={(event) => handleChangeHighSchool(event.target.checked)}
                />
                <p>High school</p>
              </div>
              <div className={`component-item__content ${values.isHighSchool ? 'show' : 'hide'}`}>
                <span>({values.highSchool.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenHighSchool(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="highSchool"
                  open={openHighSchool}
                  handleClose={handleCloseHighSchool}
                  handleSave={handleSave}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isColege"
                  checked={values.isColege}
                  onChange={(event) => handleChangeColege(event.target.checked)}
                />
                <p>College</p>
              </div>
              <div className={`component-item__content ${values.isColege ? 'show' : 'hide'}`}>
                <span>({values.colege.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenCollege(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="colege"
                  open={openCollege}
                  handleClose={handleCloseCollege}
                  handleSave={handleSave}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isCity"
                  checked={values.isCity}
                  onChange={(event) => handleChangeCity(event.target.checked)}
                />
                <p>Current city</p>
              </div>
              <div className={`component-item__content ${values.isCity ? 'show' : 'hide'}`}>
                <span>({values.city.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenCity(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="city"
                  open={openCity}
                  handleSave={handleSave}
                  handleClose={handleCloseCity}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isHometown"
                  checked={values.isHometown}
                  onChange={(event) => handleChangeHometown(event.target.checked)}
                />
                <p>Hometown</p>
              </div>
              <div className={`component-item__content ${values.isHometown ? 'show' : 'hide'}`}>
                <span>({values.hometown.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenHometown(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="hometown"
                  open={openHometown}
                  handleClose={handleCloseHometown}
                  handleSave={handleSave}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isRelationship"
                  checked={values.isRelationship}
                  onChange={(event) => handleChangeRelationship(event.target.checked)}
                />
                <p>Relationship</p>
              </div>
              <div className={`component-item__content ${values.isRelationship ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <button onClick={() => setOpenBio(true)}>Add +</button>
                </div>
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isGender"
                  checked={values.isGender}
                  onChange={(event) => handleChangeGender(event.target.checked)}
                />
                <p>Gender</p>
              </div>
              <div className={`component-item__content ${values.isGender ? 'show' : 'hide'}`}>
                <div className="component-item__number">
                  <button onClick={() => setOpenBio(true)}>Add +</button>
                </div>
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isBirthday"
                  checked={values.isBirthday}
                  onChange={(event) => handleChangeBirthday(event.target.checked)}
                />
                <p>Birthday</p>
              </div>
              <div className={`component-item__content ${values.isBirthday ? 'show' : 'hide'}`}>
                <span>({values.bio.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenBirthday(true)}>Add +</button>
                </div>
                {values.isBirthday && (
                  <PopupInformation
                    type="birthday"
                    open={openBirthday}
                    handleClose={handleCloseBirthday}
                    handleSave={handleSave}
                    data={values}
                    id={id}
                    currentSetup={currentSetup}
                    updateDesignScript={updateDesignScript}
                    component={component}
                  />
                )}
              </div>
            </div>

            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isNickname"
                  checked={values.isNickname}
                  onChange={(event) => handleChangeNickname(event.target.checked)}
                />
                <p>Nickname</p>
              </div>
              <div className={`component-item__content ${values.isNickname ? 'show' : 'hide'}`}>
                <span>({values.nickname.length})</span>
                <div className="component-item__number">
                  <button onClick={() => setOpenNickname(true)}>Add +</button>
                </div>
                <PopupInformation
                  type="nickName"
                  open={openNickname}
                  handleSave={handleSave}
                  handleClose={handleCloseNickname}
                  data={values}
                  id={id}
                  currentSetup={currentSetup}
                  updateDesignScript={updateDesignScript}
                  component={component}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
