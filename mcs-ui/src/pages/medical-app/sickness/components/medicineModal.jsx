import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

const { Option } = Select;

const SicknessModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  sicknessId,
}) => {
  return (
    <Modal
      className="new-modal"
      title={`Medicine Details`}
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
        <div className="field-label">Illness</div>
        <Form.Item
          name="Illness"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Status</div>
        <Form.Item
          name="Status"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
          initialValue={1}
        >
          <Select
            placeholder="Select Position Status"
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
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {sicknessId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default SicknessModal;
