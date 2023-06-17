import { MapContainer, Polygon, TileLayer, WMSTileLayer } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import styles from "./Map.module.scss";
import { transformCoordinates } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  closeInfoModal,
  clearParcelData,
  getParcelByCoordinates,
  selectInfoModal,
  selectParcelData,
  selectParcelLoading,
  selectMapPositionCenter,
  selectParcelSelected,
  selectEditorData,
} from "../../../redux/slices/calcSlice";
import Modal from "../../../components/Modal/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "../../../components/Loading/Loading";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";

function Map(props) {
  const mapPositionCenter = useSelector(selectMapPositionCenter);
  const editorData = useSelector(selectEditorData);
  const parcelLoading = useSelector(selectParcelLoading);
  const parcelSelected = useSelector(selectParcelData);
  console.log(process.env);
  useEffect(() => {
    if (
      editorData &&
      editorData.max_bounds &&
      parcelSelected &&
      mapRef.current
    ) {
      const formatted_coords = [...mapPositionCenter];
      mapRef.current.setView(formatted_coords, 18);
      console.log(editorData.max_bounds);
      mapRef.current.setMaxBounds(editorData.max_bounds);
    }
  }, [mapPositionCenter]);

  useEffect(() => {
    if (!parcelSelected && mapRef.current) {
      mapRef.current.setMaxBounds(null);
    }
  }, [parcelSelected]);

  const mapRef = useRef(null);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        ref={mapRef}
        className={styles.map}
        center={mapPositionCenter}
        zoom={13}
        maxZoom={22}
        scrollWheelZoom={false}
      >
        <MapComponent mapRef={mapRef} />
      </MapContainer>
      {parcelLoading && <Loading />}
    </div>
  );
}

function MapComponent(props) {
  const dispatch = useDispatch();
  const parcelSelected = useSelector(selectParcelSelected);
  const editorData = useSelector(selectEditorData);
  const mapRef = props.mapRef;

  const handleKeepInBounds = () => {
    if (
      parcelSelected &&
      editorData &&
      editorData.max_bounds &&
      mapRef.current
    ) {
      const currentCenter = mapRef.current.getCenter();
      const newCenter = mapRef.current.getCenter();
      const [minX, minY, maxX, maxY] = editorData.max_bounds;

      if (currentCenter.lng < minX) {
        newCenter.lng = minX;
      } else if (currentCenter.lng > maxX) {
        newCenter.lng = maxX;
      }

      if (currentCenter.lat < minY) {
        newCenter.lat = minY;
      } else if (currentCenter.lat > maxY) {
        newCenter.lat = maxY;
      }

      console.log(currentCenter, newCenter);

      if (!currentCenter.equals(newCenter)) {
        mapRef.current.panTo(newCenter);
      }
    }
  };

  const debouncedKeepInBounds = debounce(handleKeepInBounds, 75);

  const mapEvents = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(e.latlng);
      if (!parcelSelected) dispatch(getParcelByCoordinates({ x: lat, y: lng }));
    },
    drag: () => {
      debouncedKeepInBounds();
    },
  });

  const map = useMap();

  const tms_options = {
    url: "https://mapy.geoportal.gov.pl/wss/ext/OSM/BaseMap/tms/1.0.0/osm_3857/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png",
    tms: true,
    zoomOffset: -1,
    maxZoom: 18,
  };

  const wms_options = {
    layers: "dzialki,numery_dzialek",
    minZoom: 10,
    maxZoom: 22,
    format: "image/png",
    transparent: true,
    url: "https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow",
  };

  const token = process.env.REACT_APP_MAPBOX_TOKEN;

  const satelite_options = {
    // url: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token=${token}`,
    // attribution: "Map data © <a href='https://www.mapbox.com/'>Mapbox</a>",
    // maxZoom: 22,
    // id: "mapbox/satellite-v9",
    // accessToken: "YOUR_MAPBOX_ACCESS_TOKEN",
    // tileSize:512,
    // zoomOffset: -1,
    // boundsOptions:{ noWrap: true }
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maxZoom: 20,
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  };

  return (
    <>
      <TileLayer {...satelite_options} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...tms_options}
      />
      <WMSTileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...wms_options}
      />
      {parcelSelected && editorData && editorData.coords.length > 0 && (
        <Polygon positions={editorData.coords} color="red" fill={false} />
      )}
    </>
  );
}

export default Map;
