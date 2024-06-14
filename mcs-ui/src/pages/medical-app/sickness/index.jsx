import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getSicknessListActions,
  postSicknessActions,
  putSicknessActions,
  delSicknessActions,
} from "../../../actions/sickness.js";

import MedicineModal from "./components/medicineModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const SicknessListPage = (props) => {
  const {
    access,
    sicknessListLoading,
    sicknessListSuccess,
    sicknessListFailed,
    sicknessListData,
    OnGetSicknessList,
    postSicknessLoading,
    postSicknessSuccess,
    postSicknessFailed,
    OnPostSickness,
    putSicknessLoading,
    putSicknessSuccess,
    putSicknessFailed,
    OnPutSickness,
    delSicknessLoading,
    delSicknessSuccess,
    delSicknessFailed,
    OnDelSickness,
  } = props;
  const [form] = Form.useForm();
  const [sickness, setSickness] = useState([]);
  const [sicknessId, setSicknessId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    console.log(values, "TEST DATA");
    setSicknessId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!sicknessId) {
      await OnPostSickness(values);
    } else {
      await OnPutSickness(sicknessId, values);

      console.log(values, "TEST EDIT");
    }
  };

  const confirmDelete = async (id) => {
    await OnDelSickness(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = sickness.filter((item) =>
        item.Illness.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(sickness);
    }
  };

  const getData = async () => {
    await OnGetSicknessList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (sicknessListSuccess) {
      setData(sicknessListData);
      setSickness(sicknessListData);
    }

    if (sicknessListFailed) {
      console.log("Get Illness List Failed...");
    }
  }, [sicknessListSuccess, sicknessListFailed, sicknessListData]);

  useEffect(() => {
    if (postSicknessSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Illness Successfully Created!");
    }

    if (postSicknessFailed) {
      Message.error("New Illness Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postSicknessSuccess, postSicknessFailed]);

  useEffect(() => {
    if (putSicknessSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Illness Successfully Updated!");
    }

    if (putSicknessFailed) {
      Message.error("Illness Update Failed!");
    }
    // eslint-disable-next-line
  }, [putSicknessSuccess, putSicknessFailed]);

  useEffect(() => {
    if (delSicknessSuccess) {
      getData();
      Message.success("Illness Successfully Deleted!");
    }

    if (delSicknessFailed) {
      Message.error("Illness Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delSicknessSuccess, delSicknessFailed]);

  const columns = [
    {
      title: "ILLNESS",
      dataIndex: "Illness",
      key: "Illness",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
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
            getModuleAccess(access?.reference, module?.sickness)?.update
          }
          canDelete={
            getModuleAccess(access?.reference, module?.sickness)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    sicknessListLoading ||
    postSicknessLoading ||
    putSicknessLoading ||
    delSicknessLoading;

  return (
    <Row className="main-body medicine-list-page">
      <PageAction
        pageName="Illness"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={
          getModuleAccess(access?.reference, module?.sickness)?.create
        }
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <MedicineModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        sicknessId={sicknessId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    sicknessListLoading: state.sickness.sicknessListLoading,
    sicknessListSuccess: state.sickness.sicknessListSuccess,
    sicknessListFailed: state.sickness.sicknessListFailed,
    sicknessListData: state.sickness.sicknessListData,

    postSicknessLoading: state.sickness.postSicknessLoading,
    postSicknessSuccess: state.sickness.postSicknessSuccess,
    postSicknessFailed: state.sickness.postSicknessFailed,
    postSicknessData: state.sickness.postSicknessData,

    putSicknessLoading: state.sickness.putSicknessLoading,
    putSicknessSuccess: state.sickness.putSicknessSuccess,
    putSicknessFailed: state.sickness.putSicknessFailed,
    putSicknessData: state.sickness.putSicknessData,

    delSicknessLoading: state.sickness.delSicknessLoading,
    delSicknessSuccess: state.sickness.delSicknessSuccess,
    delSicknessFailed: state.sickness.delSicknessFailed,
    delSicknessData: state.sickness.delSicknessData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetSicknessList: () => dispatch(getSicknessListActions()),
    OnPostSickness: (data) => dispatch(postSicknessActions(data)),
    OnPutSickness: (id, data) => dispatch(putSicknessActions(id, data)),
    OnDelSickness: (id) => dispatch(delSicknessActions(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SicknessListPage);
