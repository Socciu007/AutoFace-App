import React, { useEffect, useState } from 'react';
import PopupComponent from '../PopupComponent/PopupComponent';
import closePopup from '../../../assets/pictures/icon-x.svg';
import settings from '../../../assets/pictures/icon-settings.png';
import yourScript from '../../../assets/pictures/icon-yourScripts.svg';
import search from '../../../assets/pictures/icon-search.svg';
import { Table } from 'antd';
import './style.scss';
import { storageScripts } from '../../../common/const.config';
import { runScript } from '../../../services/runScript';
import { dbGetLocally } from '../../../sender';

const PopupScript = ({ openScripts, handleCloseScripts, handleSettings, handleOpenScripts, profilesSelected }) => {
  const typeScript = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: `System's script`,
      value: 'system',
    },
    {
      title: 'Your script',
      value: 'your',
    },
  ];

  const [type, setType] = useState('all');
  const [contentArray, setContentArray] = useState([]);
  const [scriptSelected, setScriptSelected] = useState();
  const [listScript, setListScript] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getScripts();
    }, 1000);
  }, []);

  useEffect(() => {
    if (!contentArray.length) return;
    let newList = [];
    if (listScript.length) {
      newList = contentArray.filter((e) => {
        const check = listScript.find((o) => o.id == e.id);
        if (check) return true;
        return false;
      });
    } else {
      newList = contentArray;
    }
    newList = newList.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setListScript(newList);
  }, [contentArray]);

  const getScripts = async () => {
    const scriptStr = await dbGetLocally(storageScripts);
    if (scriptStr && scriptStr.length) {
      const script = JSON.parse(scriptStr);
      if (script && script.length) {
        setContentArray(script);
      }
    }
  };

  const handleTypeScript = (value) => {
    setType(value);
  };

  const runScriptAuto = async () => {
    if (scriptSelected) {
      await runScript(profilesSelected, scriptSelected);
    }
  };

  const searchScript = (text) => {
    let newScripts = [];
    if (text == '') {
      newScripts = contentArray;
    } else {
      newScripts = contentArray.filter((e) => {
        const note = e.note.toLowerCase();
        const name = e.name.toLowerCase();
        return note.includes(text.toLowerCase()) || name.includes(text.toLowerCase());
      });
    }
    newScripts = newScripts.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setListScript(newScripts);
  };

  const columnsScripts = [
    {
      title: 'Scripts',
      dataIndex: 'name',
    },
    {
      title: 'Notes',
      dataIndex: 'note',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length) {
        setScriptSelected(selectedRows[0]);
      }
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
                {/* <span className="-option-profiles" onClick={handleOpenScripts}>
                  <img src={yourScript} alt="icon-yourscripts"></img>
                </span> */}
                <div>
                  <button
                    onClick={async () => {
                      await runScriptAuto();
                    }}
                  >
                    Run
                  </button>
                </div>
              </div>
            </div>
            <div className="-container-scripts">
              <div className="-container-scripts__left">
                <div className="-container-scripts__left__options">
                  <div className="-container-scripts__left__options__type">
                    <ul className="-container-scripts__left__options__list">
                      {typeScript.map((script, index) => {
                        return (
                          <li
                            key={index}
                            className={`-option-item ${type == script.value && 'active'}`}
                            onClick={() => {
                              handleTypeScript(script.value);
                            }}
                          >
                            <div className="-option-item__row">
                              {/* {type == script.value ? (
                                <div className="li-dot" style={{ background: '#E84314' }}></div>
                              ) : null} */}

                              <p className="li-name">{script.title}</p>
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
                      <input onChange={(event) => searchScript(event.target.value)} placeholder="Search..."></input>
                    </div>
                  </div>
                  {/* <div className="-container-scripts__right__main__content">
                    <div className="-container-scripts__right__main__content__table"> */}
                  <Table
                    rowSelection={{
                      ...rowSelection,
                      type: 'radio',
                    }}
                    columns={columnsScripts}
                    dataSource={listScript
                      .map((e, index) => {
                        return { ...e, key: index };
                      })
                      .filter((e) => {
                        if (type == 'all') return true;
                        else if (type == 'system') {
                          return e.isSystem;
                        } else {
                          return !e.isSystem;
                        }
                      })}
                    pagination={false}
                  ></Table>
                  {/* </div>
                  </div> */}
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
