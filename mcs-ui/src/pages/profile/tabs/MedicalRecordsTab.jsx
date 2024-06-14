import React, { useEffect, useState } from "react";
import connect from "react-redux/es/components/connect";
import { getCurrentUserProfileList } from "../../../actions/profile";
import { getMedicalRecordList } from "../../../actions/medicalrecord.js";
// import { capitalize } from "../../../utils/sentence-formatter";
// import UserAvatar from "../components/UserAvatar";
// import styles from "./MedicalRecordsTab.module.scss";
// import UpdateUserPasswordModal from "../modals/UpdateUserPasswordModal";
// import UserOutlined from "@ant-design/icons/UserOutlined";
// import CameraOutlined from "@ant-design/icons/CameraOutlined";
// import Button from "antd/lib/button";
// import Tooltip from "antd/lib/tooltip";
import MainTable from "../../../components/maintable.jsx";
import { mmDdYyyy } from "../../../utils/formatter.js";
import Row from "antd/lib/row";

const MedicalRecordsTab = ({
  OnGetProfileList,
  profileListSuccess,
  profileListData,
  medicalrecordListLoading,
  medicalrecordListSuccess,
  medicalrecordListFailed,
  medicalrecordListData,
  OnGetMedicalRecordList,
}) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({});
  // eslint-disable-next-line
  const [medicalrecord, setMedicalRecord] = useState([]);
  const [data, setData] = useState([]);
  const OnFetchData = async () => {
    await OnGetProfileList();
    await OnGetMedicalRecordList(currentUser.ID);
  };
  useEffect(() => {
    OnFetchData();
    // eslint-disable-next-line
  }, [currentUser.ID]);

  useEffect(() => {
    if (medicalrecordListSuccess) {
      setData(medicalrecordListData);
      setMedicalRecord(medicalrecordListData);
    }

    if (medicalrecordListFailed) {
      console.log("Get Medical Record List Failed...");
    }
  }, [
    medicalrecordListSuccess,
    medicalrecordListFailed,
    medicalrecordListData,
  ]);

  useEffect(() => {
    if (profileListSuccess && profileListData) {
      setCurrentUser(profileListData[0]);
    }
  }, [profileListSuccess, profileListData]);

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
      title: "PHYSICIAN",
      dataIndex: "Physician",
      key: "Physician",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
  ];

  const isLoadingAndDisabled = medicalrecordListLoading;

  return (
    <Row className="main-body section-list-page">
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
    profileListLoading: state.profile.profileListLoading,
    profileListSuccess: state.profile.profileListSuccess,
    profileListFailed: state.profile.profileListFailed,
    profileListData: state.profile.profileListData,

    medicalrecordListLoading: state.medicalrecord.medicalrecordListLoading,
    medicalrecordListSuccess: state.medicalrecord.medicalrecordListSuccess,
    medicalrecordListFailed: state.medicalrecord.medicalrecordListFailed,
    medicalrecordListData: state.medicalrecord.medicalrecordListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetProfileList: () => dispatch(getCurrentUserProfileList()),
    OnGetMedicalRecordList: (MRID) => dispatch(getMedicalRecordList(MRID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordsTab);
