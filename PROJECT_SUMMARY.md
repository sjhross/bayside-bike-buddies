# Bayside Bike Buddies - Project Status Report

## 1. Project Overview
"Bayside Bike Buddies" is a web application designed for parents in the Frankston-to-Mordialloc corridor to find and lodge family-friendly bike tracks. It features a split-screen map/list interface and a custom "Family Trail Scale" (0-4) for difficulty ranking.

## 2. Technical Stack
- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v3
- **Mapping**: Leaflet + React Leaflet
- **Icons**: Lucide React
- **Backend (BaaS)**: Supabase (Auth + Database + Storage)

## 3. Core Features Implemented
### Interactive Map
- Centered on the bayside corridor (-38.07, 145.12).
- Markers are color-coded by difficulty level (Green to Red).
- **Hybrid Data Model**: Displays hardcoded "Starter Data" (5 core tracks) merged with User-Generated Content from Supabase.

### Sidebar & Filtering
- Searchable list of tracks.
- Filter chips for difficulty levels.
- "Connection Error" UI handling.
- **About Section**: Modal with project mission, roadmap (coffee features), and contact info.

### Lodging System
- **Authentication**: Google Sign-In via Supabase Auth.
- **Form**: Modal to capture Name, Difficulty, Description, and Photo.
- **Storage**: Photos uploaded to `trail-photos` bucket in Supabase.
- **Database**: Tracks saved to `trails` table in Postgres.

## 4. Key File Structure
- `src/App.jsx`: Main logic. Explicitly merges `starterTrails` with remote Supabase data to ensure visibility. Handles routing (Dashboard) and Auth state.
- `src/components/Map.jsx`: Leaflet map implementation with custom DivIcons.
- `src/components/Sidebar.jsx`: layout for search, filters, and track list.
- `src/components/LodgeTrackModal.jsx`: Form with file upload and auth validation.
- `src/components/AboutModal.jsx`: New component displaying project info and roadmap.
- `src/contexts/AuthContext.jsx`: React Context wrapping Supabase `onAuthStateChange`.
- `src/lib/supabaseClient.js`: Client initialization.

## 5. Deployment / Verification Status
- **Current State**: Running locally on `localhost:5173`.
- **Data State**: Hybrid. Loads 5 hardcoded starter tracks immediately. Merges new remote tracks on successful fetch.
- **Known Issues**: None. All previous state/import issues resolved.

## 6. Environment Variables needed
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
*(Note: Actual keys are in .env.local)*
