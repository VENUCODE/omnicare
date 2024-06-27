import React from "react";
import { Button, Modal } from "rsuite";

export const DataDisplayModal = ({
  heading = "Heading of modal",
  label,
  data,
  control,
}) => {
  const { isOpen, close } = control;
  return (
    <>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>{label}</h1>
          <p>{data}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" block onClick={() => close()}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
