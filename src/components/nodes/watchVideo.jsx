import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function watchVideoNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="40" viewBox="0 0 5 40" fill="none">
          <path d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z" fill="#34C38F" />
        </svg>
        <div className="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.6364 1.36364H2.72727C1.97416 1.36364 1.36364 1.97416 1.36364 2.72727V9.54545C1.36364 10.2986 1.97416 10.9091 2.72727 10.9091H13.6364C14.3895 10.9091 15 10.2986 15 9.54545V2.72727C15 1.97416 14.3895 1.36364 13.6364 1.36364ZM2.72727 0C1.22104 0 0 1.22104 0 2.72727V9.54545C0 11.0517 1.22104 12.2727 2.72727 12.2727H13.6364C15.1426 12.2727 16.3636 11.0517 16.3636 9.54545V2.72727C16.3636 1.22104 15.1426 0 13.6364 0H2.72727Z"
              fill="#34C38F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.40909 14.3182C3.40909 13.9416 3.71435 13.6364 4.09091 13.6364H12.2727C12.6493 13.6364 12.9545 13.9416 12.9545 14.3182C12.9545 14.6947 12.6493 15 12.2727 15H4.09091C3.71435 15 3.40909 14.6947 3.40909 14.3182Z"
              fill="#34C38F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.5 5.29513V6.9776L8.90206 6.13636L7.5 5.29513ZM6.13636 4.5726C6.13636 3.83063 6.94579 3.37235 7.58202 3.75408L10.1883 5.31785C10.8062 5.6886 10.8062 6.58413 10.1883 6.95488L7.58202 8.51865C6.94579 8.90038 6.13636 8.44209 6.13636 7.70013V4.5726Z"
              fill="#34C38F"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Watch video</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                onClick={onButtonClick}
              >
                <rect width="8" height="14" rx="2" fill="#01162B" fill-opacity="0.1" />
                <circle cx="3.92308" cy="3.92308" r="0.923077" fill="#01162B" />
                <circle cx="3.92308" cy="7.00023" r="0.923077" fill="#01162B" />
                <circle cx="3.92308" cy="10.0774" r="0.923077" fill="#01162B" />
              </svg>
            </div>
            <div className="right-bottom">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
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

      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default watchVideoNode;
