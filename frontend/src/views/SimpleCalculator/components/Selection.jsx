import React, { useState } from "react"
import styles from "./Selection.module.scss"
import { Slide, Fade } from "react-awesome-reveal"

import { InputLabel, MenuItem, Select } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

function Selection({ sugIndicatorValue, handleTypeChange, selectedType }) {
  return (
    <div className={styles.selectionContainer}>
      <Slide direction="down">
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
            <p className={styles.bafIndicator}>{sugIndicatorValue}</p>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default Selection
