import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import DnDFlow from '../../components/drag/drag';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import back from '../../assets/icon/icon-back.svg';
import search from '../../assets/icon/icon-search.svg';
import reload from '../../assets/icon/icon-reload.svg';
import add from '../../assets/icon/icon-add.svg';
import pin from '../../assets/icon/icon-pin.svg';
import pinBlack from '../../assets/icon/icon-pinBlack.svg';
import iconEdit from '../../assets/icon/icon-editBlack.svg';
import iconDuplicate from '../../assets/icon/icon-duplicate.svg';
import iconDelete from '../../assets/icon/icon-Delete.svg';
import iconRename from '../../assets/icon/icon-rename.svg';
import option from '../../assets/icon/icon-options.svg';
import newNote from '../../assets/icon/icon-newNote.svg';
import edit from '../../assets/icon/icon-editWhite.svg';
import close from '../../assets/icon/icon-close.svg';
import yourScript from '../../assets/pictures/icon-yourScripts.svg';
import yourScriptBlue from '../../assets/icon/icon-yourScriptsBlue.svg';
import plus from '../../assets/pictures/icon-plus.png';
import iconCheck from '../../assets/icon/icon-checkBlue.svg';
import systemScript from '../../assets/icon/icon-systemScript.svg';
import running from '../../assets/icon/icon-running.svg';
import { storageScripts } from '../../common/const.config';
import { v4 as uuidv4 } from 'uuid';
import { dbGetLocally, dbSetLocally } from '../../sender';
import { Table, Tooltip } from 'antd';
import { formatTimeDay } from '../../services/utils';
import { Store } from 'react-notifications-component';
import notification from '../../resources/notification.json';
import { useSelector, useDispatch } from 'react-redux';
import { setScriptAuto } from '../../redux/scriptAutoSlice';
import PopupRunScript from '../../components/PopupHome/PopupRunScript/PopupRunScript';
const ScriptManager = () => {
  const navigate = useNavigate();

  // for style menu materials UI
  const menuStyle = {
    boxShadow:
      '0px 5px 5px -3px rgb(233 232 232 / 20%), 0px 8px 10px 1px rgb(255 255 255 / 14%), 0px 3px 14px 2px rgb(241 232 232 / 12%)',
  };
  const liStyle = {
    fontFamily: 'GOOGLESANS',
  };
  const makeCopy = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    width: '636px',
    maxWidth: '636px',
    flexShrink: '0',
    padding: '25px',
    zIndex: '99999',
    margin: '0',
  };
  const dialog_delete = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    width: '636px',
    maxWidth: '636px',
    flexShrink: '0',
    margin: '0',
    padding: '25px 25px 35px 25px',
  };

  const overlay = {
    background: 'rgba(255,255,255,0.9)',
  };
  const [isSystem, setIsSystem] = useState(false);
  const [contentArray, setContentArray] = useState([]);
  const [listScript, setListScript] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemSelect, setItemSelect] = useState(null);
  const [nameCoppy, setNameCoppy] = useState('');
  const [isRunScript, setIsRunScript] = useState(false);
  const profiles = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    getScripts();
  }, []);

  useEffect(() => {
    setListScript(mapStatus(listScript));
  }, [profiles]);

  const mapStatus = (newList) => {
    const newArr = [...newList];
    contentArray.forEach((e, index) => {
      const total = profiles.filter((o) => o.script == e.id);
      const scriptDone = profiles.filter((o) => o.script == e.id && o.status == 'ready');
      if (total.length > 0) {
        dispatch(setScriptAuto(newArr[index].name));
      }
      newArr[index].status =
        total.length > 0 ? (
          <div className="statusRunning">
            <img src={running} alt="run profile icon" />
            <span>
              <span className="profileRunning">{scriptDone.length}</span>
              <span className="totalProfile"> / {total.length} profiles</span>
            </span>
          </div>
        ) : (
          ''
        );
    });
    return newArr;
  };
  useEffect(() => {
    if (!contentArray.length) return;
    reloadListScript();
  }, [contentArray]);

  const reloadListScript = () => {
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
    newList = mapStatus(newList);
    newList = newList.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setListScript(newList);
  };
  let item;
  useEffect(() => {
    if (!itemSelect) return;
    item = listScript.find((e) => e.id == itemSelect.id);
    if (!item) setItemSelect(null);
  }, [listScript]);

  const getScripts = async () => {
    const scriptStr = await dbGetLocally(storageScripts);
    if (scriptStr && scriptStr.length) {
      const script = JSON.parse(scriptStr);
      if (script && script.length) {
        setContentArray(script.reverse());
      }
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

  // Handle the button add
  const handleAddClick = () => {
    navigate('/create');
  };
  // Handle the button back
  const handleBackClick = () => {
    navigate('/');
  };
  // Handle the button edit
  const handleEditClick = () => {
    navigate('/create', {
      state: { ...itemSelect, status: '' },
    });
  };
  // Handle category button
  const handleButtonClick = (isSystem) => {
    let newList = contentArray.filter((e) => {
      if (!e.isSystem && isSystem) return true;
      return false;
    });
    newList = newList.sort((x, y) => Number(y.isPin) - Number(x.isPin));
    setIsSystem(!isSystem);
    setListScript(newList);
  };

  const [makeCopyDialogOpen, setMakeCopyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const coppyScript = async (id, name) => {
    const script = contentArray.find((e) => e.id == id);
    if (script) {
      const newList = [...contentArray];
      const newListScript = [...listScript];
      const newItem = { ...script, name, id: uuidv4(), isPin: false };
      newListScript.push(newItem);
      setListScript(newListScript);
      newList.push(newItem);
      setContentArray(newList);
      await dbSetLocally(storageScripts, JSON.stringify(newList));
    }
  };

  const deleteScript = async (id) => {
    const newList = contentArray.filter((e) => e.id !== id);
    const newListScript = listScript.filter((e) => e.id !== id);
    setListScript(newListScript);
    setContentArray(newList);
    await dbSetLocally(storageScripts, JSON.stringify(newList));
  };

  const handleCloseDialog = (className) => {
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(false);
    } else if (className === 'delete') {
      setDeleteDialogOpen(false);
    }
  };

  const handleOptionClick = (className, script) => {
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(true);
    } else if (className === 'delete') {
      setDeleteDialogOpen(true);
    }
    setItemSelect(script);
    handleClose();
  };

  const handleTogglePin = async (scriptId) => {
    const index = listScripts.findIndex((e) => e.id == scriptId);
    if (index >= 0) {
      const newArr = listScripts;
      newArr[index].isPin = !newArr[index].isPin;
      setContentArray(newArr);
      setListScript(newArr);
      await dbSetLocally(storageScripts, JSON.stringify(newArr));
    }
    setItemSelect(null);
    handleClose();
  };

  // Handle toggle menu

  const handleClick = (event, script) => {
    setAnchorEl(event.currentTarget);
    setItemSelect(script);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const generateNoteStr = (note, shot = true) => {
    let noteStr = note && note.length ? `${note}` : '';

    if (noteStr.length > 75 && shot) {
      noteStr = `${note.slice(0, 75)}...`;
    }
    return noteStr;
  };

  const columns = [
    {
      title: '#',
      width: 30,
      render: (text, record, index) => <div style={{ textAlign: 'center' }}>{index + 1}</div>,
    },
    {
      title: 'Name',
      width: 230,
      render: (script) => {
        return (
          <div className="pin">
            <span>{script.name}</span>
            {script.isPin ? <img src={pin} alt="Pin" className={'show'} /> : null}
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => !a.isPin && !b.isPin && a.status.length - b.status.length,
      width: 180,
      render: (status, script) => {
        return (
          <>
            <div
              onClick={() => {
                setItemSelect(script);
                setIsRunScript(true);
              }}
            >
              {status}
            </div>
            <PopupRunScript
              openRunScript={itemSelect && itemSelect.id === script.id && isRunScript}
              handleCloseRunScript={() => setIsRunScript(false)}
            ></PopupRunScript>
          </>
        );
      },
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      sorter: (a, b) => !a.isPin && !b.isPin && a.tag - b.tag,
      width: 150,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 300,
      render: (note) => (
        <Tooltip placement="topLeft" title={generateNoteStr(note, false)}>
          {generateNoteStr(note)}
        </Tooltip>
      ),
    },
    {
      title: 'Created',
      render: (script) => {
        return (
          <div className="pin">
            <span>{script.createdAt ? formatTimeDay(script.createdAt) : ''}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      width: 40,
      fixed: 'right',
      render: (script) => {
        return (
          <div>
            <div className="-expand-icon">
              {/* <p className="runScript">Run</p> */}
              {/* <p className="stopScript">Stop</p> */}
              <img
                src={option}
                alt="image-option"
                id={`basic-menu-${script.id}`}
                onClick={(event) => {
                  handleClick(event, script);
                }}
                // aria-expanded={open ? 'true' : 'false'}
                // aria-controls={open ? `basic-menu-${script.id}` : undefined}
                aria-haspopup="true"
              ></img>
              <div className={itemSelect && itemSelect.id === script.id ? 'script selected' : 'script'}>
                <Menu
                  anchorEl={anchorEl}
                  id={`basic-menu-${script.id}`}
                  open={itemSelect && itemSelect.id === script.id && anchorEl ? true : false}
                  onClose={() => {
                    setItemSelect(null);
                  }}
                  className="MenuScript"
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{
                    '& .MuiPaper-root': menuStyle,
                    '& .MuiButtonBase-root': liStyle,
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <div className="d-flex MuiBox-root css-0">
                    <div className="dropList">
                      <ul>
                        <li id={script.id} onClick={() => handleTogglePin(script.id)}>
                          <img src={pinBlack} alt="icon pin" />
                          {!script.isPin ? <p>Pin</p> : <p>Unpin</p>}
                        </li>
                        <li onClick={handleEditClick}>
                          <img src={iconEdit} alt="icon edit" />
                          Edit
                        </li>
                        <li onClick={() => handleOptionClick('makeCopy', script)}>
                          <img src={iconDuplicate} alt="icon duplicate" />
                          Duplicate
                        </li>
                        <li onClick={() => handleOptionClick('delete', script)}>
                          <img src={iconDelete} alt="icon delete" />
                          Delete
                        </li>
                      </ul>
                    </div>
                    <div style={{ width: '60px', background: 'tranparent !important', display: 'inherit' }}></div>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const listScripts = listScript.map((item, index) => {
    item.index = index;
    return item;
  });

  return (
    <>
      <div className="wrapper">
        <div className="script-manager">
          <div className="script-manager__header">
            <h1>FACEBOOK AUTOMATION</h1>
            <div className="title">
              <button>
                <img src={back} alt="" onClick={handleBackClick} />
              </button>
              <p>Script Manager</p>
            </div>
            <div className="-nav-bar">
              <div className="scriptManager">
                <img src={yourScript} alt="script manager(your script black) icon" />
                <p>SCRIPT MANAGER</p>
              </div>
              <div className="createScript" onClick={handleAddClick}>
                <span>
                  <img src={plus} alt="plus icon" />
                </span>
                <p>Create a new script</p>
              </div>
              <div
                className={!isSystem ? 'yourScript active' : 'yourScript'}
                onClick={() => {
                  handleButtonClick(true);
                }}
              >
                <img src={yourScriptBlue} alt="icon your script blue" />
                <p>Your Scripts</p>
                {!isSystem ? <img src={iconCheck} alt="icon check" /> : ''}
              </div>
              <div
                className={!isSystem ? 'systemScript ' : 'systemScript active'}
                onClick={() => {
                  handleButtonClick(false);
                }}
              >
                <img src={systemScript} alt="icon system scripts" />
                <p>System’s Scripts</p>
                {isSystem ? <img src={iconCheck} alt="icon check" /> : ''}
              </div>
            </div>
          </div>
          <div className="script-manager__content">
            <Table
              columns={columns}
              showSorterTooltip={false}
              pagination={false}
              dataSource={listScripts}
              rowClassName={(profile) => (profile.isPin ? 'pinned-row' : '')}
            />
          </div>
          <Dialog
            sx={{
              '& .MuiPaper-root': makeCopy,
              '& .MuiBackdrop-root': overlay,
            }}
            open={makeCopyDialogOpen}
            onPlay={() => setNameCoppy('')}
            onClose={() => handleCloseDialog('makeCopy')}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <div className="makeCopy">
              <div className="makeCopy__top">
                <p>MAKE A COPY</p>
                <button className="close" onClick={() => handleCloseDialog('makeCopy')}>
                  <img src={close} alt="Close" />
                </button>
              </div>
              <div className="makeCopy__bottom">
                <input
                  onChange={(event) => setNameCoppy(event.target.value)}
                  type="text"
                  placeholder="Enter name here..."
                />
                <button
                  onClick={async () => {
                    if (nameCoppy == '') {
                      Store.addNotification({
                        ...notification,
                        type: 'warning',
                        message: 'Enter name script',
                      });
                    } else {
                      console.log(itemSelect);
                      coppyScript(itemSelect.id, nameCoppy);
                      handleCloseDialog('makeCopy');
                      Store.addNotification({
                        ...notification,
                        type: 'success',
                        message: 'Coppy script success',
                      });
                    }
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </Dialog>

          <Dialog
            open={deleteDialogOpen}
            onClose={() => handleCloseDialog('delete')}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            sx={{
              '& .MuiPaper-root': dialog_delete,
              '& .MuiBackdrop-root': overlay,
            }}
          >
            <div className="dialog_delete">
              <h1>DELETE</h1>
              <p>Are you sure to delete this script?</p>
              <div>
                <button onClick={() => handleCloseDialog('delete')}>Cancel</button>
                <button
                  onClick={() => {
                    console.log(itemSelect);
                    deleteScript(itemSelect.id);
                    handleCloseDialog('delete');
                    Store.addNotification({
                      ...notification,
                      type: 'success',
                      message: 'Delete script success',
                    });
                  }}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ScriptManager;
