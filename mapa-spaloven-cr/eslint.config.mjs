// Importuje moduly pro práci s cestami a URL
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Získání aktuálního názvu souboru a adresáře
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializace kompatibility pro ESLint konfiguraci
const compat = new FlatCompat({
  baseDirectory: __dirname, // Nastavení základního adresáře
});

// Definice konfigurace ESLint
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Rozšíření pro Next.js a TypeScript
];

export default eslintConfig; // Export konfigurace
