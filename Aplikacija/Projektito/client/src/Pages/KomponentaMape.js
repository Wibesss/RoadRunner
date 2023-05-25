import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import axios from "axios";
import Cookies from "js-cookie";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const KomponentaMape = ({ vozacId, turaId ,ponudjenaTuraId ,pocetnaGS, pocetnaGD, krajnjaGS, krajnjaGD, setObrisano }) => {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };
  const [auta,setAuta] = useState([]);
  const [auto,setAuto] = useState(null);
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
    if (pocetnaGS !== null && pocetnaGD !== null && krajnjaGS !== null && krajnjaGD !== null) {
      if (!map.current) {
        map.current = L.map(mapRef.current).setView([0, 0], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
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
          styles: [{ color: '#7c3aed', opacity: 0.6, weight: 4 }],
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
  useEffect(()=>{
    axios.get(`/Vozilo/GetVozilo/${vozacId}`, config).then((response) => {
      setAuta(response.data);
    });
  },[])
  const handlePrihvati = () => {
    if(auto!==null)
    {
      try{
        axios.post(`Tura/AddPrihvacenaTura/${ponudjenaTuraId}/${auto}`, config).then((response) => {
        });
        axios.delete(`Tura/DeletePonudjenaTura/${turaId}/${vozacId}`, config).then((response) => {
          setObrisano(true);
        });
       }
       catch(err)
       {
          alert(err.message)
       }
    }
    else{
      alert("Niste izabrali auto");
    }
  }
  return( 
    <div className='w-2/3 justify-center'>
      <div className="mt-5 border border-black"ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      {auta.length>0 ? (
          <div className="flex flex-row gap-4 justify-center mt-5">
              <select onChange={(e) => setAuto(e.target.value)} id="TipPrikolice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="default">
                Izaberi auto
              </option>
                {auta.map((aut) => (
                  <option key={aut.id} value={aut.id} >
                    {aut.marka}  {aut.model}  {aut.tablice}
                  </option>
                ))}
              </select>
              <button className="btn-primary" onClick={handlePrihvati}>
                Prihvati Turu
              </button>
          </div>
          ): "dati vozac ne poseduje auta"
        }
    </div>
    );
};

export default KomponentaMape;