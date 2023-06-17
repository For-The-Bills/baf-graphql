import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loading.module.scss'
function Loading(props){
    return(
        <div className={styles.loading}>
            <CircularProgress color='light'/>
        </div>
    )
}

export default Loading