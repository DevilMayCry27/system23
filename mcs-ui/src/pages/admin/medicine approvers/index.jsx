import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Select from "antd/lib/select";
import Button from "antd/lib/button";
import Message from "antd/lib/message";

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";
import { Divider } from "antd";
import { Col } from "antd";

import {
  getMedicineApproverAction,
  getAuthorizePersonelAction,
  postMedicineApproverAction,
  delMedicineApproverActions,
} from "../../../actions/medicineapprover.js";

import MainTable from "../../../components/maintable.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const { Option } = Select;

const MedicineApproverListPage = (props) => {
  const {
    access,
    medicineapproverLoading,
    medicineapproverSuccess,
    medicineapproverFailed,
    medicineapproverData,
    OnGetMedicineApproverList,
    authorizepersonelLoading,
    authorizepersonelSuccess,
    authorizepersonelFailed,
    authorizepersonelData,
    OnGetAuthorizePersonelList,
    postMedicineapproverLoading,
    postMedicineapproverSuccess,
    postMedicineapproverFailed,
    OnPostMedicineApprover,
    delMedicineapproverLoading,
    delMedicineapproverSuccess,
    delMedicineapproverFailed,
    OnDelMedicineApprover,
  } = props;
  const [formapprove] = Form.useForm();
  const [approver, setApprover] = useState([]);
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);

  const getData = async () => {
    await OnGetMedicineApproverList();
    await OnGetAuthorizePersonelList();
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (medicineapproverSuccess) {
      setApprover(medicineapproverData);
    }

    if (medicineapproverFailed) {
      console.log("Get Medicine Approver List Failed...");
    }
  }, [medicineapproverSuccess, medicineapproverFailed, medicineapproverData]);

  useEffect(() => {
    if (authorizepersonelSuccess) {
      setData(authorizepersonelData);
    }

    if (authorizepersonelFailed) {
      console.log("Get Authorize Personel List Failed...");
    }
  }, [
    authorizepersonelSuccess,
    authorizepersonelFailed,
    authorizepersonelData,
  ]);

  const onSelectItemCode = (value) => {
    const splitted = value?.split("||");

    setInfo({
      FirstName: splitted && splitted[0],
      MiddleName: splitted && splitted[1],
      LastName: splitted && splitted[2],
      EmployeeId: splitted && splitted[3],
      UserId: splitted && splitted[4],
    });
  };

  useEffect(() => {
    if (postMedicineapproverSuccess) {
      getData();
      Message.success("New Medicine Order Successfully Created!");
    }

    if (postMedicineapproverFailed) {
      Message.error("New Medicine Order Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postMedicineapproverSuccess, postMedicineapproverFailed]);

  const onSubmit = async (values) => {
    const formValuesWithInfo = {
      ...values,
      FirstName: info.FirstName,
      MiddleName: info.MiddleName,
      LastName: info.LastName,
      EmployeeId: info.EmployeeId,
      UserId: info.UserId,
    };
    await OnPostMedicineApprover(formValuesWithInfo);
  };

  const confirmDelete = async (ID) => {
    await OnDelMedicineApprover(ID);
  };

  useEffect(() => {
    if (delMedicineapproverSuccess) {
      getData();
      Message.success("Authorize Personel Successfully Deleted!");
    }

    if (delMedicineapproverFailed) {
      Message.error("Authorize Personel Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delMedicineapproverSuccess, delMedicineapproverFailed]);

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
      title: "LEVEL",
      dataIndex: "Level",
      key: "Level",
      align: "center",
      width: 225,
      render: (value, row) => (
        <div className="field-text">
          {value === "1" ? "APPROVER" : "RELEASE"}
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
          confirmDelete={() => confirmDelete(value)}
          canDelete={
            getModuleAccess(access?.admin, module?.medicineapprover)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    medicineapproverLoading ||
    authorizepersonelLoading ||
    postMedicineapproverLoading ||
    delMedicineapproverLoading;

  return (
    <Row className="main-body section-list-page">
      <Divider orientation="left">ADD PERSONEL</Divider>

      <Col span={24}>
        <Form
          name="new form"
          onFinish={onSubmit}
          autoComplete="off"
          className="new-form"
          form={formapprove}
        >
          <Row>
            <Col span={1}></Col>
            <Col span={7}>
              <div className="field-label">EMPLOYEE</div>
              <Form.Item
                name="FullName"
                rules={[
                  {
                    required: true,
                    message: "Please select authorize personnel!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Personnel"
                  className="select-field"
                  onChange={onSelectItemCode}
                  showSearch
                >
                  {approver
                    .slice()
                    .sort((a, b) => a.FullName.localeCompare(b.FullName))
                    .map((approver) => (
                      <Option
                        key={approver?.FullName}
                        value={`${approver?.FirstName}||${approver?.MiddleName}||${approver?.LastName}||${approver?.EID}||${approver?.UID}`}
                      >
                        {approver?.FullName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={7}>
              <div className="field-label">APPROVAL LEVEL</div>
              <Form.Item
                name="Level"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Select Level" className="select-field">
                  <Option value={1}>APPROVAL</Option>
                  <Option value={2}>RELEASE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={5}>
              <center>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="submit-btn"
                    loading={isLoadingAndDisabled}
                  >
                    ADD PERSONEL
                  </Button>
                </Form.Item>
              </center>
            </Col>
          </Row>
        </Form>
      </Col>
      <Divider orientation="left">AUTHORIZE PERSONS</Divider>
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    medicineapproverLoading: state.medicineapprover.medicineapproverLoading,
    medicineapproverSuccess: state.medicineapprover.medicineapproverSuccess,
    medicineapproverFailed: state.medicineapprover.medicineapproverFailed,
    medicineapproverData: state.medicineapprover.medicineapproverData,

    authorizepersonelLoading: state.medicineapprover.authorizepersonelLoading,
    authorizepersonelSuccess: state.medicineapprover.authorizepersonelSuccess,
    authorizepersonelFailed: state.medicineapprover.authorizepersonelFailed,
    authorizepersonelData: state.medicineapprover.authorizepersonelData,

    postMedicineapproverLoading:
      state.medicineapprover.postMedicineapproverLoading,
    postMedicineapproverSuccess:
      state.medicineapprover.postMedicineapproverSuccess,
    postMedicineapproverFailed:
      state.medicineapprover.postMedicineapproverFailed,
    postMedicineapproverData:
      state.medicineapprover.postCipostMedicineapproverDatayData,

    delMedicineapproverLoading:
      state.medicineapprover.delMedicineapproverLoading,
    delMedicineapproverSuccess:
      state.medicineapprover.delMedicineapproverSuccess,
    delMedicineapproverFailed: state.medicineapprover.delMedicineapproverFailed,
    delMedicineapproverData: state.medicineapprover.delMedicineapproverData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetMedicineApproverList: () => dispatch(getMedicineApproverAction()),
    OnGetAuthorizePersonelList: () => dispatch(getAuthorizePersonelAction()),
    OnPostMedicineApprover: (data) =>
      dispatch(postMedicineApproverAction(data)),
    OnDelMedicineApprover: (ID) => dispatch(delMedicineApproverActions(ID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineApproverListPage);
