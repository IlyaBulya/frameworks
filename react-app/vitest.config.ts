import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.{test,spec}.{ts,tsx,js,jsx}"], // Глобальный поиск тестов
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
