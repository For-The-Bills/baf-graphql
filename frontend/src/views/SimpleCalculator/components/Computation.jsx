import styles from "./Computation.module.scss"
import React, { useState } from "react"

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

const Computation = () => {
  const [rows, setRows] = useState([{ nazwa: "", forma: "", powierzchnia: "" }])

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
    return Math.ceil(totalBAF * 100) / 100 // Zaokrąglenie w górę do 2 miejsc po przecinku
  }

  return (
    <div className={styles.computationContainer}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Nazwa</TableCell>
              <TableCell style={{ width: "25%" }}>
                Forma zagospodarowania
              </TableCell>
              <TableCell style={{ width: "15%" }}>Powierzchnia (m2)</TableCell>
              <TableCell style={{ width: "15%" }}>Współczynnik</TableCell>
              <TableCell style={{ width: "15%" }}>BAF (m2)</TableCell>
              <TableCell style={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
                    onChange={(event) => handlePowierzchniaChange(event, index)}
                    fullWidth
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                </TableCell>
                <TableCell>{formZagospodarowaniaOptions[row.forma]}</TableCell>
                <TableCell>
                  <p className={styles.rowBaf}>
                    {calculateBAF(row.forma, row.powierzchnia).toFixed(2)}
                  </p>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleAddRow}>
        Dodaj wiersz
      </Button>
      <div className={styles.totalBafContainer}>
        <div className={styles.totalBafBox}>
          <p className={styles.totalBafLabel}>Suma BAF:</p>
          <p className={styles.totalBafValue}>
            {calculateTotalBAF().toFixed(2)}
          </p>
          <PlantAnimation></PlantAnimation>
        </div>
      </div>
    </div>
  )
}

export default Computation
