import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Message from "antd/lib/message";
const { Option } = Select;

const ProvinceModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  regions,
  regionId,
  provinceId,
  provinceNameSuccess,
  provinceNameFailed,
  provinceNameData,
  OnGetProvinceDuplicate,
}) => {
  const [disable, setDisable] = useState(false);
  const [inputStatus, setInputStatus] = useState("");

  const onCheckNameIfExists = async (name) => {
    if (name.length) {
      await OnGetProvinceDuplicate(name);
    }
  };

  useEffect(() => {
    if (provinceNameSuccess) {
      setDisable(false);
      setInputStatus("");
    }

    if (provinceNameFailed) {
      Message.error("Province Name Already Exists!");
      setInputStatus("error");
      setDisable(true);
    }
  }, [provinceNameSuccess, provinceNameFailed, provinceNameData]);

  return (
    <Modal
      className="new-modal"
      title={`Province Details`}
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
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <div className="field-label">Region</div>
        <Form.Item
          name="RegionId"
          rules={[
            {
              required: true,
              message: "Please select region!",
            },
          ]}
        >
          <Select placeholder="Select Region" className="select-field">
            {regions.map((regions) => (
              <Option key={regions?.ID} value={regions?.ID}>
                {regions?.RegionName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">Province Name</div>
        <Form.Item
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input Province name!",
            },
          ]}
        >
          <Input
            type="text"
            status={inputStatus}
            onChange={(e) => onCheckNameIfExists(e.target.value)}
            onInput={(e) =>
              (e.target.value = ("" + e.target.value).toUpperCase())
            }
          />
        </Form.Item>
        <div className="field-label">Status</div>
        <Form.Item
          name="Status"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={1}
        >
          <Select
            placeholder="Select User Status"
            className="select-field"
            defaultValue={1}
          >
            <Option value={1}>ACTIVE</Option>
            <Option value={0}>INACTIVE</Option>
          </Select>
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
            <Button
              htmlType="submit"
              className="submit-btn"
              loading={loading}
              disabled={disable}
            >
              {provinceId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ProvinceModal;
