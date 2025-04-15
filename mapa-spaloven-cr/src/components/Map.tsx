"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  width?: string;
  height?: string;
}

export default function Map({
  initialCenter = [15.474, 49.803], // výchozí střed - ČR
  initialZoom = 7,
  width = "100%",
  height = "100vh",
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    if (map.current) return;
    
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: initialCenter,
      zoom: initialZoom,
    });
    
    // Přidání ovládacích prvků
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initialCenter, initialZoom]);

  return (
    <div 
      ref={mapContainer} 
      style={{ width, height }} 
      className="map-container"
    />
  );
}