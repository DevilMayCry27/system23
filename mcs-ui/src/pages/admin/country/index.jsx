import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getCountryList,
  getCountryDuplicateAction,
  postCountry,
  putCountry,
  delCountry,
} from "../../../actions/country.js";

import CountryModal from "./components/countryModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const CountryListPage = (props) => {
  const {
    access,
    countryListLoading,
    countryListSuccess,
    countryListFailed,
    countryListData,
    OnGetCountryList,
    countryNameLoading,
    countryNameSuccess,
    countryNameFailed,
    countryNameData,
    OnGetCountryDuplicate,
    postCountryLoading,
    postCountrySuccess,
    postCountryFailed,
    OnPostCountry,
    putCountryLoading,
    putCountrySuccess,
    putCountryFailed,
    OnPutCountry,
    delCountryLoading,
    delCountrySuccess,
    delCountryFailed,
    OnDelCountry,
  } = props;
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setCountryId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!countryId) {
      await OnPostCountry(values);
    } else {
      await OnPutCountry(countryId, values);
    }
  };
  const confirmDelete = async (id) => {
    await OnDelCountry(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = countries.filter((item) =>
        item.CountryName.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(countries);
    }
  };

  const getData = async () => {
    await OnGetCountryList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (countryListSuccess) {
      setData(countryListData);
      setCountries(countryListData);
    }

    if (countryListFailed) {
      console.log("Get Country List Failed...");
    }
  }, [countryListSuccess, countryListFailed, countryListData]);

  useEffect(() => {
    if (postCountrySuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("New Country Successfully Created!");
    }

    if (postCountryFailed) {
      Message.error("New Country Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postCountrySuccess, postCountryFailed]);

  useEffect(() => {
    if (putCountrySuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Country Successfully Updated!");
    }

    if (putCountryFailed) {
      Message.error("Country Update Failed!");
    }
    // eslint-disable-next-line
  }, [putCountrySuccess, putCountryFailed]);

  useEffect(() => {
    if (delCountrySuccess) {
      getData();
      Message.success("Country Successfully Deleted!");
    }

    if (delCountryFailed) {
      Message.error("Country Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delCountrySuccess, delCountryFailed]);

  const columns = [
    {
      title: "COUNTRY",
      dataIndex: "CountryName",
      key: "CountryName",
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
          canUpdate={getModuleAccess(access?.admin, module?.country)?.update}
          canDelete={getModuleAccess(access?.admin, module?.country)?.delete}
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    countryListLoading ||
    postCountryLoading ||
    putCountryLoading ||
    delCountryLoading;

  return (
    <Row className="main-body section-list-page">
      <PageAction
        pageName="Country"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.country)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <CountryModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled || countryNameLoading}
        countryId={countryId}
        countryNameSuccess={countryNameSuccess}
        countryNameFailed={countryNameFailed}
        countryNameData={countryNameData}
        OnGetCountryDuplicate={OnGetCountryDuplicate}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    countryListLoading: state.country.countryListLoading,
    countryListSuccess: state.country.countryListSuccess,
    countryListFailed: state.country.countryListFailed,
    countryListData: state.country.countryListData,

    countryNameLoading: state.country.countryNameLoading,
    countryNameSuccess: state.country.countryNameSuccess,
    countryNameFailed: state.country.countryNameFailed,
    countryNameData: state.country.countryNameData,

    postCountryLoading: state.country.postCountryLoading,
    postCountrySuccess: state.country.postCountrySuccess,
    postCountryFailed: state.country.postCountryFailed,
    postCountryData: state.country.postCountryData,

    putCountryLoading: state.country.putCountryLoading,
    putCountrySuccess: state.country.putCountrySuccess,
    putCountryFailed: state.country.putCountryFailed,
    putCountryData: state.country.putCountryData,

    delCountryLoading: state.country.delCountryLoading,
    delCountrySuccess: state.country.delCountrySuccess,
    delCountryFailed: state.country.delCountryFailed,
    delCountryData: state.country.delCountryData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCountryList: () => dispatch(getCountryList()),
    OnGetCountryDuplicate: (name) => dispatch(getCountryDuplicateAction(name)),
    OnPostCountry: (data) => dispatch(postCountry(data)),
    OnPutCountry: (id, data) => dispatch(putCountry(id, data)),
    OnDelCountry: (id) => dispatch(delCountry(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryListPage);
