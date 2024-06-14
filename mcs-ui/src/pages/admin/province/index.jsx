import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getProvinceListAction,
  getProvinceDuplicateAction,
  postProvinceAction,
  putProvinceAction,
  delProvinceAction,
} from "../../../actions/province.js";
import { getRegionListAction } from "../../../actions/region.js";

import ProvinceModal from "./components/provinceModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const ProvinceListPage = (props) => {
  const {
    access,
    regionListLoading,
    regionListSuccess,
    regionListFailed,
    regionListData,
    OnGetRegionList,
    provinceListLoading,
    provinceListSuccess,
    provinceListFailed,
    provinceListData,
    OnGetProvinceList,
    provinceNameLoading,
    provinceNameSuccess,
    provinceNameFailed,
    provinceNameData,
    OnGetProvinceDuplicate,
    postProvinceLoading,
    postProvinceSuccess,
    postProvinceFailed,
    postProvinceData,
    OnPostProvince,
    putProvinceLoading,
    putProvinceSuccess,
    putProvinceFailed,
    OnPutProvince,
    delProvinceLoading,
    delProvinceSuccess,
    delProvinceFailed,
    OnDelProvince,
  } = props;
  const [form] = Form.useForm();
  const [regions, setRegion] = useState([]);
  const [regionId, setRegionId] = useState(0);
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setProvinceId(values?.ProvinceId);
    setRegionId(values?.RegionId);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!provinceId) {
      await OnPostProvince(values);
    } else {
      await OnPutProvince(provinceId, values);
    }
  };

  const confirmDelete = async (id) => {
    await OnDelProvince(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = province.filter(
        (item) =>
          item.RegionName.toLowerCase().includes(text.toLowerCase()) ||
          item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(province);
    }
  };

  const getData = async () => {
    await OnGetRegionList();
    await OnGetProvinceList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

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
    if (provinceListSuccess) {
      setData(provinceListData);
      setProvince(provinceListData);
    }

    if (provinceListFailed) {
      console.log("Get Province List Failed...");
    }
  }, [provinceListSuccess, provinceListFailed, provinceListData]);

  useEffect(() => {
    if (postProvinceSuccess) {
      if (postProvinceData?.code) {
        Message.error("Province already exist!");
        return;
      }

      getData();
      setIsModalVisible(false);
      Message.success("Province Successfully Created!");
    }

    if (postProvinceFailed) {
      Message.error("New Province Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postProvinceSuccess, postProvinceFailed]);

  useEffect(() => {
    if (putProvinceSuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("Province Successfully Updated!");
    }

    if (putProvinceFailed) {
      Message.error("Province Update Failed!");
    }
    // eslint-disable-next-line
  }, [putProvinceSuccess, putProvinceFailed]);

  useEffect(() => {
    if (delProvinceSuccess) {
      getData();
      Message.success("Province Successfully Deleted!");
    }

    if (delProvinceFailed) {
      Message.error("Province Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delProvinceSuccess, delProvinceFailed]);

  const columns = [
    {
      title: "Region Name",
      dataIndex: "RegionName",
      key: "RegionName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "Province Name",
      dataIndex: "Name",
      key: "Name",
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
      dataIndex: "ProvinceId",
      key: "ProvinceId",
      align: "center",
      width: 280,
      render: (value, row) => (
        <TableRowAction
          showModal={() => showModal(row)}
          confirmDelete={() => confirmDelete(value)}
          canUpdate={getModuleAccess(access?.admin, module?.province)?.update}
          canDelete={getModuleAccess(access?.admin, module?.province)?.delete}
        />
      ),
    },
  ];
  const isLoadingAndDisabled =
    regionListLoading ||
    postProvinceLoading ||
    putProvinceLoading ||
    delProvinceLoading ||
    provinceListLoading;

  return (
    <Row className="main-body user-list-page">
      <PageAction
        pageName="Province"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.province)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <ProvinceModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={
          isLoadingAndDisabled || provinceNameLoading || regionListLoading
        }
        regionId={regionId}
        regions={regions}
        provinceId={provinceId}
        province={province}
        provinceNameSuccess={provinceNameSuccess}
        provinceNameFailed={provinceNameFailed}
        provinceNameData={provinceNameData}
        OnGetProvinceDuplicate={OnGetProvinceDuplicate}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    regionListLoading: state.region.regionListLoading,
    regionListSuccess: state.region.regionListSuccess,
    regionListFailed: state.region.regionListFailed,
    regionListData: state.region.regionListData,

    provinceListLoading: state.province.provinceListLoading,
    provinceListSuccess: state.province.provinceListSuccess,
    provinceListFailed: state.province.provinceListFailed,
    provinceListData: state.province.provinceListData,

    provinceNameLoading: state.province.provinceNameLoading,
    provinceNameSuccess: state.province.provinceNameSuccess,
    provinceNameFailed: state.province.provinceNameFailed,
    provinceNameData: state.province.provinceNameData,

    postProvinceLoading: state.province.postProvinceLoading,
    postProvinceSuccess: state.province.postProvinceSuccess,
    postProvinceFailed: state.province.postProvinceFailed,
    postProvinceData: state.province.postProvinceData,

    putProvinceLoading: state.province.putProvinceLoading,
    putProvinceSuccess: state.province.putProvinceSuccess,
    putProvinceFailed: state.province.putProvinceFailed,
    putProvinceData: state.province.putProvinceData,

    delProvinceLoading: state.province.delProvinceLoading,
    delProvinceSuccess: state.province.delProvinceSuccess,
    delProvinceFailed: state.province.delProvinceFailed,
    delProvinceData: state.province.delProvinceData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetRegionList: () => dispatch(getRegionListAction()),
    OnGetProvinceList: () => dispatch(getProvinceListAction()),
    OnGetProvinceDuplicate: (name) =>
      dispatch(getProvinceDuplicateAction(name)),
    OnPostProvince: (data) => dispatch(postProvinceAction(data)),
    OnPutProvince: (id, data) => dispatch(putProvinceAction(id, data)),
    OnDelProvince: (id) => dispatch(delProvinceAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceListPage);
