import React, { useState } from "react"
import styles from "./Selection.module.scss"

import { InputLabel, MenuItem, Select } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

function Selection(props) {
  const [selectedType, setSelectedType] = useState("")
  const [indicatorValue, setIndicatorValue] = useState(
    "Wybierz rodzaj zabudowy"
  )

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
    setIndicatorValue(indicatorDictionary[selectedValue] || "błąd")
  }

  return (
    <div className={styles.selectionContainer}>
      <div className={styles.typeOfBuildingContainer}>
        <div className={styles.typeOfBuildingSelect}>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="building-type-label">Rodzaj zabudowy</InputLabel>
            <Select
              labelId="building-type-label"
              id="building-type"
              value={selectedType}
              onChange={handleTypeChange}
              label="Wybierz rodzaj zabudowy"
            >
              <MenuItem value="mieszkaniowa">Mieszkaniowa</MenuItem>
              <MenuItem value="przestrzenie publiczne">
                Przestrzenie publiczne
              </MenuItem>
              <MenuItem value="usługowa">Usługowa</MenuItem>
              <MenuItem value="produkcyjna">Produkcyjna</MenuItem>
              <MenuItem value="usługowo-produkcyjna">
                Usługowo-produkcyjna
              </MenuItem>
              <MenuItem value="usługowo-mieszkaniowa">
                Usługowo-mieszkaniowa
              </MenuItem>
              <MenuItem value="składy i magazyny">Składy i magazyny</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.arrow}>
          <ArrowRightAltIcon></ArrowRightAltIcon>
        </div>
        <div className={styles.minimalBaf}>
          <p>Sugerowany wskaźnik baf:</p>
          <p className={styles.bafIndicator}>{indicatorValue}</p>
        </div>
      </div>
    </div>
  )
}

export default Selection
