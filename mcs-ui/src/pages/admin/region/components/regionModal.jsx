import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Message from "antd/lib/message";
const { Option } = Select;

const RegionModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  countryId,
  countries,
  regionNameSuccess,
  regionNameFailed,
  regionNameData,
  OnGetRegionDuplicate,
}) => {
  const [disable, setDisable] = useState(false);
  const [inputStatus, setInputStatus] = useState("");
  const handleRegionChange = () => {
    form.setFieldsValue({ RegionName: undefined }); // Reset region value
  };

  const onCheckNameIfExists = async (name) => {
    if (name.length) {
      await OnGetRegionDuplicate(name);
    }
  };

  useEffect(() => {
    if (regionNameSuccess) {
      setDisable(false);
      setInputStatus("");
    }

    if (regionNameFailed) {
      Message.error("Region Name Already Exists!");
      setInputStatus("error");
      setDisable(true);
    }
  }, [regionNameSuccess, regionNameFailed, regionNameData]);

  return (
    <Modal
      className="new-modal"
      title={`User Details`}
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
        <div className="field-label">Country</div>
        <Form.Item
          name="CountryId"
          rules={[
            {
              required: true,
              message: "Please select country!",
            },
          ]}
        >
          <Select
            placeholder="Select Country"
            className="select-field"
            onChange={handleRegionChange}
          >
            {countries.map((countries) => (
              <Option key={countries?.ID} value={countries?.ID}>
                {countries?.CountryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">Region Name</div>
        <Form.Item
          name="RegionName"
          rules={[
            {
              required: true,
              message: "Please input Region name!",
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
              {countryId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default RegionModal;
