import React, { useState } from "react"
import styles from "./Selection.module.scss"
import { Slide, Fade } from "react-awesome-reveal"

import {
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
} from "@mui/material"
import FormControl from "@mui/material/FormControl"
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded"

import HelpIcon from "@mui/icons-material/Help"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import SouthIcon from "@mui/icons-material/South"

function Selection({
  sugIndicatorValue,
  handleTypeChange,
  selectedType,
  selectedDistrict,
  handleDistrictChange,
  handleHelpChange,
}) {
  return (
    <div className={styles.centerBox}>
      <Slide direction="left" triggerOnce={true}>
        <div className={styles.sectionTitle}>
          <p className={styles.sectionTitleText}>Konfiguracja</p>
          <Tooltip title="Wyświetl pomoc">
            <IconButton
              tooltip="Wyświetl pomoc"
              onClick={() => {
                handleHelpChange("konfiguracja")
              }}
            >
              <HelpIcon style={{ fill: "white", fontSize: 32 }}></HelpIcon>
            </IconButton>
          </Tooltip>
        </div>
        <div className={styles.selectionWrapper}>
          <div className={styles.selectionContainer}>
            <div className={styles.typeOfBuildingSelect}>
              <FormControl sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="building-type-label">
                  Rodzaj zabudowy
                </InputLabel>
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
                  <MenuItem value="składy i magazyny">
                    Składy i magazyny
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.typeOfDistrictSelect}>
              <FormControl sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="building-type-label">Obręb miasta</InputLabel>
                <Select
                  labelId="building-type-label"
                  id="building-type"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  label="Wybierz rodzaj zabudowy"
                >
                  <MenuItem value="śródmieście">Śródmieście</MenuItem>
                  <MenuItem value="obręb2">Obręb 2</MenuItem>
                  <MenuItem value="obręb3">Obręb 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={styles.arrow}>
            <ArrowDownwardRoundedIcon
              style={{ fontSize: 50 }}
            ></ArrowDownwardRoundedIcon>
          </div>
          <div className={styles.minimalBaf}>
            <p>Sugerowany wskaźnik BAF:</p>
            <p className={styles.bafIndicator}>{sugIndicatorValue}</p>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default Selection
