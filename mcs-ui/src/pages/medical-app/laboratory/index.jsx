import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";
import { Divider } from 'antd';

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getEmployeeListAction,
  postLaboratoryPicAction,
} from "../../../actions/laboratory.js";

import ViewModal from "./components/viewModal.jsx";
import UploadModal from "./components/uploadModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const LaboratoryListPage = (props) => {
  const {
    access,
    employeeListLoading,
    employeeListSuccess,
    employeeListFailed,
    employeeListData,
    OnGetEmployeeList,
    postlaboratoryPicLoading,
    postlaboratoryPicSuccess,
    postlaboratoryPicFailed,
    OnPostLaboratoryPic,
  } = props;
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUploadVisible, setIsModalUploadVisible] = useState(false);

  const showModal = (values = {}) => {
    setEmployeeId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const showUploadModal = (values = {}) => {
    setEmployeeId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalUploadVisible(!isModalUploadVisible);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("EmployeeId", employeeId);
    for (let i = 0; i < values?.Filelists.length; i++) {
      formData.append("LaboratoryImage", values?.Filelists[i]);
    }
    console.log([...formData]);

    await OnPostLaboratoryPic(formData);
    setIsModalUploadVisible(!isModalUploadVisible);
    getData();
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = employees.filter(
        (item) =>
          item.FirstName?.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName?.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName?.toLowerCase().includes(text.toLowerCase()) ||
          item.Department?.toLowerCase().includes(text.toLowerCase()) ||
          item.Section?.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(employees);
    }
  };

  const getData = async () => {
    await OnGetEmployeeList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (employeeListSuccess) {
      setData(employeeListData);
      setEmployees(employeeListData);
    }

    if (employeeListFailed) {
      console.log("Get Employee List Failed...");
    }
  }, [employeeListSuccess, employeeListFailed, employeeListData]);

  useEffect(() => {
    if (postlaboratoryPicSuccess) {
      getData();
      Message.success("New Laboratory Record Successfully Recorded!");
    }

    if (postlaboratoryPicFailed) {
      Message.error("New Laboratory Record Record!");
    }
    // eslint-disable-next-line
  }, [postlaboratoryPicSuccess, postlaboratoryPicFailed]);

  const columns = [
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
      title: "SECTION",
      dataIndex: "Section",
      key: "Section",
      align: "center",
      width: 225,
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
          showModalView={() => showModal(row)}
          showModalUpload={() => showUploadModal(row)}
          canView={getModuleAccess(access?.reference, module?.ape)?.update}
          canUpload={getModuleAccess(access?.reference, module?.ape)?.update}
        />
      ),
    },
  ];

  const isLoadingAndDisabled = employeeListLoading || postlaboratoryPicLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Employee"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
      />
      <Divider orientation="center"><h2>LAB RECORDS</h2></Divider>
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <ViewModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        employeeId={employeeId}
      />
      <UploadModal
        form={form}
        isModalVisible={isModalUploadVisible}
        showModal={showUploadModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    employeeListLoading: state.laboratory.employeeListLoading,
    employeeListSuccess: state.laboratory.employeeListSuccess,
    employeeListFailed: state.laboratory.employeeListFailed,
    employeeListData: state.laboratory.employeeListData,

    postlaboratoryPicLoading: state.laboratory.postlaboratoryPicLoading,
    postlaboratoryPicSuccess: state.laboratory.postlaboratoryPicSuccess,
    postlaboratoryPicFailed: state.laboratory.postlaboratoryPicFailed,
    postlaboratoryPicData: state.laboratory.postlaboratoryPicData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetEmployeeList: () => dispatch(getEmployeeListAction()),
    OnPostLaboratoryPic: (data) => dispatch(postLaboratoryPicAction(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaboratoryListPage);
