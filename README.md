# Lockdown Casino 🎰

**Development Time:**  3.5-4 hours

## Quick Start 

1. Clone the repository 
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features

### Core Gameplay
- **3-Slot Machine** with 4 symbols (Cherry, Lemon, Orange, Watermelon)
- **Real-time spinning animation** with staggered reveal (1s, 2s, 3s)
- **Dynamic prize system** based on winning combinations
- **Server-side game logic** with anti-cheat mechanisms

### Financial Management
- **Dual Credit System**
  - Playable credits for active gaming
  - Vault credits for safe storage
- **Cash In/Cash Out** functionality with transaction protection according to the home task
- **Game-lock mechanism** preventing balance manipulation during active spins
- **Immediate cost deduction** (-1 credit on spin start, not at end) 

### Anti-Cheat System
- **Threshold-based re-rolling** on server side:
  - 40-60 credits: 30% chance to re-roll winning combinations
  - 60+ credits: 60% chance to re-roll winning combinations
- **Balance validation** during gameplay

### UX Features
- **Smart button states** ("Cash In to Play", "Add Credits to Play")
- **Contextual modals** suggesting appropriate actions using web api for consistency in all browsers
- **Persistent state** using Zustand with local storage
- **Responsive design** with modern gradient UI

## Tech Stack
- **Next.js 15** - Full-stack React framework
- **React 19**
- **TypeScript** - Type safety
- **Zustand** - Lightweight state management with persistence
- **TanStack Query** - Server state management and data fetching
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Custom Properties** - Dynamic theming
- **Zod** - Runtime type validation for API requests
- **seedrandom** - Deterministic random number generation 

## Project Structure 

```
src/
├── app/
│   ├── (main)/       # Main game page
│   └── api/play/     # Slot machine API endpoint
├── components/       # React components (Game, RollingSlot, RollingControls)
├── stores/           # Zustand state management
├── services/         # API client services
├── libs/             # Core game logic (SlotsGame class)
├── schemas/          # Zod validation schemas
├── types/            # TypeScript type definitions
├── constants/        # Game configuration (prizes, thresholds)
└── utils/            # Helper functions
```

## Development Challenges

### 1. **Balance Timing & State Synchronization**
- **Challenge:** Credits management during spin
- **Solution:** Implemented game-lock mechanism with `isGameInProgress` flag to prevent race conditions

### 2. **Cash In/Out During Active Games**
- **Challenge:** Users could manipulate balance mid-game by cashing in/out during spin
- **Solution:** Added transaction locks that check `isGameInProgress` before allowing any balance changes

### 3 **Animations**
- **Challenge:** Make animation look good for a better UX 
- **Solution:** Adding custom CSS styles in globals.css



## Best Practices Implemented

### Architecture
- **Separation of Concerns:** Game logic isolated in `SlotsGame` class, separate from UI
- **API Route Handlers:** Server-side validation and game state management
- **Type Safety:** Full TypeScript coverage with Zod runtime validation

### State Management
- **Immutable Updates:** Zustand setter functions using functional updates
- **Selective Persistence:** Only persisting necessary state (credits, vaultCredits)
- **Optimistic UI Updates:** Immediate visual feedback with backend validation

### Code Quality
- **Custom Hooks:** Reusable logic with `useCallback` and `useEffect`
- **Dependency Arrays:** Proper hook dependencies to prevent stale closures
- **Component Composition:** Small, focused components with clear responsibilities

### User Experience
- **Immediate Feedback:** Credits deduct instantly on spin
- **Clear Visual States:** Button text reflects exact user context
- **Error Prevention:** Disabled states prevent invalid actions
- **Persistent Experience:** State survives page refreshes



## Areas for improvements

- **Styling system update** - use SCSS to provide mixins and stable colors
- **Styling consistency** - Integrate required plugins to provide complex styles solutions
- **Solutions choice** - Some of the solutions can be improved to provide consistency 
