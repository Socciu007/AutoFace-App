import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function sendMsgNode({ data, isConnectable }) {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="40"
          viewBox="0 0 5 40"
          fill="none"
        >
          <path
            d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z"
            fill="#7E9DEE"
          />
        </svg>
        <div className="content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M13.8033 3.19671C10.8743 0.267764 6.12564 0.267764 3.1967 3.19671C0.661501 5.7319 0.320658 9.63058 2.17437 12.5324L1.73491 14.7897C1.67998 15.0718 1.92819 15.32 2.21035 15.2651L4.46764 14.8256C7.36942 16.6793 11.2681 16.3385 13.8033 13.8033C16.7322 10.8744 16.7322 6.12565 13.8033 3.19671Z"
              stroke="#7E9DEE"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M12.0832 7.20996L9.64658 9.64664L7.42496 7.42503L4.98828 9.86161"
              stroke="#7E9DEE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Send msg</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
              >
                <rect
                  width="8"
                  height="14"
                  rx="2"
                  fill="#01162B"
                  fill-opacity="0.1"
                />
                <circle cx="3.92308" cy="3.92308" r="0.923077" fill="#01162B" />
                <circle cx="3.92308" cy="7.00023" r="0.923077" fill="#01162B" />
                <circle cx="3.92308" cy="10.0774" r="0.923077" fill="#01162B" />
              </svg>
            </div>
            <div className="right-bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M5 9C7.20914 9 9 7.20914 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9Z"
                  stroke="#01162B"
                  stroke-opacity="0.5"
                />
                <path
                  d="M5 3.40039V5.00039L6 6.00039"
                  stroke="#01162B"
                  stroke-opacity="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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

export default sendMsgNode;
