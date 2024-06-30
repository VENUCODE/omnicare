import React from "react";
import { Modal as AntdModal, Typography } from "antd";

const { Title } = Typography;

const Modal = ({ open, onClose, title, children }) => {
  return (
    <AntdModal open={open} onCancel={onClose} footer={null}>
      <div className="bg-white h-100">
        <Title level={4} className="poppins-medium">
          {title}
        </Title>
        <hr />
        {children}
      </div>
    </AntdModal>
  );
};

export default Modal;
