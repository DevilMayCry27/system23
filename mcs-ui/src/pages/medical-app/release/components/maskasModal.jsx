import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";

import MainTable from "../../../../components/maintable.jsx";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { currency } from "../../../../utils/formatter.js";
import { getMedicineApprovalListAction } from "../../../../actions/medicinerelease.js";

const MarkAsModal = (props) => {
  const {
    form,
    isModalVisible,
    showModal,
    loading2,
    orderid,
    userlevel,
    setIsModalVisible,
    onSubmit,

    medicineapprovalListLoading,
    medicineapprovalListSuccess,
    medicineapprovalListFailed,
    medicineapprovalListData,
    OnGetApproveOrderList,
  } = props;
  const [data, setData] = useState([]);
  const result = userlevel === "1" ? "APPROVE" : "RELEASE";
  const getData = async () => {
    await OnGetApproveOrderList(orderid);
  };
  console.log(userlevel);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [orderid]);

  useEffect(() => {
    if (medicineapprovalListSuccess) {
      setData(medicineapprovalListData);
    }

    if (medicineapprovalListFailed) {
      console.log("Get Order List Failed...");
    }
  }, [
    medicineapprovalListSuccess,
    medicineapprovalListFailed,
    medicineapprovalListData,
  ]);

  const columns = [
    {
      title: "QUANTITY",
      dataIndex: "Qty",
      key: "Qty",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">{value + " " + "PC"}</div>
      ),
    },
    {
      title: "ITEMS / DESCRIPTION	",
      dataIndex: "Item",
      key: "Item",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "UNIT PRICE",
      dataIndex: "Price",
      key: "Price",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{"₱" + " " + currency(value)}</div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{"₱" + " " + currency(value)}</div>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "TypeId",
      key: "TypeId",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{value === 1 ? "PURCHASE" : "SUPPLY"}</div>
      ),
    },
  ];

  const isLoadingAndDisabled = medicineapprovalListLoading;

  return (
    <Modal
      className="new-modal"
      title={`Approve Order`}
      visible={isModalVisible}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"55%"}
    >
      <Form
        name="new form"
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Row className="main-body medicine-list-page">
          <MainTable
            columns={columns}
            data={data}
            Loading={isLoadingAndDisabled}
          />
        </Row>
        <div className="modal-action-btns">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showModal()}
              loading={loading2}
            >
              CANCEL
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading2}>
              {result}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    medicineapprovalListLoading:
      state.medicinerelease.medicineapprovalListLoading,
    medicineapprovalListSuccess:
      state.medicinerelease.medicineapprovalListSuccess,
    medicineapprovalListFailed:
      state.medicinerelease.medicineapprovalListFailed,
    medicineapprovalListData: state.medicinerelease.medicineapprovalListData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    OnGetApproveOrderList: (NorderID) =>
      dispatch(getMedicineApprovalListAction(NorderID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkAsModal);
