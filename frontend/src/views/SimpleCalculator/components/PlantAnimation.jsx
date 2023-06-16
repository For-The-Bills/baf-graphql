import React, { useState } from "react"
import styles from "./Selection.module.scss"

function PlantAnimation() {
  return (
    <div>
      <div className={styles.drop}></div>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.stem}>
            <div className={styles.leaf + " " + styles.leaf01}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.leaf + " " + styles.leaf02}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.leaf + " " + styles.leaf03}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.leaf + " " + styles.leaf04}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.leaf + " " + styles.leaf05}>
              <div className={styles.line}></div>
            </div>
            <div className={styles.leaf + " " + styles.leaf06}>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.pot}></div>
          <div className={styles["pot-top"]}></div>
        </div>
      </div>
    </div>
  )
}

export default PlantAnimation
