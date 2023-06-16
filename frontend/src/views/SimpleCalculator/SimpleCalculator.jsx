import Computation from "./components/Computation"
import Selection from "./components/Selection"
import styles from "./SimpleCalculator.module.scss"

function SimpleCalculator(props) {
  return (
    <div className={styles.simpleCalculatorContainer}>
      <Selection />
      <Computation />
    </div>
  )
}

export default SimpleCalculator
