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
