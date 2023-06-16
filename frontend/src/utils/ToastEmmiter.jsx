import { toast, Slide } from "react-toastify";
import styles from "./Utils.module.scss";
import * as React from "react";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
export function emmitError(message) {
  toast.error(message, {
    className: styles.toast,
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    icon: <PriorityHighIcon className={styles.iconError} />,
  });
}

export function emitInfo(message) {
  toast.info(message, {
    className: styles.toast,
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    icon: <PriorityHighIcon className={styles.iconInfo} />,
  });
}

export function emmitSuccess(message) {
  toast.success(message, {
    className: styles.toast,
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    transition: Slide,
    icon: <DoneAllIcon className={styles.iconSuccess} />,
  });
}
