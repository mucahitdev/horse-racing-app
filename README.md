# 🐎 Horse Racing Game

An interactive horse racing game built with Vue.js, featuring real-time animations and race management.

## 🚀 Live Demo

[horserace.mucahitk.com](https://horserace.mucahitk.com)

## ✨ Features

- **Horse Management**: Generate 20 unique horses with random names, colors, and condition scores
- **Race Schedule**: Create 6 rounds with different distances (1200m - 2200m)
- **Real-time Animation**: Watch horses race with Lottie animations
- **Race Results**: Track results for each completed round
- **Pause/Resume**: Control race progress with pause and resume functionality
- **Auto-scroll**: Automatic scrolling to current round in program and latest results

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vuex** - State management
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lottie Web** - Animations
- **Shadcn UI** - UI components

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎮 How to Play

1. Click **"Generate Program"** to create 20 horses and a 6-round race schedule
2. Click **"Start"** to begin the race
3. Watch horses race in real-time with animations
4. View results as each round completes
5. Use **"Pause"** to pause the race and **"Resume"** to continue

## 🧪 Testing

### Unit Tests

Unit tests are written with Vitest and cover utility functions and Vuex store:

```bash
# Run unit tests
pnpm test

# Run with UI
pnpm test:ui

# Run with coverage
pnpm test:coverage
```

**Test Coverage:**
- Utility functions (colorUtils, schedule, animation, raceCalculator, horseGenerator)
- Vuex store (mutations, getters, actions)
- **Total: 50 unit tests**

### E2E Tests

E2E tests are written with Playwright and cover complete user flows:

```bash
# Run E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run in headed mode (browser visible)
pnpm test:e2e:headed
```

**Test Coverage:**
- Initial empty state
- Generate program and display horses
- Start race and pause/resume
- Complete race rounds and show results
- **Total: 7 E2E tests**

## 📁 Project Structure

```
src/
├── components/        # Vue components
│   ├── ui/          # UI components (button, card, table, etc.)
│   └── ...          # Game components
├── store/            # Vuex store (mutations, actions, getters)
├── utils/            # Utility functions
├── constants/        # Constants and configuration
└── assets/           # Static assets
```

## 🏗️ Build

The project is configured for deployment on Vercel. The build process includes:

- TypeScript type checking
- Vite production build
- Optimized assets
