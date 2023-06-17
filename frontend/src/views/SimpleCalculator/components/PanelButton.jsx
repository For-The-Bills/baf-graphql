import React from "react"
import styles from "./PanelButton.module.scss"

function PanelButton(props) {
  return (
    <div>
      <div
        style={{ width: props.width, height: props.height }}
        className={
          props.isSmallText
            ? styles.panelButton + " " + styles.panelSmallText
            : styles.panelButton
        }
        onClick={props.onClick}
      >
        <div className={styles.iconContainer}>{props.icon}</div>

        <div
          className={
            props.isSmallText
              ? styles.labelContainerSmallText
              : styles.labelContainer
          }
        >
          {props.label}
        </div>
      </div>
    </div>
  )
}

export default PanelButton
