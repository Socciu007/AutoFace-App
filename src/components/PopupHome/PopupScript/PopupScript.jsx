import React, { useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import settings from '../../../assets/pictures/icon-settings.png';
import yourScript from '../../../assets/pictures/icon-yourScripts.svg';
import search from '../../../assets/pictures/icon-search.svg';
import { Table } from 'antd';

const PopupScript = ({
  dataScripts,
  openScripts,
  handleCloseScripts,
  handleSettings,
  handleOpenScripts,
  handleTypeScript,
}) => {
  const columnsScripts = [
    {
      title: 'Scripts',
      dataIndex: 'scripts',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
  };
  return (
    <PopupComponent open={openScripts} onClose={handleCloseScripts} style={{ margin: 'auto' }}>
      {
        <div className="-layout-choose-scripts">
          <div className="-layout-choose-scripts__container">
            <div className="-nav-scripts">
              <div className="-nav-scripts__header">
                <div className="-nav-scripts__header__close" onClick={handleCloseScripts}>
                  <img src={closePopup} alt="icon-x"></img>
                </div>
                <h1>CHOOSE SCRIPT</h1>
              </div>
              <div className="-wrapper-option-profiles -nav-scripts__btn">
                <span className="-option-profiles" onClick={handleSettings}>
                  <img src={settings} alt="image-settings"></img>
                </span>
                <span className="-option-profiles" onClick={handleOpenScripts}>
                  <img src={yourScript} alt="icon-yourscripts"></img>
                </span>
                <div>
                  <button>Run</button>
                </div>
              </div>
            </div>
            <div className="-container-scripts">
              <div className="-container-scripts__left">
                <div className="-container-scripts__left__options">
                  <div className="-container-scripts__left__options__type">
                    <ul className="-container-scripts__left__options__list">
                      {dataScripts.map((script) => {
                        return (
                          <li
                            key={script.key}
                            className={`-option-item ${script.isSystem && 'active'}`}
                            onClick={() => {
                              handleTypeScript(script.isSystem);
                            }}
                          >
                            <div className="-option-item__row">
                              <div className="li-dot" style={{ background: '#E84314' }}></div>
                              <p className="li-name">{script.notes}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="-container-scripts__right">
                <div className="-container-scripts__right__main">
                  <div className="-container-scripts__right__main__search">
                    <h1>SCRIPTS</h1>
                    <div className="-search-profiles">
                      <span>
                        <img src={search} alt="search" style={{ marginLeft: '11px' }}></img>
                      </span>
                      <input placeholder="Search..."></input>
                    </div>
                  </div>
                  <div className="-container-scripts__right__main__content">
                    <div className="-container-scripts__right__main__content__table">
                      <Table
                        rowSelection={{
                          ...rowSelection,
                        }}
                        columns={columnsScripts}
                        dataSource={dataScripts}
                        pagination={false}
                      ></Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </PopupComponent>
  );
};

export default PopupScript;
