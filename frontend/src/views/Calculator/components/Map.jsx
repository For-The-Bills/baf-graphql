import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import styles from "./Map.module.scss";
function Map(props) {
  const position = [50.321484, 19.194942];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapComponent />
      </MapContainer>
    </div>
  );
}

function MapComponent() {
  const map = useMapEvents({
    click: (e) => {
      console.log(e);
    },
  });

  const tms_options = {
    url: "https://mapy.geoportal.gov.pl/wss/ext/OSM/BaseMap/tms/1.0.0/osm_3857/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png",
    tms: true,
    zoomOffset: -1,
  };

  const wms_options = {
    layers: "geoportal,dzialki,numery_dzialek,budynki",
    minZoom: 10,
    format: "image/png",
    transparent: true,
    url: "https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow",
  };

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...tms_options}
      />
      <WMSTileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        {...wms_options}
      />{" "}
    </>
  );
}

export default Map;
