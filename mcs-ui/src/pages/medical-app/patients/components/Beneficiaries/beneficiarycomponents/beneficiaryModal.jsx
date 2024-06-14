import React, { useState } from "react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";

const { Option } = Select;

const BeneficiaryModal = ({
  form,
  isModalVisiblecrud,
  showModalcrud,
  onSubmitCrud,
  loading,
  beneficiaryId,
  relation,
  countries,
  regions,
  province,
  cities,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    form.setFieldsValue({ RegionName: undefined }); // Reset region value
    form.setFieldsValue({ ProvinceName: undefined }); // Reset province value
    form.setFieldsValue({ CityName: undefined }); // Reset city value
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    form.setFieldsValue({ ProvinceName: undefined }); // Reset province value
    form.setFieldsValue({ CityName: undefined }); // Reset city value
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    form.setFieldsValue({ CityName: undefined }); // Reset city value
  };

  return (
    <Modal
      className="new-modal"
      title={`Beneficiary Details`}
      visible={isModalVisiblecrud}
      onOk={showModalcrud}
      onCancel={showModalcrud}
      maskClosable={false}
      closable={false}
      footer={null}
      centered
    >
      <Form
        name="new form"
        onFinish={onSubmitCrud}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <div className="field-label">Relationship</div>

        <Form.Item
          name={beneficiaryId ? "rlid" : "RelationshipName"}
          rules={[
            {
              required: true,
              message: "Please select relation!",
            },
          ]}
        >
          <Select placeholder="Select Relation" className="select-field">
            {relation?.map((relation) => (
              <Option key={relation?.ID} value={relation?.ID}>
                {relation?.RelationshipName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">First Name</div>
        <Form.Item
          name="FirstName"
          rules={[
            {
              required: true,
              message: "Please input first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Middle Name</div>
        <Form.Item
          name="MiddleName"
          rules={[
            {
              required: true,
              message: "Please input middle name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="field-label">Last Name</div>
        <Form.Item
          name="LastName"
          rules={[
            {
              required: true,
              message: "Please input last name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
        <div className="field-label">Country</div>
        <Form.Item
          name={beneficiaryId ? "cid" : "CountryName"}
          rules={[
            {
              required: true,
              message: "Please select country!",
            },
          ]}
        >
          <Select
            placeholder="Select Country"
            className="select-field"
            onChange={handleCountryChange}
          >
            {countries?.map((countries) => (
              <Option key={countries?.ID} value={countries?.ID}>
                {countries?.CountryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="field-label">Region</div>
        <Form.Item
          name={beneficiaryId ? "rid" : "RegionName"}
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
            disabled={beneficiaryId ? "" : !selectedCountry}
            onChange={handleRegionChange}
          >
            {regions
              ?.filter((region) => region?.CountryId === selectedCountry)
              .map((regions) => (
                <Option key={regions?.ID} value={regions?.ID}>
                  {regions?.RegionName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div className="field-label">Province</div>
        <Form.Item
          name={beneficiaryId ? "pid" : "ProvinceName"}
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
            disabled={beneficiaryId ? "" : !selectedRegion}
            onChange={handleProvinceChange}
          >
            {province
              ?.filter((province) => province?.RegionId === selectedRegion)
              .map((province) => (
                <Option key={province?.ProvinceId} value={province?.ProvinceId}>
                  {province?.ProvinceName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div className="field-label">City</div>
        <Form.Item
          name={beneficiaryId ? "cid" : "CityName"}
          rules={[
            {
              required: true,
              message: "Please select city!",
            },
          ]}
        >
          <Select
            placeholder="Select City"
            className="select-field"
            disabled={beneficiaryId ? "" : !selectedProvince}
          >
            {cities
              ?.filter((cities) => cities?.ProvinceId === selectedProvince)
              .map((cities) => (
                <Option key={cities?.ID} value={cities?.ID}>
                  {cities?.CityName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <div className="field-label">Baranggay</div>
        <Form.Item
          name="Baranggay"
          rules={[
            {
              required: true,
              message: "Please input baranggay!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
            placeholder="Select Gender Status"
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
              onClick={() => showModalcrud()}
              loading={loading}
            >
              CANCEL
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="submit-btn" loading={loading}>
              {beneficiaryId ? "UPDATE" : "SUBMIT"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default BeneficiaryModal;
