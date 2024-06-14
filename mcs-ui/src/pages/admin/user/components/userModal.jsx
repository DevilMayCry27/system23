import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

import { Divider, Col, Row } from "antd";
//import { DatePicker } from "antd";

import { getFilteredRegionListAction } from "../../../../actions/region.js";
import { getFilteredProvinceListAction } from "../../../../actions/province.js";
import { getFilteredCityListAction } from "../../../../actions/city.js";
import { getFilteredSectionList } from "../../../../actions/section.js";

const { Option } = Select;
const style = {
  padding: "8px 0",
};

const UserModal = ({
  form,
  isModalVisible,
  showModal,
  onSubmit,
  loading,
  userId,
  countries,
  genders,
  bloodtype,
  civilstatus,
  department,

  regionFilteredListLoading,
  regionFilteredListSuccess,
  regionFilteredListFailed,
  regionFilteredListData,
  OnGetRegionList,
  provinceFilteredListLoading,
  provinceFilteredListSuccess,
  provinceFilteredListFailed,
  provinceFilteredListData,
  OnGetProvinceList,
  cityFilteredListLoading,
  cityFilteredListSuccess,
  cityFilteredListFailed,
  cityFilteredListData,
  OnGetMunicipalityList,
  sectionFilteredListLoading,
  sectionFilteredListSuccess,
  sectionFilteredListFailed,
  sectionFilteredListData,
  OnGetSectionList,
  countryID,
  regionID,
  provinceID,
  departmentID,
}) => {
  const [region, setRegion] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [section, setSection] = useState([]);

  const handleCountryChange = async (value) => {
    await OnGetRegionList(value);
  };
  const handleRegionChange = async (value) => {
    await OnGetProvinceList(value);
  };
  const handleProvinceChange = async (value) => {
    await OnGetMunicipalityList(value);
  };
  const handleDepartmentChange = async (value) => {
    await OnGetSectionList(value);
  };

  const getData = async () => {
    await OnGetRegionList(countryID);
    await OnGetProvinceList(regionID);
    await OnGetMunicipalityList(provinceID);
    await OnGetSectionList(departmentID);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [countryID]);

  useEffect(() => {
    if (regionFilteredListSuccess) {
      setRegion(regionFilteredListData);
    }

    if (regionFilteredListFailed) {
      console.log("Get Region List Failed...");
    }
  }, [
    regionFilteredListSuccess,
    regionFilteredListFailed,
    regionFilteredListData,
  ]);

  useEffect(() => {
    if (provinceFilteredListSuccess) {
      setProvince(provinceFilteredListData);
    }

    if (provinceFilteredListFailed) {
      console.log("Get Province List Failed...");
    }
  }, [
    provinceFilteredListSuccess,
    provinceFilteredListFailed,
    provinceFilteredListData,
  ]);

  useEffect(() => {
    if (cityFilteredListSuccess) {
      setCity(cityFilteredListData);
    }

    if (cityFilteredListFailed) {
      console.log("Get City List Failed...");
    }
  }, [cityFilteredListSuccess, cityFilteredListFailed, cityFilteredListData]);

  useEffect(() => {
    if (sectionFilteredListSuccess) {
      setSection(sectionFilteredListData);
    }

    if (sectionFilteredListFailed) {
      console.log("Get Section List Failed...");
    }
  }, [
    sectionFilteredListSuccess,
    sectionFilteredListFailed,
    sectionFilteredListData,
  ]);

  // eslint-disable-next-line
  const isLoadingAndDisabled =
    regionFilteredListLoading ||
    provinceFilteredListLoading ||
    cityFilteredListLoading ||
    sectionFilteredListLoading;

  return (
    <Modal
      className="new-modal"
      title={`New Employee Details`}
      visible={isModalVisible}
      onOk={showModal}
      onCancel={showModal}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"45%"}
    >
      <Form
        name="new form"
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Divider orientation="left">PERSONAL INFORMATION: </Divider>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" span={8}>
            <div style={style}>
              <div className="field-label">First Name</div>
              <Form.Item
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "Please input First Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>
              {" "}
              <div className="field-label">Middle Name</div>
              <Form.Item name="MiddleName">
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div style={style}>
              <div className="field-label">Last Name</div>
              <Form.Item
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "Please input Last Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="field-label">Email</div>
            <Form.Item
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="field-label">Contact Number</div>
            <Form.Item
              name="ContactNumber"
              rules={[
                {
                  required: true,
                  message: "Please input contact number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Gender</div>
            <Form.Item
              name="GenderID"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select placeholder="Select Gender" className="select-field">
                {genders.map((genders) => (
                  <Option key={genders?.ID} value={genders?.ID}>
                    {genders?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Civil Status</div>
            <Form.Item
              name="CivilStatusID"
              rules={[
                {
                  required: true,
                  message: "Please select civil status!",
                },
              ]}
            >
              <Select
                placeholder="Select Civil Status"
                className="select-field"
              >
                {civilstatus.map((civilstatus) => (
                  <Option key={civilstatus?.ID} value={civilstatus?.ID}>
                    {civilstatus?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Blood Type</div>
            <Form.Item
              name="BloodTypeID"
              rules={[
                {
                  required: true,
                  message: "Please select blood type!",
                },
              ]}
            >
              <Select placeholder="Select Blood Type" className="select-field">
                {bloodtype?.map((blood) => (
                  <Option key={blood?.ID} value={blood?.ID}>
                    {blood?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col className="gutter-row" span={24}>
            <div className="field-label">Birth date</div>
            <Form.Item
              name="BirthDate"
              rules={[
                {
                  required: true,
                  message: "Please input Middle Name!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
          <Divider orientation="left">ADDRESS: </Divider>
          <Col className="gutter-row" span={6}>
            <div className="field-label">Country</div>
            <Form.Item
              name="CountryID"
              rules={[
                {
                  required: true,
                  message: "Please select country!",
                },
              ]}
            >
              <Select
                placeholder="Select country"
                className="select-field"
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <Option key={country?.ID} value={country?.ID}>
                    {country?.CountryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="field-label">Region</div>
            <Form.Item
              name="RegionID"
              rules={[
                {
                  required: true,
                  message: "Please select region!",
                },
              ]}
            >
              <Select
                placeholder="Select Region"
                className="select-field"
                onChange={handleRegionChange}
              >
                {region.map((region) => (
                  <Option key={region?.ID} value={region?.ID}>
                    {region?.RegionName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="field-label">Province</div>
            <Form.Item
              name="ProvinceID"
              rules={[
                {
                  required: true,
                  message: "Please select province!",
                },
              ]}
            >
              <Select
                placeholder="Select Province"
                className="select-field"
                onChange={handleProvinceChange}
              >
                {province.map((province) => (
                  <Option
                    key={province?.ProvinceId}
                    value={province?.ProvinceId}
                  >
                    {province?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="field-label">Municipality</div>
            <Form.Item
              name="MunicipalityID"
              rules={[
                {
                  required: true,
                  message: "Please select municipality!",
                },
              ]}
            >
              <Select placeholder="Select City" className="select-field">
                {city.map((city) => (
                  <Option key={city?.ID} value={city?.ID}>
                    {city?.CityName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <div className="field-label">Street</div>
            <Form.Item
              name="Street"
              rules={[
                {
                  required: true,
                  message: "Please input Street Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Divider orientation="left">EMPLOYMENT DETAILS: </Divider>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Employee Code</div>
            <Form.Item
              name="EmployeeCode"
              rules={[
                {
                  required: true,
                  message: "Please input Employee Code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            {" "}
            <div className="field-label">Department</div>
            <Form.Item
              name="DepartmentID"
              rules={[
                {
                  required: true,
                  message: "Please select department!",
                },
              ]}
            >
              <Select
                placeholder="Select Department"
                className="select-field"
                onChange={handleDepartmentChange}
              >
                {department.map((department) => (
                  <Option key={department?.ID} value={department?.ID}>
                    {department?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Section</div>
            <Form.Item
              name="DepartmentSection"
              rules={[
                {
                  required: true,
                  message: "Please select section!",
                },
              ]}
            >
              <Select placeholder="Select Section" className="select-field">
                {section.map((section) => (
                  <Option key={section?.ID} value={section?.ID}>
                    {section?.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="field-label">SSS No</div>
            <Form.Item
              name="SSSNo"
              rules={[
                {
                  required: true,
                  message: "Please input SSS Number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            {" "}
            <div className="field-label">Philhealth No</div>
            <Form.Item
              name="PhNo"
              rules={[
                {
                  required: true,
                  message: "Please input Philhealth No!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="field-label">Pag Ibig No</div>
            <Form.Item
              name="PagibigNo"
              rules={[
                {
                  required: true,
                  message: "Please input pag ibig no!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            {" "}
            <div className="field-label">Health Care No</div>
            <Form.Item
              name="HealthCareNo"
              rules={[
                {
                  required: true,
                  message: "Please input health care no!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={8}>
            {" "}
            <div className="field-label">TIN No</div>
            <Form.Item
              name="TINNo"
              rules={[
                {
                  required: true,
                  message: "Please input TIN No!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div className="field-label">Status</div>
        <Form.Item
          name="Status"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={1}
        >
          <Select
            placeholder="Select Status"
            className="select-field"
            defaultValue={1}
          >
            <Option value={1}>ACTIVE</Option>
            <Option value={0}>INACTIVE</Option>
          </Select>
        </Form.Item>

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
          <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {userId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    regionFilteredListLoading: state.region.regionFilteredListLoading,
    regionFilteredListSuccess: state.region.regionFilteredListSuccess,
    regionFilteredListFailed: state.region.regionFilteredListFailed,
    regionFilteredListData: state.region.regionFilteredListData,

    provinceFilteredListLoading: state.province.provinceFilteredListLoading,
    provinceFilteredListSuccess: state.province.provinceFilteredListSuccess,
    provinceFilteredListFailed: state.province.provinceFilteredListFailed,
    provinceFilteredListData: state.province.provinceFilteredListData,

    cityFilteredListLoading: state.city.cityFilteredListLoading,
    cityFilteredListSuccess: state.city.cityFilteredListSuccess,
    cityFilteredListFailed: state.city.cityFilteredListFailed,
    cityFilteredListData: state.city.cityFilteredListData,

    sectionFilteredListLoading: state.section.sectionFilteredListLoading,
    sectionFilteredListSuccess: state.section.sectionFilteredListSuccess,
    sectionFilteredListFailed: state.section.sectionFilteredListFailed,
    sectionFilteredListData: state.section.sectionFilteredListData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetRegionList: (RNo) => dispatch(getFilteredRegionListAction(RNo)),
    OnGetProvinceList: (PNo) => dispatch(getFilteredProvinceListAction(PNo)),
    OnGetMunicipalityList: (CNo) => dispatch(getFilteredCityListAction(CNo)),
    OnGetSectionList: (SNo) => dispatch(getFilteredSectionList(SNo)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
