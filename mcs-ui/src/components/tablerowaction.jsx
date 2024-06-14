import React, { useState, useEffect } from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Popconfirm from "antd/lib/popconfirm";
import DeleteFilled from "@ant-design/icons/DeleteFilled";
import EditFilled from "@ant-design/icons/EditFilled";
import EyeFilled from "@ant-design/icons/EyeFilled";
import UnlockFilled from "@ant-design/icons/UnlockFilled";
import StopFilled from "@ant-design/icons/StopFilled";
import CloudUploadOutlined from "@ant-design/icons/CloudUploadOutlined";
import HeartFilled from "@ant-design/icons/HeartFilled";

const RowAction = ({
  showModal,
  showModalView,
  showModalUpload,
  showModalConsult,
  confirmDelete,
  confirmReject,
  showAccessIcon,
  showAccessModal,
  canConsult,
  canView,
  canUpload,
  canUpdate,
  canDelete,
  canReject,
  onChange,
}) => {
  const cancelDelete = (e) => {};

  return (
    <div className="action-icons">
      <Button
        shape="circle"
        className={canConsult ? "edit-icon" : "hide-element"}
        icon={<HeartFilled />}
        onClick={showModalConsult}
      />
      <Button
        shape="circle"
        className={canView ? "edit-icon" : "hide-element"}
        icon={<EyeFilled />}
        onClick={showModalView}
      />
      <Button
        shape="circle"
        className={canUpload ? "edit-icon" : "hide-element"}
        icon={<CloudUploadOutlined />}
        onClick={showModalUpload}
      />
      <Button
        shape="circle"
        className={canUpdate ? "edit-icon" : "hide-element"}
        icon={<EditFilled />}
        onClick={showModal}
      />
      <Button
        shape="circle"
        className={showAccessIcon && canUpdate ? "edit-icon" : "hide-element"}
        icon={<UnlockFilled />}
        onClick={showAccessModal}
      />
      <Popconfirm
        title="Are you sure ?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        okText="Yes"
        cancelText="No"
        placement="left"
        className={canDelete ? "delete-confirm" : "hide-element"}
      >
        <Button
          shape="circle"
          className="delete-icon"
          icon={<DeleteFilled />}
        />
      </Popconfirm>
      <Popconfirm
        title={
          <div>
            <Input.TextArea
              placeholder="Decline order?"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        }
        onConfirm={confirmReject}
        onCancel={cancelDelete}
        okText="Yes"
        cancelText="No"
        placement="left"
        className={canReject ? "delete-confirm" : "hide-element"}
      >
        <Button shape="circle" className="delete-icon" icon={<StopFilled />} />
      </Popconfirm>
    </div>
  );
};

export default RowAction;
