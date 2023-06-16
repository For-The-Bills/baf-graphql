import React, { useState } from "react"
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import styles from "./Selection.module.scss"

function Selection(props) {
  const [selectedType, setSelectedType] = useState("")

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  return (
    <div className={styles.selectionContainer}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="building-type"
          name="building-type"
          value={selectedType}
          onChange={handleTypeChange}
          row
        >
          <FormControlLabel
            value="mieszkaniowa"
            control={<Radio />}
            label="Mieszkaniowa"
          />
          <FormControlLabel
            value="przestrzenie publiczne"
            control={<Radio />}
            label="Przestrzenie publiczne"
          />
          <FormControlLabel
            value="usługowa"
            control={<Radio />}
            label="Usługowa"
          />
          <FormControlLabel
            value="produkcyjna"
            control={<Radio />}
            label="Produkcyjna"
          />
          <FormControlLabel
            value="usługowo-produkcyjna"
            control={<Radio />}
            label="Usługowo-produkcyjna"
          />
          <FormControlLabel
            value="usługowo-mieszkaniowa"
            control={<Radio />}
            label="Usługowo-mieszkaniowa"
          />
          <FormControlLabel
            value="składy i magazyny"
            control={<Radio />}
            label="Składy i magazyny"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Selection
