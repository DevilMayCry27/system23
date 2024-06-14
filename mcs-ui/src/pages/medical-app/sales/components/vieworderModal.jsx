import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";

import MainTable from "../../../../components/maintable.jsx";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { currency } from "../../../../utils/formatter.js";
import { getMedicineOrderListAction } from "../../../../actions/medicineorder.js";

const ViewOrderModal = (props) => {
  const {
    form,
    isViewOrderModalVisible,
    showvieworderModal,
    orderId,

    medicineorderListLoading,
    medicineorderListSuccess,
    medicineorderListFailed,
    medicineorderListData,
    OnGetOrderList,
  } = props;
  const [data, setData] = useState([]);

  const getData = async () => {
    await OnGetOrderList(orderId);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [orderId]);

  useEffect(() => {
    if (medicineorderListSuccess) {
      setData(medicineorderListData);
    }

    if (medicineorderListFailed) {
      console.log("Get Order List Failed...");
    }
  }, [
    medicineorderListSuccess,
    medicineorderListFailed,
    medicineorderListData,
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

  const isLoadingAndDisabled = medicineorderListLoading;

  return (
    <Modal
      className="new-modal"
      title={`View Order`}
      visible={isViewOrderModalVisible}
      onOk={showvieworderModal}
      onCancel={showvieworderModal}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"55%"}
    >
      <Form name="new form" autoComplete="off" className="new-form" form={form}>
        <Row className="main-body medicine-list-page">
          <MainTable
            columns={columns}
            data={data}
            Loading={isLoadingAndDisabled}
          />
        </Row>
        <div className="modal-action-btns">
          <Form.Item>
            <Button className="submit-btn" onClick={() => showvieworderModal()}>
              {"DONE"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    medicineorderListLoading: state.medicineorder.medicineorderListLoading,
    medicineorderListSuccess: state.medicineorder.medicineorderListSuccess,
    medicineorderListFailed: state.medicineorder.medicineorderListFailed,
    medicineorderListData: state.medicineorder.medicineorderListData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    OnGetOrderList: (MorderId) =>
      dispatch(getMedicineOrderListAction(MorderId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderModal);
