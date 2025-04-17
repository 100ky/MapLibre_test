"use client";

import Map from "../components/Map";

export default function Home() {
  return (
    <main style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ margin: "2rem 0" }}>Jednoduchá prezentace MapLibre</h1>
      <Map />
      <p style={{ marginTop: "1rem" }}>Základní mapa s jedním bodem (Praha).</p>
    </main>
  );
}
