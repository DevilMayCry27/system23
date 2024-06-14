import React, { useEffect, useState } from "react";
import connect from "react-redux/es/components/connect";

import { getCurrentUserProfileList } from "../../../actions/profile.js";
import { getLaboratoryListAction } from "../../../actions/laboratory.js";

import MainTable from "../../../components/maintable.jsx";
import { mmDdYyyy } from "../../../utils/formatter.js";
import Row from "antd/lib/row";

const ApeTab = ({
  OnGetProfileList,
  profileListSuccess,
  profileListData,

  laboratoryListLoading,
  laboratoryListSuccess,
  laboratoryListFailed,
  laboratoryListData,
  OnGetLaboratoryList,
}) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState([]);
  const OnFetchData = async () => {
    await OnGetProfileList();
    await OnGetLaboratoryList(currentUser.ID);
  };
  useEffect(() => {
    OnFetchData();
    // eslint-disable-next-line
  }, [currentUser.ID]);

  useEffect(() => {
    if (laboratoryListSuccess) {
      setData(laboratoryListData);
    }

    if (laboratoryListFailed) {
      console.log("Get Laboratory List Failed...");
    }
  }, [laboratoryListSuccess, laboratoryListFailed, laboratoryListData]);

  useEffect(() => {
    if (profileListSuccess && profileListData) {
      setCurrentUser(profileListData[0]);
    }
  }, [profileListSuccess, profileListData]);

  const columns = [
    {
      title: "",
      dataIndex: "FilePath",
      key: "FilePath",
      align: "center",
      width: 225,

      render: (value, row) => (
        <div className="field-text">
          <a
            href={`${process.env.REACT_APP_API_BASE_URL}/Laboratory/${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW
          </a>
        </div>
      ),
    },
    {
      title: "FILE",
      dataIndex: "OriginalName",
      key: "OriginalName",
      align: "center",
      width: 225,

      render: (value, row) => <div className="field-text">{value}</div>,
    },
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
  ];

  const isLoadingAndDisabled = laboratoryListLoading;

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

    laboratoryListLoading: state.laboratory.laboratoryListLoading,
    laboratoryListSuccess: state.laboratory.laboratoryListSuccess,
    laboratoryListFailed: state.laboratory.laboratoryListFailed,
    laboratoryListData: state.laboratory.laboratoryListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetProfileList: () => dispatch(getCurrentUserProfileList()),
    OnGetLaboratoryList: (LABid) => dispatch(getLaboratoryListAction(LABid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApeTab);
