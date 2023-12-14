import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import newsfeedLeft from '../../assets/icon/icon-newsfeedLeft.svg';
import newsfeedIcon from '../../assets/icon/icon-newsfeed.svg';
import optionNode from '../../assets/icon/icon-optionNode.svg';
import time from '../../assets/icon/icon-time.svg';
const handleStyle = { left: 10 };

function newsFeedNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <img src={newsfeedLeft} alt="newsfeedLeft" />
        <div className="content">
          <img src={newsfeedIcon} alt="newsfeed" />
          <div className="content-right">
            <div className="right-top">
              <p>Newsfeed</p>
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

export default newsFeedNode;
