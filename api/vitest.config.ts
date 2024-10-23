import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./src/tests/setupTests.ts", // Assure-toi que ce fichier existe et est correctement configuré
  },
});
