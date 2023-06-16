import Map from "./components/Map"
import styles from './Calculator.module.scss'

function Calculator(props){
    return(
        <div className={styles.calculatorContainer}>
            <Map/>
        </div>
    )
}

export default Calculator