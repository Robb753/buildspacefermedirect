import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    outDir: "dist",
  },
  define: {
    "process.env.VITE_API_URL_SUBSCRIBE": JSON.stringify(
      process.env.VITE_API_URL_SUBSCRIBE
    ),
    "process.env.VITE_API_URL_USERS": JSON.stringify(
      process.env.VITE_API_URL_USERS
    ),
    "process.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(
      process.env.VITE_GOOGLE_MAPS_API_KEY
    ),
    "process.env.VITE_GEOPIFY_API_KEY": JSON.stringify(
      process.env.VITE_GEOPIFY_API_KEY
    ),
  },
});