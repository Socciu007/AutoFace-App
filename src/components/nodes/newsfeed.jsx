import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function newsFeedNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="40" viewBox="0 0 5 40" fill="none">
          <path d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z" fill="#FFBD00" />
        </svg>
        <div className="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M1 8.65293C1 6.93662 1 6.07846 1.3894 5.36706C1.7788 4.65566 2.49021 4.21413 3.91302 3.3311L5.41302 2.40015C6.91704 1.46672 7.66907 1 8.5 1C9.33093 1 10.0829 1.46672 11.587 2.40015L13.087 3.33109C14.5098 4.21413 15.2212 4.65566 15.6106 5.36706C16 6.07846 16 6.93662 16 8.65293V9.79375C16 12.7194 16 14.1822 15.1213 15.0911C14.2427 16 12.8284 16 10 16H7C4.17157 16 2.75736 16 1.87868 15.0911C1 14.1822 1 12.7194 1 9.79375V8.65293Z"
              stroke="#FFBD00"
              stroke-width="2"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Newsfeed</p>
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

export default newsFeedNode;
