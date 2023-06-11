import React, { useEffect, useRef } from "react";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import Cookies from "js-cookie";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Modal } from "react-bootstrap";

const KomponentaMape = ({
  vozacId,
  turaId,
  ponudjenaTuraId,
  pocetnaGS,
  pocetnaGD,
  krajnjaGS,
  krajnjaGD,
  setObrisano,
  mapa,
  setMapa,
}) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [auta, setAuta] = useState([]);
  const [auto, setAuto] = useState(null);

  const [stringGreska, setStringGreska] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const mapRef = useRef(null);
  const map = useRef(null);
  const routingControl = useRef(null);
  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  useEffect(() => {
    if (
      pocetnaGS !== null &&
      pocetnaGD !== null &&
      krajnjaGS !== null &&
      krajnjaGD !== null
    ) {
      if (!map.current) {
        map.current = L.map(mapRef.current).setView([0, 0], 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }).addTo(map.current);
      }

      if (routingControl.current) {
        routingControl.current.getPlan().setWaypoints([]);
        map.current.removeControl(routingControl.current);
      }

      const startMarker = L.marker([pocetnaGS, pocetnaGD]);
      const endMarker = L.marker([krajnjaGS, krajnjaGD]);

      const waypoints = [
        L.latLng(pocetnaGS, pocetnaGD),
        L.latLng(krajnjaGS, krajnjaGD),
      ];

      startMarker.addTo(map.current);
      endMarker.addTo(map.current);

      routingControl.current = L.Routing.control({
        waypoints,
        lineOptions: {
          styles: [{ color: "#7c3aed", opacity: 0.6, weight: 4 }],
        },
        routeWhileDragging: true,
        createMarker: (i, waypoint, n) => {
          // Kreiranje ikone za waypoint
          return L.marker(waypoint.latLng, {
            icon: customMarkerIcon,
          });
        },
      }).addTo(map.current);

      const bounds = L.latLngBounds(
        L.latLng(pocetnaGS, pocetnaGD),
        L.latLng(krajnjaGS, krajnjaGD)
      );
      map.current.fitBounds(bounds);
    }

    return () => {
      if (routingControl.current) {
        routingControl.current.getPlan().setWaypoints([]);
        map.current.removeControl(routingControl.current);
      }

      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [pocetnaGS, pocetnaGD, krajnjaGS, krajnjaGD]);
  useEffect(() => {
    axios.get(`/Vozilo/GetVozilo/${vozacId}`, config).then((response) => {
      setAuta(response.data);
    });
  }, []);
  const handlePrihvati = () => {
    if (auto !== null) {
      try {
        axios
          .post(`Tura/AddPrihvacenaTura/${ponudjenaTuraId}/${auto}`, config)
          .then((response) => {});
        axios
          .delete(`Tura/DeletePonudjenaTura/${turaId}/${vozacId}`, config)
          .then((response) => {
            setObrisano(true);
            setMapa(!mapa);
          });
      } catch (err) {
        setStringGreska(err.message);
        setShowAlert(true);
      }
    } else {
      setStringGreska("Niste izabrali auto.");
      setShowAlert(true);
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

      <div className="w-2/3 flex flex-col justify-center items-center">
        <div
          className="mt-5 border border-black"
          ref={mapRef}
          style={{ width: "400px", height: "400px" }}
        ></div>
        <div>
          {auta.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <select
                onChange={(e) => setAuto(e.target.value)}
                id="TipPrikolice"
              >
                <option value="default">Izaberi auto</option>
                {auta.map((aut) => (
                  <option key={aut.id} value={aut.id}>
                    {aut.marka} {aut.model} {aut.tablice}
                  </option>
                ))}
              </select>
              <button className="btn-prim" onClick={handlePrihvati}>
                Prihvati Turu
              </button>
            </div>
          ) : (
            "Ovaj vozac ne poseduje vozila"
          )}
        </div>
      </div>
    </>
  );
};

export default KomponentaMape;
