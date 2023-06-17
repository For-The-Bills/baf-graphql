import React, { useState, useEffect } from "react"
import Computation from "./components/Computation"
import Selection from "./components/Selection"
import Hints from "./components/Hints"
import Help from "./components/Help"

import styles from "./SimpleCalculator.module.scss"
import classNames from "classnames"

function SimpleCalculator(props) {
  const [selectedType, setSelectedType] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [sugIndicatorValue, setSugIndicatorValue] = useState(
    "Wybierz rodzaj zabudowy"
  )
  const [selectedHelp, setSelectedHelp] = useState("")

  const indicatorDictionary = {
    mieszkaniowa: 0.6,
    "przestrzenie publiczne": 0.6,
    usługowa: 0.3,
    produkcyjna: 0.3,
    "usługowo-produkcyjna": 0.3,
    "usługowo-mieszkaniowa": 0.5,
    "składy i magazyny": 0.3,
  }

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value
    setSelectedType(selectedValue)
    setSugIndicatorValue(indicatorDictionary[selectedValue] || "błąd")
  }

  const handleDistrictChange = (event) => {
    const selectedValue = event.target.value
    setSelectedDistrict(selectedValue)
  }

  const handleHelpChange = (name) => {
    setSelectedHelp(name)
  }

  return (
    <div className={styles.simpleCalculatorContainer}>
      <div className={classNames(styles.section, styles.leftSection)}>
        <Selection
          sugIndicatorValue={sugIndicatorValue}
          handleTypeChange={handleTypeChange}
          selectedType={selectedType}
          selectedDistrict={selectedDistrict}
          handleDistrictChange={handleDistrictChange}
          handleHelpChange={handleHelpChange}
        />
      </div>
      <div className={classNames(styles.section, styles.middleSection)}>
        <Computation
          sugIndicatorValue={sugIndicatorValue}
          handleHelpChange={handleHelpChange}
        />
      </div>
      <div className={classNames(styles.section, styles.rightSection)}>
        <Help
          selectedHelp={selectedHelp}
          handleHelpChange={handleHelpChange}
        ></Help>
      </div>
    </div>
  )
}

export default SimpleCalculator
