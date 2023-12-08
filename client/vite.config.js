import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://task-backend-uukk.onrender.com",
        secure: false,
        rejectUnauthorized: false,
      },
    },
  },
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
