import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import { Image, Upload } from "antd";
import "./uploadStyle.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleRemove = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid)
    );
  };

  const uploadButton = (
    <div>
      {" "}
      <PlusOutlined />{" "}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {" "}
        Upload{" "}
      </div>{" "}
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        className={
          "picture-card" + (fileList.length === 1 ? "c-none" : "c-pointer")
        }
      >
        {" "}
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>{" "}
      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
            mask: null,
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
