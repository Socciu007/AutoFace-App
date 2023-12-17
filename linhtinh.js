export function handleInputChange(event, setValues, prefix, values) {
  const inputValue = event.target.value;
  const isNumber = /^\d*$/.test(inputValue);

  if (isNumber && inputValue.length < 6) {
    const newValue = inputValue === '' ? '' : parseInt(inputValue, 10);

    if (values[`${prefix}${event.target.name}`] !== newValue) {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}${event.target.name}`]: newValue,
      }));
    }
  }
}

// Hook to manage range values
export function useRangeValues(initialValues, prefix) {
  const [values, setValues] = useState(initialValues);

  const createHandlers = () => ({
    handleIncrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] + 1,
      }));
    },
    handleDecrement: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}Start`]: prevValues[`${prefix}Start`] > 0 ? prevValues[`${prefix}Start`] - 1 : 0,
      }));
    },
    handleIncrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] + 1,
      }));
    },
    handleDecrementEnd: () => {
      setValues((prevValues) => ({
        ...prevValues,
        [`${prefix}End`]: prevValues[`${prefix}End`] > 0 ? prevValues[`${prefix}End`] - 1 : 0,
      }));
    },
    handleInputChangeStart: (event) => handleInputChange(event, setValues, prefix, values),
    handleInputChangeEnd: (event) => handleInputChange(event, setValues, prefix, values),
  });

  return { ...values, ...createHandlers() };
}

const initialValues = {
  PostStart: 5,
  PostEnd: 10,
  DelayTimeStart: 5,
  DelayTimeEnd: 10,
  RequestsStart: 5,
  RequestsEnd: 10,
  StopTime: 10,
};

const postValues = useRangeValues(initialValues, 'Post');
const delayTimeValues = useRangeValues(initialValues, 'DelayTime');
const requestsValues = useRangeValues(initialValues, 'Requests');
const stopTimeValues = useRangeValues(initialValues, 'StopTime');
<div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={requestsValues.handleIncrement} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={requestsValues.handleDecrement} />
                        </div>
                        <input
                          type="text"
                          value={requestsValues.RequestsStart}
                          onChange={(event) => requestsValues.handleInputChangeStart(event)}
                        />
                      </div>
                      <span>to</span>
                      <div className="component-item__number">
                        <div className="component-item__number__icon">
                          <img src={iconIncrease} alt="Increase icon" onClick={requestsValues.handleIncrementEnd} />
                          <img src={iconDecrease} alt="Decrease icon" onClick={requestsValues.handleDecrementEnd} />
                        </div>
                        <input
                          type="text"
                          value={requestsValues.RequestsEnd}
                          onChange={(event) => requestsValues.handleInputChangeEnd(event)}
                        />
                      </div>
