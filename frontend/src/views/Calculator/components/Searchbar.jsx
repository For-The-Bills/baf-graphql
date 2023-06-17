import styles from "./Searchbar.module.scss";
import TextField from "@mui/material/TextField";
import classnames from "classnames";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddressCoordinates, getParcelShape, getParcelShapeByName, selectParcelLoading } from "../../../redux/slices/calcSlice";
import { emmitError } from "../../../utils/ToastEmmiter";

function Searchbar(props) {
  const [searchbarValue, setSearchbarValue] = useState("");
  const [selectedType, setSelectedType] = useState(0);
  const parcelLoading = useSelector(selectParcelLoading)
    const dispatch = useDispatch()
  const handleSearchbarChange = (event) => {
    setSearchbarValue(event.target.value);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleSearch = () => {
    if (selectedType == 0) {
        const splitted = searchbarValue.split(',')
        if (splitted.length != 2) {
            return emmitError("Niepoprawny format wyszukiwania")
        }
        const region = splitted[0].trim()
        const number = splitted[1].trim()
        dispatch(getParcelShapeByName({region, number}))
    } else {
        dispatch(getAddressCoordinates({address: searchbarValue}))
    }
  }

  useEffect(() => {
    setSearchbarValue("")
  }, [selectedType]);

  return (
    <div className={styles.searchbarContainer}>
      <div className={styles.types}>
        <div onClick={() => handleTypeChange(0)} className={selectedType == 0 ?classnames(styles.type, styles.active) :styles.type}>
          Obręb i numer działki
        </div>
        <div onClick={() => handleTypeChange(1)} className={selectedType == 1 ?classnames(styles.type, styles.active) :styles.type}>
          Adres
        </div>
      </div>

      <div className={styles.searchbar}>
        <TextField
          onChange={handleSearchbarChange}
          label={selectedType == 0 ? "Obręb, numer działki (oddzielone ',')" : "Adres"}
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          sx={{width: '20rem'}}
          value={searchbarValue}
        />
        <IconButton disabled={parcelLoading} onClick={handleSearch} color="primary">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Searchbar