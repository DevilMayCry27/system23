import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getDepartmentList,
  postDepartment,
  putDepartment,
  delDepartment,
} from "../../../actions/department.js";

import DepartmentModal from "./components/departmentModal";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const DepartmentListPage = (props) => {
  const {
    access,
    departmentListLoading,
    departmentListSuccess,
    departmentListFailed,
    departmentListData,
    OnGetDepartmentList,
    postDepartmentLoading,
    postDepartmentSuccess,
    postDepartmentFailed,
    OnPostDepartment,
    putDepartmentLoading,
    putDepartmentSuccess,
    putDepartmentFailed,
    OnPutDepartment,
    delDepartmentLoading,
    delDepartmentSuccess,
    delDepartmentFailed,
    OnDelDepartment,
  } = props;
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setDepartmentId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!departmentId) {
      await OnPostDepartment(values);
      console.log(values);
    } else {
      await OnPutDepartment(departmentId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelDepartment(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = departments.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(departments);
    }
  };

  const getData = async () => {
    await OnGetDepartmentList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (departmentListSuccess) {
      setData(departmentListData);
      setDepartments(departmentListData);
    }

    if (departmentListFailed) {
      console.log("Get Department List Failed...");
    }
  }, [departmentListSuccess, departmentListFailed, departmentListData]);

  useEffect(() => {
    if (postDepartmentSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Department Successfully Created!");
    }

    if (postDepartmentFailed) {
      Message.error("New Department Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postDepartmentSuccess, postDepartmentFailed]);

  useEffect(() => {
    if (putDepartmentSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Department Successfully Updated!");
    }

    if (putDepartmentFailed) {
      Message.error("Department Update Failed!");
    }
    // eslint-disable-next-line
  }, [putDepartmentSuccess, putDepartmentFailed]);

  useEffect(() => {
    if (delDepartmentSuccess) {
      getData();
      Message.success("Department Successfully Deleted!");
    }

    if (delDepartmentFailed) {
      Message.error("Department Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delDepartmentSuccess, delDepartmentFailed]);

  const columns = [
    {
      title: "DEPARTMENT NAME",
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
            getModuleAccess(access?.admin, module?.departments)?.update
          }
          canDelete={
            getModuleAccess(access?.admin, module?.departments)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    departmentListLoading ||
    postDepartmentLoading ||
    putDepartmentLoading ||
    delDepartmentLoading;

  return (
    <Row className="main-body department-list-page">
      <PageAction
        pageName="Department"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.departments)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <DepartmentModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        departmentId={departmentId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    departmentListLoading: state.department.departmentListLoading,
    departmentListSuccess: state.department.departmentListSuccess,
    departmentListFailed: state.department.departmentListFailed,
    departmentListData: state.department.departmentListData,
    postDepartmentLoading: state.department.postDepartmentLoading,
    postDepartmentSuccess: state.department.postDepartmentSuccess,
    postDepartmentFailed: state.department.postDepartmentFailed,
    postDepartmentData: state.department.postDepartmentData,
    putDepartmentLoading: state.department.putDepartmentLoading,
    putDepartmentSuccess: state.department.putDepartmentSuccess,
    putDepartmentFailed: state.department.putDepartmentFailed,
    putDepartmentData: state.department.putDepartmentData,
    delDepartmentLoading: state.department.delDepartmentLoading,
    delDepartmentSuccess: state.department.delDepartmentSuccess,
    delDepartmentFailed: state.department.delDepartmentFailed,
    delDepartmentData: state.department.delDepartmentData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetDepartmentList: () => dispatch(getDepartmentList()),
    OnPostDepartment: (data) => dispatch(postDepartment(data)),
    OnPutDepartment: (id, data) => dispatch(putDepartment(id, data)),
    OnDelDepartment: (id) => dispatch(delDepartment(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentListPage);
