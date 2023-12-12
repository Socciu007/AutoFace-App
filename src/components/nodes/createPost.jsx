import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function createPostNode({ data: { label, onButtonClick }, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="updater-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className="node">
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="40" viewBox="0 0 5 40" fill="none">
          <path d="M0 5C0 2.23858 2.23858 0 5 0V40C2.23858 40 0 37.7614 0 35V5Z" fill="#EE7E8B" />
        </svg>
        <div className="content">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
            <path
              d="M13 15H3.18182C1.98182 15 1 14.0182 1 12.8182V5.18182C1 3.98182 1.98182 3 3.18182 3H13C14.2 3 15.1818 3.98182 15.1818 5.18182V12.8182C15.1818 14.0182 14.2 15 13 15Z"
              stroke="#EE7E8B"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.99929 6.27246H3.72656V9.54519H6.99929V6.27246Z"
              stroke="#EE7E8B"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.18164 9.5459H12.4544"
              stroke="#EE7E8B"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.72656 11.7275H12.4538"
              stroke="#EE7E8B"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.9019 2.11104C18.1219 2.11104 18.3419 2.10664 18.5619 2.11324C18.678 2.11676 18.7141 2.07144 18.7128 1.95837C18.7084 1.55183 18.7097 1.14485 18.7128 0.738316C18.715 0.31242 19.0071 0.00399774 19.4097 3.79603e-05C19.8338 -0.00392182 20.1436 0.302301 20.148 0.736556C20.1515 1.13253 20.1541 1.52851 20.148 1.92449C20.1453 2.06572 20.1841 2.11852 20.3323 2.115C20.7283 2.10576 21.1243 2.11016 21.5172 2.11236C21.9338 2.11236 22.2524 2.42034 22.2572 2.81412C22.2591 2.91069 22.2415 3.00664 22.2056 3.09629C22.1696 3.18594 22.116 3.26747 22.048 3.33603C21.98 3.40459 21.8989 3.4588 21.8095 3.49543C21.7201 3.53207 21.6243 3.5504 21.5278 3.54932C21.1274 3.55548 20.727 3.55548 20.3266 3.54932C20.1889 3.54712 20.1462 3.59332 20.1484 3.73015C20.1546 4.13669 20.1563 4.54366 20.1484 4.9502C20.1475 5.12415 20.0834 5.29184 19.9681 5.4221C19.8528 5.55237 19.6942 5.63635 19.5216 5.65845C19.3491 5.68055 19.1744 5.63926 19.03 5.54226C18.8856 5.44525 18.7813 5.29912 18.7366 5.13103C18.7187 5.05616 18.7114 4.97914 18.715 4.90224C18.715 4.5177 18.7088 4.13273 18.7176 3.74819C18.7211 3.59992 18.6811 3.54492 18.5249 3.54844C18.125 3.55856 17.7242 3.55592 17.3238 3.54844C17.163 3.54912 17.0067 3.49607 16.8795 3.39772C16.7524 3.29936 16.6617 3.16135 16.622 3.00558C16.5823 2.84982 16.5957 2.68525 16.6602 2.538C16.7247 2.39076 16.8365 2.26928 16.978 2.19287C17.0743 2.13903 17.1831 2.11142 17.2934 2.1128C17.4963 2.1128 17.6991 2.1128 17.9019 2.1128V2.11104Z"
              fill="#EE7E8B"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Create post</p>
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

export default createPostNode;
