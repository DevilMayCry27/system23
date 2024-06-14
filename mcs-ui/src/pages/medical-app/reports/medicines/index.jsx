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
  getMedicineSaleReportList,
  getMedicineSalesItems,
  getMedicineSalesType,
} from "../../../../actions/medicinesalesreport.js";

import MainTable from "../../../../components/maintable.jsx";
import PageAction from "../../../../components/pageactions.jsx";

const { RangePicker } = DatePicker;

const MedicineReportListPage = (props) => {
  const {
    medicinesalesreportLoading,
    medicinesalesreportSuccess,
    medicinesalesreportFailed,
    medicinesalesreportData,
    OnGetMedicineSalesReport,
    medicinesalesitemsLoading,
    medicinesalesitemsSuccess,
    medicinesalesitemsFailed,
    medicinesalesitemsData,
    OnGetMedicineSalesItems,
    medicinesalestypeLoading,
    medicinesalestypeSuccess,
    medicinesalestypeFailed,
    medicinesalestypeData,
    OnGetMedicineSalesType,
  } = props;
  const [medicinesalesreport, setMedicinesalesreport] = useState([]);
  const [data, setData] = useState([]);

  const [itemcount, setItemcount] = useState([]);
  const [item, setItem] = useState([]);

  const [typeqty, setTypeQty] = useState([]);
  const [type, setType] = useState([]);

  const [form] = Form.useForm();

  const [dateRange, setDateRange] = useState(null);
  const [filteredMedicineSalesReport, setFilteredMedicineSalesReport] =
    useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [filteredType, setFilteredType] = useState([]);

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = medicinesalesreport.filter(
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
      const tempData2 = filteredItem.filter(
        (item) =>
          item.Department.toLowerCase().includes(text.toLowerCase()) ||
          item.Complaint.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
      setFilteredItem(tempData2);
    } else {
      setData(medicinesalesreport);
      setFilteredItem(item);
    }
  };

  const getData = async () => {
    await OnGetMedicineSalesReport();
    await OnGetMedicineSalesItems();
    await OnGetMedicineSalesType();
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
    const filteredData = filterDataByDateRange(typeqty, dateRange);
    setFilteredType(filteredData);
  }, [dateRange, typeqty]);

  useEffect(() => {
    const filteredData = filterDataByDateRange(itemcount, dateRange);
    setFilteredItem(filteredData);
  }, [dateRange, itemcount]);

  useEffect(() => {
    const filteredData = filterDataByDateRange(data, dateRange);
    setFilteredMedicineSalesReport(filteredData);
  }, [dateRange, data]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    if (medicinesalesreportSuccess) {
      setData(medicinesalesreportData);
      setMedicinesalesreport(medicinesalesreportData);
    }

    if (medicinesalesreportFailed) {
      console.log("Get Medicine Sales Report Failed...");
    }
  }, [
    medicinesalesreportSuccess,
    medicinesalesreportFailed,
    medicinesalesreportData,
  ]);

  useEffect(() => {
    if (medicinesalesitemsSuccess) {
      setItem(medicinesalesitemsData);
      setItemcount(medicinesalesitemsData);
    }

    if (medicinesalesitemsFailed) {
      console.log("Get Medicine Items List Failed...");
    }
  }, [
    medicinesalesitemsSuccess,
    medicinesalesitemsFailed,
    medicinesalesitemsData,
  ]);

  useEffect(() => {
    if (medicinesalestypeSuccess) {
      setType(medicinesalestypeData);
      setTypeQty(medicinesalestypeData);
    }

    if (medicinesalestypeFailed) {
      console.log("Get Medicine Type List Failed...");
    }
  }, [
    medicinesalestypeSuccess,
    medicinesalestypeFailed,
    medicinesalestypeData,
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
      title: "MEDICINE",
      dataIndex: "Item",
      key: "Item",
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
      title: "DEPARTMENT",
      dataIndex: "Department",
      key: "Department",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "TYPE",
      dataIndex: "Type",
      key: "Type",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">{value === 1 ? "PURCHASE" : "SUPPLY"}</div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">
          {value === 1
            ? "PENDING"
            : value === 2
            ? "APPROVED"
            : value === 3
            ? "RELEASED"
            : "REJECT"}
        </div>
      ),
    },
    {
      title: "REMARKS",
      dataIndex: "Remarks",
      key: "Remarks",
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
      title: "MEDICINE",
      dataIndex: "Item",
      key: "Item",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "QTY",
      dataIndex: "Qty",
      key: "Qty",
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
      title: "TYPE",
      dataIndex: "Type",
      key: "Type",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">{value === 1 ? "PURCHASE" : "SUPPLY"}</div>
      ),
    },
    {
      title: "QTY",
      dataIndex: "Qty",
      key: "Qty",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
  ];

  const isLoadingAndDisabled =
    medicinesalesreportLoading ||
    medicinesalesitemsLoading ||
    medicinesalestypeLoading;

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
                pageName="Medicine Report"
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
                      row1: Object.values(filteredItem).map(
                        ({ CreatedAt, Item, Qty }) => ({
                          CreatedAt,
                          Item,
                          Qty,
                        })
                      ),

                      row2: Object.values(filteredType).map(
                        ({ CreatedAt, TYPE, Qty }) => ({
                          TYPE,
                          Qty,
                        })
                      ),

                      row3: Object.values(filteredMedicineSalesReport).map(
                        ({
                          CreatedAt,
                          Item,
                          FirstName,
                          MiddleName,
                          LastName,
                          Department,
                          Type,
                          Status,
                          Remarks,
                        }) => ({
                          CreatedAt,
                          Item,
                          FirstName,
                          MiddleName,
                          LastName,
                          Department,
                          Type,
                          Status,
                          Remarks,
                        })
                      ),
                      fileName: "LLI Medicine Sales Report Summary",
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
            data={filteredItem}
            isLoading={isLoadingAndDisabled}
          />
        </Col>
        <Col span={8}>
          <MainTable
            columns={columns3}
            data={filteredType}
            isLoading={isLoadingAndDisabled}
          />
        </Col>

        <MainTable
          columns={columns}
          data={filteredMedicineSalesReport}
          isLoading={isLoadingAndDisabled}
        />
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    medicinesalesreportLoading:
      state.medicinesalesreport.medicinesalesreportLoading,
    medicinesalesreportSuccess:
      state.medicinesalesreport.medicinesalesreportSuccess,
    medicinesalesreportFailed:
      state.medicinesalesreport.medicinesalesreportFailed,
    medicinesalesreportData: state.medicinesalesreport.medicinesalesreportData,

    medicinesalesitemsLoading:
      state.medicinesalesreport.medicinesalesitemsLoading,
    medicinesalesitemsSuccess:
      state.medicinesalesreport.medicinesalesitemsSuccess,
    medicinesalesitemsFailed:
      state.medicinesalesreport.medicinesalesitemsFailed,
    medicinesalesitemsData: state.medicinesalesreport.medicinesalesitemsData,

    medicinesalestypeLoading:
      state.medicinesalesreport.medicinesalestypeLoading,
    medicinesalestypeSuccess:
      state.medicinesalesreport.medicinesalestypeSuccess,
    medicinesalestypeFailed: state.medicinesalesreport.medicinesalestypeFailed,
    medicinesalestypeData: state.medicinesalesreport.medicinesalestypeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetMedicineSalesReport: () => dispatch(getMedicineSaleReportList()),
    OnGetMedicineSalesItems: () => dispatch(getMedicineSalesItems()),
    OnGetMedicineSalesType: () => dispatch(getMedicineSalesType()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineReportListPage);
