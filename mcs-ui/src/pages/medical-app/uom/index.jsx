import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getUomListAction,
  postUomAction,
  putUomAction,
  delUomAction,
} from "../../../actions/uom.js";

import BloodTypeModal from "./components/uomModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const UomListPage = (props) => {
  const {
    access,
    uomListLoading,
    uomListSuccess,
    uomListFailed,
    uomListData,
    OnGetUomList,
    postUomLoading,
    postUomSuccess,
    postUomFailed,
    OnPostUom,
    putUomLoading,
    putUomSuccess,
    putUomFailed,
    OnPutUom,
    delUomLoading,
    delUomSuccess,
    delUomFailed,
    OnDelUom,
  } = props;
  const [form] = Form.useForm();
  const [uom, setUom] = useState([]);
  const [uomId, setUomId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setUomId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!uomId) {
      await OnPostUom(values);
    } else {
      await OnPutUom(uomId, values);
      console.log(values, "EDIT");
    }
  };

  const confirmDelete = async (id) => {
    await OnDelUom(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = uom.filter((item) =>
        item.Unit.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(uom);
    }
  };

  const getData = async () => {
    await OnGetUomList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (uomListSuccess) {
      setData(uomListData);
      setUom(uomListData);
    }

    if (uomListFailed) {
      console.log("Get UOM List Failed...");
    }
  }, [uomListSuccess, uomListFailed, uomListData]);

  useEffect(() => {
    if (postUomSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New UOM Successfully Created!");
    }

    if (postUomFailed) {
      Message.error("New UOM Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postUomSuccess, postUomFailed]);

  useEffect(() => {
    if (putUomSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("UOM Successfully Updated!");
    }

    if (putUomFailed) {
      Message.error("UOM Update Failed!");
    }
    // eslint-disable-next-line
  }, [putUomSuccess, putUomFailed]);

  useEffect(() => {
    if (delUomSuccess) {
      getData();
      Message.success("UOM Successfully Deleted!");
    }

    if (delUomFailed) {
      Message.error("UOM Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delUomSuccess, delUomFailed]);

  const columns = [
    {
      title: "UNIT",
      dataIndex: "Unit",
      key: "Unit",
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
        <div className={getStatusType(value)?.class}>
          {getStatusType(value)?.text}
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
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={getModuleAccess(access?.reference, module?.uom)?.update}
          canDelete={getModuleAccess(access?.reference, module?.uom)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    uomListLoading || postUomLoading || putUomLoading || delUomLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="UOM"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.reference, module?.uom)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <BloodTypeModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        uomId={uomId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    uomListLoading: state.uom.uomListLoading,
    uomListSuccess: state.uom.uomListSuccess,
    uomListFailed: state.uom.uomListFailed,
    uomListData: state.uom.uomListData,

    postUomLoading: state.uom.postUomLoading,
    postUomSuccess: state.uom.postUomSuccess,
    postUomFailed: state.uom.postUomFailed,
    postUomData: state.uom.postUomData,

    putUomLoading: state.uom.putUomLoading,
    putUomSuccess: state.uom.putUomSuccess,
    putUomFailed: state.uom.putUomFailed,
    putUomData: state.uom.putUomData,

    delUomLoading: state.uom.delUomLoading,
    delUomSuccess: state.uom.delUomSuccess,
    delUomFailed: state.uom.delUomFailed,
    delUomData: state.uom.delUomData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetUomList: () => dispatch(getUomListAction()),
    OnPostUom: (data) => dispatch(postUomAction(data)),
    OnPutUom: (id, data) => dispatch(putUomAction(id, data)),
    OnDelUom: (id) => dispatch(delUomAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UomListPage);
