import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import leftGroupLeft from "../../assets/icon/icon-leftGroupLeft.svg";
import leftGroupIcon from "../../assets/icon/icon-leftGroupNode.svg";
import optionNode from "../../assets/icon/icon-optionNode.svg";
import time from "../../assets/icon/icon-time.svg";
const handleStyle = { left: 10 };

function leftGroupNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="node">
        <img src={leftGroupLeft} alt="left Group Left" />
        <div className="content">
          <img src={leftGroupIcon} alt="left Group" />
          <div className="content-right">
            <div className="right-top">
              <p>G-leave group</p>
              <img src={optionNode} alt="More" onClick={onButtonClick} />
            </div>
            <div className="right-bottom">
              <img src={time} alt="Time" />
              <p>5 min</p>
            </div>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default leftGroupNode;
