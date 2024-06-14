import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { Row } from "antd";
import Message from "antd/lib/message";

import MainTable from "../../../../../components/maintable.jsx";
import PageAction from "../../../../../components/pageactions.jsx";
import NewBeneficiaryModal from "./beneficiarycomponents/beneficiaryModal.jsx";
import TableRowAction from "../../../../../components/tablerowaction.jsx";

import { mmDdYyyy } from "../../../../../utils/formatter.js";
import { getStatusType, module } from "../../../../../utils/constant.js";
import { getModuleAccess } from "../../../../../utils/access.js";

// import { getCountryList } from "../../../../../actions/country.js";
// import { getRegionListAction } from "../../../../../actions/region.js";
// import { getProvinceListAction } from "../../../../../actions/province.js";
// import { getCityListAction } from "../../../../../actions/city.js";
// import { getRelationListActions } from "../../../../../actions/relation.js";
// import { getBeneficiariesListAction } from "../../../../../actions/beneficiaries.js";
// import { postBeneficiariesAction } from "../../../../../actions/beneficiaries.js";
// import { putBeneficiariesAction } from "../../../../../actions/beneficiaries.js";
// import { delBeneficiariesAction } from "../../../../../actions/beneficiaries.js";

const PatientBeneficiariesModal = ({
  form,
  isModalVisibles,
  showModal,
  onSubmit,
  loading,
  access,
  userId,
  // countryListLoading,
  // countryListSuccess,
  // countryListFailed,
  // countryListData,
  // OnGetCountryList,
  // regionListLoading,
  // regionListSuccess,
  // regionListFailed,
  // regionListData,
  // OnGetRegionList,
  // provinceListLoading,
  // provinceListSuccess,
  // provinceListFailed,
  // provinceListData,
  // OnGetProvinceList,
  // cityListLoading,
  // cityListSuccess,
  // cityListFailed,
  // cityListData,
  // OnGetCityList,
  // relationListLoading,
  // relationListSuccess,
  // relationListFailed,
  // relationListData,
  // OnGetRelationList,
  // beneficiariesListLoading,
  beneficiariesListSuccess,
  beneficiariesListFailed,
  beneficiariesListData,
  OnGetBeneficiariesList,
  postBeneficiariesLoading,
  postBeneficiariesSuccess,
  postBeneficiariesFailed,
  OnPostBeneficiaries,
  putBeneficiariesLoading,
  putBeneficiariesSuccess,
  putBeneficiariesFailed,
  OnPutBeneficiaries,
  delBeneficiariesLoading,
  delBeneficiariesSuccess,
  delBeneficiariesFailed,
  OnDelBeneficiaries,
}) => {
  // const [countries, setCountries] = useState([]);
  // const [countryId, setCountryId] = useState(0);
  // const [regions, setRegion] = useState([]);
  // const [regionId, setRegionId] = useState(0);
  // const [province, setProvince] = useState([]);
  // const [provinceId, setProvinceId] = useState(0);
  // const [cities, setCities] = useState([]);
  // const [citiesId, setCitiesId] = useState([]);
  // const [relation, setRelations] = useState([]);
  // const [relationId, setRelationId] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiaryId, setBeneficiaryId] = useState([]);
  const [pbeneficiaryId, setpBeneficiaryId] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisiblecrud, setIsModalVisiblecrud] = useState(false);

  const getData = async () => {
    // await OnGetCountryList();
    // await OnGetRegionList();
    // await OnGetProvinceList();
    // await OnGetCityList();
    // await OnGetRelationList();
    await OnGetBeneficiariesList(userId);
  };

  const showModalcrud = (values = {}) => {
    // setCitiesId(values?.CityId);
    // setProvinceId(values?.ProvinceId);
    // setRegionId(values?.RegionId);
    // setCountryId(values?.CountryId);
    // setRelationId(values?.RelationId);
    setBeneficiaryId(values?.ID);
    setpBeneficiaryId(values?.BID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisiblecrud(!isModalVisiblecrud);
  };

  const onSubmitCrud = async (values) => {
    if (!beneficiaryId) {
      let temp = { ...values, UserId: userId };
      await OnPostBeneficiaries(temp);
    } else {
      let temp = {
        ...values,
        // ctid: citiesId,
        // rlid: relationId,
        // pid: provinceId,
        // rid: regionId,
        // cid: countryId,
      };
      await OnPutBeneficiaries(pbeneficiaryId, temp);
    }
  };

  const confirmDeleteBeneficiaries = async (BID) => {
    await OnDelBeneficiaries(BID);
    getData();
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = beneficiaries.filter(
        (item) =>
          item.FirstName.toLowerCase().includes(text.toLowerCase()) ||
          item.MiddleName.toLowerCase().includes(text.toLowerCase()) ||
          item.LastName.toLowerCase().includes(text.toLowerCase()) ||
          item.ContactNumber.toLowerCase().includes(text.toLowerCase()) ||
          item.Baranggay.toLowerCase().includes(text.toLowerCase())
      );
      setBeneficiaries(tempData);
    } else {
      setBeneficiaries(beneficiaries);
      getData();
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [userId]);

  // useEffect(() => {
  //   if (countryListSuccess) {
  //     setCountries(countryListData);
  //   }

  //   if (countryListFailed) {
  //     console.log("Get Country List Failed...");
  //   }
  // }, [countryListSuccess, countryListFailed, countryListData]);

  // useEffect(() => {
  //   if (regionListSuccess) {
  //     setData(regionListData);
  //     setRegion(regionListData);
  //   }

  //   if (regionListFailed) {
  //     console.log("Get Region List Failed...");
  //   }
  // }, [regionListSuccess, regionListFailed, regionListData]);

  // useEffect(() => {
  //   if (provinceListSuccess) {
  //     setData(provinceListData);
  //     setProvince(provinceListData);
  //   }

  //   if (provinceListFailed) {
  //     console.log("Get Province List Failed...");
  //   }
  // }, [provinceListSuccess, provinceListFailed, provinceListData]);

  // useEffect(() => {
  //   if (cityListSuccess) {
  //     setData(cityListData);
  //     setCities(cityListData);
  //   }

  //   if (cityListFailed) {
  //     console.log("Get City List Failed...");
  //   }
  // }, [cityListSuccess, cityListFailed, cityListData]);

  // useEffect(() => {
  //   if (relationListSuccess) {
  //     setRelations(relationListData);
  //   }

  //   if (relationListFailed) {
  //     console.log("Get Relation List Failed...");
  //   }
  // }, [relationListSuccess, relationListFailed, relationListData]);

  useEffect(() => {
    if (beneficiariesListSuccess) {
      setBeneficiaries([]);
      setBeneficiaries(beneficiariesListData);
    }

    if (beneficiariesListFailed) {
      console.log("Get Beneficiaries List Failed...");
    }
  }, [
    beneficiariesListSuccess,
    beneficiariesListFailed,
    beneficiariesListData,
  ]);

  useEffect(() => {
    if (postBeneficiariesSuccess) {
      getData();
      setIsModalVisiblecrud(false);
      Message.success("New Beneficiary Successfully Created!");
    }

    if (postBeneficiariesFailed) {
      Message.error("New Beneficiary Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postBeneficiariesSuccess, postBeneficiariesFailed]);

  useEffect(() => {
    if (putBeneficiariesSuccess) {
      getData();
      setIsModalVisiblecrud(false);
      Message.success("Beneficiary Successfully Updated!");
    }

    if (putBeneficiariesFailed) {
      Message.error("Beneficiary Update Failed!");
    }
    // eslint-disable-next-line
  }, [putBeneficiariesSuccess, putBeneficiariesFailed]);

  useEffect(() => {
    if (delBeneficiariesSuccess) {
      Message.success("Beneficiary Successfully Deleted!");
    }

    if (delBeneficiariesFailed) {
      Message.error("Beneficiary Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delBeneficiariesSuccess, delBeneficiariesFailed]);

  const columns = [
    {
      title: "RELATIONSHIP",
      dataIndex: "RelationshipName",
      key: "RelationshipName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "FIRST NAME",
      dataIndex: "FirstName",
      key: "FirstName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "MIDDLE NAME",
      dataIndex: "MiddleName",
      key: "MiddleName",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "LAST NAME",
      dataIndex: "LastName",
      key: "LastName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "CONTACT NUMBER",
      dataIndex: "ContactNumber",
      key: "ContactNumber",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "COUNTRY",
      dataIndex: "CountryName",
      key: "CountryName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "REGION",
      dataIndex: "RegionName",
      key: "RegionName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "PROVINCE",
      dataIndex: "ProvinceName",
      key: "ProvinceName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "CITY",
      dataIndex: "CityName",
      key: "CityName",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "BARANGGAY",
      dataIndex: "Baranggay",
      key: "Baranggay",
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
      title: "DATE REGISTERED",
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
      dataIndex: "BID",
      key: "BID",
      align: "center",
      width: 280,
      render: (value, row) => (
        <TableRowAction
          showModal={() => (true ? showModalcrud(row) : showModal(row))}
          confirmDelete={() => confirmDeleteBeneficiaries(value)}
          canUpdate={
            getModuleAccess(access?.admin, module?.beneficiaries)?.update
          }
          canDelete={
            getModuleAccess(access?.admin, module?.beneficiaries)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    // beneficiariesListLoading ||
    postBeneficiariesLoading ||
    putBeneficiariesLoading ||
    delBeneficiariesLoading;
  // relationListLoading ||
  // countryListLoading ||
  // regionListLoading ||
  // provinceListLoading ||
  // cityListLoading;

  return (
    <Modal
      className="new-modal"
      title={`Patient Beneficiaries`}
      visible={isModalVisibles}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
      width={"93%"}
    >
      <Form
        name="new form"
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Row className="main-body section-list-page">
          <PageAction
            pageName="Beneficiaries"
            onSearch={onSearch}
            showModalcrud={showModalcrud}
            isDisabled={isLoadingAndDisabled}
            isBene={true}
            canCreate={
              getModuleAccess(access?.admin, module?.beneficiaries)?.create
            }
          />
          <MainTable
            columns={columns}
            data={beneficiaries}
            isLoading={isLoadingAndDisabled}
          />
        </Row>

        <NewBeneficiaryModal
          form={form}
          isModalVisiblecrud={isModalVisiblecrud}
          showModalcrud={showModalcrud}
          onSubmitCrud={onSubmitCrud}
          loading={isLoadingAndDisabled}
          beneficiaryId={beneficiaryId}
          // relation={relation}
          // relationId={relationId}
          // countryId={countryId}
          // countries={countries}
          // regionId={regionId}
          // regions={regions}
          // provinceId={provinceId}
          // province={province}
          // citiesId={citiesId}
          // cities={cities}
          userId={userId}
          data={data}
        />
        <div className="modal-action-btns">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showModal()}
              loading={loading}
            >
              CANCEL
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
function mapStateToProps(state) {
  return {
    // countryListLoading: state.country.countryListLoading,
    // countryListSuccess: state.country.countryListSuccess,
    // countryListFailed: state.country.countryListFailed,
    // countryListData: state.country.countryListData,

    // regionListLoading: state.region.regionListLoading,
    // regionListSuccess: state.region.regionListSuccess,
    // regionListFailed: state.region.regionListFailed,
    // regionListData: state.region.regionListData,

    // provinceListLoading: state.province.provinceListLoading,
    // provinceListSuccess: state.province.provinceListSuccess,
    // provinceListFailed: state.province.provinceListFailed,
    // provinceListData: state.province.provinceListData,

    // cityListLoading: state.city.cityListLoading,
    // cityListSuccess: state.city.cityListSuccess,
    // cityListFailed: state.city.cityListFailed,
    // cityListData: state.city.cityListData,

    // relationListLoading: state.relation.relationListLoading,
    // relationListSuccess: state.relation.relationListSuccess,
    // relationListFailed: state.relation.relationListFailed,
    // relationListData: state.relation.relationListData,

    beneficiariesListLoading: state.beneficiaries.beneficiariesListLoading,
    beneficiariesListSuccess: state.beneficiaries.beneficiariesListSuccess,
    beneficiariesListFailed: state.beneficiaries.beneficiariesListFailed,
    beneficiariesListData: state.beneficiaries.beneficiariesListData,

    postBeneficiariesLoading: state.beneficiaries.postBeneficiariesLoading,
    postBeneficiariesSuccess: state.beneficiaries.postBeneficiariesSuccess,
    postBeneficiariesFailed: state.beneficiaries.postBeneficiariesFailed,
    postBeneficiariesData: state.beneficiaries.postBeneficiariesData,

    putBeneficiariesLoading: state.beneficiaries.putBeneficiariesLoading,
    putBeneficiariesSuccess: state.beneficiaries.putBeneficiariesSuccess,
    putBeneficiariesFailed: state.beneficiaries.putBeneficiariesFailed,
    putBeneficiariesData: state.beneficiaries.putBeneficiariesData,

    delBeneficiariesLoading: state.beneficiaries.delBeneficiariesLoading,
    delBeneficiariesSuccess: state.beneficiaries.delBeneficiariesSuccess,
    delBeneficiariesFailed: state.beneficiaries.delBeneficiariesFailed,
    delBeneficiariesData: state.beneficiaries.delBeneficiariesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // OnGetCountryList: () => dispatch(getCountryList()),
    // OnGetRegionList: () => dispatch(getRegionListAction()),
    // OnGetProvinceList: () => dispatch(getProvinceListAction()),
    // OnGetCityList: () => dispatch(getCityListAction()),
    // OnGetRelationList: () => dispatch(getRelationListActions()),
    // OnGetBeneficiariesList: (PID) => dispatch(getBeneficiariesListAction(PID)),
    // OnPostBeneficiaries: (data) => dispatch(postBeneficiariesAction(data)),
    // OnPutBeneficiaries: (BID, data) =>
    //   dispatch(putBeneficiariesAction(BID, data)),
    // OnDelBeneficiaries: (ID) => dispatch(delBeneficiariesAction(ID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBeneficiariesModal);
