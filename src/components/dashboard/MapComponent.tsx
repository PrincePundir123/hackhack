"use client";

import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// Note: MapLibre uses [longitude, latitude]
const iotScales = [
  { pos: [77.4126, 23.2599] as [number, number], weight: "145 kg", node: "Node #01" },
  { pos: [77.7360, 22.9868] as [number, number], weight: "89 kg", node: "Node #02" },
  { pos: [77.1126, 23.5599] as [number, number], weight: "210 kg", node: "Node #03" },
  { pos: [78.0126, 24.1599] as [number, number], weight: "45 kg", node: "Node #04" },
  { pos: [76.8126, 22.5599] as [number, number], weight: "12 kg", node: "Node #05" },
];

const fireRisks = [
  { pos: [77.9126, 23.8599] as [number, number], intensity: "High" },
  { pos: [77.0126, 22.1599] as [number, number], intensity: "Critical" },
];

export default function MapComponent() {
  const mapTilerKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

  if (!mapTilerKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/10">
        <p className="text-foreground/50 text-sm">Missing NEXT_PUBLIC_MAPTILER_KEY</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group bg-[#0e131f]">
      <Map
        initialViewState={{
          longitude: 77.4126,
          latitude: 23.2599,
          zoom: 5.5,
          pitch: 45, // Add a slight 3D pitch for a premium look
          bearing: 0
        }}
        mapStyle={`https://api.maptiler.com/maps/darkmatter/style.json?key=${mapTilerKey}`}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {/* IoT Scale Markers */}
        {iotScales.map((scale, i) => (
          <Marker key={`iot-${i}`} longitude={scale.pos[0]} latitude={scale.pos[1]} anchor="center">
            <div className="relative flex items-center justify-center group/marker cursor-pointer">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] border-2 border-background z-10 transition-transform group-hover/marker:scale-125" />
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-3 opacity-0 group-hover/marker:opacity-100 transition-all group-hover/marker:translate-y-0 translate-y-2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-xs whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                <span className="font-bold text-white block mb-0.5">{scale.node}</span>
                <span className="text-emerald-400 font-medium">Yield: {scale.weight}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80" />
              </div>
            </div>
          </Marker>
        ))}

        {/* Fire Risk Markers */}
        {fireRisks.map((risk, i) => (
          <Marker key={`fire-${i}`} longitude={risk.pos[0]} latitude={risk.pos[1]} anchor="center">
            <div className="relative flex items-center justify-center group/marker cursor-pointer">
              {/* Radar Ping Animation */}
              <div className="absolute w-12 h-12 bg-red-500/30 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)] border-2 border-background z-10" />
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-3 opacity-0 group-hover/marker:opacity-100 transition-all group-hover/marker:translate-y-0 translate-y-2 bg-black/80 backdrop-blur-md border border-red-500/30 px-3 py-2 rounded-xl text-xs whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-bold text-red-500 block">Fire Alert</span>
                </div>
                <span className="text-white/80 font-medium text-[10px] uppercase tracking-wider">{risk.intensity} RISK ZONE</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80" />
              </div>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
