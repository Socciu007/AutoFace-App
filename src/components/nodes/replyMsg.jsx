import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function replyMsgNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="40" viewBox="0 0 5 40" fill="none">
          <path d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z" fill="#343AC3" />
        </svg>
        <div className="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M13.8033 3.19671C10.8743 0.267764 6.12564 0.267764 3.1967 3.19671C0.661501 5.7319 0.320658 9.63058 2.17437 12.5324L1.73491 14.7897C1.67998 15.0718 1.92819 15.32 2.21035 15.2651L4.46764 14.8256C7.36942 16.6793 11.2681 16.3385 13.8033 13.8033C16.7322 10.8744 16.7322 6.12565 13.8033 3.19671Z"
              stroke="#343AC3"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M5.27136 8.26989L5.27132 8.26996L8.54434 10.4487L8.55193 10.4538L8.55188 10.4538C8.5613 10.4604 8.56672 10.4625 8.57012 10.4633C8.57159 10.4626 8.57358 10.4616 8.57611 10.4601C8.59881 10.4472 8.60758 10.4363 8.6133 10.427C8.61505 10.4242 8.61598 10.4223 8.61642 10.4213L8.61699 10.4198L8.61709 10.4192C8.61715 10.4188 8.61729 10.4176 8.61729 10.4155V9.32124V8.82124H9.11729C9.9236 8.82124 10.6581 9.05497 11.3051 9.52141C11.5096 9.66886 11.6954 9.83099 11.8621 10.0075C11.8126 9.65886 11.6982 9.33307 11.519 9.02639C11.2692 8.59909 10.9337 8.26355 10.5064 8.01383C10.083 7.7664 9.62324 7.64248 9.11729 7.64248H8.61729V7.14248V6.04822C8.61729 6.04608 8.61715 6.0449 8.61709 6.04448L8.61699 6.04391L8.61642 6.04245C8.61598 6.04146 8.61505 6.03955 8.6133 6.0367C8.60758 6.02741 8.59881 6.01657 8.57611 6.0036M5.27136 8.26989L8.57611 6.0036M5.27136 8.26989L5.26378 8.26504C5.25775 8.26118 5.2537 8.25809 5.25118 8.25598C5.25062 8.2522 5.25 8.24594 5.25 8.23675C5.25 8.22066 5.25154 8.21116 5.25248 8.20685C5.25459 8.20505 5.25819 8.20226 5.26378 8.19868L5.26383 8.19875L5.27132 8.19376L8.54434 6.015L8.54439 6.01507L8.55188 6.00988C8.5613 6.00337 8.56672 6.00122 8.57012 6.00046M5.27136 8.26989L8.57012 6.00046M8.57611 6.0036C8.57358 6.00215 8.57159 6.00114 8.57012 6.00046M8.57611 6.0036L8.57012 6.00046"
              fill="#343AC3"
              stroke="#343AC3"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Reply msg</p>
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

export default replyMsgNode;
