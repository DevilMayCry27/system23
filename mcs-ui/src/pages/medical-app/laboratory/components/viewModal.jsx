import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";

import { mmDdYyyy } from "../../../../utils/formatter.js";

import MainTable from "../../../../components/maintable.jsx";

import { getLaboratoryListAction } from "../../../../actions/laboratory.js";

const ViewModal = (props) => {
  const {
    form,
    isModalVisible,
    showModal,
    employeeId,

    laboratoryListLoading,
    laboratoryListSuccess,
    laboratoryListFailed,
    laboratoryListData,
    OnGetLaboratoryList,
  } = props;
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "",
      dataIndex: "FilePath",
      key: "FilePath",
      align: "center",
      width: 225,

      render: (value, row) => (
        <div className="field-text">
          <a
            href={`${process.env.REACT_APP_API_BASE_URL}/Laboratory/${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW
          </a>
        </div>
      ),
    },
    {
      title: "FILE",
      dataIndex: "OriginalName",
      key: "OriginalName",
      align: "center",
      width: 225,

      render: (value, row) => <div className="field-text">{value}</div>,
    },
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
  ];

  const getData = async () => {
    await OnGetLaboratoryList(employeeId);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [employeeId, data]);

  useEffect(() => {
    if (laboratoryListSuccess) {
      setData(laboratoryListData);
    }

    if (laboratoryListFailed) {
      console.log("Get Laboratory List Failed...");
    }
  }, [laboratoryListSuccess, laboratoryListFailed, laboratoryListData]);

  const isLoadingAndDisabled = laboratoryListLoading;

  return (
    <Modal
      className="new-modal"
      title={`LABORATORY RECORDS`}
      visible={isModalVisible}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"50%"}
    >
      <Form
        name="new form"
        //onFinish={onSubmit}
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
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    laboratoryListLoading: state.laboratory.laboratoryListLoading,
    laboratoryListSuccess: state.laboratory.laboratoryListSuccess,
    laboratoryListFailed: state.laboratory.laboratoryListFailed,
    laboratoryListData: state.laboratory.laboratoryListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetLaboratoryList: (LABid) => dispatch(getLaboratoryListAction(LABid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewModal);
