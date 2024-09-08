import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCites } from "../contexts/cityContext";
import { useGeolocation } from "../Hooks/UseGeoloaction";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

function Map() {
  const [mapPosition, setmapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoloactionPosition,
    getPosition,
  } = useGeolocation();

  const [maplat, maplng] = useUrlPosition();

  const { cities } = useCites();
  useEffect(
    function () {
      if (maplat && maplng) setmapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );
  useEffect(
    function () {
      if (geoloactionPosition)
        setmapPosition([geoloactionPosition.lat, geoloactionPosition.lng]);
    },
    [geoloactionPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoloactionPosition && (
        <Button type="position" OnClick={() => getPosition()}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[maplat, maplng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position); //changing the centre property from the map
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
