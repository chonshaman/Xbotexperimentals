# Mobile Trading Application

A high-fidelity mobile trading application built with React, TypeScript, Vite, and Tailwind CSS. Features include synchronized live charts, custom margin sliders, baccarat-style history grids, and comprehensive payout/settlement systems.

## Features

- 🎯 **Dual Trading Modes**: Time Mode (30s/60s countdown) and Price Mode (TP/SL thresholds)
- 📊 **Live Chart Integration**: Real-time price tracking with synchronized states
- 🎮 **Interactive Buttons**: UP/DOWN buttons with 4 states (normal, entry-locked, disabled)
- 💰 **Complete Trading Flow**: Balance validation, entry price capture, WIN/LOSE determination
- 📱 **Fully Responsive**: Optimized for mobile devices (320px - 440px)
- ✨ **Premium UI**: Metallic gradients, glowing effects, smooth CSS animations

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool
- **Tailwind CSS 4.1** - Styling
- **Material UI** - Additional components
- **Recharts** - Chart visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your project

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application component
│   │   └── components/          # React components
│   │       ├── ButtonBlue.tsx
│   │       ├── ButtonRed.tsx
│   │       ├── Header.tsx
│   │       ├── History.tsx
│   │       ├── LiveChart.tsx
│   │       ├── MarginSlider.tsx
│   │       ├── TradingPanel.tsx
│   │       └── WinToast.tsx
│   ├── imports/                 # Imported Figma components
│   ├── styles/                  # Global styles and themes
│   │   ├── index.css
│   │   ├── theme.css
│   │   └── tailwind.css
│   └── main.tsx                 # Application entry point
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## Trading Flow

### UP Button Click:
1. Button enters "entry-locked" state
2. DOWN button becomes disabled
3. Chart shows "Position Opened - UP" (blue)
4. Entry price slides in from right
5. Transitions to "Live Round - UP" after 700ms
6. Countdown starts based on selected mode
7. WIN toast displays when settled
8. Auto-reset after 2 seconds

### DOWN Button Click:
1. Button enters "entry-locked" state
2. UP button becomes disabled
3. Chart shows "Position Opened - DOWN" (red)
4. Entry price slides in from right
5. Transitions to "Live Round - DOWN" after 700ms
6. Countdown starts based on selected mode
7. WIN toast displays when settled
8. Auto-reset after 2 seconds

## Configuration

### Mobile Optimization
The app is optimized for viewport widths between 320px and 440px. Responsive breakpoints:
- Max 375px: Reduced gaps and padding
- Max 340px: Further condensed spacing
- Max 320px: Minimum viable spacing

### Time Modes
- **30 Second**: Quick trades with 30s settlement
- **60 Second**: Standard trades with 60s settlement  
- **Price Mode**: Settles when price hits TP/SL thresholds

## Environment Variables

No environment variables are required for basic functionality. The app uses mock data for demonstration purposes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For issues or questions, please open an issue in the repository.
