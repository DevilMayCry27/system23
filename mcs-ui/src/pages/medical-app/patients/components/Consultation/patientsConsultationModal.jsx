import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Message from "antd/lib/message";
import { Row } from "antd";

import MainTable from "../../../../../components/maintable.jsx";
import PageAction from "../../../../../components/pageactions.jsx";
import ConsultationModal from "./consultationcomponents/consultationModal.jsx";
import TableRowAction from "../../../../../components/tablerowaction.jsx";

import { mmDdYyyy } from "../../../../../utils/formatter.js";
import { module } from "../../../../../utils/constant.js";
import { getModuleAccess } from "../../../../../utils/access.js";

import {
  getConsultationListAction,
  postConsultationAction,
  putConsultationAction,
  delConsultationAction,
} from "../../../../../actions/consultation.js";

import { getSicknessListActions } from "../../../../../actions/sickness.js";

const PatientConsultationModal = ({
  form,
  isModalViewingVisible,
  showModalConsult,
  onSubmit,
  loading,
  access,
  patientId,

  sicknessListLoading,
  sicknessListSuccess,
  sicknessListFailed,
  sicknessListData,
  OnGetSicknessList,

  consultationListLoading,
  consultationListSuccess,
  consultationListFailed,
  consultationListData,
  OnGetConsultationList,
  postConsultationLoading,
  postConsultationSuccess,
  postConsultationFailed,
  OnPostConsultation,
  putConsultationLoading,
  putConsultationSuccess,
  putConsultationFailed,
  OnPutConsultation,
  delConsultationLoading,
  delConsultationSuccess,
  delConsultationFailed,
  OnDelConsultation,
}) => {
  const [sickness, setSickness] = useState([]);
  const [consultation, setConsultation] = useState([]);
  const [consultationId, setConsultationId] = useState([]);
  const [isModalVisiblecrud, setIsModalVisiblecrud] = useState(false);

  const getData = async () => {
    await OnGetConsultationList(patientId);
    await OnGetSicknessList();
  };

  const showModalcrud = (values = {}) => {
    setConsultationId(values?.ConsID);
    form.resetFields();
    form.setFieldsValue(values);
    setIsModalVisiblecrud(!isModalVisiblecrud);
  };

  const onSubmitCrud = async (values) => {
    if (!consultationId) {
      let temp = { ...values, UserId: patientId };
      await OnPostConsultation(temp);
    } else {
      await OnPutConsultation(consultationId, values);
    }
  };

  const confirmDeleteConsultation = async (ConsID) => {
    await OnDelConsultation(ConsID);
    getData();
  };

  const onSearch = (text) => {
    if (text?.length) {
      const tempData = consultation.filter(
        (item) =>
          item.CreatedAt.toLowerCase().includes(text.toLowerCase()) ||
          item.Complaint.toLowerCase().includes(text.toLowerCase()) ||
          item.Bp.toLowerCase().includes(text.toLowerCase()) ||
          item.Temp.toLowerCase().includes(text.toLowerCase()) ||
          item.Rr.toLowerCase().includes(text.toLowerCase()) ||
          item.Pr.toLowerCase().includes(text.toLowerCase()) ||
          item.Diagnosis.toLowerCase().includes(text.toLowerCase()) ||
          item.Recommendation.toLowerCase().includes(text.toLowerCase()) ||
          item.Physician.toLowerCase().includes(text.toLowerCase())
      );
      setConsultation(tempData);
    } else {
      setConsultation(consultation);
      getData();
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [patientId]);

  useEffect(() => {
    if (sicknessListSuccess) {
      setSickness(sicknessListData);
    }

    if (sicknessListFailed) {
      console.log("Get Sickness List Failed...");
    }
  }, [sicknessListSuccess, sicknessListFailed, sicknessListData]);

  useEffect(() => {
    if (consultationListSuccess) {
      setConsultation([]);
      setConsultation(consultationListData);
    }

    if (consultationListFailed) {
      console.log("Get Consultation List Failed...");
    }
  }, [consultationListSuccess, consultationListFailed, consultationListData]);

  useEffect(() => {
    if (postConsultationSuccess) {
      getData();
      setIsModalVisiblecrud(false);
      Message.success("New Consultation Successfully Created!");
    }

    if (postConsultationFailed) {
      Message.error("New Consultation Creation Failed!");
    }
    // eslint-disable-next-line
  }, [postConsultationSuccess, postConsultationFailed]);

  useEffect(() => {
    if (putConsultationSuccess) {
      getData();
      setIsModalVisiblecrud(false);
      Message.success("Consultation Successfully Updated!");
    }

    if (putConsultationFailed) {
      Message.error("Consultation Update Failed!");
    }
    // eslint-disable-next-line
  }, [putConsultationSuccess, putConsultationFailed]);

  useEffect(() => {
    if (delConsultationSuccess) {
      Message.success("Consultation Successfully Deleted!");
    }

    if (delConsultationFailed) {
      Message.error("Consultation Delete Failed!");
    }
    // eslint-disable-next-line
  }, [delConsultationSuccess, delConsultationFailed]);

  const columns = [
    {
      title: "DATE",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      align: "center",
      width: 200,
      render: (value, row) => (
        <div className="field-text">{mmDdYyyy(value)}</div>
      ),
    },
    {
      title: "CHIEF COMPLAINT",
      dataIndex: "Complaint",
      key: "Complaint",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "BP",
      dataIndex: "Bp",
      key: "Bp",
      align: "center",
      width: 200,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "TEMP",
      dataIndex: "Temp",
      key: "Temp",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "RR",
      dataIndex: "Rr",
      key: "Rr",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "PR",
      dataIndex: "Pr",
      key: "Pr",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "DIAGNOSIS",
      dataIndex: "Diagnosis",
      key: "Diagnosis",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "RECOMMENDATION",
      dataIndex: "Recommendation",
      key: "Recommendation",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "PHYSICIAN / NURSE",
      dataIndex: "Physician",
      key: "Physician",
      align: "center",
      width: 225,
      render: (value, row) => <div className="field-text">{value}</div>,
    },
    {
      title: "ACTIONS",
      dataIndex: "ConsID",
      key: "ConsID",
      align: "center",
      width: 280,
      render: (value, row) => (
        <TableRowAction
          showModal={() => (true ? showModalcrud(row) : showModalConsult(row))}
          confirmDelete={() => confirmDeleteConsultation(value)}
          canUpdate={
            getModuleAccess(access?.general, module?.consultation)?.update
          }
          canDelete={
            getModuleAccess(access?.general, module?.consultation)?.delete
          }
        />
      ),
    },
  ];

  const isLoadingAndDisabled =
    consultationListLoading ||
    putConsultationLoading ||
    delConsultationLoading ||
    postConsultationLoading ||
    sicknessListLoading;
  return (
    <Modal
      className="new-modal"
      title={`Patient Consultations`}
      visible={isModalViewingVisible}
      onOk={showModalConsult}
      onCancel={showModalConsult}
      maskClosable={false}
      closable={true}
      footer={null}
      centered
      width={"100%"}
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
            pageName="Consultation"
            onSearch={onSearch}
            showModalcrud={showModalcrud}
            isDisabled={isLoadingAndDisabled}
            isBene={true}
            canCreate={
              getModuleAccess(access?.general, module?.consultation)?.create
            }
          />
          <MainTable
            columns={columns}
            data={consultation}
            isLoading={isLoadingAndDisabled}
          />
        </Row>
        <ConsultationModal
          form={form}
          isModalVisiblecrud={isModalVisiblecrud}
          showModalcrud={showModalcrud}
          onSubmitCrud={onSubmitCrud}
          loading={isLoadingAndDisabled}
          patientId={patientId}
          consultationId={consultationId}
          sickness={sickness}
        />
        <div className="modal-action-btns">
          <Form.Item>
            <Button
              className="cancel-btn"
              onClick={() => showModalConsult()}
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
    sicknessListLoading: state.sickness.sicknessListLoading,
    sicknessListSuccess: state.sickness.sicknessListSuccess,
    sicknessListFailed: state.sickness.sicknessListFailed,
    sicknessListData: state.sickness.sicknessListData,

    consultationListLoading: state.consultation.consultationListLoading,
    consultationListSuccess: state.consultation.consultationListSuccess,
    consultationListFailed: state.consultation.consultationListFailed,
    consultationListData: state.consultation.consultationListData,
    postConsultationLoading: state.consultation.postConsultationLoading,
    postConsultationSuccess: state.consultation.postConsultationSuccess,
    postConsultationFailed: state.consultation.postConsultationFailed,
    postConsultationData: state.consultation.postConsultationData,
    putConsultationLoading: state.consultation.putConsultationLoading,
    putConsultationSuccess: state.consultation.putConsultationSuccess,
    putConsultationFailed: state.consultation.putConsultationFailed,
    putConsultationData: state.consultation.putConsultationData,
    delConsultationLoading: state.consultation.delConsultationLoading,
    delConsultationSuccess: state.consultation.delConsultationSuccess,
    delConsultationFailed: state.consultation.delConsultationFailed,
    delConsultationData: state.consultation.delConsultationData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetSicknessList: () => dispatch(getSicknessListActions()),

    OnGetConsultationList: (ConsId) =>
      dispatch(getConsultationListAction(ConsId)),
    OnPostConsultation: (data) => dispatch(postConsultationAction(data)),
    OnPutConsultation: (ConsID, data) =>
      dispatch(putConsultationAction(ConsID, data)),
    OnDelConsultation: (ConsID) => dispatch(delConsultationAction(ConsID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientConsultationModal);
