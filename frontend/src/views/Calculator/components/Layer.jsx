import { useSelector } from "react-redux"
import { selectCurrentlySelectedLayerIndex } from "../../../redux/slices/calcSlice"
import styles from "./Layer.module.scss"
import { Button } from "@mui/base"
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

function Layer(props) {
    const currentlySelectedLayerIndex = useSelector(selectCurrentlySelectedLayerIndex)
    const {surfaceType, color, ownName} = props.layer
    const ownIndex = props.index

    return (
        <div className={styles.layerHolder}>
            <div className={styles.info}>
            <div className={styles.type}>
                <div className={styles.color} style={{backgroundColor: color}}></div>
                <div className={styles.name}>{surfaceType}</div>
            </div>
            <div className={styles.ownName}>
                {ownName}
            </div>
            </div>
            {ownIndex == currentlySelectedLayerIndex && 
            <div className={styles.buttons}>
                <IconButton color='primary'>
                    <CheckIcon />
                </IconButton>
                <IconButton color='red'>
                    <DeleteIcon />
                </IconButton>
            </div> }
        </div>
    )
}


export default Layer