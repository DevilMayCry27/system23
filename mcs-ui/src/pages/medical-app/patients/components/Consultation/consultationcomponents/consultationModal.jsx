import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import { getItem } from "../../../../../../utils/storage.js";
const { Option } = Select;

const ConsultationModal = ({
  form,
  isModalVisiblecrud,
  showModalcrud,
  onSubmitCrud,
  loading,
  consultationId,
  sickness,
}) => {
  const [userName, setUserName] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await getItem("hcp-app");
      return response?.user?.name || "";
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "";
    }
  };

  useEffect(() => {
    fetchUserData().then((name) => {
      setUserName(name);
    });
  });

  return (
    <Modal
      className="new-modal"
      title={`Consultation Details`}
      visible={isModalVisiblecrud}
      onOk={showModalcrud}
      onCancel={showModalcrud}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
    >
      <Form
        name="new form"
        onFinish={onSubmitCrud}
        autoComplete="off"
        className="new-form"
        form={form}
        initialValues={{ Physician: userName }}
      >
        <div className="field-label">Chief Complaint</div>
        <Form.Item
          name="Illness"
          rules={[
            {
              required: true,
              message: "Please select complaint!",
            },
          ]}
        >
          <Select
            placeholder="Select complaint"
            className="select-field"
            showSearch
          >
            {sickness.map((sickness) => (
              <Option key={sickness?.ID} value={sickness?.Illness}>
                {sickness?.Illness}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">BP</div>
        <Form.Item
          name="Bp"
          rules={[
            {
              required: true,
              message: "Please input BP!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Temp</div>
        <Form.Item
          name="Temp"
          rules={[
            {
              required: true,
              message: "Please input temp!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">RR</div>
        <Form.Item
          name="Rr"
          rules={[
            {
              required: true,
              message: "Please input RR!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">PR</div>
        <Form.Item
          name="Pr"
          rules={[
            {
              required: true,
              message: "Please input Pr!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Diagnosis</div>
        <Form.Item
          name="Diagnosis"
          rules={[
            {
              required: true,
              message: "Please input Diagnosis!",
            },
          ]}
        >
          <Input maxLength={60} />
        </Form.Item>
        <div className="field-label">Recommendation</div>
        <Form.Item
          name="Recommendation"
          rules={[
            {
              required: true,
              message: "Please input Recommendation!",
            },
          ]}
        >
          <Input maxLength={60} />
        </Form.Item>
        <Form.Item name="Physician" hidden>
          <Input />
        </Form.Item>
        <div className="modal-action-btns">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showModalcrud()}
              loading={loading}
            >
              CANCEL
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {consultationId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ConsultationModal;
