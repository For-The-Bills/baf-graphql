import styles from "./Computation.module.scss"
import React, { useState, useEffect } from "react"
import { Slide, Fade, JackInTheBox } from "react-awesome-reveal"
import { CSSTransition, TransitionGroup } from "react-transition-group"

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
      totalBAF += calculateBAF(row.forma, row.powierzchnia)
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

  return (
    <div className={styles.computationContainer}>
      <Fade delay={250} cascade damping={1e-1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Nazwa</TableCell>
                <TableCell style={{ width: "30%" }}>
                  Forma zagospodarowania
                </TableCell>
                <TableCell style={{ width: "15%" }}>
                  Powierzchnia (m2)
                </TableCell>
                <TableCell style={{ width: "10%" }}>Współczynnik</TableCell>
                <TableCell style={{ width: "10%" }}>BAF (m2)</TableCell>
                <TableCell style={{ width: "5%" }}></TableCell>
                <TableCell style={{ width: "5%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <CSSTransition
                  key={index}
                  classNames={styles.fade}
                  timeout={300}
                >
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        value={row.nazwa}
                        onChange={(event) => handleNazwaChange(event, index)}
                        fullWidth
                        inputProps={{ maxLength: 50 }}
                      />
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      <TextField
                        type="number"
                        value={row.powierzchnia}
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
                  </TableRow>
                </CSSTransition>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <p className={styles.rowTotalArea}>
                    {calculateTotalArea()?.toFixed(2)}
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <p className={styles.rowTotalBaf}>
                    {isNaN(calculateTotalBAF())
                      ? "0.00"
                      : calculateTotalBAF()?.toFixed(2)}
                  </p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
      <Slide>
        <Button variant="contained" onClick={handleAddRow}>
          Dodaj wiersz
        </Button>
      </Slide>

      <Fade delay={750}>
        <div className={styles.totalBafContainer}>
          <div className={styles.totalBafBox}>
            <p className={styles.totalBafLabel}>Wartość BAF:</p>
            <p className={styles.totalBafValue}>
              {isNaN(bafFinalValue) ? "0.00" : bafFinalValue?.toFixed(2)}
            </p>
          </div>
        </div>
      </Fade>

      {sugIndicatorValue > bafFinalValue &&
      sugIndicatorValue != "Wybierz rodzaj zabudowy" ? (
        <div>
          <p className={styles.bafText}>
            Twój BAF jest zbyt niski w porównaniu z sugerowanym BAF dla tego
            typu zabudowy
          </p>
        </div>
      ) : (
        <div>
          <p className={styles.bafText}>
            Twój BAF jest prawidłowy. Gratulacje!
          </p>
        </div>
      )}

      <Slide>
        <PlantAnimation></PlantAnimation>
      </Slide>
    </div>
  )
}

export default Computation
