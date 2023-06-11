import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-routing-machine";
import { Modal } from "react-bootstrap";

const Mapa = ({ setPgs, setPgd, setOgs, setOgd, setDuzinaTure }) => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const mapRef = useRef();

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (marker1 && marker2 && typeof L.Routing !== undefined) {
      if (routeControl) {
        routeControl.spliceWaypoints(0, 2);
      }
      const control = L.Routing.control({
        show: false,
        waypoints: [
          L.latLng(marker1[0], marker1[1]),
          L.latLng(marker2[0], marker2[1]),
        ],
        createMarker: function (i, waypoint, n) {
          return null;
        },
        draggableWaypoints: false,
        addWaypoints: false,
        routeWhileDragging: false,
        showAlternatives: false,
        formatter: new L.Routing.Formatter({
          formatInstruction: function (instruction, index) {
            const distance = instruction.distance.toFixed(2);
            const time = instruction.time / 60;
            const customInstruction = `Distance: ${distance} km, Time: ${time} min`;
            setDuzinaTure(distance);
            return customInstruction;
          },
        }),
        lineOptions: {
          styles: [{ color: "#7c3aed", opacity: 1, weight: 4 }],
        },
      });
      control.addTo(mapRef.current);
      setRouteControl(control);

      control.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const route = routes[0];
          const distance = route.summary.totalDistance;
          const distanceInKm = (distance / 1000).toFixed(2);
          setDuzinaTure(distanceInKm);
        }
      });
    }
  }, [marker1, marker2]);

  const handleAddress1Change = (event) => {
    setAddress1(event.target.value);
  };

  const handleAddress2Change = (event) => {
    setAddress2(event.target.value);
  };

  const handleGeocodeAddress = async (address, markerIndex) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const position = [parseFloat(lat), parseFloat(lon)];

        if (!Number.isNaN(position[0]) && !Number.isNaN(position[1])) {
          if (markerIndex === 1) {
            setPgs(parseFloat(lat));
            setPgd(parseFloat(lon));
            setMarker1(position);
            mapRef.current.setView(position);
          } else if (markerIndex === 2) {
            setOgs(parseFloat(lat));
            setOgd(parseFloat(lon));
            setMarker2(position);
            mapRef.current.setView(position);
          }
        } else {
          console.log("Invalid latitude or longitude");
        }
      } else {
        setStringGreska("Addresa nije pronadjena.");
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Error geocoding address:", error);
    }
  };

  const handleGeocodeAddress1 = () => {
    handleGeocodeAddress(address1, 1);
  };

  const handleGeocodeAddress2 = () => {
    handleGeocodeAddress(address2, 2);
  };

  const handleEnterKeyPress1 = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleGeocodeAddress1();
    }
  };

  const handleEnterKeyPress2 = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleGeocodeAddress2();
    }
  };

  const handleClose = () => setShowAlert(false);
  return (
    <>
      <Modal
        show={showAlert}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Greška!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{stringGreska}</Modal.Body>
        <Modal.Footer>
          <button className="btn-prim" onClick={handleClose}>
            Zatvori
          </button>
        </Modal.Footer>
      </Modal>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          placeholder="Pocetna lokacija"
          type="text"
          value={address1}
          onChange={handleAddress1Change}
          onKeyDown={handleEnterKeyPress1}
          required
        />
        <input
          placeholder="Odredisna lokacija"
          type="text"
          value={address2}
          onChange={handleAddress2Change}
          onKeyDown={handleEnterKeyPress2}
          required
        />
      </div>
      <div
        style={{ height: "400px", width: "400px" }}
        className="border border-black mt-2"
      >
        <MapContainer
          center={[51.5, -0.9]}
          zoom={10}
          style={{ height: "100%", width: "100%", display: null }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data © OpenStreetMap contributors"
          />

          {marker1 && (
            <Marker position={marker1} icon={customMarkerIcon}>
              <Popup>Pocetak</Popup>
            </Marker>
          )}
          {marker2 && (
            <Marker position={marker2} icon={customMarkerIcon}>
              <Popup>Odrediste</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default Mapa;
