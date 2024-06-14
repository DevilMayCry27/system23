import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
//import Message from "antd/lib/message";

import { mmDdYyyy } from "../../../utils/formatter.js";
import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import { getPatientList } from "../../../actions/patient.js";

import PatientViewingModal from "./components/patientViewingModal";
import PatientConsultationModal from "./components/Consultation/patientsConsultationModal.jsx";

import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const PatientListPage = (props) => {
  const {
    access,
    OnGetPatientList,
    patientListLoading,
    patientListSuccess,
    patientListFailed,
    patientListData,
  } = props;

  const [patientId, setPatientId] = useState(0);
  const [patients, setPatients] = useState([]);
  const [data, setData] = useState([]);
  const [isModalViewingVisible, setIsModalViewingVisible] = useState(false);
  const [isModalConsultationVisible, setIsModalConsultationVisible] =
    useState(false);
  const [personalinfo, setPersonalInfo] = useState({});
  const [Form1] = Form.useForm();

  const showModalView = async (values = {}) => {
    setPatientId(values?.ID);
    setPersonalInfo(values);
    Form1.resetFields();
    Form1.setFieldsValue(values);
    setIsModalViewingVisible(!isModalViewingVisible);
  };

  const showModalConsult = async (values = {}) => {
    setPatientId(values?.ID);
    setPersonalInfo(values);
    Form1.resetFields();
    Form1.setFieldsValue(values);
    setIsModalConsultationVisible(!isModalConsultationVisible);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = patients.filter(
        (item) =>
          item.FirstName?.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName?.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName?.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(patients);
    }
  };

  const getData = async () => {
    await OnGetPatientList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (patientListSuccess) {
      setData(patientListData);
      setPatients(patientListData);
    }
    if (patientListFailed) {
      console.log("Get Patient List Failed...");
    }
  }, [patientListSuccess, patientListFailed, patientListData]);

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
      width: 200,
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
    // {
    //   title: "COMPANY",
    //   dataIndex: "Company",
    //   key: "Company",
    //   align: "center",
    //   width: 225,
    //   render: (value, row) => <div className="field-text">{value}</div>,
    // },
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
      title: "STATUS",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      width: 150,
      render: (value, row) => (
        <div className={getStatusType(parseInt(value))?.class}>
          {getStatusType(parseInt(value))?.text}
        </div>
      ),
    },
    // {
    //   title: "DATE HIRED",
    //   dataIndex: "DateHired",
    //   key: "DateHired",
    //   align: "center",
    //   width: 200,
    //   render: (value, row) => (
    //     <div className="field-text">{mmDdYyyy(value)}</div>
    //   ),
    // },
    {
      title: "ACTIONS",
      dataIndex: "ID",
      key: "ID",
      align: "center",
      width: 280,
      render: (value, row) => (
        <TableRowAction
          showModalView={() => showModalView(row)}
          canView={getModuleAccess(access?.reference, module?.patients)?.view}
          showModalConsult={() => showModalConsult(row)}
          canConsult={
            getModuleAccess(access?.reference, module?.patients)?.view
          }
        />
      ),
    },
  ];
  const isLoadingAndDisabled = patientListLoading;

  return (
    <Row className="main-body user-list-page">
      <PageAction
        pageName="Patient"
        onSearch={onSearch}
        showModalView={showModalView}
        isDisabled={isLoadingAndDisabled}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      {
        <PatientViewingModal
          form={Form1}
          isModalViewingVisible={isModalViewingVisible}
          showModalView={showModalView}
          loading={isLoadingAndDisabled}
          personalinfo={personalinfo}
          access={access}
          patientId={patientId}
        />
      }
      {
        <PatientConsultationModal
          form={Form1}
          isModalViewingVisible={isModalConsultationVisible}
          showModalConsult={showModalConsult}
          loading={isLoadingAndDisabled}
          personalinfo={personalinfo}
          access={access}
          patientId={patientId}
        />
      }
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    patientListLoading: state.patient.patientListLoading,
    patientListSuccess: state.patient.patientListSuccess,
    patientListFailed: state.patient.patientListFailed,
    patientListData: state.patient.patientListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetPatientList: () => dispatch(getPatientList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListPage);
