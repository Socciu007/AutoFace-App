import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function viewNotiNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="40" viewBox="0 0 5 40" fill="none">
          <path d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z" fill="#34A9C3" />
        </svg>
        <div className="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path
              d="M6.99847 1.72266C4.53077 1.72266 2.52531 3.72811 2.52531 6.19579V8.35034C2.52531 8.80511 2.33148 9.49845 2.10037 9.88612L1.24302 11.3101C0.713695 12.1898 1.079 13.1664 2.04818 13.4944C5.26138 14.568 8.72808 14.568 11.9413 13.4944C12.8434 13.1962 13.2385 12.1301 12.7464 11.3101L11.8891 9.88612C11.6654 9.49845 11.4716 8.80511 11.4716 8.35034V6.19579C11.4716 3.73557 9.4587 1.72266 6.99847 1.72266Z"
              stroke="#34A9C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M8.37757 1.93936C8.14646 1.87226 7.90789 1.82007 7.66187 1.79025C6.94617 1.70079 6.26029 1.75298 5.61914 1.93936C5.83534 1.38767 6.37212 1 6.99836 1C7.6246 1 8.16137 1.38767 8.37757 1.93936Z"
              stroke="#34A9C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.23484 13.7637C9.23484 14.9938 8.22838 16.0002 6.99827 16.0002C6.38694 16.0002 5.82035 15.7468 5.41778 15.3442C5.0152 14.9416 4.76172 14.375 4.76172 13.7637"
              stroke="#34A9C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>View noti</p>
              <svg
                onClick={onButtonClick}
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
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

export default viewNotiNode;
