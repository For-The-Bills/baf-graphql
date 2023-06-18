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
import { connect } from "react-redux"
import { Slide } from "react-awesome-reveal"

function Navbar(props) {
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

  return (
    <div className={styles.navbarContainer}>
      <Slide direction="left" triggerOnce={true}>
        <img
          className={styles.logo}
          src={bafLogo}
          alt="Dąbrowa Górnicza kalkulator BAF"
        />
      </Slide>

      <div className={styles.links}></div>
    </div>
  )
}

export default withRouter(connect()(Navbar))
