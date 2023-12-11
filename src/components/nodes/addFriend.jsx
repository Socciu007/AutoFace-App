import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function addFriendNode({ data, isConnectable }) {
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
            fill="#9E34C3"
          />
        </svg>
        <div className="content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
          >
            <path
              d="M6.18348 0.000808673C6.76314 0.00102223 7.33707 0.115636 7.87235 0.33808C8.40764 0.560524 8.89376 0.886425 9.30285 1.2971C9.71194 1.70778 10.036 2.19516 10.2563 2.7313C10.4767 3.26744 10.5891 3.8418 10.5871 4.42146C10.5838 6.77368 8.71719 8.83826 6.17138 8.83716C3.61127 8.83716 1.74523 6.75223 1.75788 4.39891C1.77163 1.84705 3.88626 -0.0448388 6.18348 0.000808673ZM6.16038 7.02227C7.61285 7.02722 8.80023 5.87008 8.78923 4.41871C8.77658 2.92335 7.60515 1.81076 6.18953 1.80031C4.82725 1.78986 3.56397 2.84855 3.56452 4.40991C3.56287 6.11922 4.99389 7.06296 6.16038 7.02227Z"
              fill="#9E34C3"
            />
            <path
              d="M6.06271 9.66016C7.74011 9.6992 9.20963 10.0275 10.5048 10.9317C11.4326 11.5795 12.0997 12.4166 12.2972 13.5666C12.3379 13.802 12.3764 14.0401 12.3203 14.2815C12.2762 14.4808 12.1666 14.6596 12.009 14.7892C11.8514 14.9188 11.6548 14.9918 11.4508 14.9965C11.2429 14.9972 11.0413 14.9257 10.8802 14.7944C10.7191 14.663 10.6086 14.4798 10.5675 14.276C10.534 14.1111 10.5362 13.9334 10.4999 13.7668C10.3811 13.2273 10.0362 12.8384 9.61551 12.5134C8.8901 11.953 8.04864 11.6675 7.15274 11.5482C5.97801 11.392 4.82527 11.4855 3.71984 11.9458C3.18802 12.1658 2.70459 12.4633 2.31687 12.8973C2.02043 13.2273 1.82574 13.6018 1.80979 14.0616C1.79605 14.474 1.60741 14.7875 1.20813 14.9382C0.858898 15.0702 0.543765 14.9866 0.27758 14.7347C0.0344932 14.5037 -0.0221527 14.2073 0.00699571 13.8834C0.11699 12.6184 0.785751 11.6912 1.7812 10.9735C2.77664 10.2558 3.91068 9.88069 5.12226 9.7377C5.47534 9.697 5.83117 9.67886 6.06271 9.66016Z"
              fill="#9E34C3"
            />
            <path
              d="M13.0537 7.92005C13.3286 7.92005 13.6036 7.91455 13.8786 7.9228C14.0238 7.9272 14.0689 7.87055 14.0673 7.72921C14.0618 7.22104 14.0634 6.71232 14.0673 6.20415C14.07 5.67178 14.4352 5.28625 14.9384 5.2813C15.4686 5.27635 15.8558 5.65913 15.8613 6.20195C15.8657 6.69692 15.869 7.19189 15.8613 7.68686C15.858 7.8634 15.9064 7.9294 16.0917 7.925C16.5867 7.91345 17.0816 7.91895 17.5728 7.9217C18.0936 7.9217 18.4918 8.30668 18.4978 8.7989C18.5001 8.91961 18.4781 9.03955 18.4332 9.15161C18.3883 9.26368 18.3213 9.36558 18.2363 9.45128C18.1512 9.53699 18.0499 9.60474 17.9382 9.65054C17.8264 9.69634 17.7067 9.71924 17.586 9.7179C17.0855 9.7256 16.585 9.7256 16.0845 9.7179C15.9124 9.71515 15.8591 9.7729 15.8618 9.94394C15.8695 10.4521 15.8717 10.9608 15.8618 11.469C15.8606 11.6864 15.7805 11.896 15.6364 12.0589C15.4923 12.2217 15.294 12.3267 15.0783 12.3543C14.8626 12.3819 14.6442 12.3303 14.4637 12.2091C14.2833 12.0878 14.1529 11.9052 14.097 11.695C14.0746 11.6014 14.0655 11.5052 14.07 11.4091C14.07 10.9284 14.0623 10.4472 14.0733 9.96648C14.0777 9.78114 14.0277 9.7124 13.8324 9.7168C13.3325 9.72945 12.8315 9.72615 12.331 9.7168C12.1301 9.71765 11.9346 9.65134 11.7757 9.5284C11.6167 9.40546 11.5034 9.23293 11.4538 9.03823C11.4041 8.84353 11.4209 8.63781 11.5015 8.45375C11.5821 8.2697 11.7219 8.11785 11.8987 8.02234C12.0191 7.95504 12.1551 7.92053 12.2931 7.92225C12.5466 7.92225 12.8001 7.92225 13.0537 7.92225V7.92005Z"
              fill="#9E34C3"
            />
          </svg>
          <div className="content-right">
            <div className="right-top">
              <p>Add friend</p>
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

export default addFriendNode;
