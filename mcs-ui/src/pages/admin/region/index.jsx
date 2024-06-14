import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getRegionListAction,
  getRegionDuplicateAction,
  postRegionAction,
  putRegionAction,
  delRegionAction,
} from "../../../actions/region.js";
import { getCountryList } from "../../../actions/country.js";

import RegionModal from "./components/regionModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const RegionListPage = (props) => {
  const {
    access,
    countryListLoading,
    countryListSuccess,
    countryListFailed,
    countryListData,
    OnGetCountryList,
    regionListLoading,
    regionListSuccess,
    regionListFailed,
    regionListData,
    OnGetRegionList,
    regionNameLoading,
    regionNameSuccess,
    regionNameFailed,
    regionNameData,
    OnGetRegionDuplicate,
    postRegionLoading,
    postRegionSuccess,
    postRegionFailed,
    postRegionData,
    OnPostRegion,
    putRegionLoading,
    putRegionSuccess,
    putRegionFailed,
    OnPutRegion,
    delRegionLoading,
    delRegionSuccess,
    delRegionFailed,
    OnDelRegion,
  } = props;
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [regions, setRegion] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [regionId, setRegionId] = useState(0);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    console.log(values);
    setRegionId(values?.ID);
    setCountryId(values?.ID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!regionId) {
      await OnPostRegion(values);
    } else {
      await OnPutRegion(regionId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelRegion(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = regions.filter(
        (item) =>
          item.CountryName.toLowerCase().includes(text.toLowerCase()) ||
          item.RegionName.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(regions);
    }
  };

  const getData = async () => {
    await OnGetCountryList();
    await OnGetRegionList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (countryListSuccess) {
      setCountries(countryListData);
    }

    if (countryListFailed) {
      console.log("Get Country List Failed...");
    }
  }, [countryListSuccess, countryListFailed, countryListData]);

  useEffect(() => {
    if (regionListSuccess) {
      setData(regionListData);
      setRegion(regionListData);
    }

    if (regionListFailed) {
      console.log("Get Region List Failed...");
    }
  }, [regionListSuccess, regionListFailed, regionListData]);

  useEffect(() => {
    if (postRegionSuccess) {
      if (postRegionData?.code) {
        Message.error("Region already exist!");
        return;
      }

      getData();
      setIsModalVisible(false);
      Message.success("Region Successfully Created!");
    }

    if (postRegionFailed) {
      Message.error("New Region Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postRegionSuccess, postRegionFailed]);

  useEffect(() => {
    if (putRegionSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Region Successfully Updated!");
    }

    if (putRegionFailed) {
      Message.error("Region Update Failed!");
    }
    // eslint-disable-next-line
  }, [putRegionSuccess, putRegionFailed]);

  useEffect(() => {
    if (delRegionSuccess) {
      getData();
      Message.success("Region Successfully Deleted!");
    }

    if (delRegionFailed) {
      Message.error("Region Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delRegionSuccess, delRegionFailed]);

  const columns = [
    {
      title: "Country Name",
      dataIndex: "CountryName",
      key: "CountryName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "Region Name",
      dataIndex: "RegionName",
      key: "RegionName",
      align: "center",
      width: 200,
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
      width: 280,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={getModuleAccess(access?.admin, module?.region)?.update}
          canDelete={getModuleAccess(access?.admin, module?.region)?.delete}
        />
      ),
    },
  ];
  const isLoadingAndDisabled =
    countryListLoading ||
    postRegionLoading ||
    putRegionLoading ||
    delRegionLoading ||
    regionListLoading;

  return (
    <Row className="main-body user-list-page">
      <PageAction
        pageName="Region"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.region)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <RegionModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled || regionNameLoading}
        countryId={countryId}
        countries={countries}
        regionNameSuccess={regionNameSuccess}
        regionNameFailed={regionNameFailed}
        regionNameData={regionNameData}
        OnGetRegionDuplicate={OnGetRegionDuplicate}
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

    regionListLoading: state.region.regionListLoading,
    regionListSuccess: state.region.regionListSuccess,
    regionListFailed: state.region.regionListFailed,
    regionListData: state.region.regionListData,

    regionNameLoading: state.region.regionNameLoading,
    regionNameSuccess: state.region.regionNameSuccess,
    regionNameFailed: state.region.regionNameFailed,
    regionNameData: state.region.regionNameData,

    postRegionLoading: state.region.postRegionLoading,
    postRegionSuccess: state.region.postRegionSuccess,
    postRegionFailed: state.region.postRegionFailed,
    postRegionData: state.region.postRegionData,

    putRegionLoading: state.region.putRegionLoading,
    putRegionSuccess: state.region.putRegionSuccess,
    putRegionFailed: state.region.putRegionFailed,
    putRegionData: state.region.putRegionData,

    delRegionLoading: state.region.delRegionLoading,
    delRegionSuccess: state.region.delRegionSuccess,
    delRegionFailed: state.region.delRegionFailed,
    delRegionData: state.region.delRegionData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetCountryList: () => dispatch(getCountryList()),
    OnGetRegionList: () => dispatch(getRegionListAction()),
    OnGetRegionDuplicate: (name) => dispatch(getRegionDuplicateAction(name)),
    OnPostRegion: (data) => dispatch(postRegionAction(data)),
    OnPutRegion: (id, data) => dispatch(putRegionAction(id, data)),
    OnDelRegion: (id) => dispatch(delRegionAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionListPage);
