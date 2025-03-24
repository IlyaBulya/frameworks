import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Указываем правильный путь
    include: ["**/*.{test,spec}.{ts,tsx,js,jsx}"], // Глобальный поиск тестов
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
