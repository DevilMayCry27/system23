import React, { useState, useEffect } from "react";

import Form from "antd/lib/form";
import Modal from "antd/lib/modal";

import { Row } from "antd";
import { connect } from "react-redux";
import { mmDdYyyy } from "../../../../utils/formatter.js";

import MainTable from "../../../../components/maintable.jsx";

import { getApeListAction } from "../../../../actions/ape.js";

const PatientAPEModal = (props) => {
  const {
    form,
    isModalVisibles,
    showModal,
    userId,

    apeListLoading,
    apeListSuccess,
    apeListFailed,
    apeListData,
    OnGetApeList,
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
            href={`${process.env.REACT_APP_API_BASE_URL}/APE/${value}`}
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
    await OnGetApeList(userId);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (apeListSuccess) {
      setData(apeListData);
    }

    if (apeListFailed) {
      console.log("Get APE List Failed...");
    }
  }, [apeListSuccess, apeListFailed, apeListData]);

  const isLoadingAndDisabled = apeListLoading;

  return (
    <Modal
      className="new-modal"
      title={`Patient APE Details`}
      visible={isModalVisibles}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"65%"}
    >
      <Form name="new form" autoComplete="off" className="new-form" form={form}>
        <Row span="24" gutter={[16, 16]} justify="center">
          <MainTable
            columns={columns}
            data={data}
            isLoading={isLoadingAndDisabled}
          />
        </Row>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    apeListLoading: state.ape.apeListLoading,
    apeListSuccess: state.ape.apeListSuccess,
    apeListFailed: state.ape.apeListFailed,
    apeListData: state.ape.apeListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetApeList: (APEid) => dispatch(getApeListAction(APEid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientAPEModal);
