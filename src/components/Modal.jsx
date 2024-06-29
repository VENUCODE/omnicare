import React from "react";
import {
  Modal as MuiModal,
  Backdrop,
  Fade,
  Box,
  Typography,
} from "@mui/material";
const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Modal = ({ open, onClose, title, children }) => {
  return (
    <MuiModal
      open={open}
      //   sx={{ backgroundColor: "var(--bg-body)" }}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={style}
          className="position-absolute rounded-2 top-50 start-50 translate-middle"
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <hr />
          {children}
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
