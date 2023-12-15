import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

import addFriendLeft from '../../assets/icon/icon-addFriendLeft.svg';
import addFriendIcon from '../../assets/icon/icon-addFriend.svg';
import optionNode from '../../assets/icon/icon-optionNode.svg';
import time from '../../assets/icon/icon-time.svg';
import 'reactjs-popup/dist/index.css';
const handleStyle = { left: 10 };

function addFriendNode({ data: { label, onButtonClick }, isConnectable, id }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const [optionClick, setOptionClick] = useState(false);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <img src={addFriendLeft} alt="addFriendLeft" />
        <div className="content">
          <img src={addFriendIcon} alt="addFriendLeft" />
          <div className="content-right">
            <div className="right-top">
              <p>Add friend</p>
              <div style={{ padding: '0 5px' }} onClick={onButtonClick}>
                <img src={optionNode} alt="More" />
              </div>
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

export default addFriendNode;
