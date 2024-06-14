import "../consultation/index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import { DatePicker, Space } from "antd";
import { Col, Row } from "antd";

import { exportToCSVMultiple } from "../../../../utils/exportToCsv.js";
import { mmDdYyyy } from "../../../../utils/formatter.js";
import {
  getConsultationReportList,
  getConsultationReportIllness,
  getDepartmentReportIllness,
} from "../../../../actions/consultationreport.js";

import MainTable from "../../../../components/maintable.jsx";
import PageAction from "../../../../components/pageactions.jsx";

const { RangePicker } = DatePicker;

const ConsultationListPage = (props) => {
  const {
    consultationreportListLoading,
    consultationreportListSuccess,
    consultationreportListFailed,
    consultationreportListData,
    OnGetConsultationReportList,
    consultationreportIllnessLoading,
    consultationreportIllnessSuccess,
    consultationreportIllnessFailed,
    consultationreportIllnessData,
    OnGetConsultationReportIllness,
    consultationdepartmentIllnessLoading,
    consultationdepartmentIllnessSuccess,
    consultationdepartmentIllnessFailed,
    consultationdepartmentIllnessData,
    OnGetDepartmentReportIllness,
  } = props;
  const [consultationreport, setConsultationReport] = useState([]);
  const [data, setData] = useState([]);

  const [illnesscount, setIllnessCount] = useState([]);
  const [illness, setIllness] = useState([]);

  const [deparmentcases, setDepartmentCases] = useState([]);
  const [deparment, setDepartment] = useState([]);
  const [form] = Form.useForm();

  const [dateRange, setDateRange] = useState(null);
  const [filteredConsultationReport, setFilteredConsultationReport] = useState(
    []
  );
  const [filteredIllness, setFilteredIllness] = useState([]);
  const [filteredDepartment, setFilteredDepartment] = useState([]);

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = consultationreport.filter(
        (item) =>
          item.Physician.toLowerCase().includes(text.toLowerCase()) ||
          item.CreatedAt.toLowerCase().includes(text.toLowerCase()) ||
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()) ||
          item.Complaint.toLowerCase().includes(text.toLowerCase()) ||
          item.Diagnosis.toLowerCase().includes(text.toLowerCase()) ||
          item.Recommendation.toLowerCase().includes(text.toLowerCase()) ||
          item.Department.toLowerCase().includes(text.toLowerCase())
      );
      const tempData2 = filteredIllness.filter(
        (item) =>
          item.Department.toLowerCase().includes(text.toLowerCase()) ||
          item.Complaint.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
      setFilteredIllness(tempData2);
    } else {
      setData(consultationreport);
      setFilteredIllness(illness);
    }
  };

  const getData = async () => {
    await OnGetConsultationReportList();
    await OnGetConsultationReportIllness();
    await OnGetDepartmentReportIllness();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [dateRange]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject;
  };

  const filterDataByDateRange = (data, range) => {
    if (!range || range.length !== 2) return data;
    const [startDate, endDate] = range;
    const formattedData = data.map((item) => ({
      ...item,
      CreatedAt: formatDate(item.CreatedAt),
    }));
    return formattedData.filter(
      (item) => startDate <= item.CreatedAt && item.CreatedAt <= endDate
    );
  };

  useEffect(() => {
    const filteredData = filterDataByDateRange(deparmentcases, dateRange);
    setFilteredDepartment(filteredData);
  }, [dateRange, deparmentcases]);

  useEffect(() => {
    const filteredData = filterDataByDateRange(illnesscount, dateRange);
    setFilteredIllness(filteredData);
  }, [dateRange, illnesscount]);

  useEffect(() => {
    const filteredData = filterDataByDateRange(data, dateRange);
    setFilteredConsultationReport(filteredData);
  }, [dateRange, data]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    if (consultationreportListSuccess) {
      setData(consultationreportListData);
      setConsultationReport(consultationreportListData);
    }

    if (consultationreportListFailed) {
      console.log("Get Consultation Report List Failed...");
    }
  }, [
    consultationreportListSuccess,
    consultationreportListFailed,
    consultationreportListData,
  ]);

  useEffect(() => {
    if (consultationreportIllnessSuccess) {
      setIllness(consultationreportIllnessData);
      setIllnessCount(consultationreportIllnessData);
    }

    if (consultationreportIllnessFailed) {
      console.log("Get Consultation Report List Failed...");
    }
  }, [
    consultationreportIllnessSuccess,
    consultationreportIllnessFailed,
    consultationreportListData,
  ]);

  useEffect(() => {
    if (consultationdepartmentIllnessSuccess) {
      setDepartment(consultationdepartmentIllnessData);
      setDepartmentCases(consultationdepartmentIllnessData);
    }

    if (consultationdepartmentIllnessFailed) {
      console.log("Get Department Report List Failed...");
    }
  }, [
    consultationdepartmentIllnessSuccess,
    consultationdepartmentIllnessFailed,
    consultationdepartmentIllnessData,
  ]);

  const columns = [
    {
      title: "DATE",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
      ),
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
      title: "CHIEF COMPLAINT",
      dataIndex: "Complaint",
      key: "Complaint",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "DIAGNOSIS",
      dataIndex: "Diagnosis",
      key: "Diagnosis",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "RECOMMENDATION",
      dataIndex: "Recommendation",
      key: "Recommendation",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "PHYSICIAN / NURSE",
      dataIndex: "Physician",
      key: "Physician",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
  ];

  const columns2 = [
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
    {
      title: "DEPARTMENT",
      dataIndex: "Department",
      key: "Department",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "ILLNESS",
      dataIndex: "Complaint",
      key: "Complaint",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "CASES",
      dataIndex: "Count",
      key: "Count",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
  ];

  const columns3 = [
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
    {
      title: "GENDER",
      dataIndex: "Gender",
      key: "Gender",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "CASES",
      dataIndex: "Count",
      key: "Count",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
  ];

  const isLoadingAndDisabled =
    consultationreportListLoading ||
    consultationreportIllnessLoading ||
    consultationdepartmentIllnessLoading;

  return (
    <Form
      name="new form"
      //onFinish={onSubmit}
      autoComplete="off"
      className="new-form"
      form={form}
    >
      <br />
      <Row>
        <Col span={2}></Col>
        <Col span={22}>
          <Row>
            <Col span={7}>
              <PageAction
                pageName="Consultations Report"
                onSearch={onSearch}
                isDisabled={isLoadingAndDisabled}
              />
            </Col>
            <Col span={1}>
              <Form.Item name="ExcelButton">
                <Button
                  className="download-btn"
                  icon={<DownloadOutlined />}
                  onClick={() =>
                    exportToCSVMultiple({
                      row1: Object.values(filteredIllness).map(
                        ({ CreatedAt, Complaint, Department, Count }) => ({
                          CreatedAt,
                          Complaint,
                          Department,
                          Count,
                        })
                      ),

                      row2: Object.values(filteredDepartment).map(
                        ({ CreatedAt, Gender, Count }) => ({
                          CreatedAt,
                          Gender,
                          Count,
                        })
                      ),

                      row3: Object.values(filteredConsultationReport).map(
                        ({
                          CreatedAt,
                          Department,
                          FirstName,
                          MiddleName,
                          LastName,
                          Complaint,
                          Diagnosis,
                          Recommendation,
                          Physician,
                        }) => ({
                          CreatedAt,
                          Department,
                          FirstName,
                          MiddleName,
                          LastName,
                          Complaint,
                          Diagnosis,
                          Recommendation,
                          Physician,
                        })
                      ),
                      fileName: "LLI Medical Report Summary",
                      sheetName: "Reports",
                    })
                  }
                  disabled={!data?.length}
                >
                  DOWNLOAD
                </Button>
              </Form.Item>
            </Col>

            <Col span={9}></Col>
            <Col span={5}>
              <Space direction="vertical" size={100}>
                <RangePicker
                  onCalendarChange={(dates) => handleDateRangeChange(dates)}
                />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="main-body section-list-page">
        <Col span={1}></Col>
        <Col span={14}>
          <MainTable
            columns={columns2}
            data={filteredIllness}
            isLoading={isLoadingAndDisabled}
          />
        </Col>
        <Col span={8}>
          <MainTable
            columns={columns3}
            data={filteredDepartment}
            isLoading={isLoadingAndDisabled}
          />
        </Col>

        <MainTable
          columns={columns}
          data={filteredConsultationReport}
          isLoading={isLoadingAndDisabled}
        />
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    consultationreportListLoading:
      state.consultationreport.consultationreportListLoading,
    consultationreportListSuccess:
      state.consultationreport.consultationreportListSuccess,
    consultationreportListFailed:
      state.consultationreport.consultationreportListFailed,
    consultationreportListData:
      state.consultationreport.consultationreportListData,

    consultationreportIllnessLoading:
      state.consultationreport.consultationreportIllnessLoading,
    consultationreportIllnessSuccess:
      state.consultationreport.consultationreportIllnessSuccess,
    consultationreportIllnessFailed:
      state.consultationreport.consultationreportIllnessFailed,
    consultationreportIllnessData:
      state.consultationreport.consultationreportIllnessData,

    consultationdepartmentIllnessLoading:
      state.consultationreport.consultationdepartmentIllnessLoading,
    consultationdepartmentIllnessSuccess:
      state.consultationreport.consultationdepartmentIllnessSuccess,
    consultationdepartmentIllnessFailed:
      state.consultationreport.consultationdepartmentIllnessFailed,
    consultationdepartmentIllnessData:
      state.consultationreport.consultationdepartmentIllnessData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetConsultationReportList: () => dispatch(getConsultationReportList()),
    OnGetConsultationReportIllness: () =>
      dispatch(getConsultationReportIllness()),
    OnGetDepartmentReportIllness: () => dispatch(getDepartmentReportIllness()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultationListPage);
