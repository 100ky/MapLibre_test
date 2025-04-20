"use client";
// Import potřebných hooků z Reactu a knihovny MapLibre
import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Typ pro props komponenty Map
// center: výchozí střed mapy [délka, šířka]
// zoom: výchozí úroveň přiblížení
// style: volitelné CSS styly kontejneru mapy
type MapProps = {
  center?: [number, number];
  zoom?: number;
  style?: React.CSSProperties;
};

export default function Map({ center = [15.474, 49.803], zoom = 7, style }: MapProps) {
  // Ref na DOM element, do kterého se vykreslí mapa
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pokud není k dispozici kontejner, nic nedělej
    if (!mapContainer.current) return;
    // Inicializace nové instance mapy
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
    // Přidání ovládacích prvků (zoom, kompas)
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Přidání GeoJSON zdroje s body spaloven
      map.addSource("incinerators", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            // Každý bod reprezentuje jednu spalovnu
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
      // Přidání vrstvy pro vykreslení bodů spaloven
      map.addLayer({
        id: "incinerators",
        type: "circle",
        source: "incinerators",
        paint: { "circle-radius": 8, "circle-color": "#E03131" },
      });

      // Vytvoření instance popupu pro zobrazení informací
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // Zobrazení popupu při najetí myší na bod spalovny
      map.on("mouseenter", "incinerators", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        if (!feature) return;
        const coordinates = feature.geometry.coordinates.slice();
        const name = feature.properties?.name || "Neznámá spalovna";
        // Nastavení a zobrazení popupu
        popup
          .setLngLat(coordinates)
          .setHTML(`<strong>${name}</strong>`)
          .addTo(map);
      });

      // Skrytí popupu při opuštění bodu
      map.on("mouseleave", "incinerators", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    // Úklid při odpojení komponenty
    return () => map.remove();
  }, [center, zoom]);

  // Vykreslení kontejneru pro mapu
  return <div ref={mapContainer} style={{ width: "100%", height: "80vh", ...style }} />;
}
// Konec souboru Map.tsx