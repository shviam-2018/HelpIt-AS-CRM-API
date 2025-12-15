# HelpIt CRM Frontend

A small Vite + React UI with sidebar navigation and six pages: Dashboard, Create Case, Search Case, Display Cases, Update Case, and Delete Case.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Routing
- Uses `react-router-dom` with routes for each operation.
- The dashboard shows a compact grid with multiple widgets.

## Styling
- Shared two-column form grid (`.field-grid`) collapses to one column under 840px.
- Theme uses CSS variables with `@media (prefers-color-scheme: dark)`.
- Font: Inter (via Google Fonts) with system fallbacks.

## API endpoints
- Expects a backend on `http://localhost:3000/api/v1/cases`.
- Update `baseUrl` constants in components if your port/route changes.
