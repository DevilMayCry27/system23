import React, { useEffect, useState } from "react";
import { putChangePassword } from "../../../actions/profile";
import { connect } from "react-redux";
import styles from "./UpdateUserPasswordModal.module.scss";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Message from "antd/lib/message";
import Tooltip from "antd/lib/tooltip";
import KeyOutlined from "@ant-design/icons/KeyOutlined";

const UpdateUserPasswordModal = ({
  putChangePassword,
  putPasswordChangeLoading,
  putPasswordChangeSuccess,
  putPasswordChangeFailed,
}) => {
  const initialValues = {
    OldPassword: "",
    NewPassword: "",
    ConfimNewPassword: "",
  };
  const [messageApi, contextHolder] = Message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onFormSubmit = async (values) => {
    await putChangePassword({
      oldPassword: values.OldPassword,
      newPassword: values.NewPassword,
    });
    closeModal();
  };

  useEffect(() => {
    if (putPasswordChangeSuccess) {
      messageApi.open({
        type: "success",
        content: `Password change successfully`,
      });
    }
    if (putPasswordChangeFailed) {
      messageApi.open({
        type: "error",
        content: `Invalid Credentials`,
      });
    }
    // eslint-disable-next-line
  }, [putPasswordChangeSuccess, putPasswordChangeFailed, messageApi]);

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
      <Tooltip title="Change Password">
        <Button
          type="primary"
          onClick={showModal}
          icon={<KeyOutlined />}
          size={"middle"}
        />
      </Tooltip>

      {open && (
        <Modal
          className={styles.updatePasswordContainer}
          open={open}
          title="Update password"
          okText="Submit"
          cancelText="Cancel"
          okButtonProps={{
            autoFocus: true,
          }}
          confirmLoading={putPasswordChangeLoading}
          onCancel={closeModal}
          onOk={onOkModal}
          destroyOnClose
        >
          <Form
            name="new form"
            autoComplete="off"
            className={styles.form}
            form={form}
            layout="vertical"
            initialValues={initialValues}
          >
            <Form.Item
              label="Old password"
              name="OldPassword"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="New password"
              name="NewPassword"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
              initialValue=""
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="Confirm new password"
              name="ConfirmNewPassword"
              dependencies={["NewPassword"]}
              rules={[
                {
                  required: true,
                  message: "Required",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("NewPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              initialValue=""
            >
              <Input type="password" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    putPasswordChangeLoading: state.profile.putPasswordChangeLoading,
    putPasswordChangeSuccess: state.profile.putPasswordChangeSuccess,
    putPasswordChangeFailed: state.profile.putPasswordChangeFailed,
    putPasswordChangeData: state.profile.putPasswordChangeData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    putChangePassword: (values) => dispatch(putChangePassword(values)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserPasswordModal);
