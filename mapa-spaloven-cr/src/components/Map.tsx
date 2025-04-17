"use client";
import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapProps = {
  center?: [number, number];
  zoom?: number;
  style?: React.CSSProperties;
};

export default function Map({ center = [15.474, 49.803], zoom = 7, style }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new maplibregl.Map({
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
      center,
      zoom,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Ukázkový bod (Praha)
      map.addSource("incinerators", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [14.42076, 50.08804] },
              properties: { name: "ZEVO Malešice" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [16.6078, 49.1952] },
              properties: { name: "SAKO Brno" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [15.0544, 50.7600] },
              properties: { name: "TERMIZO Liberec" },
            },
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [13.2313, 49.8025] },
              properties: { name: "ZEVO Chotíkov" },
            }
          ]
        },
      });
      map.addLayer({
        id: "incinerators",
        type: "circle",
        source: "incinerators",
        paint: { "circle-radius": 8, "circle-color": "#E03131" },
      });
    });

    return () => map.remove();
  }, [center, zoom]);

  return <div ref={mapContainer} style={{ width: "100%", height: "80vh", ...style }} />;
}