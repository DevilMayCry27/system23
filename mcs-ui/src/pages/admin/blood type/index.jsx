import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getBloodTypeListActions,
  postBloodTypeActions,
  putBloodTypeActions,
  delBloodTypeActions,
} from "../../../actions/bloodtype.js";

import BloodTypeModal from "./components/bloodtypeModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const BloodTypeListPage = (props) => {
  const {
    access,
    bloodtypeListLoading,
    bloodtypeListSuccess,
    bloodtypeListFailed,
    bloodtypeListData,
    OnGetBloodTypeList,
    postBloodtypeLoading,
    postBloodtypeSuccess,
    postBloodtypeFailed,
    OnPostBloodType,
    putBloodtypeLoading,
    putBloodtypeSuccess,
    putBloodtypeFailed,
    OnPutBloodType,
    delBloodtypeLoading,
    delBloodtypeSuccess,
    delBloodtypeFailed,
    OnDelBloodType,
  } = props;
  const [form] = Form.useForm();
  const [bloodtypes, setBloodTypes] = useState([]);
  const [bloodtypeId, setBloodTypeId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setBloodTypeId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!bloodtypeId) {
      await OnPostBloodType(values);
    } else {
      await OnPutBloodType(bloodtypeId, values);
    }
  };
  const confirmDelete = async (id) => {
    await OnDelBloodType(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = bloodtypes.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(bloodtypes);
    }
  };

  const getData = async () => {
    await OnGetBloodTypeList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bloodtypeListSuccess) {
      setData(bloodtypeListData);
      setBloodTypes(bloodtypeListData);
    }

    if (bloodtypeListFailed) {
      console.log("Get Blood Type List Failed...");
    }
  }, [bloodtypeListSuccess, bloodtypeListFailed, bloodtypeListData]);

  useEffect(() => {
    if (postBloodtypeSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Blood Type Successfully Created!");
    }

    if (postBloodtypeFailed) {
      Message.error("New Blood Type Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postBloodtypeSuccess, postBloodtypeFailed]);

  useEffect(() => {
    if (putBloodtypeSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Blood Type Successfully Updated!");
    }

    if (putBloodtypeFailed) {
      Message.error("Blood Type Update Failed!");
    }
    // eslint-disable-next-line
  }, [putBloodtypeSuccess, putBloodtypeFailed]);

  useEffect(() => {
    if (delBloodtypeSuccess) {
      getData();
      Message.success("Blood Type Successfully Deleted!");
    }

    if (delBloodtypeFailed) {
      Message.error("Blood Type Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delBloodtypeSuccess, delBloodtypeFailed]);

  const columns = [
    {
      title: "Blood Type",
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
          canUpdate={getModuleAccess(access?.admin, module?.bloodtype)?.update}
          canDelete={getModuleAccess(access?.admin, module?.bloodtype)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    bloodtypeListLoading ||
    postBloodtypeLoading ||
    putBloodtypeLoading ||
    delBloodtypeLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Blood Type"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.bloodtype)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <BloodTypeModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        bloodtypeId={bloodtypeId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    bloodtypeListLoading: state.bloodtype.bloodtypeListLoading,
    bloodtypeListSuccess: state.bloodtype.bloodtypeListSuccess,
    bloodtypeListFailed: state.bloodtype.bloodtypeListFailed,
    bloodtypeListData: state.bloodtype.bloodtypeListData,

    postBloodtypeLoading: state.bloodtype.postBloodtypeLoading,
    postBloodtypeSuccess: state.bloodtype.postBloodtypeSuccess,
    postBloodtypeFailed: state.bloodtype.postBloodtypeFailed,
    postBloodtypeData: state.bloodtype.postBloodtypeData,

    putBloodtypeLoading: state.bloodtype.putBloodtypeLoading,
    putBloodtypeSuccess: state.bloodtype.putBloodtypeSuccess,
    putBloodtypeFailed: state.bloodtype.putBloodtypeFailed,
    putBloodtypeData: state.bloodtype.putBloodtypeData,

    delBloodtypeLoading: state.bloodtype.delBloodtypeLoading,
    delBloodtypeSuccess: state.bloodtype.delBloodtypeSuccess,
    delBloodtypeFailed: state.bloodtype.delBloodtypeFailed,
    delBloodtypeData: state.bloodtype.delBloodtypeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetBloodTypeList: () => dispatch(getBloodTypeListActions()),
    OnPostBloodType: (data) => dispatch(postBloodTypeActions(data)),
    OnPutBloodType: (id, data) => dispatch(putBloodTypeActions(id, data)),
    OnDelBloodType: (id) => dispatch(delBloodTypeActions(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodTypeListPage);
