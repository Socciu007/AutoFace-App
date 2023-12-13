<<<<<<< HEAD
import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
=======
import { Form, Input } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
<<<<<<< HEAD
        // style={{
        //   paddingRight: 24,
        // }}
=======
        style={{
          paddingRight: 24,
        }}
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

<<<<<<< HEAD
const expandableProps = () => {
  return {
    columnWidth: 48,
    expandedRowRender: (record) => (
      <p
        style={{
          margin: 0,
        }}
      >
        🎉 Expanded {record.address1}
      </p>
    ),
    rowExpandable: (record) => record.id % 2 === 0,
  };
};

export { EditableRow, EditableCell, expandableProps };
=======
export { EditableCell, EditableRow };
>>>>>>> d50fd2e0e8d44c7473451ae2742e0aec6a56548b
