import { useDispatch, useSelector } from "react-redux"
import { completeLayer, removeLayer, selectCurrentlySelectedLayerIndex } from "../../../redux/slices/calcSlice"
import styles from "./Layer.module.scss"
import { Button } from "@mui/base"
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

function Layer(props) {
    const currentlySelectedLayerIndex = useSelector(selectCurrentlySelectedLayerIndex)
    const {surfaceType, color, ownName, area} = props.layer
    const ownIndex = props.index
    const dispatch = useDispatch()

    const handleCompleteLayer = () => {
        dispatch(completeLayer())
      }
    
      const handleDeleteLayer = () => {
        dispatch(removeLayer(ownIndex))
      }

    return (
        <div className={styles.layerHolder}>
            <div className={styles.info}>
            <div className={styles.type}>
                <div className={styles.color} style={{backgroundColor: color}}></div>
                <div className={styles.name}>{surfaceType}</div>
            </div>
            <div className={styles.additional}>

            {area &&
            <div className={styles.area}>
                {area}{' '} m<sup>2</sup>
            </div> }
            {ownName != '' && 
            <div className={styles.ownName}>
                {ownName}
            </div> }
            </div>
            </div>
            
            <div className={styles.buttons}>
            {ownIndex == currentlySelectedLayerIndex && 
                <IconButton onClick={handleCompleteLayer} color='primary'>
                    <CheckIcon />
                </IconButton> }
                <IconButton onClick={handleDeleteLayer} color='red'>
                    <DeleteIcon />
                </IconButton>
            </div> 
        </div>
    )
}


export default Layer