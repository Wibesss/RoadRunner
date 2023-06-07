import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import axios from "axios";
import Cookies from "js-cookie";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapeDispecer = ({ vozacId, turaId ,ponudjenaTuraId ,pocetnaGS, pocetnaGD, krajnjaGS, krajnjaGD, setObrisano }) => {
    const config = {
        headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
      };
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
      return( 
        <div className='w-full justify-center'>
          <div className="mt-5 border border-black"ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
        );
}

export default MapeDispecer
