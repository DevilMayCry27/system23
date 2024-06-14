import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

// import { mmDdYyyy } from "../../../utils/formatter.js";
import {
  // getStatusType,
  module,
} from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getPositionList,
  postPosition,
  putPosition,
  delPosition,
} from "../../../actions/position.js";

import PositionModal from "./components/positionModal";
import AccessModal from "./components/accessModal";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const PositionListPage = (props) => {
  const {
    access,
    positionListLoading,
    positionListSuccess,
    positionListFailed,
    positionListData,
    OnGetPositionList,
    postPositionLoading,
    postPositionSuccess,
    postPositionFailed,
    OnPostPosition,
    putPositionLoading,
    putPositionSuccess,
    putPositionFailed,
    OnPutPosition,
    delPositionLoading,
    delPositionSuccess,
    delPositionFailed,
    OnDelPosition,
  } = props;
  const [form] = Form.useForm();
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState(0);
  const [positionName, setPositionName] = useState("");
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const showModal = (values = {}) => {
    setPositionId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const showAccess = (id = 0, name = "") => {
    setPositionId(id);
    setPositionName(name);
    setShowAccessModal(!showAccessModal);
  };

  const onSubmit = async (values) => {
    if (!positionId) {
      await OnPostPosition(values);
    } else {
      await OnPutPosition(positionId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelPosition(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = positions.filter(
        (item) =>
          item.PositionName.toLowerCase().includes(text.toLowerCase()) ||
          item.PositionDesc.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(positions);
    }
  };

  const getData = async () => {
    await OnGetPositionList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (positionListSuccess) {
      setData(positionListData);
      setPositions(positionListData);
    }

    if (positionListFailed) {
      console.log("Get Position List Failed...");
    }
  }, [positionListSuccess, positionListFailed, positionListData]);

  useEffect(() => {
    if (postPositionSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Position Successfully Created!");
    }

    if (postPositionFailed) {
      Message.error("New Position Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postPositionSuccess, postPositionFailed]);

  useEffect(() => {
    if (putPositionSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Position Successfully Updated!");
    }

    if (putPositionFailed) {
      Message.error("Position Update Failed!");
    }
    // eslint-disable-next-line
  }, [putPositionSuccess, putPositionFailed]);

  useEffect(() => {
    if (delPositionSuccess) {
      getData();
      Message.success("Position Successfully Deleted!");
    }

    if (delPositionFailed) {
      Message.error("Position Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delPositionSuccess, delPositionFailed]);

  const columns = [
    {
      title: "POSITION NAME",
      dataIndex: "PositionName",
      key: "PositionName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    // {
    //   title: "DESCRIPTION",
    //   dataIndex: "PositionDesc",
    //   key: "PositionDesc",
    //   align: "center",
    //   width: 200,
    //   render: (value, row) => <div className="field-text">{value}</div>,
    // },
    // {
    //   title: "STATUS",
    //   dataIndex: "Status",
    //   key: "Status",
    //   align: "center",
    //   width: 150,
    //   render: (value, row) => (
    //     <div className={getStatusType(value)?.class}>
    //       {getStatusType(value)?.text}
    //     </div>
    //   ),
    // },
    // {
    //   title: "DATE CREATED",
    //   dataIndex: "CreatedAt",
    //   key: "CreatedAt",
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
      width: 200,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          showAccessIcon={true}
          showAccessModal={() => showAccess(value, row?.PositionName)}
          canUpdate={getModuleAccess(access?.admin, module?.positions)?.update}
          canDelete={getModuleAccess(access?.admin, module?.positions)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    positionListLoading ||
    postPositionLoading ||
    putPositionLoading ||
    delPositionLoading;

  return (
    <Row className="main-body position-list-page">
      <PageAction
        pageName="Position"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.positions)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <PositionModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        positionId={positionId}
      />
      {positionId && showAccessModal ? (
        <AccessModal
          isModalVisible={showAccessModal}
          showAccess={showAccess}
          positionId={positionId}
          positionName={positionName}
        />
      ) : (
        <></>
      )}
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    positionListLoading: state.position.positionListLoading,
    positionListSuccess: state.position.positionListSuccess,
    positionListFailed: state.position.positionListFailed,
    positionListData: state.position.positionListData,

    postPositionLoading: state.position.postPositionLoading,
    postPositionSuccess: state.position.postPositionSuccess,
    postPositionFailed: state.position.postPositionFailed,
    postPositionData: state.position.postPositionData,

    putPositionLoading: state.position.putPositionLoading,
    putPositionSuccess: state.position.putPositionSuccess,
    putPositionFailed: state.position.putPositionFailed,
    putPositionData: state.position.putPositionData,

    delPositionLoading: state.position.delPositionLoading,
    delPositionSuccess: state.position.delPositionSuccess,
    delPositionFailed: state.position.delPositionFailed,
    delPositionData: state.position.delPositionData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetPositionList: () => dispatch(getPositionList()),
    OnPostPosition: (data) => dispatch(postPosition(data)),
    OnPutPosition: (id, data) => dispatch(putPosition(id, data)),
    OnDelPosition: (id) => dispatch(delPosition(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionListPage);
