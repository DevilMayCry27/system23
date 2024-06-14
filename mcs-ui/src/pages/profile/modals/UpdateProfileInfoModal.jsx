import React, { useEffect, useState } from "react";
import { getProvinceListAction } from "../../../actions/province";
import { getMunicipalityListAction } from "../../../actions/municipality";
import { connect } from "react-redux";
import { putProfile } from "../../../actions/profile";
import styles from "./UpdateProfileInfoModal.module.scss";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Message from "antd/lib/message";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Tooltip from "antd/lib/tooltip";
import UserOutlined from "@ant-design/icons/UserOutlined";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

const UpdateProfileInfoModal = ({
  OnGetProvinceListAction,
  OnGetMunicipalityLisAction,
  OnPutProfile,
  OnRefetchUser,
  putProfileLoading,
  putProfileSuccess,
  putProfileFailed,
  provinceListData = [],
  municipalityListData = [],
  currentUser,
}) => {
  const [messageApi, contextHolder] = Message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const initialValues = {
    FirstName: currentUser.FirstName,
    MiddleName: currentUser.MiddleName,
    LastName: currentUser.LastName,
    ContactNo: currentUser.ContactNo,
    StreetNo: currentUser.StreetNo,
    Baranggay: currentUser.Baranggay,
    MunicipalityID: currentUser.MunicipalityID,
    ProvinceID: currentUser.ProvinceID,
  };

  const OnFetchData = async () => {
    await OnGetProvinceListAction();
    await OnGetMunicipalityLisAction();
  };

  useEffect(() => {
    OnFetchData();
    // eslint-disable-next-line
  }, []);

  const onFormSubmit = async (values) => {
    await OnPutProfile({
      FirstName: values.FirstName,
      MiddleName: values.MiddleName,
      LastName: values.LastName,
      ContactNo: values.ContactNo,
      StreetNo: values.StreetNo,
      Baranggay: values.Baranggay,
      MunicipalityID: values.MunicipalityID,
      ProvinceID: values.ProvinceID,
    });

    closeModal();
  };

  useEffect(() => {
    if (putProfileSuccess) {
      OnRefetchUser();
      messageApi.open({
        type: "success",
        content: `Profile updated successfully`,
      });
    }

    if (putProfileFailed) {
      messageApi.open({
        type: "error",
        content: `Something went wrong`,
      });
    }
    // eslint-disable-next-line
  }, [putProfileSuccess, putProfileFailed]);

  const closeModal = () => setOpen(false);
  const showModal = () => setOpen(true);
  const onOkModal = async () => {
    try {
      const values = await form.validateFields();
      form?.resetFields();
      onFormSubmit(values);
    } catch (error) {
      // console.log("Failed:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Update profile">
        <Button type="primary" onClick={showModal} icon={<UserOutlined />} size={"middle"} />
      </Tooltip>

      {open && (
        <Modal
          className={styles.updateProfileInfoContainer}
          open={open}
          title="Update profile"
          okText="Submit"
          cancelText="Cancel"
          okButtonProps={{
            autoFocus: true,
          }}
          confirmLoading={putProfileLoading}
          onCancel={closeModal}
          onOk={onOkModal}
          destroyOnClose
        >
          <Form name="new form" className={styles.form} {...formItemLayout} form={form} size="middle" autoComplete="off" initialValues={initialValues}>
            <Form.Item
              label="First name"
              name="FirstName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Middle name"
              name="MiddleName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="LastName"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Contact"
              name="ContactNo"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Province" name="ProvinceID">
              <Select showSearch>
                {provinceListData?.map((data) => (
                  <Select.Option value={data.ID} key={data.ID}>
                    {data.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Municipality" name="MunicipalityID">
              <Select showSearch>
                {municipalityListData?.map((data, index) => (
                  <Select.Option value={data.ID} key={data.ID}>
                    {data.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Baranggay"
              name="Baranggay"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Street"
              name="StreetNo"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    provinceListData: state.province.provinceListData,
    putProfileLoading: state.profile.putProfileLoading,
    putProfileSuccess: state.profile.putProfileSuccess,
    putProfileFailed: state.profile.putProfileFailed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnGetProvinceListAction: () => dispatch(getProvinceListAction()),
    OnGetMunicipalityLisAction: () => dispatch(getMunicipalityListAction()),
    OnPutProfile: (data) => dispatch(putProfile(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileInfoModal);
