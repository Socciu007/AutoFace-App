import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function deletePostNode({ data, isConnectable }) {
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
            fill="#34C3C3"
          />
        </svg>
        <div className="content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
          >
            <path
              d="M12.1312 15.0003H3.02385C1.91073 15.0003 1 14.0896 1 12.9765V5.89299C1 4.77987 1.91073 3.86914 3.02385 3.86914H12.1312C13.2443 3.86914 14.155 4.77987 14.155 5.89299V12.9765C14.155 14.0896 13.2443 15.0003 12.1312 15.0003Z"
              stroke="#34C3C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.56507 6.9043H3.5293V9.94007H6.56507V6.9043Z"
              stroke="#34C3C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.58984 9.94043H11.6256"
              stroke="#34C3C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.5293 11.9639H11.6247"
              stroke="#34C3C3"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5672 2.23885C17.7115 2.38314 17.8587 2.52455 17.9986 2.67317C18.0725 2.75166 18.1259 2.7456 18.1992 2.67057C18.463 2.40103 18.7308 2.13496 18.9994 1.87033C19.2802 1.59242 19.6742 1.58174 19.9408 1.8432C20.2216 2.1188 20.2239 2.52281 19.942 2.81053C19.6845 3.07257 19.4265 3.33402 19.1628 3.58971C19.0684 3.68061 19.0592 3.74064 19.1587 3.83558C19.4245 4.08925 19.6814 4.35186 19.9376 4.61101C20.2109 4.8843 20.2178 5.29524 19.9627 5.5567C19.9006 5.62124 19.8261 5.67265 19.7438 5.70788C19.6614 5.74311 19.5728 5.76144 19.4832 5.76179C19.3936 5.76214 19.3048 5.7445 19.2222 5.70992C19.1395 5.67533 19.0647 5.62451 19.002 5.56045C18.7354 5.30188 18.4728 5.03927 18.2142 4.77262C18.1253 4.68085 18.067 4.68316 17.9787 4.77435C17.7161 5.04504 17.4503 5.31314 17.1785 5.57459C17.0637 5.68806 16.9117 5.75602 16.7507 5.76584C16.5896 5.77567 16.4305 5.72669 16.3028 5.62801C16.1751 5.52934 16.0876 5.38766 16.0565 5.22933C16.0255 5.07099 16.0529 4.90675 16.1338 4.76714C16.1712 4.70629 16.2169 4.65101 16.2697 4.60293C16.5219 4.35071 16.7704 4.09416 17.0284 3.8477C17.128 3.75276 17.1378 3.69043 17.033 3.59029C16.7641 3.3346 16.5029 3.06997 16.2452 2.80245C16.1393 2.69746 16.0715 2.5601 16.0527 2.41219C16.0338 2.26428 16.0648 2.1143 16.1409 1.98607C16.217 1.85784 16.3338 1.75872 16.4727 1.70444C16.6116 1.65016 16.7646 1.64385 16.9075 1.6865C17.006 1.71437 17.0955 1.76761 17.1669 1.84089C17.3 1.97393 17.433 2.10696 17.566 2.24L17.5672 2.23885Z"
              fill="#34C3C3"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Delete post</p>
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

export default deletePostNode;
