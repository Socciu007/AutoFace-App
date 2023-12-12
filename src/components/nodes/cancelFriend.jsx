import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import cancelLeft from "../../assets/icon/icon-cancelLeft.svg";
import cancelIcon from "../../assets/icon/icon-cancel.svg";
import optionNode from "../../assets/icon/icon-optionNode.svg";
import time from "../../assets/icon/icon-time.svg";
const handleStyle = { left: 10 };

function cancelFriendNode({ data: { label, onButtonClick }, isConnectable }) {
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
        <img src={cancelLeft} alt='cancelLeft' />
        <div className='content'>
          <img src={cancelIcon} alt='cancelLeft' />
          <div className='content-right'>
            <div className='right-top'>
              <p>Cancel friend</p>
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

export default cancelFriendNode;
