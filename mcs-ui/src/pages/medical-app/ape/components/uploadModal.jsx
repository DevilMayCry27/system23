import React, { useState, useEffect } from "react";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Upload from "antd/lib/upload";
import InboxOutlined from "@ant-design/icons/InboxOutlined";

const UploadModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
}) => {
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
    },
    fileList: fileList,
  };

  const onCreateData = (value) => {
    let temp = { ...value };
    const data = {
      ...temp,
      Filelists: fileList,
    };
    console.log(data, "CREATE DATA");
    setFileList([]);
    onSubmit(data);
  };

  return (
    <Modal
      className="new-modal"
      title={`UPLOAD APE RECORD`}
      visible={isModalVisible}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
    >
      <Form
        name="new form"
        onFinish={onCreateData}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Form.Item
          name="ProfilePic"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Upload.Dragger multiple={true} name="file" maxCount={10} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support a single or multiple uploads.
            </p>
          </Upload.Dragger>
        </Form.Item>
        <div className="modal-action-btns">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showModal()}
              loading={loading}
            >
              CANCEL
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {"UPLOAD"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UploadModal;
