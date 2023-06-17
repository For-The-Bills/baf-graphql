import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React from "react";
import styles from "./Modal.module.scss";

function Modal(props) {
  const handleClose = () => {
    if (props.onClose) props.onClose();
    props.closeModal();
  };

  const isDarkTitle = props.isDarkTitle;
  const noBodyPadding = props.noBodyPadding
  const fullBody = props.fullBody

  let bodyStyle = {}

  if(noBodyPadding) bodyStyle.padding = 0
  if(fullBody) bodyStyle.height = "100%"

  return (
    props.visible && (
      <div className={styles.modalHolder}>
        <div style={{ height: props.height }} className={styles.modal}>
          <div className={isDarkTitle ? styles.headerDark : styles.header}>
            {props.title}{" "}
            <IconButton onClick={handleClose}>
              {" "}
              {isDarkTitle ? <CloseIcon color="white" /> : <CloseIcon />}{" "}
            </IconButton>
          </div>
          <div style={bodyStyle} className={styles.body}>{props.children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
