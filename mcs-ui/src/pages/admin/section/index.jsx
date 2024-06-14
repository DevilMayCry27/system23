import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getSectionList,
  postSection,
  putSection,
  delSection,
} from "../../../actions/section.js";
import { getDepartmentList } from "../../../actions/department.js";

import SectionModal from "./components/sectionModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const SectionListPage = (props) => {
  const {
    access,
    sectionListLoading,
    sectionListSuccess,
    sectionListFailed,
    sectionListData,
    OnGetSectionList,
    postSectionLoading,
    postSectionSuccess,
    postSectionFailed,
    OnPostSection,
    putSectionLoading,
    putSectionSuccess,
    putSectionFailed,
    OnPutSection,
    delSectionLoading,
    delSectionSuccess,
    delSectionFailed,
    OnDelSection,
    departmentListLoading,
    departmentListSuccess,
    departmentListFailed,
    departmentListData,
    OnGetDepartmentList,
  } = props;
  const [form] = Form.useForm();
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [department, setDepartment] = useState([]);

  const showModal = (values = {}) => {
    setSectionId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!sectionId) {
      await OnPostSection(values);
    } else {
      await OnPutSection(sectionId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelSection(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = sections.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(sections);
    }
  };

  const getData = async () => {
    await OnGetSectionList();
    await OnGetDepartmentList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (departmentListSuccess) {
      setDepartment(departmentListData);
    }

    if (departmentListFailed) {
      console.log("Get Department List Failed...");
    }
  }, [departmentListSuccess, departmentListFailed, departmentListData]);

  useEffect(() => {
    if (sectionListSuccess) {
      setData(sectionListData);
      setSections(sectionListData);
    }

    if (sectionListFailed) {
      console.log("Get Section List Failed...");
    }
  }, [sectionListSuccess, sectionListFailed, sectionListData]);

  useEffect(() => {
    if (postSectionSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Section Successfully Created!");
    }

    if (postSectionFailed) {
      Message.error("New Section Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postSectionSuccess, postSectionFailed]);

  useEffect(() => {
    if (putSectionSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Section Successfully Updated!");
    }

    if (putSectionFailed) {
      Message.error("Section Update Failed!");
    }
    // eslint-disable-next-line
  }, [putSectionSuccess, putSectionFailed]);

  useEffect(() => {
    if (delSectionSuccess) {
      getData();
      Message.success("Section Successfully Deleted!");
    }

    if (delSectionFailed) {
      Message.error("Section Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delSectionSuccess, delSectionFailed]);

  const columns = [
    {
      title: "SECTION NAME",
      dataIndex: "Name",
      key: "SectionName",
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
          canUpdate={getModuleAccess(access?.admin, module?.section)?.update}
          canDelete={getModuleAccess(access?.admin, module?.section)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    sectionListLoading ||
    postSectionLoading ||
    putSectionLoading ||
    delSectionLoading ||
    departmentListLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Section"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.section)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <SectionModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        departmentId={sectionId}
        department={department}
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

    sectionListLoading: state.section.sectionListLoading,
    sectionListSuccess: state.section.sectionListSuccess,
    sectionListFailed: state.section.sectionListFailed,
    sectionListData: state.section.sectionListData,

    postSectionLoading: state.section.postSectionLoading,
    postSectionSuccess: state.section.postSectionSuccess,
    postSectionFailed: state.section.postSectionFailed,
    postSectionData: state.section.postSectionData,

    putSectionLoading: state.section.putSectionLoading,
    putSectionSuccess: state.section.putSectionSuccess,
    putSectionFailed: state.section.putSectionFailed,
    putSectionData: state.section.putSectionData,

    delSectionLoading: state.section.delSectionLoading,
    delSectionSuccess: state.section.delSectionSuccess,
    delSectionFailed: state.section.delSectionFailed,
    delSectionData: state.section.delSectionData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetDepartmentList: () => dispatch(getDepartmentList()),
    OnGetSectionList: () => dispatch(getSectionList()),
    OnPostSection: (data) => dispatch(postSection(data)),
    OnPutSection: (id, data) => dispatch(putSection(id, data)),
    OnDelSection: (id) => dispatch(delSection(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionListPage);
