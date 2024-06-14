import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getRelationListActions,
  postRelationActions,
  putRelationActions,
  delRelationActions,
} from "../../../actions/relation.js";

import RelationModal from "./components/relationModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const RelationListPage = (props) => {
  const {
    access,
    relationListLoading,
    relationListSuccess,
    relationListFailed,
    relationListData,
    OnGetRelationList,
    postRelationLoading,
    postRelationSuccess,
    postRelationFailed,
    OnPostRelation,
    putRelationLoading,
    putRelationSuccess,
    putRelationFailed,
    OnPutRelation,
    delRelationLoading,
    delRelationSuccess,
    delRelationFailed,
    OnDelRelation,
  } = props;
  const [form] = Form.useForm();
  const [relations, setRelations] = useState([]);
  const [relationId, setRelationId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setRelationId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!relationId) {
      await OnPostRelation(values);
    } else {
      await OnPutRelation(relationId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelRelation(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = relations.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(relations);
    }
  };

  const getData = async () => {
    await OnGetRelationList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (relationListSuccess) {
      setData(relationListData);
      setRelations(relationListData);
    }

    if (relationListFailed) {
      console.log("Get Relation List Failed...");
    }
  }, [relationListSuccess, relationListFailed, relationListData]);

  useEffect(() => {
    if (postRelationSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Relation Successfully Created!");
    }

    if (postRelationFailed) {
      Message.error("New Relation Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postRelationSuccess, postRelationFailed]);

  useEffect(() => {
    if (putRelationSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Relation Successfully Updated!");
    }

    if (putRelationFailed) {
      Message.error("Relation Update Failed!");
    }
    // eslint-disable-next-line
  }, [putRelationSuccess, putRelationFailed]);

  useEffect(() => {
    if (delRelationSuccess) {
      getData();
      Message.success("Relation Successfully Deleted!");
    }

    if (delRelationFailed) {
      Message.error("Relation Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delRelationSuccess, delRelationFailed]);

  const columns = [
    {
      title: "RELATION",
      dataIndex: "Name",
      key: "Name",
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
          canUpdate={
            getModuleAccess(access?.admin, module?.relationship)?.update
          }
          canDelete={
            getModuleAccess(access?.admin, module?.relationship)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    relationListLoading ||
    postRelationLoading ||
    putRelationLoading ||
    delRelationLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Relation"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.relationship)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <RelationModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        relationId={relationId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    relationListLoading: state.relation.relationListLoading,
    relationListSuccess: state.relation.relationListSuccess,
    relationListFailed: state.relation.relationListFailed,
    relationListData: state.relation.relationListData,

    postRelationLoading: state.relation.postRelationLoading,
    postRelationSuccess: state.relation.postRelationSuccess,
    postRelationFailed: state.relation.postRelationFailed,
    postRelationData: state.relation.postRelationData,

    putRelationLoading: state.relation.putRelationLoading,
    putRelationSuccess: state.relation.putRelationSuccess,
    putRelationFailed: state.relation.putRelationFailed,
    putRelationData: state.relation.putRelationData,

    delRelationLoading: state.relation.delRelationLoading,
    delRelationSuccess: state.relation.delRelationSuccess,
    delRelationFailed: state.relation.delRelationFailed,
    delRelationData: state.relation.delRelationData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetRelationList: () => dispatch(getRelationListActions()),
    OnPostRelation: (data) => dispatch(postRelationActions(data)),
    OnPutRelation: (id, data) => dispatch(putRelationActions(id, data)),
    OnDelRelation: (id) => dispatch(delRelationActions(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RelationListPage);
