import styles from "./Computation.module.scss"
import React, { useState, useEffect } from "react"
import { Slide, Fade } from "react-awesome-reveal"
import { AnimatePresence, motion } from "framer-motion"
import InputAdornment from "@mui/material/InputAdornment"

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
} from "@mui/material"

import PlantAnimation from "./PlantAnimation"
import PanelButton from "./PanelButton"
import { Html5Entities } from "html-entities"

import PersonRoundedIcon from "@mui/icons-material/PersonRounded"
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded"

const formZagospodarowaniaOptions = {
  "powierzchnie szczelne (nieprzepuszczalne)": 0,
  "powierzchnie półprzepuszczalne": 0.5,
  "powierzchnie perforowane": 0.3,
  "powierzchnie przepuszczalne": 1,
  zabudowa: 0,
  "drzewo (pow. odkryta pod koroną, m2)": 1,
  "krzew (pow. odkryta pod krzewem, m2)": 0.7,
  "łąka kwietna": 0.7,
  "trawa (murawa)": 0.3,
  "dachy zielone": 0.7,
  "ściany zielone": 0.5,
  "rośliny pnące (na 1m2 powierzchni)": 0.3,
  "ogród deszczowy (na 1m2)": 0.7,
}

const Computation = ({ sugIndicatorValue }) => {
  const [rows, setRows] = useState([{ nazwa: "", forma: "", powierzchnia: "" }])
  const [bafFinalValue, setBafFinalValue] = useState(0)

  const handleAddRow = () => {
    setRows([...rows, { nazwa: "", forma: "", powierzchnia: "" }])
  }

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows]
    updatedRows.splice(index, 1)
    setRows(updatedRows)
  }

  const handleNazwaChange = (event, index) => {
    const updatedRows = [...rows]
    updatedRows[index].nazwa = event.target.value
    setRows(updatedRows)
  }

  const handleFormaChange = (event, index) => {
    const updatedRows = [...rows]
    updatedRows[index].forma = event.target.value
    setRows(updatedRows)
  }

  const handlePowierzchniaChange = (event, index) => {
    const updatedRows = [...rows]
    const value = event.target.value
    updatedRows[index].powierzchnia = value > 0 ? value : ""
    setRows(updatedRows)
  }

  const calculateBAF = (forma, powierzchnia) => {
    const wspolczynnik = formZagospodarowaniaOptions[forma]
    return powierzchnia * wspolczynnik
  }

  const calculateTotalBAF = () => {
    let totalBAF = 0
    rows.forEach((row) => {
      console.log(row)
      if (row.forma !== "" && row.powierzchnia !== "") {
        totalBAF += calculateBAF(row.forma, row.powierzchnia)
      }
    })
    return Math.ceil(totalBAF * 100) / 100
  }

  const calculateTotalArea = () => {
    let totalArea = 0
    rows.forEach((row) => {
      const powierzchnia = parseFloat(row.powierzchnia)
      if (!isNaN(powierzchnia)) {
        totalArea += powierzchnia
      }
    })
    return totalArea
  }

  const calculateBAFFinalValue = () => {
    let totalArea = calculateTotalArea()
    let totalBaf = calculateTotalBAF()

    if (totalArea > 0 && totalBaf > 0) {
      let result = totalBaf / totalArea
      return Math.ceil(result * 100) / 100
    } else {
      return NaN
    }
  }

  const handleDuplicateRow = (index) => {
    const duplicatedRow = { ...rows[index] }
    const updatedRows = [...rows]
    updatedRows.splice(index + 1, 0, duplicatedRow)
    setRows(updatedRows)
  }

  useEffect(() => {
    const bafValue = calculateBAFFinalValue()
    setBafFinalValue(bafValue)
  }, [rows])

  useEffect(() => {
    handleUnderboxColor()
  }, [setBafFinalValue])

  const handleUnderboxColor = () => {
    let totalBafUnderbox = styles.totalBafUnderbox
    if (sugIndicatorValue > bafFinalValue) {
      totalBafUnderbox += " " + styles.totalBafUnderboxRed
    } else if (
      sugIndicatorValue === "Wybierz rodzaj zabudowy" ||
      isNaN(bafFinalValue)
    ) {
      totalBafUnderbox += " " + styles.totalBafUnderboxWhite
    } else {
      totalBafUnderbox += " " + styles.totalBafUnderboxGreen
    }
    return totalBafUnderbox
  }

  const renderHintText = () => {
    if (sugIndicatorValue > bafFinalValue) {
      return "Twój BAF jest zbyt niski w porównaniu z sugerowanym BAF dla tego typu zabudowy"
    } else {
      console.log(bafFinalValue)
      if (sugIndicatorValue === "Wybierz rodzaj zabudowy") {
        return "Wybierz rodzaj zabudowy"
      } else if (bafFinalValue === 0 || isNaN(bafFinalValue)) {
        return "Uzupełnij tabele"
      } else {
        return "Twój BAF jest prawidłowy. Gratulacje!"
      }
    }
  }

  return (
    <div className={styles.computationContainer}>
      <Fade delay={250} cascade damping={1e-1} triggerOnce={true}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Nazwa</TableCell>
                <TableCell style={{ width: "30%" }}>
                  Forma zagospodarowania
                </TableCell>
                <TableCell style={{ width: "15%" }}>
                  Powierzchnia (m<sup>2</sup>)
                </TableCell>
                <TableCell style={{ width: "10%" }}>Współczynnik</TableCell>
                <TableCell style={{ width: "10%" }}>
                  BAF (m<sup>2</sup>)
                </TableCell>
                <TableCell style={{ width: "5%" }}></TableCell>
                <TableCell style={{ width: "5%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence initial={false}>
                {rows.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TableCell style={{ width: "20%" }}>
                      <TextField
                        value={row.nazwa}
                        onChange={(event) => handleNazwaChange(event, index)}
                        fullWidth
                        inputProps={{ maxLength: 50 }}
                      />
                    </TableCell>
                    <TableCell style={{ width: "30%" }}>
                      <TextField
                        select
                        value={row.forma}
                        onChange={(event) => handleFormaChange(event, index)}
                        fullWidth
                      >
                        {Object.keys(formZagospodarowaniaOptions).map(
                          (option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <TextField
                        type="number"
                        value={row.powierzchnia}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              m&#178;
                            </InputAdornment>
                          ),
                        }}
                        onChange={(event) =>
                          handlePowierzchniaChange(event, index)
                        }
                        fullWidth
                        inputProps={{ min: 0, step: 1.0 }}
                      />
                    </TableCell>
                    <TableCell>
                      {formZagospodarowaniaOptions[row.forma]}
                    </TableCell>
                    <TableCell>
                      <p className={styles.rowBaf}>
                        {isNaN(calculateBAF(row.forma, row.powierzchnia))
                          ? "0.00"
                          : calculateBAF(row.forma, row.powierzchnia)?.toFixed(
                              2
                            )}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleDuplicateRow(index)}
                      >
                        Duplikuj
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Usuń
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
              <TableRow>
                <TableCell>
                  <Slide triggerOnce={true}>
                    <Button variant="contained" onClick={handleAddRow}>
                      Dodaj wiersz
                    </Button>
                  </Slide>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <p className={styles.rowTotalArea}>Powierzchnia całkowita:</p>
                  <p className={styles.rowTotalArea}>
                    {calculateTotalArea()?.toFixed(2)}
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <p className={styles.rowTotalBaf}>BAF całkowity:</p>
                  <p className={styles.rowTotalBaf}>
                    {isNaN(calculateTotalBAF())
                      ? "0.00"
                      : calculateTotalBAF()?.toFixed(2)}
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>

      <Fade delay={750} triggerOnce={true}>
        <div className={styles.lowerNavContainer}>
          <PanelButton
            label={"Porady dla mieszkańca"}
            icon={<PersonRoundedIcon style={{ fontSize: 40 }} />}
            width={150}
            height={150}
            onClick={() => console.log("Test")}
          />
          <div className={styles.totalBafContainer}>
            <div className={styles.totalBafBox}>
              <p className={styles.totalBafLabel}>Wartość BAF:</p>
              <p className={styles.totalBafValue}>
                {isNaN(bafFinalValue) ? "0.00" : bafFinalValue?.toFixed(2)}
              </p>
            </div>
            <div className={handleUnderboxColor()}>
              <p className={styles.bafInfo}>{renderHintText()}</p>
            </div>
          </div>
          <PanelButton
            label={"Porady dla projektanta"}
            icon={<ArchitectureRoundedIcon style={{ fontSize: 40 }} />}
            width={150}
            height={150}
            onClick={() => console.log("Test2")}
          />
        </div>
      </Fade>

      <Slide triggerOnce={true}>
        <PlantAnimation></PlantAnimation>
      </Slide>
    </div>
  )
}

export default Computation
