import { useSelector } from 'react-redux'
import { selectEditorData, selectParcelData } from '../../../redux/slices/calcSlice'
import styles from './Editor.module.scss'

function Editor(props) {
    const editorData = useSelector(selectEditorData)
    const parcelData = useSelector(selectParcelData)

    return (
        <div className={styles.editorContainer}>
            <div className={styles.header}>
                <div className={styles.intro}>
                    Wybrana działka
                </div>
                <div className={styles.parcelInfo}>
                    <div className={styles.parcelRegion}>
                        {parcelData.parcelRegion}
                    </div>
                    <div className={styles.parcelNumber}>
                        {parcelData.parcelNumber}
                    </div>
                </div>
            </div>

            <div className={styles.layers}>

                <div className={styles.buttons}>
                    
                </div>

                <div className={styles.items}>
                ..warstwy
                </div>

            


            </div>
        </div>
    )
}


export default Editor