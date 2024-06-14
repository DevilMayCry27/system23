import React, { useEffect, useState } from "react";
import connect from "react-redux/es/components/connect";

import { getCurrentUserProfileList } from "../../../actions/profile.js";
import { getApeListAction } from "../../../actions/ape.js";

import MainTable from "../../../components/maintable.jsx";
import { mmDdYyyy } from "../../../utils/formatter.js";
import Row from "antd/lib/row";

const ApeTab = ({
  OnGetProfileList,
  profileListSuccess,
  profileListData,

  apeListLoading,
  apeListSuccess,
  apeListFailed,
  apeListData,
  OnGetApeList,
}) => {
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState([]);
  const OnFetchData = async () => {
    await OnGetProfileList();
    await OnGetApeList(currentUser.ID);
  };
  useEffect(() => {
    OnFetchData();
    // eslint-disable-next-line
  }, [currentUser.ID]);

  useEffect(() => {
    if (apeListSuccess) {
      setData(apeListData);
    }

    if (apeListFailed) {
      console.log("Get APE List Failed...");
    }
  }, [apeListSuccess, apeListFailed, apeListData]);

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
            href={`${process.env.REACT_APP_API_BASE_URL}/APE/${value}`}
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

  const isLoadingAndDisabled = apeListLoading;

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

    apeListLoading: state.ape.apeListLoading,
    apeListSuccess: state.ape.apeListSuccess,
    apeListFailed: state.ape.apeListFailed,
    apeListData: state.ape.apeListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetProfileList: () => dispatch(getCurrentUserProfileList()),
    OnGetApeList: (APEid) => dispatch(getApeListAction(APEid)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApeTab);
