import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { mmDdYyyy } from "../../../utils/formatter.js";
import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getCompanyList,
  postCompany,
  putCompany,
  delCompany,
} from "../../../actions/company.js";

import CompanyModal from "./components/companyModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const CompanyListPage = (props) => {
  const {
    access,
    companyListLoading,
    companyListSuccess,
    companyListFailed,
    companyListData,
    OnGetCompanyList,
    postCompanyLoading,
    postCompanySuccess,
    postCompanyFailed,
    OnPostCompany,
    putCompanyLoading,
    putCompanySuccess,
    putCompanyFailed,
    OnPutCompany,
    delCompanyLoading,
    delCompanySuccess,
    delCompanyFailed,
    OnDelCompany,
  } = props;
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setCompanyId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!companyId) {
      await OnPostCompany(values);
    } else {
      await OnPutCompany(companyId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelCompany(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = companies.filter(
        (item) =>
          item.CompanyName.toLowerCase().includes(text.toLowerCase()) ||
          item.CompanyDesc.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(companies);
    }
  };

  const getData = async () => {
    await OnGetCompanyList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (companyListSuccess) {
      setData(companyListData);
      setCompanies(companyListData);
    }

    if (companyListFailed) {
      console.log("Get Company List Failed...");
    }
  }, [companyListSuccess, companyListFailed, companyListData]);

  useEffect(() => {
    if (postCompanySuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Company Successfully Created!");
    }

    if (postCompanyFailed) {
      Message.error("New Company Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postCompanySuccess, postCompanyFailed]);

  useEffect(() => {
    if (putCompanySuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Company Successfully Updated!");
    }

    if (putCompanyFailed) {
      Message.error("Company Update Failed!");
    }
    // eslint-disable-next-line
  }, [putCompanySuccess, putCompanyFailed]);

  useEffect(() => {
    if (delCompanySuccess) {
      getData();
      Message.success("Company Successfully Deleted!");
    }

    if (delCompanyFailed) {
      Message.error("Company Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delCompanySuccess, delCompanyFailed]);

  const columns = [
    {
      title: "COMPANY NAME",
      dataIndex: "CompanyName",
      key: "CompanyName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "CompanyDesc",
      key: "CompanyDesc",
      align: "center",
      width: 200,
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
      title: "DATE CREATED",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
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
          canUpdate={getModuleAccess(access?.admin, module?.company)?.update}
          canDelete={getModuleAccess(access?.admin, module?.company)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    companyListLoading ||
    postCompanyLoading ||
    putCompanyLoading ||
    delCompanyLoading;

  return (
    <Row className="main-body department-list-page">
      <PageAction
        pageName="Company"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.company)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <CompanyModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        companyId={companyId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    companyListLoading: state.company.companyListLoading,
    companyListSuccess: state.company.companyListSuccess,
    companyListFailed: state.company.companyListFailed,
    companyListData: state.company.companyListData,
    postCompanyLoading: state.company.postCompanyLoading,
    postCompanySuccess: state.company.postCompanySuccess,
    postCompanyFailed: state.company.postCompanyFailed,
    postCompanyData: state.company.postCompanyData,
    putCompanyLoading: state.company.putCompanyLoading,
    putCompanySuccess: state.company.putCompanySuccess,
    putCompanyFailed: state.company.putCompanyFailed,
    putCompanyData: state.company.putCompanyData,
    delCompanyLoading: state.company.delCompanyLoading,
    delCompanySuccess: state.company.delCompanySuccess,
    delCompanyFailed: state.company.delCompanyFailed,
    delCompanyData: state.company.delCompanyData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCompanyList: () => dispatch(getCompanyList()),
    OnPostCompany: (data) => dispatch(postCompany(data)),
    OnPutCompany: (id, data) => dispatch(putCompany(id, data)),
    OnDelCompany: (id) => dispatch(delCompany(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListPage);
