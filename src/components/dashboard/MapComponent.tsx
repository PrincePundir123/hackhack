"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const fireRisks = [
  { pos: [30.3165, 78.0322] as [number, number], intensity: "High" },
  { pos: [30.3344, 78.0123] as [number, number], intensity: "Medium" },
];

export default function MapComponent() {
  return (
    <MapContainer 
      center={[30.3200, 78.0200]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {fireRisks.map((risk, i) => (
        <CircleMarker 
          key={i} 
          center={risk.pos} 
          radius={risk.intensity === "High" ? 25 : 15}
          pathOptions={{ 
            fillColor: risk.intensity === "High" ? "#ef4444" : "#f97316", 
            color: risk.intensity === "High" ? "#ef4444" : "#f97316", 
            fillOpacity: 0.4,
            weight: 2
          }}
        >
          <Popup>
            <div className="font-semibold text-sm">Fire Risk: {risk.intensity}</div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
