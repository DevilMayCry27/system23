import React, { useState } from "react";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import { Image } from "antd";
import { Col, Row } from "antd";
import { Divider } from "antd";
import PatientAPEModal from "./patientsApeModal.jsx";
import PatientLaboratoryModal from "./patientsLaboratoryModal.jsx";
//import PatientBeneficiariesModal from "./Beneficiaries/patientsBeneficiariesModal.jsx";
import PatientMaintenanceMedicineModal from "./patientMaintenanceMedicineModal.jsx";

const PatientViewingModal = ({
  form,
  isModalViewingVisible,
  showModalView,
  onSubmit,
  loading,
  personalinfo,
  access,
  patientId,
}) => {
  const [isapeModalVisible, setIsapeModalVisible] = useState(false);
  const [apeform] = Form.useForm();
  const [islaboratoryModalVisible, setIslaboratoryModalVisible] =
    useState(false);
  const [laboratoryform] = Form.useForm();
  //--------------------------------------------------------------------
  const [isbeneficiariesModalVisible, setIsbeneficiariesModalVisible] =
    useState(false);
  const [beneficiariesform] = Form.useForm();
  //--------------------------------------------------------------------
  const [
    isPatientMaintenanceMedicineModalVisible,
    setIsPatientMaintenanceMedicineModalVisible,
  ] = useState(false);
  const [PatientMaintenanceMedicineform] = Form.useForm();
  //--------------------------------------------------------------------
  //SHOW MODALS
  //--------------------------------------------------------------------
  const showApeModal = (values = {}) => {
    setIsapeModalVisible(!isapeModalVisible);
    apeform.resetFields();
  };
  const showLaboratoryModal = (values = {}) => {
    setIslaboratoryModalVisible(!islaboratoryModalVisible);
    apeform.resetFields();
  };
  //--------------------------------------------------------------------
  const showBeneficiariesModal = (values = {}) => {
    setIsbeneficiariesModalVisible(!isbeneficiariesModalVisible);
    beneficiariesform.resetFields();
  };
  //--------------------------------------------------------------------
  const showPatientMaintenanceMedicineModal = (values = {}) => {
    setIsPatientMaintenanceMedicineModalVisible(
      !isPatientMaintenanceMedicineModalVisible
    );
    PatientMaintenanceMedicineform.resetFields();
  };

  return (
    <Modal
      className="new-modal"
      title={`Patient Profile`}
      visible={isModalViewingVisible}
      onOk={showModalView}
      onCancel={showModalView}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"55%"}
    >
      <Form
        name="new form"
        onFinish={onSubmit}
        autoComplete="off"
        className="new-form"
        form={form}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "230px",
              }}
            >
              <Image
                width={200}
                height={200}
                src="https://cdn-icons-png.freepik.com/512/3588/3588703.png"
                fallback="https://cdn-icons-png.freepik.com/512/3588/3588703.png"
              />
            </div>
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => showBeneficiariesModal()}
                className="submit-btn"
                loading={loading}
                style={{ flex: 1, margin: "0 5px" }}
              >
                Beneficiaries
              </Button>
            </div> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => showApeModal()}
                className="submit-btn"
                loading={loading}
                style={{ flex: 1, margin: "0 5px" }}
              >
                APE Records
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => showLaboratoryModal()}
                className="submit-btn"
                loading={loading}
                style={{ flex: 1, margin: "0 5px" }}
              >
                Laboratory Records
              </Button>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => showPatientMaintenanceMedicineModal()}
                className="submit-btn"
                loading={loading}
                style={{ flex: 1, margin: "0 5px" }}
              >
                Maintenance Medicine
              </Button>
            </div> */}
          </Col>
          <Col span={8}>
            <Divider orientation="left" orientationMargin="0">
              PERSONAL INFORMATIONS:
            </Divider>
            <div className="field-container">
              <div className="FieldLabel label">
                <b>FULL NAME:</b>
                {" " +
                  personalinfo?.FirstName +
                  " " +
                  personalinfo?.MiddleName +
                  " " +
                  personalinfo?.LastName}
              </div>

              <div className="FieldLabel label">
                <b>GENDER:</b> {" " + personalinfo.GenderName}
              </div>

              <div className="FieldLabel label">
                <b>CIVIL STATUS:</b> {" " + personalinfo.CivilStatus}
              </div>

              <div className="FieldLabel label">
                <b>BLOOD TYPE:</b> {" " + personalinfo.BloodType}
              </div>
              <div className="FieldLabel label">
                <b>ADDRESS:</b>{" "}
                {" " +
                  personalinfo.Country +
                  "," +
                  " " +
                  "REGION" +
                  " " +
                  personalinfo.Region +
                  "," +
                  " " +
                  personalinfo.Province +
                  "," +
                  " " +
                  personalinfo.City +
                  "," +
                  " " +
                  personalinfo.Street}
              </div>
            </div>
            {/* <Divider orientation="left" orientationMargin="0">
              EMERGENCY CONTACT DETAILS:
            </Divider>
            <div className="FieldLabel label">
              <b>FULL NAME: </b>
            </div>
            <div className="FieldLabel label">
              <b>CONTACT NUMBER: </b>
            </div>
            <div className="FieldLabel label">
              <b>RELATION: </b>
            </div>
            <div className="FieldLabel label">
              <b>ADDRESS: </b>
            </div> */}
          </Col>
          <Col span={8}>
            <Divider orientation="left" orientationMargin="0">
              COMPANY PROFILE:
            </Divider>
            <div className="field-container">
              <div className="FieldLabel label">
                <b>EMPLOYEE ID:</b> {personalinfo?.EmployeeCode}
              </div>
              {/* <div className="FieldLabel label">
                <b>COMPANY:</b> {" " + personalinfo.Company}
              </div> */}
              <div className="FieldLabel label">
                <b>DEPARTMENT:</b> {" " + personalinfo.Department}
              </div>

              <div className="FieldLabel label">
                <b>SECTION:</b> {" " + personalinfo.Section}
              </div>
            </div>
            <Divider orientation="left" orientationMargin="0">
              BENEFIT DETAILS:
            </Divider>
            <div className="field-container">
              <div className="FieldLabel label">
                <b>HEALTHCARE No. :</b> {" " + personalinfo.HealthCareNo}
              </div>

              <div className="FieldLabel label">
                <b>SSS No. : </b>
                {" " + personalinfo.SSSNo}
              </div>

              <div className="FieldLabel label">
                <b>PH No. : </b>
                {" " + personalinfo.PhNo}
              </div>

              <div className="FieldLabel label">
                <b>TIN No. :</b> {" " + personalinfo.TINNo}
              </div>
              <div className="FieldLabel label">
                <b>PAGIBIG No. :</b> {" " + personalinfo.PagibigNo}
              </div>
            </div>
          </Col>
        </Row>
      </Form>

      <PatientAPEModal
        form={apeform}
        isModalVisibles={isapeModalVisible}
        showModal={showApeModal}
        userId={patientId}
      />
      <PatientLaboratoryModal
        form={laboratoryform}
        islaboratoryModalVisible={islaboratoryModalVisible}
        showModal={showLaboratoryModal}
        userId={patientId}
      />

      {/* <PatientBeneficiariesModal
        form={beneficiariesform}
        isModalVisibles={isbeneficiariesModalVisible}
        showModal={showBeneficiariesModal}
        access={access}
        userId={userId}
      /> */}

      <PatientMaintenanceMedicineModal
        form={PatientMaintenanceMedicineform}
        isModalVisibles={isPatientMaintenanceMedicineModalVisible}
        showModal={showPatientMaintenanceMedicineModal}
      />
    </Modal>
  );
};

export default PatientViewingModal;
