import { useDispatch, useSelector } from "react-redux";
import {
  openAdditionModal,
  selectEditorData,
  closeAdditionModal,
  selectParcelData,
  selectSurfaces,
  selectAdditionModalState,
  addNewLayer,
  completeLayer,
  selectCurrentlySelectedLayerIndex,
  selectIndicators,
  clearParcelData,
  redoMarker,
} from "../../../redux/slices/calcSlice";
import styles from "./Editor.module.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Layer from "./Layer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CloseIcon from "@mui/icons-material/Close";
import variables from "../../../assets/variables.scss";
import UndoIcon from "@mui/icons-material/Undo";

function Editor(props) {
  const editorData = useSelector(selectEditorData);
  const parcelData = useSelector(selectParcelData);
  const additionModalState = useSelector(selectAdditionModalState);
  const indicators = useSelector(selectIndicators);
  const surfaces = useSelector(selectSurfaces);
  const dispatch = useDispatch();
  const currentSelectionIndex = useSelector(selectCurrentlySelectedLayerIndex);

  const [localBAF, setLocalBAF] = useState(0);

  const [localSurfaceSelection, setLocalSurfaceSeletion] = useState(
    Object.keys(surfaces).length > 0 ? Object.keys(surfaces)[0] : ""
  );
  const [localSurfaceOwnName, setLocalSurfaceOwnName] = useState("");

  const [localIndicatorSelection, setLocalIndicatorSelection] = useState(
    Object.keys(indicators).length > 0 ? Object.keys(indicators)[0] : ""
  );

    const handleRedoMarker = () => {
        dispatch(redoMarker())
    }

  const handleModalOpen = () => {
    dispatch(openAdditionModal());
  };

  const handleOwnNameChange = (event) => {
    setLocalSurfaceOwnName(event.target.value);
  };

  const handleModalClose = () => {
    dispatch(closeAdditionModal());
  };

  useEffect(() => {
    setLocalSurfaceOwnName("");
  }, [additionModalState]);

  const handleAddLayer = () => {
    dispatch(
      addNewLayer({
        polygon: [],
        surfaceType: localSurfaceSelection,
        color: surfaces[localSurfaceSelection].color,
        ownName: localSurfaceOwnName,
      })
    );
  };

  const handleDeselectParcel = () => {
    dispatch(clearParcelData());
  };

  const handleSelectChange = (event) => {
    console.log(event.target);
    setLocalSurfaceSeletion(event.target.value);
  };

  const handleIndicatorChange = (event) => {
    setLocalIndicatorSelection(event.target.value);
  };

  useEffect(() => {
    let outcome_baf = 0;
    editorData.layers.forEach((layer) => {
      const multiplier = surfaces[layer.surfaceType].value;
      outcome_baf += layer.area * multiplier;
    });
    const baf_i = parseFloat((outcome_baf/editorData.area).toFixed(2))
    setLocalBAF(baf_i);
  }, [localSurfaceSelection, editorData.layers]);

  const additionModal = (
    <Modal
      closeModal={handleModalClose}
      title="Stwórz nową warstwę"
      visible={additionModalState}
      height={370}
      noBodyPadding
    >
      <div className={styles.additionModalBody}>
        <div className={styles.inputs}>
          <div className={styles.surfaceTypeSelection}>
            <div
              style={{
                backgroundColor: `${
                  surfaces[localSurfaceSelection]
                    ? surfaces[localSurfaceSelection].color
                    : ""
                }`,
              }}
              className={styles.currentColorContainer}
            ></div>
            <FormControl fullWidth>
              <InputLabel>Rodzaj powierzchni</InputLabel>
              <Select
                sx={{ width: "20rem" }}
                label="Rodzaj powierzchni"
                value={localSurfaceSelection}
                onChange={handleSelectChange}
              >
                {Object.keys(surfaces).map((key) => (
                  <MenuItem value={key}>{surfaces[key].name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.surfaceOwnName}>
            <TextField
              onChange={handleOwnNameChange}
              fullWidth
              label="Nazwa własna powierzchni"
              variant="outlined"
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <LoadingButton
            onClick={handleAddLayer}
            color="primary"
            variant="contained"
          >
            Dodaj
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={handleModalClose}
            color="light"
          >
            Anuluj
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className={styles.editorContainer}>
      {currentSelectionIndex != -1 && editorData.layers[currentSelectionIndex] && editorData.layers[currentSelectionIndex].polygon.length > 0 && (
        <div onClick={handleRedoMarker} className={styles.redoButton}>
          <UndoIcon />
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.intro}>
          Wybrana działka
          <IconButton onClick={handleDeselectParcel}>
            <CloseIcon color="light" fontSize="inherit" />
          </IconButton>
        </div>
        <div className={styles.parcelInfo}>
          <div className={styles.parcelRegion}>{parcelData.parcelRegion}</div>
          <div className={styles.parcelNumber}>{parcelData.parcelNumber}</div>
        </div>
      </div>

      <div className={styles.layers}>
        <div className={styles.buttons}>
          <LoadingButton
            onClick={handleModalOpen}
            startIcon={<AddIcon />}
            fullWidth
            color="primary"
            variant="contained"
            disabled={currentSelectionIndex != -1}
          >
            Dodaj warstwę
          </LoadingButton>
        </div>

        <div className={styles.items}>
          {editorData.layers.map((layer, index) => (
            <Layer key={index} index={index} layer={layer} />
          ))}
        </div>

        <div className={styles.calc}>
          <div className={styles.type}>
            <FormControl>
              <InputLabel>Rodzaj zabudowy</InputLabel>
              <Select
                sx={{ width: "20rem" }}
                label="Rodzaj zabudowy"
                value={localIndicatorSelection}
                onChange={handleIndicatorChange}
                className={styles.select}
              >
                {Object.keys(indicators).map((key) => (
                  <MenuItem value={key}>{key}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div
            style={{
              backgroundColor:
                localBAF >
                (indicators[localIndicatorSelection]
                  ? indicators[localIndicatorSelection]
                  : 0)
                  ? variables.green
                  : variables.light_red,
            }}
            className={styles.calcHeader}
          >
            Wskaźnik BAF
          </div>
          <div className={styles.outcome}>
            <div className={styles.left}>{localBAF ? localBAF : 0}</div>
            <div className={styles.divider}>
              {indicators[localIndicatorSelection] ? (
                indicators[localIndicatorSelection] > localBAF ? (
                  <KeyboardArrowLeftIcon sx={{ fontSize: 34 }} />
                ) : (
                  <KeyboardArrowRightIcon sx={{ fontSize: 34 }} />
                )
              ) : (
                ""
              )}
            </div>
            <div className={styles.right}>
              {indicators[localIndicatorSelection]
                ? indicators[localIndicatorSelection]
                : ""}
            </div>
          </div>
        </div>
      </div>

      {additionModal}
    </div>
  );
}

export default Editor;
