import Form from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

const { Option } = Select;

const MedicineModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  medicine,
  uoms,
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
        <div className="field-label">Code</div>
        <Form.Item
          name="Code"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Generic Name</div>
        <Form.Item
          name="GenericName"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <div className="field-label">Label Claim</div>
        <Form.Item
          name="LabelClaim"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <div className="field-label">Unit</div>
        <Form.Item
          name="UomID"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Select placeholder="Select Uom" className="select-field">
            {uoms?.map((uom) => (
              <Option key={uom?.ID} value={uom?.ID}>
                {uom?.Unit}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">Unit Price</div>
        <Form.Item
          name="UnitPrice"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
          initialValue={0}
        >
          <InputNumber className="input-number" />
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
              {medicine?.ID ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default MedicineModal;
