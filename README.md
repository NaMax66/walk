# Walk

> See a familiar neighborhood differently.

Walk is a mobile-first app for more attentive walks. It uses the user's current location to suggest a short route through familiar surroundings and offers prompts that help them notice details they would normally pass by. After returning, the user can record observations and reflections from the walk.

The project is both a useful portfolio piece and a practical exploration of production-oriented Vue and TypeScript development.

## Core experience

1. The user opens the app and grants access to their location.
2. They choose a walk duration or accept a suggested option.
3. The app finds several suitable public places nearby and builds a walking route.
4. It creates a small theme or set of observation prompts for the route.
5. During the walk, the app requires as little screen interaction as possible.
6. After returning, the user records what they noticed and saves the walk.

## Product intent

Walk should not turn going outside into another task list or another reason to stare at a screen. Its purpose is to provide a gentle reason to leave home, direct attention toward the physical world, and help the user build a personal history of familiar places.

The key success criterion is simple: after a walk, the user has noticed or understood something about their neighborhood that they had missed before.

## MVP

- Request the user's current location, with clear pending, denied, and error states.
- Show the user and nearby places on Google Maps.
- Let the user choose basic walk parameters.
- Build a walking route through several waypoints.
- Suggest a theme and observation prompts for the walk.
- Start and complete a walk.
- Capture a short reflection after the user returns.
- Store walk history locally.
- Provide a responsive, mobile-first interface.

Purchases, social features, ratings, and complex gamification are outside the MVP scope.

## The role of Gemini

Gemini does not calculate the geographically valid route. Map data and routing remain the responsibility of Google Maps Platform.

Gemini receives a constrained set of nearby places and the context of the walk. It can then:

- suggest a theme or mood for the walk;
- choose a meaningful combination of places;
- write short observation prompts;
- suggest reflection questions for when the user returns.

The core experience must also work without Gemini. A deterministic fallback remains available when the API is unavailable or returns an unusable response.

## Technical focus

- Vue 3 and the Composition API
- TypeScript
- Vue Router
- Pinia
- Google Maps, Places, and Routes APIs
- Gemini API behind a secure server-side boundary
- Browser Geolocation and Permissions APIs
- Vitest for unit tests
- Playwright for end-to-end scenarios, geolocation, and permission states
- ESLint, Oxlint, and Prettier
- PWA capabilities and mobile UX after the core flow is stable

## Roadmap

1. Create the application shell and first screen.
2. Model geolocation as an isolated, typed capability.
3. Add the map and display the current position.
4. Discover suitable places nearby.
5. Build a walking route.
6. Model an active walk.
7. Add completion and reflection.
8. Persist walk history.
9. Integrate Gemini with validation and fallbacks.
10. Add PWA capabilities, polish the UX, and complete end-to-end coverage.

Each milestone should produce a small working vertical slice rather than infrastructure that only becomes useful later.

## Initial constraints

- Walking routes only
- Routes start from the current location
- Short walks through familiar neighborhoods
- Publicly accessible places only
- No purchases or required paid activities
- No custom route-optimization algorithm

## Development principles

- Model the domain explicitly before building the UI around it.
- Treat loading, denied permissions, and external API failures as product states.
- Isolate external services behind typed application interfaces.
- Use Gemini for suggestions, never as a single point of failure.
- Let the map help the user leave the screen rather than keep them on it.
- Record important technical decisions together with the reasoning behind them.

## Getting started

```sh
npm install
npm run dev
```

Project checks:

```sh
npm run type-check
npm run lint
npm run test:unit
npm run test:e2e
npm run build
```
