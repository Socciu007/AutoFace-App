import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import addFriendLeft from "../../assets/icon/icon-addFriendLeft.svg";
import addFriendIcon from "../../assets/icon/icon-addFriend.svg";
import optionNode from "../../assets/icon/icon-optionNode.svg";
import time from "../../assets/icon/icon-time.svg";
const handleStyle = { left: 10 };

function addFriendNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className='updater-node'>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className='node'>
        <img src={addFriendLeft} alt='addFriendLeft' />
        <div className='content'>
          <img src={addFriendIcon} alt='addFriendLeft' />
          <div className='content-right'>
            <div className='right-top'>
              <p>Add friend</p>
              <img src={optionNode} alt='More' onClick={onButtonClick} />
            </div>
            <div className='right-bottom'>
              <img src={time} alt='Time' />
              <p>5 min</p>
            </div>
          </div>
        </div>
      </div>

      <Handle
        type='source'
        position={Position.Right}
        id='b'
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default addFriendNode;
