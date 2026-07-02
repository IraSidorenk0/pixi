# Pixi Slot Machine

A slot machine game built with PixiJS.

## Getting Started

### Prerequisites
- Node.js (npm)

### Installation
```bash
npm install
```

### Running the Project
```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### Building for Production
```bash
npm run build
```

## Project Structure

- `src/main.ts` - Application entry point
- `src/core/GameApp.ts` - Game application setup
- `src/core/GameStore.ts` - State management for game
- `src/views/GameScene.ts` - Main game scene container
- `src/views/components/` - UI components (reels, controls, symbols)
- `src/models/SlotModel.ts` - Slot machine data and logic
- `src/data/slotData.json` - Game configuration and spin data

## Controls

- **SPIN** - Spin the reels
- **+/-** - Increase/decrease bet amount