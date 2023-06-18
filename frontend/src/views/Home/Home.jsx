import * as React from "react"
import { useHistory } from "react-router-dom"
import styles from "./Home.module.scss"
import PanelButton from "../SimpleCalculator/components/PanelButton"

import CalculateIcon from "@mui/icons-material/Calculate"
import MapIcon from "@mui/icons-material/Map"

function Home(props) {
  const history = useHistory()

  return (
    <div className={styles.homeContainer}>
      <PanelButton
        label={"Kalkulator prosty"}
        icon={<CalculateIcon style={{ fontSize: 40 }} />}
        width={150}
        height={150}
        onClick={() => history.push("/simplecalculator")}
      ></PanelButton>
      <PanelButton
        label={"Kalkulator interaktywny"}
        icon={<MapIcon style={{ fontSize: 40 }} />}
        width={150}
        height={150}
        onClick={() => history.push("/calculator")}
      ></PanelButton>
    </div>
  )
}

export default Home
