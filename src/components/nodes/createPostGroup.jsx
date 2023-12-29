import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import createPostLeft from '../../assets/icon/icon-createPostLeft.svg';
import createPostIcon from '../../assets/icon/icon-createPost.svg';
import optionNode from '../../assets/icon/icon-optionNode.svg';
import time from '../../assets/icon/icon-time.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const handleStyle = { left: 10 };

function createPostGroupNode({ data: { label, onButtonClick, onDeleteNode }, isConnectable, id }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  // for style menu materials UI
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
    // <div className="updater-node">
    //   <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
    //   <div className="node">
    //     <img src={createPostLeft} alt="createPostLeft" />
    //     <div className="content">
    //       <img src={createPostIcon} alt="createPost" />
    //       <div className="content-right">
    //         <div className="right-top">
    //           <p>Create post</p>
    //           <div style={{ padding: '0 5px' }} onClick={onButtonClick}>
    //             <img src={optionNode} alt="More" onClick={handleClick} />
    //             <Menu
    //               id="basic-menu"
    //               anchorEl={anchorEl}
    //               open={open}
    //               onClose={handleClose}
    //               MenuListProps={{
    //                 'aria-labelledby': 'basic-button',
    //               }}
    //               sx={{
    //                 '& .MuiPaper-root': menuStyle,
    //                 '& .MuiButtonBase-root': liStyle,
    //               }}
    //             >
    //               <MenuItem onClick={editNode}>Sửa</MenuItem>
    //               <MenuItem onClick={deleteNode}>Xóa</MenuItem>
    //             </Menu>
    //           </div>
    //         </div>
    //         <div className="right-bottom">
    //           <img src={time} alt="Time" />
    //           <p>5 min</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    // </div>
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <img src={createPostLeft} alt="createPostLeft" />
        <div className="content">
          <img src={createPostIcon} alt="createPost" />
          <div className="content-right">
            <div className="right-top">
              <p>Create post</p>
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
                <MenuItem onClick={editNode}>Sửa</MenuItem>
                <MenuItem onClick={deleteNode}>Xóa</MenuItem>
              </Menu>
            </div>
            <div className="right-bottom">
              <img src={time} alt="Time" />
              <p>5 min</p>
            </div>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default createPostGroupNode;
