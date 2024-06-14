import React, { useEffect } from "react";

import styles from "./UpdateProfileInfoModal.module.scss";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Upload from "antd/lib/upload";
import Tooltip from "antd/lib/tooltip";
import CameraOutlined from "@ant-design/icons/CameraOutlined";
import InboxOutlined from "@ant-design/icons/InboxOutlined";
import useModal from "../../../hooks/useModal";
import useMessage from "../../../hooks/useMessage";
import { connect } from "react-redux";
import { putProfilePic } from "../../../actions/profile";
import { refreshState } from "../../../reducers/profileSlice";

const UpdateProfilePicModal = ({
  postProfilePicLoading,
  postProfilePicSuccess,
  postProfilePicFailed,
  refreshState,
  OnPutProfilePic,
  OnRefetchUser,
  currentUser,
}) => {
  const { message } = useMessage();
  const [form] = Form.useForm();
  const { open, showModal, closeModal } = useModal();

  const onFormSubmit = async (values) => {
    const formData = new FormData();

    formData.append("FileName", currentUser.EmployeeCode);
    formData.append("ProfilePic", values.ProfilePic[0].originFileObj);

    await OnPutProfilePic(formData);
    closeModal();
  };

  useEffect(() => {
    if (postProfilePicSuccess) {
      OnRefetchUser();
      message.open({
        type: "success",
        content: `Profile updated successfully`,
      });
    }

    if (postProfilePicFailed) {
      message.open({
        type: "error",
        content: `Something went wrong`,
      });
    }

    refreshState();
    // eslint-disable-next-line
  }, [postProfilePicSuccess, postProfilePicFailed]);

  const onOkModal = async () => {
    try {
      const values = await form.validateFields();
      form?.resetFields();
      onFormSubmit(values);
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  /* 
    UPLOAD FILES
  */

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    beforeUpload: (file) => {
      const isJPG = file.type === "image/jpg" || file.type === "image/jpeg";
      if (!isJPG) {
        message.error(`${file.name} is not a jpg file`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  return (
    <>
      <Tooltip title="Update profile">
        <Button
          type="primary"
          onClick={showModal}
          icon={<CameraOutlined />}
          size={"middle"}
        />
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
          confirmLoading={postProfilePicLoading}
          onCancel={closeModal}
          onOk={onOkModal}
          destroyOnClose
        >
          <Form
            name="new form"
            className={styles.form}
            form={form}
            size="middle"
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Profile picture">
              <Form.Item
                name="ProfilePic"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Upload.Dragger
                  multiple={false}
                  name="file"
                  maxCount={1}
                  {...props}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    /* PROFILE */
    postProfilePicLoading: state.profile.postProfilePicLoading,
    postProfilePicSuccess: state.profile.postProfilePicSuccess,
    postProfilePicFailed: state.profile.postProfilePicFailed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnPutProfilePic: (values) => dispatch(putProfilePic(values)),
    refreshState: (values) => dispatch(refreshState()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfilePicModal);
