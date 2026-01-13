# Cerefold MindFlux EEG Platform Website

![Cerefold](https://img.shields.io/badge/Cerefold-MindFlux-00a8ff)
![React](https://img.shields.io/badge/React-18-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Anime.js](https://img.shields.io/badge/Anime.js-3.2.2-ff69b4)

## Overview

A stunning, sci-fi neural-themed marketing website for Cerefold's MindFlux EEG Platform - next-generation neural interface technology for brain-computer interaction.

### Features

- 🧠 **Animated Neural Network** - Living, breathing canvas background with pulsing nodes and traveling particles
- 🌊 **Real-time Brainwave Visualizations** - Animated Delta, Theta, Alpha, Beta, Gamma waveforms
- 🌙 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design with hamburger menu
- ✨ **Smooth Animations** - Powered by Anime.js for scroll-triggered reveals and continuous effects
- 🔮 **Glassmorphism UI** - Modern backdrop-blur effects on navigation and cards

### Sections

1. **Hero** - Neural network background, headline, CTAs, stats
2. **The Problem** - Animated brain with highlighted regions
3. **MindFlux Product** - 3D EEG headset with orbiting feature cards
4. **Neural Signatures** - 5 brainwave types with live canvas animations
5. **Applications** - 6 use case cards with gradient icons
6. **Technology Architecture** - 3-layer stack with data flow particles
7. **Dashboard Preview** - Live waveforms, metrics, brain heat map
8. **Contact/Early Access** - Validated form with success animation
9. **Footer** - Links, social icons, legal

## Tech Stack

- **React** 18.x
- **Tailwind CSS** 3.x
- **Anime.js** 3.2.2
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MistyBlaze/cerefold.git
cd cerefold/frontend

# Install dependencies
yarn install

# Start development server
yarn start
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
yarn build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── sections/         # Page sections
│   │   │   ├── Navigation.js
│   │   │   ├── Hero.js
│   │   │   ├── Problem.js
│   │   │   ├── MindFluxProduct.js
│   │   │   ├── NeuralSignatures.js
│   │   │   ├── Applications.js
│   │   │   ├── TechnologyArchitecture.js
│   │   │   ├── DashboardPreview.js
│   │   │   ├── Contact.js
│   │   │   └── Footer.js
│   │   └── ui/               # Shadcn UI components
│   ├── hooks/                # Custom React hooks
│   │   ├── useTheme.js
│   │   ├── useIntersection.js
│   │   └── useScrollPosition.js
│   ├── utils/                # Utility functions
│   │   └── brainwaveData.js
│   ├── App.js
│   ├── App.css
│   └── index.css
└── public/
    └── index.html
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#050508` | Primary background |
| Neural Blue | `#00a8ff` | Primary accent |
| Synapse Purple | `#8b5cf6` | Secondary accent |
| Bio Green | `#00ff88` | Success states |
| Warm Neural | `#f472b6` | Tertiary accent |

### Brainwave Colors

- Delta: `#1e3a8a` (0.5-4 Hz)
- Theta: `#7c3aed` (4-8 Hz)
- Alpha: `#06b6d4` (8-12 Hz)
- Beta: `#22c55e` (12-30 Hz)
- Gamma: `#eab308` (30-100 Hz)

## License

© 2025 Cerefold. All rights reserved.

## About Cerefold

Building technology that reveals the hidden language of the brain. Neural interface technology for next-generation brain-computer interaction.

Part of the IIT Kanpur research ecosystem.

---

Built with ❤️ using React, Tailwind CSS, and Anime.js
