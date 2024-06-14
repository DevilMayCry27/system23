import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

const { Option } = Select;

const SectionModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  sectionId,
  department,
}) => {
  return (
    <Modal
      className="new-modal"
      title={`Section Details`}
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
        <div className="field-label">Department</div>
        <Form.Item
          name="DepartmentID"
          rules={[
            {
              required: true,
              message: "Please select department!",
            },
          ]}
        >
          <Select placeholder="Select Department" className="select-field">
            {department.map((department) => (
              <Option key={department?.ID} value={department?.ID}>
                {department?.Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">Section Name</div>
        <Form.Item
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input section name!",
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
            },
          ]}
          initialValue={1}
        >
          <Select
            placeholder="Select Section Status"
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
              {sectionId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default SectionModal;
