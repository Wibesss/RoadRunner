import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-routing-machine";

const Mapa = ({ setPgs, setPgd, setOgs, setOgd, setDuzinaTure }) => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const mapRef = useRef();

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
          styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
        },
      });
      control.addTo(mapRef.current);
      setRouteControl(control);

      control.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const route = routes[0];
          const distance = route.summary.totalDistance;
          const time = route.summary.totalTime;
          const distanceInKm = (distance / 1000).toFixed(2);

          const timeInMin = Math.round(time / 60);
          setDuzinaTure(distanceInKm);
          console.log("Distance:", distanceInKm, "km");
          console.log("Time:", timeInMin, "min");
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
            console.log("DRUGI MARKER");
            setOgs(parseFloat(lat));
            setOgd(parseFloat(lon));
            setMarker2(position);
            mapRef.current.setView(position);
          }
        } else {
          console.log("Invalid latitude or longitude");
        }
      } else {
        alert("Addresa nije pronadjena");
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
  return (
    <div className="w-1/2 ">
      <div className="grid grid-cols-2 gap-4">
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
        style={{ height: "800px", width: "100%" }}
        className="border border-black"
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
    </div>
  );
};

export default Mapa;
