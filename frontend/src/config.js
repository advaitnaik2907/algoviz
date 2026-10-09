// =========================================================
// API CONFIGURATION
// The backend address comes from the VITE_API_URL setting.
//
//   Local development : set in frontend/.env
//   Production        : set in the Vercel / Docker settings
// =========================================================

const rawUrl = import.meta.env.VITE_API_URL;

// During `npm run dev`, fall back to the local backend if .env is missing.
// In a production build there is NO fallback, so a missing setting
// is easy to notice instead of silently calling localhost.
const fallback = import.meta.env.DEV ? "http://localhost:8080" : "";

// Remove a trailing slash so "https://x.com/" + "/api" never becomes "//api"
export const API_BASE_URL = (rawUrl || fallback).replace(/\/+$/, "");
