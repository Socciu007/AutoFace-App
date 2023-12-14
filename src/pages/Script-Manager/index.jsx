import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import DnDFlow from '../../components/drag/drag';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
  // State for
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
  // Handle the button add
  const handleBackClick = () => {
    navigate('/');
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
  // Handle option in menu
  const handleOptionClick = (className) => {
    const optionElement = document.querySelector(`.${className}`);
    setAnchorEl(false);
    if (optionElement) {
      const currentDisplay = getComputedStyle(optionElement).display;
      optionElement.style.display = currentDisplay === 'none' ? 'block' : 'none';
    }
  };
  // Close dialog
  const handleCloseDialog = (className) => {
    const closeButton = document.querySelector(`.${className}`);
    if (closeButton) {
      const closeStyle = getComputedStyle(closeButton).display;
      closeButton.style.display = closeStyle === 'none' ? 'block' : 'none';
    }
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
    console.log(event.currentTarget);
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
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
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
                <button className="editBtn">
                  <img src={edit} alt="Edit" />
                  EDIT
                </button>
              </div>
              <div className="right-content__container">
                <DnDFlow></DnDFlow>
              </div>
            </div>
          </div>
          <div className="makeCopy">
            <div className="makeCopy__top">
              <h1>MAKE A COPY</h1>
              <button className="close" onClick={() => handleCloseDialog('makeCopy')}>
                <img src={close} alt="Close" />
              </button>
            </div>
            <div>
              <input type="text" placeholder="Enter name here..." />
              <button>Create</button>
            </div>
          </div>
          <div className="delete">
            <h1>DELETE</h1>
            <p>Are you sure to delete this script?</p>
            <div>
              <button onClick={() => handleCloseDialog('delete')}>Cancel</button>
              <button className="deleteBtn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScriptManager;
