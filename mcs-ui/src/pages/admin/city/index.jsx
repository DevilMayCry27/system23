import "./index.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Row from "antd/lib/row";
import Form from "antd/lib/form";
import Message from "antd/lib/message";

import { mmDdYyyy } from "../../../utils/formatter.js";
import { getStatusType, module } from "../../../utils/constant.js";
import { getModuleAccess } from "../../../utils/access.js";

import {
  getCityListAction,
  getCityDuplicateAction,
  postCityAction,
  putCityAction,
  delCityAction,
} from "../../../actions/city.js";
import { getProvinceListAction } from "../../../actions/province.js";

import CityModal from "./components/cityModal.jsx";
import MainTable from "../../../components/maintable.jsx";
import PageAction from "../../../components/pageactions.jsx";
import TableRowAction from "../../../components/tablerowaction.jsx";

const CityListPage = (props) => {
  const {
    access,
    provinceListLoading,
    provinceListSuccess,
    provinceListFailed,
    provinceListData,
    OnGetProvinceList,
    cityListLoading,
    cityListSuccess,
    cityListFailed,
    cityListData,
    OnGetCityList,
    cityNameLoading,
    cityNameSuccess,
    cityNameFailed,
    cityNameData,
    OnGetCityDuplicate,
    postCityLoading,
    postCitySuccess,
    postCityFailed,
    postCityData,
    OnPostCity,
    putCityLoading,
    putCitySuccess,
    putCityFailed,
    OnPutCity,
    delCityLoading,
    delCitySuccess,
    delCityFailed,
    OnDelCity,
  } = props;
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [cities, setCities] = useState([]);
  const [citiesId, setCitiesId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (values = {}) => {
    setCitiesId(values?.ID);
    setProvinceId(values?.ProvinceId);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (values) => {
    if (!citiesId) {
      await OnPostCity(values);
    } else {
      await OnPutCity(citiesId, values);
    }
  };

  const confirmDelete = async (id) => {
    console.log(id);
    await OnDelCity(id);
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = cities.filter(
        (item) =>
          item.Name.toLowerCase().includes(text.toLowerCase()) ||
          item.CityName.toLowerCase().includes(text.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(cities);
    }
  };

  const getData = async () => {
    await OnGetProvinceList();
    await OnGetCityList();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

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
    if (cityListSuccess) {
      setData(cityListData);
      setCities(cityListData);
    }

    if (cityListFailed) {
      console.log("Get City List Failed...");
    }
  }, [cityListSuccess, cityListFailed, cityListData]);

  useEffect(() => {
    if (postCitySuccess) {
      if (postCityData?.code) {
        Message.error("City already exist!");
        return;
      }

      getData();
      setIsModalVisible(false);
      Message.success("City Successfully Created!");
    }

    if (postCityFailed) {
      Message.error("New City Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postCitySuccess, postCityFailed]);

  useEffect(() => {
    if (putCitySuccess) {
      getData();
      setIsModalVisible(false);
      Message.success("City Successfully Updated!");
    }

    if (putCityFailed) {
      Message.error("City Update Failed!");
    }
    // eslint-disable-next-line
  }, [putCitySuccess, putCityFailed]);

  useEffect(() => {
    if (delCitySuccess) {
      getData();
      Message.success("Region Successfully Deleted!");
    }

    if (delCityFailed) {
      Message.error("Region Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delCitySuccess, delCityFailed]);

  const columns = [
    {
      title: "Province Name",
      dataIndex: "Name",
      key: "Name",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "City Name",
      dataIndex: "CityName",
      key: "CityName",
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
      title: "DATE CREATED",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
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
          canUpdate={getModuleAccess(access?.admin, module?.city)?.update}
          canDelete={getModuleAccess(access?.admin, module?.city)?.delete}
        />
      ),
    },
  ];
  const isLoadingAndDisabled =
    postCityLoading || putCityLoading || delCityLoading || cityListLoading;

  return (
    <Row className="main-body user-list-page">
      <PageAction
        pageName="City"
        onSearch={onSearch}
        showModal={showModal}
        isDisabled={isLoadingAndDisabled}
        canCreate={getModuleAccess(access?.admin, module?.city)?.create}
      />
      <MainTable
        columns={columns}
        data={data}
        isLoading={isLoadingAndDisabled}
      />
      <CityModal
        form={form}
        isModalVisible={isModalVisible}
        showModal={showModal}
        onSubmit={onSubmit}
        loading={isLoadingAndDisabled || provinceListLoading || cityNameLoading}
        provinceId={provinceId}
        province={province}
        citiesId={citiesId}
        cities={cities}
        cityNameSuccess={cityNameSuccess}
        cityNameFailed={cityNameFailed}
        cityNameData={cityNameData}
        OnGetCityDuplicate={OnGetCityDuplicate}
      />
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    provinceListLoading: state.province.provinceListLoading,
    provinceListSuccess: state.province.provinceListSuccess,
    provinceListFailed: state.province.provinceListFailed,
    provinceListData: state.province.provinceListData,

    cityListLoading: state.city.cityListLoading,
    cityListSuccess: state.city.cityListSuccess,
    cityListFailed: state.city.cityListFailed,
    cityListData: state.city.cityListData,

    cityNameLoading: state.city.cityNameLoading,
    cityNameSuccess: state.city.cityNameSuccess,
    cityNameFailed: state.city.cityNameFailed,
    cityNameData: state.city.cityNameData,

    postCityLoading: state.city.postCityLoading,
    postCitySuccess: state.city.postCitySuccess,
    postCityFailed: state.city.postCityFailed,
    postCityData: state.city.postCityData,

    putCityLoading: state.city.putCityLoading,
    putCitySuccess: state.city.putCitySuccess,
    putCityFailed: state.city.putCityFailed,
    putCityData: state.city.putCityData,

    delCityLoading: state.city.delCityLoading,
    delCitySuccess: state.city.delCitySuccess,
    delCityFailed: state.city.delCityFailed,
    delCityData: state.city.delCityData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetProvinceList: () => dispatch(getProvinceListAction()),
    OnGetCityList: () => dispatch(getCityListAction()),
    OnGetCityDuplicate: (name) => dispatch(getCityDuplicateAction(name)),
    OnPostCity: (data) => dispatch(postCityAction(data)),
    OnPutCity: (id, data) => dispatch(putCityAction(id, data)),
    OnDelCity: (id) => dispatch(delCityAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityListPage);
