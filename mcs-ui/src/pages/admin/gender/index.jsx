import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getGenderList,
  postGender,
  putGender,
  delGender,
} from "../../../actions/gender.js";

import GenderModal from "./components/genderModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const GenderListPage = (props) => {
  const {
    access,
    genderListLoading,
    genderListSuccess,
    genderListFailed,
    genderListData,
    OnGetGenderList,
    postGenderLoading,
    postGenderSuccess,
    postGenderFailed,
    OnPostGender,
    putGenderLoading,
    putGenderSuccess,
    putGenderFailed,
    OnPutGender,
    delGenderLoading,
    delGenderSuccess,
    delGenderFailed,
    OnDelGender,
  } = props;
  const [form] = Form.useForm();
  const [genders, setGenders] = useState([]);
  const [genderId, setGenderId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setGenderId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!genderId) {
      await OnPostGender(values);
      console.log(values);
    } else {
      await OnPutGender(genderId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelGender(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = genders.filter((item) =>
        item.Gender.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(genders);
    }
  };

  const getData = async () => {
    await OnGetGenderList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genderListSuccess) {
      setData(genderListData);
      setGenders(genderListData);
    }

    if (genderListFailed) {
      console.log("Get Gender List Failed...");
    }
  }, [genderListSuccess, genderListFailed, genderListData]);

  useEffect(() => {
    if (postGenderSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Gender Successfully Created!");
    }

    if (postGenderFailed) {
      Message.error("New Gender Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postGenderSuccess, postGenderFailed]);

  useEffect(() => {
    if (putGenderSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Gender Successfully Updated!");
    }

    if (putGenderFailed) {
      Message.error("Gender Update Failed!");
    }
    // eslint-disable-next-line
  }, [putGenderSuccess, putGenderFailed]);

  useEffect(() => {
    if (delGenderSuccess) {
      getData();
      Message.success("Gender Successfully Deleted!");
    }

    if (delGenderFailed) {
      Message.error("Gender Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delGenderSuccess, delGenderFailed]);

  const columns = [
    {
      title: "GENDER",
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
          canUpdate={getModuleAccess(access?.admin, module?.gender)?.update}
          canDelete={getModuleAccess(access?.admin, module?.gender)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    genderListLoading ||
    postGenderLoading ||
    putGenderLoading ||
    delGenderLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Gender"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.gender)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <GenderModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled}
        genderId={genderId}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    genderListLoading: state.gender.genderListLoading,
    genderListSuccess: state.gender.genderListSuccess,
    genderListFailed: state.gender.genderListFailed,
    genderListData: state.gender.genderListData,

    postGenderLoading: state.gender.postGenderLoading,
    postGenderSuccess: state.gender.postGenderSuccess,
    postGenderFailed: state.gender.postGenderFailed,
    postGenderData: state.gender.postGenderData,

    putGenderLoading: state.gender.putGenderLoading,
    putGenderSuccess: state.gender.putGenderSuccess,
    putGenderFailed: state.gender.putGenderFailed,
    putGenderData: state.gender.putGenderData,

    delGenderLoading: state.gender.delGenderLoading,
    delGenderSuccess: state.gender.delGenderSuccess,
    delGenderFailed: state.gender.delGenderFailed,
    delGenderData: state.gender.delGenderData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetGenderList: () => dispatch(getGenderList()),
    OnPostGender: (data) => dispatch(postGender(data)),
    OnPutGender: (id, data) => dispatch(putGender(id, data)),
    OnDelGender: (id) => dispatch(delGender(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderListPage);
