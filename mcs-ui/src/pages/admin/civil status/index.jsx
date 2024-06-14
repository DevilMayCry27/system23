import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getCivilStatusListActions,
  postCivilStatusActions,
  putCivilStatusActions,
  delCivilStatusActions,
} from "../../../actions/civilstatus.js";

import CivilStatusModal from "./components/civilstatusModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const CivilStatusListPage = (props) => {
  const {
    access,
    civilstatusListLoading,
    civilstatusListSuccess,
    civilstatusListFailed,
    civilstatusListData,
    OnGetCivilStatusList,
    postCivilstatusLoading,
    postCivilstatusSuccess,
    postCivilstatusFailed,
    OnPostCivilStatus,
    putCivilstatusLoading,
    putCivilstatusSuccess,
    putCivilstatusFailed,
    OnPutCivilStatus,
    delCivilstatusLoading,
    delCivilstatusSuccess,
    delCivilstatusFailed,
    OnDelCivilStatus,
  } = props;
  const [form] = Form.useForm();
  const [civilstatus, setCivilStatus] = useState([]);
  const [civilstatusId, setCivilStatusId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setCivilStatusId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!civilstatusId) {
      await OnPostCivilStatus(values);
    } else {
      await OnPutCivilStatus(civilstatusId, values);
    }
  };
  const confirmDelete = async (id) => {
    await OnDelCivilStatus(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = civilstatus.filter((item) =>
        item.CivilStatus.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(civilstatus);
    }
  };

  const getData = async () => {
    await OnGetCivilStatusList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (civilstatusListSuccess) {
      setData(civilstatusListData);
      setCivilStatus(civilstatusListData);
    }

    if (civilstatusListFailed) {
      console.log("Get Civil Status List Failed...");
    }
  }, [civilstatusListSuccess, civilstatusListFailed, civilstatusListData]);

  useEffect(() => {
    if (postCivilstatusSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Civil Status Successfully Created!");
    }

    if (postCivilstatusFailed) {
      Message.error("New Civil Status Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postCivilstatusSuccess, postCivilstatusFailed]);

  useEffect(() => {
    if (putCivilstatusSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Civil Status Successfully Updated!");
    }

    if (putCivilstatusFailed) {
      Message.error("Civil Status Update Failed!");
    }
    // eslint-disable-next-line
  }, [putCivilstatusSuccess, putCivilstatusFailed]);

  useEffect(() => {
    if (delCivilstatusSuccess) {
      getData();
      Message.success("Civil Status Successfully Deleted!");
    }

    if (delCivilstatusFailed) {
      Message.error("Civil Status Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delCivilstatusSuccess, delCivilstatusFailed]);

  const columns = [
    {
      title: "CIVIL STATUS",
      dataIndex: "Name",
      key: "Name",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "STATUS",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      width: 150,
      render: (value, row) => (
        <div className={getStatusType(value)?.class}>
          {getStatusType(value)?.text}
        </div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: 200,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={
            getModuleAccess(access?.admin, module?.civilstatus)?.update
          }
          canDelete={
            getModuleAccess(access?.admin, module?.civilstatus)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    civilstatusListLoading ||
    postCivilstatusLoading ||
    putCivilstatusLoading ||
    delCivilstatusLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Civil Status"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.civilstatus)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <CivilStatusModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        civilstatusId={civilstatusId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    civilstatusListLoading: state.civilstatus.civilstatusListLoading,
    civilstatusListSuccess: state.civilstatus.civilstatusListSuccess,
    civilstatusListFailed: state.civilstatus.civilstatusListFailed,
    civilstatusListData: state.civilstatus.civilstatusListData,

    postCivilstatusLoading: state.civilstatus.postCivilstatusLoading,
    postCivilstatusSuccess: state.civilstatus.postCivilstatusSuccess,
    postCivilstatusFailed: state.civilstatus.postCivilstatusFailed,
    postCivilstatusData: state.civilstatus.postCivilstatusData,

    putCivilstatusLoading: state.civilstatus.putCivilstatusLoading,
    putCivilstatusSuccess: state.civilstatus.putCivilstatusSuccess,
    putCivilstatusFailed: state.civilstatus.putCivilstatusFailed,
    putCivilstatusData: state.civilstatus.putCivilstatusData,

    delCivilstatusLoading: state.civilstatus.delCivilstatusLoading,
    delCivilstatusSuccess: state.civilstatus.delCivilstatusSuccess,
    delCivilstatusFailed: state.civilstatus.delCivilstatusFailed,
    delCivilstatusData: state.civilstatus.delCivilstatusData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCivilStatusList: () => dispatch(getCivilStatusListActions()),
    OnPostCivilStatus: (data) => dispatch(postCivilStatusActions(data)),
    OnPutCivilStatus: (id, data) => dispatch(putCivilStatusActions(id, data)),
    OnDelCivilStatus: (id) => dispatch(delCivilStatusActions(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CivilStatusListPage);
