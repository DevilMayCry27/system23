import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Message from "antd/lib/message";

import { module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import UserModal from "./components/userModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

import {
  getClinicPatientsAction,
  postClinicPatientsAction,
  putClinicPatientsAction,
  delClinicPatientsAction,
} from "../../../actions/clinicpatients.js";
import { getCountryList } from "../../../actions/country.js";
import { getGenderList } from "../../../actions/gender.js";
import { getBloodTypeListActions } from "../../../actions/bloodtype.js";
import { getCivilStatusListActions } from "../../../actions/civilstatus.js";
import { getDepartmentList } from "../../../actions/department.js";

const UserListPage = (props) => {
  const {
    access,
    ClinicPatientsListLoading,
    ClinicPatientsListSuccess,
    ClinicPatientsListFailed,
    ClinicPatientsListData,
    OnGetClinicPatient,
    postClinicPatientsLoading,
    postClinicPatientsSuccess,
    postClinicPatientsFailed,
    OnPostClinicPatient,
    putClinicPatientsLoading,
    putClinicPatientsSuccess,
    putClinicPatientsFailed,
    OnPutClinicPatient,
    delClinicPatientsLoading,
    delClinicPatientsSuccess,
    delClinicPatientsFailed,
    OnDelClinicPatient,

    countryListLoading,
    countryListSuccess,
    countryListFailed,
    countryListData,
    OnGetCountryList,
    genderListLoading,
    genderListSuccess,
    genderListFailed,
    genderListData,
    OnGetGenderList,
    bloodtypeListLoading,
    bloodtypeListSuccess,
    bloodtypeListFailed,
    bloodtypeListData,
    OnGetBloodTypeList,
    civilstatusListLoading,
    civilstatusListSuccess,
    civilstatusListFailed,
    civilstatusListData,
    OnGetCivilStatusList,
    departmentListLoading,
    departmentListSuccess,
    departmentListFailed,
    departmentListData,
    OnGetDepartmentList,
  } = props;
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryID, setCountryID] = useState([]);
  const [regionID, setRegionID] = useState([]);
  const [provinceID, setProvinceID] = useState([]);
  const [genders, setGenders] = useState([]);
  const [bloodtype, setBloodType] = useState([]);
  const [civilstatus, setCivilStatus] = useState([]);
  const [department, setDepartment] = useState([]);
  const [departmentID, setDepartmentID] = useState([]);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setCountryID(values?.CountryID);
    setRegionID(values?.RegionID);
    setProvinceID(values?.ProvinceID);
    setDepartmentID(values?.DepartmentID);
    setUserId(values?.CPID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };
  const onSearch = (text) => {
    if (text?.length) {
      const tempData = users.filter(
        (item) =>
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()) ||
          item.Department.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(users);
    }
  };
  const onSubmit = async (values) => {
    if (!userId) {
      await OnPostClinicPatient(values);
      setIsModalVisible(!isModalVisible);
    } else {
      await OnPutClinicPatient(userId, values);
      setIsModalVisible(!isModalVisible);
    }
  };
  const confirmDelete = async (id) => {
    await OnDelClinicPatient(id);
  };

  const getData = async () => {
    await OnGetClinicPatient();
    await OnGetCountryList();
    await OnGetGenderList();
    await OnGetBloodTypeList();
    await OnGetCivilStatusList();
    await OnGetDepartmentList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (ClinicPatientsListSuccess) {
      setData(ClinicPatientsListData);
      setUsers(ClinicPatientsListData);
    }

    if (ClinicPatientsListFailed) {
      console.log("Get User List Failed...");
    }
  }, [
    ClinicPatientsListSuccess,
    ClinicPatientsListFailed,
    ClinicPatientsListData,
  ]);

  useEffect(() => {
    if (countryListSuccess) {
      setCountries(countryListData);
    }

    if (countryListFailed) {
      console.log("Get Country List Failed...");
    }
  }, [countryListSuccess, countryListFailed, countryListData]);

  useEffect(() => {
    if (genderListSuccess) {
      setGenders(genderListData);
    }

    if (genderListFailed) {
      console.log("Get Gender List Failed...");
    }
  }, [genderListSuccess, genderListFailed, genderListData]);

  useEffect(() => {
    if (bloodtypeListSuccess) {
      setBloodType(bloodtypeListData);
    }

    if (bloodtypeListFailed) {
      console.log("Get Gender List Failed...");
    }
  }, [bloodtypeListSuccess, bloodtypeListFailed, bloodtypeListData]);

  useEffect(() => {
    if (civilstatusListSuccess) {
      setCivilStatus(civilstatusListData);
    }

    if (civilstatusListFailed) {
      console.log("Get Gender List Failed...");
    }
  }, [civilstatusListSuccess, civilstatusListFailed, civilstatusListData]);

  useEffect(() => {
    if (departmentListSuccess) {
      setDepartment(departmentListData);
    }

    if (departmentListFailed) {
      console.log("Get Department List Failed...");
    }
  }, [departmentListSuccess, departmentListFailed, departmentListData]);

  useEffect(() => {
    if (postClinicPatientsSuccess) {
      getData();
      //setIsModalVisible(false);
      Message.success("New User Successfully Created!");
    }

    if (postClinicPatientsFailed) {
      Message.error("New User Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postClinicPatientsSuccess, postClinicPatientsFailed]);

  useEffect(() => {
    if (putClinicPatientsSuccess) {
      getData();
      //setIsModalVisible(false);
      Message.success("User Successfully Updated!");
    }

    if (putClinicPatientsFailed) {
      Message.error("User Update Failed!");
    }
    // eslint-disable-next-line
  }, [putClinicPatientsSuccess, putClinicPatientsFailed]);

  useEffect(() => {
    if (delClinicPatientsSuccess) {
      getData();
      Message.success("User Successfully Deleted!");
    }

    if (delClinicPatientsFailed) {
      Message.error("User Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delClinicPatientsSuccess, delClinicPatientsFailed]);

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
    {
      title: "USERNAME",
      dataIndex: "UserName",
      key: "UserName",
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
      dataIndex: "CPID",
      key: "CPID",
      align: "center",
      width: 200,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={getModuleAccess(access?.admin, module?.users)?.update}
          canDelete={getModuleAccess(access?.admin, module?.users)?.delete}
        />
      ),
    },
  ];
  const isLoadingAndDisabled =
    ClinicPatientsListLoading ||
    postClinicPatientsLoading ||
    putClinicPatientsLoading ||
    delClinicPatientsLoading ||
    countryListLoading ||
    genderListLoading ||
    bloodtypeListLoading ||
    civilstatusListLoading ||
    departmentListLoading;

  return (
    <Row className="main-body user-list-page">
      <PageAction
        pageName="User"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.users)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <UserModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        userId={userId}
        countries={countries}
        genders={genders}
        bloodtype={bloodtype}
        civilstatus={civilstatus}
        department={department}
        countryID={countryID}
        regionID={regionID}
        provinceID={provinceID}
        departmentID={departmentID}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    civilstatusListLoading: state.civilstatus.civilstatusListLoading,
    civilstatusListSuccess: state.civilstatus.civilstatusListSuccess,
    civilstatusListFailed: state.civilstatus.civilstatusListFailed,
    civilstatusListData: state.civilstatus.civilstatusListData,

    bloodtypeListLoading: state.bloodtype.bloodtypeListLoading,
    bloodtypeListSuccess: state.bloodtype.bloodtypeListSuccess,
    bloodtypeListFailed: state.bloodtype.bloodtypeListFailed,
    bloodtypeListData: state.bloodtype.bloodtypeListData,

    genderListLoading: state.gender.genderListLoading,
    genderListSuccess: state.gender.genderListSuccess,
    genderListFailed: state.gender.genderListFailed,
    genderListData: state.gender.genderListData,

    departmentListLoading: state.department.departmentListLoading,
    departmentListSuccess: state.department.departmentListSuccess,
    departmentListFailed: state.department.departmentListFailed,
    departmentListData: state.department.departmentListData,

    countryListLoading: state.country.countryListLoading,
    countryListSuccess: state.country.countryListSuccess,
    countryListFailed: state.country.countryListFailed,
    countryListData: state.country.countryListData,

    ClinicPatientsListLoading: state.clinicpatients.ClinicPatientsListLoading,
    ClinicPatientsListSuccess: state.clinicpatients.ClinicPatientsListSuccess,
    ClinicPatientsListFailed: state.clinicpatients.ClinicPatientsListFailed,
    ClinicPatientsListData: state.clinicpatients.ClinicPatientsListData,

    postClinicPatientsLoading: state.clinicpatients.postClinicPatientsLoading,
    postClinicPatientsSuccess: state.clinicpatients.postClinicPatientsSuccess,
    postClinicPatientsFailed: state.clinicpatients.postClinicPatientsFailed,
    postClinicPatientsData: state.clinicpatients.postClinicPatientsData,

    putClinicPatientsLoading: state.clinicpatients.putClinicPatientsLoading,
    putClinicPatientsSuccess: state.clinicpatients.putClinicPatientsSuccess,
    putClinicPatientsFailed: state.clinicpatients.putClinicPatientsFailed,
    putClinicPatientsData: state.clinicpatients.putClinicPatientsData,

    delClinicPatientsLoading: state.clinicpatients.delClinicPatientsLoading,
    delClinicPatientsSuccess: state.clinicpatients.delClinicPatientsSuccess,
    delClinicPatientsFailed: state.clinicpatients.delClinicPatientsFailed,
    delClinicPatientsData: state.clinicpatients.delClinicPatientsData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCountryList: () => dispatch(getCountryList()),
    OnGetGenderList: () => dispatch(getGenderList()),
    OnGetBloodTypeList: () => dispatch(getBloodTypeListActions()),
    OnGetCivilStatusList: () => dispatch(getCivilStatusListActions()),
    OnGetDepartmentList: () => dispatch(getDepartmentList()),

    OnGetClinicPatient: () => dispatch(getClinicPatientsAction()),
    OnPostClinicPatient: (data) => dispatch(postClinicPatientsAction(data)),
    OnPutClinicPatient: (id, data) =>
      dispatch(putClinicPatientsAction(id, data)),
    OnDelClinicPatient: (id) => dispatch(delClinicPatientsAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
