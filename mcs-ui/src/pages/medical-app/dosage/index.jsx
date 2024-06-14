import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getDossageFormList,
  postDossageForm,
  putDossageForm,
  delDossageForm,
} from "../../../actions/dossage.js";

import DossageModal from "./components/dossageModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const DosageListPage = (props) => {
  const {
    access,
    dossageFormListLoading,
    dossageFormListSuccess,
    dossageFormListFailed,
    dossageFormListData,
    OnGetDossageFormList,
    postDossageFormLoading,
    postDossageFormSuccess,
    postDossageFormFailed,
    OnPostDossageForm,
    putDossageFormLoading,
    putDossageFormSuccess,
    putDossageFormFailed,
    OnPutDossageForm,
    delDossageFormLoading,
    delDossageFormSuccess,
    delDossageFormFailed,
    OnDelDossageForm,
  } = props;
  const [form] = Form.useForm();
  const [dosage, setDosage] = useState([]);
  const [dosageId, setDosageId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setDosageId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!dosageId) {
      console.log(values, "POST");
      await OnPostDossageForm(values);
    } else {
      console.log(values, "UPDATE");
      await OnPutDossageForm(dosageId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelDossageForm(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = dosage.filter((item) =>
        item.Form.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(dosage);
    }
  };

  const getData = async () => {
    await OnGetDossageFormList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (dossageFormListSuccess) {
      setData(dossageFormListData);
      setDosage(dossageFormListData);
    }

    if (dossageFormListFailed) {
      console.log("Get Dossage List Failed...");
    }
  }, [dossageFormListSuccess, dossageFormListFailed, dossageFormListData]);

  useEffect(() => {
    if (postDossageFormSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Dossage Successfully Created!");
    }

    if (postDossageFormFailed) {
      Message.error("New Dossage Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postDossageFormSuccess, postDossageFormFailed]);

  useEffect(() => {
    if (putDossageFormSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Dossage Successfully Updated!");
    }

    if (putDossageFormFailed) {
      Message.error("Dossage Update Failed!");
    }
    // eslint-disable-next-line
  }, [putDossageFormSuccess, putDossageFormFailed]);

  useEffect(() => {
    if (delDossageFormSuccess) {
      getData();
      Message.success("Dossage Successfully Deleted!");
    }

    if (delDossageFormFailed) {
      Message.error("Dossage Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delDossageFormSuccess, delDossageFormFailed]);

  const columns = [
    {
      title: "FORM",
      dataIndex: "Form",
      key: "Form",
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
          canUpdate={getModuleAccess(access?.reference, module?.dosage)?.update}
          canDelete={getModuleAccess(access?.reference, module?.dosage)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    dossageFormListLoading ||
    postDossageFormLoading ||
    putDossageFormLoading ||
    delDossageFormLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Dossage"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.reference, module?.dosage)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <DossageModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        dosageId={dosageId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    dossageFormListLoading: state.dossage.dossageFormListLoading,
    dossageFormListSuccess: state.dossage.dossageFormListSuccess,
    dossageFormListFailed: state.dossage.dossageFormListFailed,
    dossageFormListData: state.dossage.dossageFormListData,

    postDossageFormLoading: state.dossage.postDossageFormLoading,
    postDossageFormSuccess: state.dossage.postDossageFormSuccess,
    postDossageFormFailed: state.dossage.postDossageFormFailed,
    postDossageFormData: state.dossage.postDossageFormData,

    putDossageFormLoading: state.dossage.putDossageFormLoading,
    putDossageFormSuccess: state.dossage.putDossageFormSuccess,
    putDossageFormFailed: state.dossage.putDossageFormFailed,
    putDossageFormData: state.dossage.putDossageFormData,

    delDossageFormLoading: state.dossage.delDossageFormLoading,
    delDossageFormSuccess: state.dossage.delDossageFormSuccess,
    delDossageFormFailed: state.dossage.delDossageFormFailed,
    delDossageFormData: state.dossage.delDossageFormData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetDossageFormList: () => dispatch(getDossageFormList()),
    OnPostDossageForm: (data) => dispatch(postDossageForm(data)),
    OnPutDossageForm: (id, data) => dispatch(putDossageForm(id, data)),
    OnDelDossageForm: (id) => dispatch(delDossageForm(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DosageListPage);
