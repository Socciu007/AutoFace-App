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
import { Button, Upload } from 'antd';

const Information = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['avatar']);

  useEffect(() => {
    if (currentSetup) {
      setValues(currentSetup);
    }
  }, [currentSetup]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

  const handleChangeAddFrame = (value) => {
    setValues({ ...values, isAddFrame: value });
  };

  const handleChangeDelete = (value) => {
    setValues({ ...values, isDelete: value });
  };

  const handleChangeSkip = (value) => {
    setValues({ ...values, isSkip: value });
  };

  const handleChangeImage = (value) => {
    setValues({ ...values, folder: value.file.originFileObj.path });
  };

  const handleRemoveImage = () => {
    setTimeout(() => {
      setValues({ ...values, folder: '' });
    }, 20);
  };
  console.log('va', values);
  return (
    <div className="avatar">
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
              <p>Avatar</p>
            </div>
            <div className="component-item information">
              <div className="component-item__header image">
                <p>Upload avatar</p>
                <Upload
                  onChange={handleChangeImage}
                  onRemove={handleRemoveImage}
                  accept="image/*"
                  listType="picture"
                  maxCount={1}
                >
                  <Button
                    style={{
                      display: values.folder === '' ? 'block' : 'none',
                      position: values.folder === '' ? '' : 'absolute',
                      top: values.folder === '' ? '' : '0%',
                    }}
                  >
                    Choose folder +
                  </Button>
                </Upload>
              </div>
            </div>
            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isDelete"
                  checked={values.isDelete}
                  onChange={(event) => handleChangeDelete(event.target.checked)}
                />
                <p>Delete used images</p>
              </div>
            </div>
            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isAddFrame"
                  checked={values.isAddFrame}
                  onChange={(event) => handleChangeAddFrame(event.target.checked)}
                />
                <p>Add frame</p>
              </div>
            </div>
            <div className="component-item information">
              <div className="component-item__header">
                <input
                  type="checkbox"
                  name="isSkip"
                  checked={values.isSkip}
                  onChange={(event) => handleChangeSkip(event.target.checked)}
                />
                <p>Skip if the account already has an avatar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
