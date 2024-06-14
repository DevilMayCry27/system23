import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import Switch from "antd/lib/switch";
import Message from "antd/lib/message";

import MainTable from "../../../../components/maintable.jsx";

import {
  getAccessListByPosition,
  putAccessByPosition,
} from "../../../../actions/access.js";
import * as accessReducer from "../../../../reducers/accessSlice.js";

const AccessModal = (props) => {
  const {
    isModalVisible,
    showAccess,
    positionId,
    positionName,
    accessListLoading,
    accessListSuccess,
    accessListFailed,
    accessListData,
    putAccessLoading,
    putAccessSuccess,
    putAccessFailed,
    OnGetAccessListByPosition,
    OnPutAccessByPosition,
  } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = async () => {
    await OnGetAccessListByPosition(positionId);
  };
  console.log(positionId);
  const modifyAccess = (id, key, value) => {
    let tempData = data.map((element) => {
      return { ...element };
    });

    const index = tempData.findIndex((element) => element.ID === id);
    tempData[index][key] = Number(value);

    setData(tempData);
  };

  const onAccessUpdate = async () => {
    await OnPutAccessByPosition(positionId, { access: data });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accessListSuccess) {
      setData(accessListData);
    }

    if (accessListFailed) {
      console.log("Get Position Access List Failed...");
    }
  }, [accessListSuccess, accessListFailed, accessListData, positionId]);

  useEffect(() => {
    if (putAccessSuccess) {
      getData();
      dispatch(accessReducer.resetData());
      showAccess();
      Message.success("Position Access Successfully Updated!");
    }

    if (putAccessFailed) {
      Message.error("Position Access Update Failed!");
    }
    // eslint-disable-next-line
  }, [putAccessSuccess, putAccessFailed]);

  const columns = [
    {
      title: "APP",
      dataIndex: "AppName",
      key: "AppName",
      align: "center",
      width: 200,
      className: "module-name",
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "MODULE NAME",
      dataIndex: "FeatureName",
      key: "FeatureName",
      align: "center",
      width: 500,
      className: "module-name",
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "CREATE",
      dataIndex: "Store",
      key: "Store",
      align: "center",
      render: (value, row) => (
        <Switch
          className="switch-button"
          size="small"
          checkedChildren="YES"
          unCheckedChildren="NO"
          defaultChecked={value}
          onChange={(e) => modifyAccess(row?.ID, "Store", e)}
        />
      ),
    },
    {
      title: "VIEW",
      dataIndex: "Retrieve",
      key: "Retrieve",
      align: "center",
      render: (value, row) => (
        <Switch
          className="switch-button"
          size="small"
          checkedChildren="YES"
          unCheckedChildren="NO"
          defaultChecked={value}
          onChange={(e) => modifyAccess(row?.ID, "Retrieve", e)}
        />
      ),
    },
    {
      title: "UPDATE",
      dataIndex: "Modify",
      key: "Modify",
      align: "center",
      render: (value, row) => (
        <Switch
          className="switch-button"
          size="small"
          checkedChildren="YES"
          unCheckedChildren="NO"
          defaultChecked={value}
          onChange={(e) => modifyAccess(row?.ID, "Modify", e)}
        />
      ),
    },
    {
      title: "DELETE",
      dataIndex: "Destroy",
      key: "Destroy",
      align: "center",
      render: (value, row) => (
        <Switch
          className="switch-button"
          size="small"
          checkedChildren="YES"
          unCheckedChildren="NO"
          defaultChecked={value}
          onChange={(e) => modifyAccess(row?.ID, "Destroy", e)}
        />
      ),
    },
    {
      title: "REPORT",
      dataIndex: "Report",
      key: "Report",
      align: "center",
      render: (value, row) => (
        <Switch
          className="switch-button"
          size="small"
          checkedChildren="YES"
          unCheckedChildren="NO"
          defaultChecked={value}
          onChange={(e) => modifyAccess(row?.ID, "Report", e)}
        />
      ),
    },
  ];

  const isLoadingAndDisabled = accessListLoading || putAccessLoading;

  return (
    <Modal
      className="access-modal"
      title={`${positionName} - Module Access`}
      visible={isModalVisible}
      onOk={showAccess}
      onCancel={showAccess}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
      width={"80%"}
    >
      <Row className="access-row">
        <MainTable
          columns={columns}
          data={data}
          isLoading={isLoadingAndDisabled}
        />
      </Row>
      <Row className="modal-action-btns">
        <Button
          className="cancel-btn"
          loading={isLoadingAndDisabled}
          onClick={() => showAccess()}
        >
          CANCEL
        </Button>
        <Button
          htmlType="submit"
          loading={isLoadingAndDisabled}
          className="submit-btn"
          onClick={() => onAccessUpdate()}
        >
          UPDATE
        </Button>
      </Row>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    accessListLoading: state.access.accessListLoading,
    accessListSuccess: state.access.accessListSuccess,
    accessListFailed: state.access.accessListFailed,
    accessListData: state.access.accessListData,

    putAccessLoading: state.access.putAccessLoading,
    putAccessSuccess: state.access.putAccessSuccess,
    putAccessFailed: state.access.putAccessFailed,
    putAccessData: state.access.putAccessData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetAccessListByPosition: (id) => dispatch(getAccessListByPosition(id)),
    OnPutAccessByPosition: (id, data) =>
      dispatch(putAccessByPosition(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessModal);
