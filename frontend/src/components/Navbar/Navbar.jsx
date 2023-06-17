import styles from "./Navbar.module.scss"
import { matchPath, withRouter } from "react-router"
import bafLogo from "../../assets/images/logo.png"
import {
  motion,
  useAnimationControls,
  useCycle,
  useScroll,
} from "framer-motion"
import { useHistory } from "react-router-dom"

function Navbar(props) {
  const history = useHistory()

  return (
    <div className={styles.navbarContainer}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <img
          onClick={() => {
            history.push("/")
          }}
          className={styles.logo}
          src={bafLogo}
          alt="Dąbrowa Górnicza kalkulator BAF"
        />
      </motion.div>
    </div>
  )
}

export default Navbar
