# Implementation notes

## Deviations

- 2026-10-01 (no loopback in prod): plan assumed gastown-pilot made one-off loopback calls; territory: six files each declared their own `API_BASE` defaulting to `localhost:3018`, and the event/agent/convoy hooks poll every 5 s, so a production visitor's browser hit loopback continuously. Centralized `API_BASE` + `fetchOrMock` in `hooks/api.ts` (dev-only default; empty in prod returns the existing mock data without fetching) instead of patching each file's fallback separately.
- 2026-10-01 (no loopback in prod): plan said run the linter; territory: `main` is already not Biome-format-clean and Biome isn't a CI gate here. Fixed only the lint findings this change introduced (template literals) and left formatting untouched to keep the diff minimal.
