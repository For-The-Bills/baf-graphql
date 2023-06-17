import React from "react"
import styles from "./PlantAnimation.module.scss"
import classNames from "classnames"

function PlantAnimation() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.stem}>
            <div className={classNames(styles.leaf, styles.leaf01)}>
              <div className={styles.line}></div>
            </div>
            <div className={classNames(styles.leaf, styles.leaf02)}>
              <div className={styles.line}></div>
            </div>
            <div className={classNames(styles.leaf, styles.leaf03)}>
              <div className={styles.line}></div>
            </div>
            <div className={classNames(styles.leaf, styles.leaf04)}>
              <div className={styles.line}></div>
            </div>
            <div className={classNames(styles.leaf, styles.leaf05)}>
              <div className={styles.line}></div>
            </div>
            <div className={classNames(styles.leaf, styles.leaf06)}>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.pot}></div>
          <div className={styles.potTop}></div>
        </div>
      </div>
    </div>
  )
}

export default PlantAnimation
