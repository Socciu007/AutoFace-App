// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './style.scss';
import backButton from '../../../assets/icon/icon-back.svg';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import DefaultSciptSettings from '../../../resources/defaultSciptSettings.json';
import { Button, Upload } from 'antd';

const Cover = ({ onGoBackClick, id, updateDesignScript, currentSetup, component }) => {
  const [values, setValues] = useState(DefaultSciptSettings['cover']);

  useEffect(() => {
    if (currentSetup) {
      setValues(currentSetup);
    }
  }, [currentSetup]);

  useEffect(() => {
    updateDesignScript(values, component, id);
  }, [values]);

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
  return (
    <div className="cover">
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
              <p>Cover</p>
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
                  name="isSkip"
                  checked={values.isSkip}
                  onChange={(event) => handleChangeSkip(event.target.checked)}
                />
                <p>Skip if the account already has a cover</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
