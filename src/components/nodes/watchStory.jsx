import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function watchStoryNode({ data, isConnectable, onSvgClick }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <div className="updater-node">
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
        <div className="node">
          <svg xmlns="http://www.w3.org/2000/svg" width="5" height="38" viewBox="0 0 5 38" fill="none">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H5V38H4C1.79086 38 0 36.2091 0 34V4Z" fill="#F0CD00" />
          </svg>
          <div className="content">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M0.75 1.5C0.75 1.173 1.08442 0.75 1.70455 0.75H5.11364C5.73377 0.75 6.06818 1.173 6.06818 1.5V13.182L5.40604 12.5161C5.07757 12.1857 4.63094 12 4.16508 12H1.70455C1.08441 12 0.75 11.577 0.75 11.25V1.5Z"
                stroke="#F0CD00"
                stroke-width="1.5"
              />
              <path
                d="M14.25 1.5C14.25 1.173 13.9156 0.75 13.2955 0.75H9.88636C9.26623 0.75 8.93182 1.173 8.93182 1.5V13.182L9.59396 12.5161C9.92243 12.1857 10.3691 12 10.8349 12H13.2955C13.9156 12 14.25 11.577 14.25 11.25V1.5Z"
                stroke="#F0CD00"
                stroke-width="1.5"
              />
            </svg>
            <div className="content-right">
              <div className="right-top">
                <p>Watch story</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  onClick={() => onSvgClick}
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
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M5 3.40039V5.00039L6 6.00039"
                    stroke="#01162B"
                    strokeOpacity="0.5"
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
    </div>
  );
}

export default watchStoryNode;
