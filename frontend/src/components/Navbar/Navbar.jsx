import styles from "./Navbar.module.scss"
import { matchPath, withRouter } from "react-router"
import bafLogo from "../../assets/images/logo.png"
import {
  motion,
  useAnimationControls,
  useCycle,
  useScroll,
} from "framer-motion"
import { Link } from "react-router-dom"
import classNames from "classnames"
import { Typography } from "@mui/material"
import { connect } from "react-redux"
function Navbar(props) {
  const history = props.history
  const location = props.location

  const links = [
    { name: "Kalkulator Prosty", to: "/simplecalculator" },
    { name: "Mapa", to: "/calculator" },
  ]

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  console.log(history, location)

  return (
    <div className={styles.navbarContainer}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img
          className={styles.logo}
          src={bafLogo}
          alt="Dąbrowa Górnicza kalkulator BAF"
        />
      </motion.div>

      <div className={styles.links}></div>
    </div>
  )
}

export default withRouter(connect()(Navbar))
