import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import deleteLeft from '../../assets/icon/icon-deleteLeft.svg';
import deleteIcon from '../../assets/icon/icon-2FA-node.svg';
import optionNode from '../../assets/icon/icon-optionNode.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function TwoFA({ data: { label, onButtonClick, onDeleteNode }, isConnectable, id }) {
  const menuStyle = {
    boxShadow:
      '0px 5px 5px -3px rgb(233 232 232 / 20%), 0px 8px 10px 1px rgb(255 255 255 / 14%), 0px 3px 14px 2px rgb(241 232 232 / 12%)',
  };
  const liStyle = {
    fontFamily: 'GOOGLESANS',
    fontSize: '12px',
  };
  const [anchorEl, setAnchorEl] = useState(null);
  // Handle toggle menu
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Edit node
  const editNode = () => {
    onButtonClick(id);
    handleClose();
  };
  // Delete node
  const deleteNode = () => {
    onDeleteNode(id);
    handleClose();
  };
  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <img src={deleteLeft} alt="deleteLeft" />
        <div className="content">
          <img src={deleteIcon} alt="deleteLeft" />
          <div className="content-right">
            <div className="right-top">
              <p>2FA</p>
              <img src={optionNode} alt="More" onClick={handleClick} />
              <Menu
                id="basic-menu"
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
                <MenuItem onClick={editNode}>Edit</MenuItem>
                <MenuItem onClick={deleteNode}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TwoFA;
