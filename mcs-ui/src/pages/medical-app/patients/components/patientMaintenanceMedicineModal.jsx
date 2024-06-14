import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { Row } from "antd";

import MainTable from "../../../../components/maintable.jsx";

const columns = [
  {
    title: "DATE",
    dataIndex: "EmployeeCode",
    key: "EmployeeCode",
    align: "center",
    width: 225,
    render: (value, row) => <div className="field-text">{value}</div>,
  },
  {
    title: "MEDICINE",
    dataIndex: "EmployeeCode",
    key: "EmployeeCode",
    align: "center",
    width: 225,
    render: (value, row) => <div className="field-text">{value}</div>,
  },
  {
    title: "DOSAGE",
    dataIndex: "EmployeeCode",
    key: "EmployeeCode",
    align: "center",
    width: 225,
    render: (value, row) => <div className="field-text">{value}</div>,
  },
  {
    title: "ACTIONS",
    dataIndex: "ID",
    key: "ID",
    align: "center",
    width: 280,
    // render: (value, row) => (
    //   <TableRowAction
    //     showModal={() => showModal(row)}
    //     showModalView={() => showModalView(row)}
    //     confirmDelete={() => confirmDelete(value)}
    //     canView={getModuleAccess(access?.admin, module?.patients)?.view}
    //     canUpdate={getModuleAccess(access?.admin, module?.patients)?.update}
    //     canDelete={getModuleAccess(access?.admin, module?.patients)?.delete}
    //   />
    // ),
  },
];

const PatientMaintenanceMedicineModal = ({
  form,
  isModalVisibles,
  showModal,
  onSubmit,
  loading,
  // userId,
}) => {
  return (
    <Modal
      className="new-modal"
      title={`Patient Maintenance Medicine`}
      visible={isModalVisibles}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
      width={"65%"}
    >
      <Form
        name="new form"
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Row span="24" gutter={[16, 16]} justify="center">
          <MainTable
            columns={columns}
            // data={data}
            // isLoading={isLoadingAndDisabled}
          />
        </Row>
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
          {/* <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {userId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item> */}
        </div>
      </Form>
    </Modal>
  );
};

export default PatientMaintenanceMedicineModal;
