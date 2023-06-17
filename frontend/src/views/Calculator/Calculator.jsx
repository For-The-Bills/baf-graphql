import Map from "./components/Map";
import styles from "./Calculator.module.scss";
import {
  closeInfoModal,
  clearParcelData,
  getParcelByCoordinates,
  selectInfoModal,
  selectParcelData,
  selectParcelLoading,
  getParcelShape,
  selectEditorLoading,
  selectParcelSelected,
} from "../../redux/slices/calcSlice";
import Modal from "../../components/Modal/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import Editor from "./components/Editor";
import Searchbar from "./components/Searchbar";

function Calculator(props) {
  const infoModalState = useSelector(selectInfoModal);
  const parcelData = useSelector(selectParcelData);
  const parcelLoading = useSelector(selectParcelLoading);
  const editorLoading = useSelector(selectEditorLoading);
  const parcelSelected = useSelector(selectParcelSelected);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeInfoModal());
  };

  const handleClearParcel = () => {
    dispatch(clearParcelData());
  };

  const handleConfirmChoice = () => {
    dispatch(getParcelShape({ x: parcelData.x, y: parcelData.y }));
  };

  const confirmationModal = (
    <Modal
      closeModal={handleModalClose}
      title="Czy wybrano odpowiednią działkę?"
      visible={infoModalState}
      height={220}
      noBodyPadding
    >
      <div className={styles.confirmationModalBody}>
        <div className={styles.parcelDataContainer}>
          <div className={styles.parcelRegion}>{parcelData.parcelRegion}</div>
          <div className={styles.parcelNumber}>{parcelData.parcelNumber}</div>
        </div>
        <div className={styles.buttons}>
          <LoadingButton
            onClick={handleConfirmChoice}
            loading={editorLoading}
            color="primary"
            variant="contained"
          >
            TAK
          </LoadingButton>
          <LoadingButton onClick={handleClearParcel} color="secondary">
            WYBIERZ INNĄ
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className={styles.calculatorContainer}>
      <Map />
      {parcelSelected && <Editor />}
      {!parcelSelected && <Searchbar />}
      {confirmationModal}
    </div>
  );
}

export default Calculator;
