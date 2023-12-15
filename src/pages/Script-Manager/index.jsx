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
import option from '../../assets/icon/icon-options.svg';
import newNote from '../../assets/icon/icon-newNote.svg';
import edit from '../../assets/icon/icon-editWhite.svg';
import close from '../../assets/icon/icon-close.svg';

const ScriptManager = () => {
  const navigate = useNavigate();

  const initialContentArray = [
    { id: 1, content: 'Auto watch Live videos' },
    { id: 2, content: 'Make 50 random friends' },
    { id: 3, content: 'Auto post on the fanpage' },
    { id: 4, content: 'Log in' },
    { id: 5, content: 'Auto post on the fanpage' },
    { id: 6, content: 'Auto post on the fanpage' },
    { id: 7, content: 'Auto post on the fanpage' },
    { id: 8, content: 'Auto post on the fanpage' },
  ];
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
    top: '40%',
    left: '35%',
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
    top: '40%',
    left: '35%',
    borderRadius: '15px',
    background: '#fff',
    boxShadow: '0px 4px 10px 0px rgba(8, 35, 106, 0.25)',
    width: '636px',
    maxWidth: '636px',
    flexShrink: '0',
    margin: '0',
    padding: '25px 25px 35px 25px',
  };

  const [isCategoryActive, setCategoryActive] = useState(true);
  const [isScriptActive, setScriptActive] = useState(false);
  const [contentArray, setContentArray] = useState(
    initialContentArray.map((e) => {
      return { ...e, isPin: false };
    }),
  );
  const [indexMenu, setIndexMenu] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
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
    navigate('/edit');
  };
  // Handle category button
  const handleButtonClick = () => {
    // Toggle the active state
    setCategoryActive(!isCategoryActive);
  };
  // Handle each script div
  const handleScriptClick = (button) => {
    setScriptActive(button === isCategoryActive ? null : button);
  };

  const openCopy = Boolean(anchorEl);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openCopy) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCopy]);

  const [makeCopyDialogOpen, setMakeCopyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Close dialog
  const handleCloseDialog = (className) => {
    // Close logic for each dialog type
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(false);
    } else if (className === 'delete') {
      setDeleteDialogOpen(false);
    }
  };

  const handleOptionClick = (className) => {
    // Set the state to open the corresponding dialog
    if (className === 'makeCopy') {
      setMakeCopyDialogOpen(true);
    } else if (className === 'delete') {
      setDeleteDialogOpen(true);
    }
    handleClose();
  };

  const handleTogglePin = (scriptId) => {
    const index = contentArray.findIndex((e) => e.id == scriptId);

    if (index >= 0) {
      const newArr = contentArray;
      newArr[index].isPin = !newArr[index].isPin;
      setContentArray(newArr);
    }
    setIndexMenu(-1);
  };

  // Handle toggle menu
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setIndexMenu(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          </div>
          <div className="script-manager__content">
            <div className="scrollable-container">
              <div className="left-content">
                <div className="left-content__top">
                  <div className="search">
                    <img src={search} alt="Icon-search" />
                    <input className="inputSearch" placeholder="Search..."></input>
                  </div>
                  <button className="reload">
                    <img src={reload} alt="Reload" />
                  </button>
                  <button className="add" onClick={handleAddClick}>
                    <img src={add} alt="Add" />
                  </button>
                </div>
                <div className="left-content__category">
                  <button className={isCategoryActive ? 'category-left' : 'category-right'} onClick={handleButtonClick}>
                    System's Scripts
                  </button>
                  <button className={isCategoryActive ? 'category-right' : 'category-left'} onClick={handleButtonClick}>
                    Your Scripts
                  </button>
                </div>
                <div className="left-content__content">
                  {contentArray.map((item, index) => (
                    <div
                      className={isScriptActive === item.id ? 'script selected' : 'script'}
                      onClick={() => handleScriptClick(item.id)}
                      key={item.id}
                    >
                      <p className={isScriptActive === item.id ? 'inputSelected' : ''}>{item.content}</p>
                      <div>
                        {/* pin */}
                        {item.isPin ? <img src={pin} alt="Pin" className={'show'} /> : null}
                        {/* more */}
                        <div
                          className="more"
                          id={`basic-menu-${item.id}`}
                          aria-controls={open ? `basic-menu-${item.id}` : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(event) => {
                            handleClick(event, index);
                          }}
                        >
                          <img src={option} alt="More" />
                        </div>
                        {indexMenu == index ? (
                          <Menu
                            id={`basic-menu-${item.id}`}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                              '& .MuiPaper-root': menuStyle,
                              '& .MuiButtonBase-root': liStyle,
                            }}
                          >
                            <MenuItem id={item.id} onClick={() => handleTogglePin(item.id)}>
                              {item.isPin ? 'Unpin' : 'Pin'}
                            </MenuItem>
                            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                            <MenuItem onClick={() => handleOptionClick('makeCopy')}>Make a copy</MenuItem>
                            <MenuItem onClick={handleClose}>Rename</MenuItem>
                            <MenuItem onClick={() => handleOptionClick('delete')}>Delete</MenuItem>
                          </Menu>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="right-content__edit">
                <h3>SCRIPT OVERVIEW</h3>
                <div className="edit-input">
                  <img src={newNote} alt="New note" />
                  <input type="text" placeholder="New note" />
                </div>
                <button className="editBtn" onClick={handleEditClick}>
                  <img src={edit} alt="Edit" />
                  EDIT
                </button>
              </div>
              <div className="right-content__container">
                <DnDFlow></DnDFlow>
              </div>
            </div>
          </div>
          <Dialog
            sx={{
              '& .MuiPaper-root': makeCopy,
            }}
            open={makeCopyDialogOpen}
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
                <input type="text" placeholder="Enter name here..." />
                <button>Create</button>
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
            }}
          >
            <div className="dialog_delete">
              <h1>DELETE</h1>
              <p>Are you sure to delete this script?</p>
              <div>
                <button onClick={() => handleCloseDialog('delete')}>Cancel</button>
                <button className="deleteBtn">Delete</button>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ScriptManager;
