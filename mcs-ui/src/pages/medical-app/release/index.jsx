import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";
import { mmDdYyyy } from "../../../utils/formatter.js";

import {
  getMedicineReleaseAction,
  getUserLevelAction,
  putApprovalAction,
  putReleaseAction,
  putRejectAction,
} from "../../../actions/medicinerelease.js";

import MaskAsModal from "./components/maskasModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const ReleaseListPage = (props) => {
  const {
    access,
    medicinereleaseListLoading,
    medicinereleaseListSuccess,
    medicinereleaseListFailed,
    medicinereleaseListData,
    OnGetMedicineReleaseList,
    userlevelLoading,
    userlevelSuccess,
    userlevelFailed,
    userlevelData,
    OnGetUserLevel,
    putApprovalLoading,
    putApprovalSuccess,
    putApprovalFailed,
    OnPutApproval,
    putReleaseLoading,
    putReleaseSuccess,
    putReleaseFailed,
    OnPutRelease,
    putRejectLoading,
    putRejectLoadingSuccess,
    putRejectFailed,
    OnPutReject,
  } = props;
  const [form] = Form.useForm();
  const [userlevel, setUserLevel] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderid, setOrderID] = useState();
  const [data, setData] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setOrderID(values?.NID);
    form.resetFields();
    setIsModalVisible(!isModalVisible);
    getDatas();
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = orders.filter(
        (item) =>
          item.CreatedAt.toLowerCase().includes(text.toLowerCase()) ||
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()) ||
          item.Department.toLowerCase().includes(text.toLowerCase()) ||
          item.Type.toLowerCase().includes(text.toLowerCase()) ||
          item.Status.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(orders);
    }
  };

  const getData = async () => {
    await OnGetUserLevel(access?.profile?.UserID);
  };

  const getDatas = async () => {
    await OnGetMedicineReleaseList(userlevel[0]?.Level);
  };

  useEffect(() => {
    getDatas();
    // eslint-disable-next-line
  }, [userlevel]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [access]);

  const onSubmit = async (values) => {
    if (userlevel[0]?.Level === "1") {
      await OnPutApproval(orderid, values);
      getDatas();
    } else {
      await OnPutRelease(orderid, values);
      getDatas();
    }
  };

  useEffect(() => {
    if (putApprovalSuccess) {
      getData();
      setIsModalVisible(!isModalVisible);
      Message.success("Medicine Order Approved!");
    }

    if (putApprovalFailed) {
      Message.error("Medicine Order Approval Failed!");
    }
    // eslint-disable-next-line
  }, [putApprovalSuccess, putApprovalFailed]);

  useEffect(() => {
    if (putReleaseSuccess) {
      getData();
      setIsModalVisible(!isModalVisible);
      Message.success("Medicine Order Released!");
    }

    if (putReleaseFailed) {
      Message.error("Medicine Order Released Failed!");
    }
    // eslint-disable-next-line
  }, [putReleaseSuccess, putReleaseFailed]);

  useEffect(() => {
    if (putRejectLoadingSuccess) {
      getData();
      setIsModalVisible(!isModalVisible);
      Message.success("Medicine Order Released!");
    }

    if (putRejectFailed) {
      Message.error("Medicine Order Released Failed!");
    }
    // eslint-disable-next-line
  }, [putRejectLoadingSuccess, putRejectFailed]);

  useEffect(() => {
    if (medicinereleaseListSuccess) {
      setData(medicinereleaseListData);
      setOrders(medicinereleaseListData);
    }

    if (medicinereleaseListFailed) {
      console.log("Get Medicine Release Failed...");
    }
  }, [
    medicinereleaseListSuccess,
    medicinereleaseListFailed,
    medicinereleaseListData,
  ]);

  useEffect(() => {
    if (userlevelSuccess) {
      setUserLevel(userlevelData);
    }

    if (userlevelFailed) {
      console.log("Get Medicine Release Failed...");
    }
  }, [userlevelSuccess, userlevelFailed, userlevelData]);

  const confirmReject = async (id) => {
    console.log(remarks, "TRIGGER");

    await OnPutReject(id, { Remarks: remarks });
    getDatas();
  };

  const columns = [
    {
      title: "DATE",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
      ),
    },
    {
      title: "ORDER ID",
      dataIndex: "OrderId",
      key: "OrderId",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "FIRST NAME",
      dataIndex: "FirstName",
      key: "FirstName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "MIDDLE NAME",
      dataIndex: "MiddleName",
      key: "MiddleName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "LAST NAME",
      dataIndex: "LastName",
      key: "LastName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "DEPARTMENT",
      dataIndex: "Department",
      key: "Department",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "TYPE",
      dataIndex: "OrderName",
      key: "OrderName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "STATUS",
      dataIndex: "StatusName",
      key: "StatusName",
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
          showModalView={() => showModal(row)}
          canView={
            getModuleAccess(access?.reference, module?.medicinerelease)?.update
          }
          confirmReject={() => confirmReject(value)}
          onChange={(e) => setRemarks(e)}
          canReject={
            getModuleAccess(access?.reference, module?.medicinerelease)?.update
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    medicinereleaseListLoading ||
    userlevelLoading ||
    putApprovalLoading ||
    putReleaseLoading ||
    putRejectLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Medicine Order"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <MaskAsModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        loading2={isLoadingAndDisabled}
        orderid={orderid}
        userlevel={userlevel[0]?.Level}
        setIsModalVisible={setIsModalVisible}
        onSubmit={onSubmit}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    medicinereleaseListLoading:
      state.medicinerelease.medicinereleaseListLoading,
    medicinereleaseListSuccess:
      state.medicinerelease.medicinereleaseListSuccess,
    medicinereleaseListFailed: state.medicinerelease.medicinereleaseListFailed,
    medicinereleaseListData: state.medicinerelease.medicinereleaseListData,

    userlevelLoading: state.medicinerelease.userlevelLoading,
    userlevelSuccess: state.medicinerelease.userlevelSuccess,
    userlevelFailed: state.medicinerelease.userlevelFailed,
    userlevelData: state.medicinerelease.userlevelData,

    putApprovalLoading: state.medicinerelease.putApprovalLoading,
    putApprovalSuccess: state.medicinerelease.putApprovalSuccess,
    putApprovalFailed: state.medicinerelease.putApprovalFailed,
    putApprovalData: state.medicinerelease.putApprovalData,

    putReleaseLoading: state.medicinerelease.putReleaseLoading,
    putReleaseSuccess: state.medicinerelease.putReleaseSuccess,
    putReleaseFailed: state.medicinerelease.putReleaseFailed,
    putReleaseData: state.medicinerelease.putReleaseData,

    putRejectLoading: state.medicinerelease.putRejectLoading,
    putRejectLoadingSuccess: state.medicinerelease.putRejectLoadingSuccess,
    putRejectFailed: state.medicinerelease.putRejectFailed,
    putRejectData: state.medicinerelease.putRejectData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetMedicineReleaseList: (UL) => dispatch(getMedicineReleaseAction(UL)),
    OnGetUserLevel: (AL) => dispatch(getUserLevelAction(AL)),
    OnPutApproval: (id, data) => dispatch(putApprovalAction(id, data)),
    OnPutRelease: (id, data) => dispatch(putReleaseAction(id, data)),
    OnPutReject: (id, data) => dispatch(putRejectAction(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseListPage);
