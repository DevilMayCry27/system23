import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";
import { mmDdYyyy } from "../../../utils/formatter.js";

import { getAllMedicineOrderListAction } from "../../../actions/medicineorder.js";

import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

import PlaceOrderModal from "./components/placeorderModal.jsx";
import ViewOrderModal from "./components/vieworderModal.jsx";


const SalesListPage = (props) => {
  const {
    access,
    allmedicineorderListLoading,
    allmedicineorderListSuccess,
    allmedicineorderListFailed,
    allmedicineorderListData,
    OnGetAllMedicineOrderList,
  } = props;
  const [form] = Form.useForm();
  const [formorder] = Form.useForm();
  const [data, setData] = useState([]);
  const [medicinesorder, setMedicinesOrder] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [isViewOrderModalVisible, setIsViewOrderModalVisible] = useState(false);
  const [isplaceorderVisible, setIsPlaceOrderVisible] = useState(false);

  const showvieworderModal = (values = {}) => {
    setOrderId(values?.NID);
    setIsViewOrderModalVisible(!isViewOrderModalVisible);
    form.resetFields();
    getData();
  };

  const showPlaceOrderModal = async (values = {}) => {
    getData();
    formorder.resetFields();
    setIsPlaceOrderVisible(!isplaceorderVisible);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = medicinesorder.filter(
        (item) =>
          item.OrderName.toLowerCase().includes(text.toLowerCase()) ||
          item.Qty.toLowerCase().includes(text.toLowerCase()) ||
          item.Item.toLowerCase().includes(text.toLowerCase()) ||
          item.Price.toLowerCase().includes(text.toLowerCase()) ||
          item.Amount.toLowerCase().includes(text.toLowerCase()) ||
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()) ||
          item.Department.toLowerCase().includes(text.toLowerCase()) ||
          item.StatusName.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(medicinesorder);
    }
  };

  const getData = async () => {
    await OnGetAllMedicineOrderList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allmedicineorderListSuccess) {
      setData(allmedicineorderListData);
      setMedicinesOrder(allmedicineorderListData);
    }

    if (allmedicineorderListFailed) {
      console.log("Get Medicine List Failed...");
    }
  }, [
    allmedicineorderListSuccess,
    allmedicineorderListFailed,
    allmedicineorderListData,
  ]);

  const columns = [
    {
      title: "DATE",
      dataIndex: "CreatedAt",
      key: "CreateAt",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
      ),
    },
    {
      title: "ORDER ID",
      dataIndex: "OrderId",
      key: "OrderId",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "FIRST NAME",
      dataIndex: "FirstName",
      key: "FirstName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "MIDDLE NAME",
      dataIndex: "MiddleName",
      key: "MiddleName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "LAST NAME",
      dataIndex: "LastName",
      key: "LastName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "DEPARTMENT",
      dataIndex: "Department",
      key: "Department",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "TYPE",
      dataIndex: "OrderName",
      key: "OrderName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "STATUS",
      dataIndex: "StatusName",
      key: "StatusName",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div
          className="field-text"
          style={{
            color:
              value === "REJECTED"
                ? "red"
                : value === "APPROVED"
                ? "green"
                : value === "PENDING"
                ? "violet"
                : value === "RELEASED"
                ? "blue"
                : "black",
            textAlign: "center",
          }}
        >
          {value}
        </div>
      ),
    },
    {
      title: "REMARKS",
      dataIndex: "Remarks",
      key: "Remarks",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "ACTIONS",
      dataIndex: "NID",
      key: "NID",
      align: "center",
      width: 200,
      render: (value, row) => (
        <TableRowAction
          showModalView={() => showvieworderModal(row)}
          canView={getModuleAccess(access?.reference, module?.sales)?.update}
        />
      ),
    },
  ];
  const isLoadingAndDisabled = allmedicineorderListLoading;

  return (
    <Row className="main-body medicine-list-page">
      <PageAction
        pageName="Sales / Releases"
        onSearch={onSearch}
        showModal={showPlaceOrderModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.reference, module?.sales)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <ViewOrderModal
        form={form}
        isViewOrderModalVisible={isViewOrderModalVisible}
        showvieworderModal={showvieworderModal}
        orderId={orderId}
      />
      <PlaceOrderModal
        isplaceorderVisible={isplaceorderVisible}
        showPlaceOrderModal={showPlaceOrderModal}
        access={access}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    allmedicineorderListLoading:
      state.medicineorder.allmedicineorderListLoading,
    allmedicineorderListSuccess:
      state.medicineorder.allmedicineorderListSuccess,
    allmedicineorderListFailed: state.medicineorder.allmedicineorderListFailed,
    allmedicineorderListData: state.medicineorder.allmedicineorderListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetAllMedicineOrderList: () => dispatch(getAllMedicineOrderListAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesListPage);
