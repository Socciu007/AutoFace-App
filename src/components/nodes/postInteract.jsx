import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function postInteractNode({ data, isConnectable }) {
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
            fill="#A6C334"
          />
        </svg>
        <div className="content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none"
          >
            <path
              d="M13 15H3.18182C1.98182 15 1 14.0182 1 12.8182V5.18182C1 3.98182 1.98182 3 3.18182 3H13C14.2 3 15.1818 3.98182 15.1818 5.18182V12.8182C15.1818 14.0182 14.2 15 13 15Z"
              stroke="#A6C334"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.99929 6.27246H3.72656V9.54519H6.99929V6.27246Z"
              stroke="#A6C334"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.18164 9.5459H12.4544"
              stroke="#A6C334"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.72656 11.7275H12.4538"
              stroke="#A6C334"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.4676 3.95601L20.8743 2.36272L21.5116 1.7254C21.5684 1.66848 21.609 1.59739 21.6291 1.5195C21.6492 1.44162 21.6482 1.35976 21.626 1.28244C21.6038 1.20511 21.5613 1.13513 21.503 1.07975C21.4446 1.02437 21.3725 0.985604 21.2942 0.967478L17.1516 0.0114715C17.0771 -0.00565622 16.9995 -0.00357521 16.926 0.0175191C16.8526 0.0386134 16.7857 0.0780288 16.7317 0.132064C16.6776 0.186099 16.6382 0.252982 16.6171 0.32643C16.596 0.399879 16.594 0.477484 16.6111 0.551958L17.5671 4.69454C17.5852 4.77291 17.6239 4.84501 17.6793 4.90336C17.7347 4.96171 17.8047 5.00417 17.882 5.02636C17.9593 5.04854 18.0412 5.04963 18.1191 5.02952C18.197 5.0094 18.2681 4.96881 18.325 4.91196L18.9623 4.27464L20.5556 5.86796C20.5974 5.90982 20.6471 5.94303 20.7018 5.96568C20.7565 5.98834 20.8151 6 20.8743 6C20.9334 6 20.9921 5.98834 21.0467 5.96568C21.1014 5.94303 21.1511 5.90982 21.1929 5.86796L22.4676 4.59334C22.5094 4.5515 22.5426 4.50182 22.5653 4.44714C22.5879 4.39247 22.5996 4.33386 22.5996 4.27467C22.5996 4.21549 22.5879 4.15688 22.5653 4.10221C22.5426 4.04753 22.5094 3.99785 22.4676 3.95601ZM20.8743 4.91199L19.281 3.31869C19.2391 3.27683 19.1894 3.24362 19.1348 3.22097C19.0801 3.19831 19.0215 3.18665 18.9623 3.18665C18.9031 3.18665 18.8445 3.19831 18.7898 3.22097C18.7352 3.24362 18.6855 3.27683 18.6436 3.31869L18.2625 3.69985L17.6516 1.05196L20.2994 1.66288L19.9183 2.04404C19.8764 2.08588 19.8432 2.13556 19.8206 2.19024C19.7979 2.24491 19.7862 2.30352 19.7862 2.3627C19.7862 2.42189 19.7979 2.48049 19.8206 2.53517C19.8432 2.58985 19.8764 2.63952 19.9183 2.68136L21.5116 4.27467L20.8743 4.91199Z"
              fill="#A6C334"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Post interact</p>
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

export default postInteractNode;
