# Quick Start Guide

Get the Mobile Trading Application running in 3 simple steps!

## 🚀 Fast Setup (2 minutes)

### Step 1: Install Dependencies

Choose your package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### Step 2: Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

### Step 3: Open in Browser

Navigate to: **http://localhost:5173**

Your mobile trading app should now be running! 🎉

## 📱 Testing on Mobile Device

### Option 1: Network Access

1. Find your computer's IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep inet
   
   # On Windows
   ipconfig
   ```

2. Start dev server with network access:
   ```bash
   npm run dev -- --host
   ```

3. On your mobile device, navigate to:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```

### Option 2: Use Browser Dev Tools

1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (or Ctrl+Shift+M)
3. Select a mobile device from the dropdown
4. Test with viewport between 320px - 440px

## 🎮 Using the App

### Trading Flow

1. **Select Time Mode**: Choose 30s, 60s, or Price from the header
2. **Adjust Margin**: Use the slider in the trading panel
3. **Place Trade**: Click UP (blue) or DOWN (red) button
4. **Watch Live**: Position opens and countdown starts
5. **Win/Settle**: Toast appears when trade completes
6. **Auto Reset**: Everything resets for next trade

### Button States

- **Normal**: Ready to click (both buttons active)
- **Entry Locked**: Clicked button shows "Entry Locked"
- **Disabled**: Opposite button is disabled during trade

### Time Modes

- **30 Second**: Quick trades, 30s countdown
- **60 Second**: Standard trades, 60s countdown
- **Price Mode**: Settles when price hits target (mock 60s for demo)

## 🏗️ Building for Production

### Build the App

```bash
npm run build
```

This creates optimized files in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Visit **http://localhost:4173** to test the production build.

## 📂 Project Structure

```
mobile-trading-app/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main app
│   │   └── components/          # All components
│   ├── imports/                 # Figma imports
│   ├── styles/                  # Global styles
│   └── main.tsx                 # Entry point
├── public/                      # Static assets
├── index.html                   # HTML template
└── package.json                 # Dependencies
```

## 🎨 Key Features to Test

### 1. UP Button (Blue)
- Click to open long position
- Watch "Position Opened - UP" animation
- Entry price slides in
- Live countdown begins
- WIN toast on completion

### 2. DOWN Button (Red)
- Click to open short position
- Watch "Position Opened - DOWN" animation
- Entry price slides in
- Live countdown begins
- WIN toast on completion

### 3. Trading Panel
- Margin slider (adjusts trade size)
- TP/SL controls
- Leverage selector
- Hides during active trade

### 4. Live Chart
- Real-time price updates
- Synchronized with trade state
- Color changes (blue for UP, red for DOWN)
- Footer shows countdown timer

### 5. History Grid
- Baccarat-style display
- Shows recent trade results
- Updates with each trade

## 🐛 Common Issues

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScript Errors

Ensure TypeScript is happy:
```bash
npx tsc --noEmit
```

### Styles Not Loading

Check that all CSS imports are correct:
```bash
# Verify these files exist:
src/styles/index.css
src/styles/theme.css
src/styles/tailwind.css
src/styles/fonts.css
```

## 🚢 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

Quick deploy:
1. Push code to GitHub
2. Connect to Vercel
3. Deploy with one click

## 📱 Mobile Optimization

The app is optimized for:
- **Minimum**: 320px width
- **Optimal**: 375px - 390px width
- **Maximum**: 440px width

Test at these breakpoints:
- iPhone SE: 375px
- iPhone 12/13/14: 390px
- iPhone 12/13/14 Pro Max: 428px

## ⚡ Performance Tips

1. **Development**: Hot Module Replacement (HMR) is enabled
2. **Production**: Assets are minified and optimized
3. **Mobile**: CSS animations use GPU acceleration
4. **Network**: Vite's dev server is lightning fast

## 🎯 Next Steps

1. ✅ Test all trading flows
2. ✅ Customize colors/styles in `src/styles/theme.css`
3. ✅ Add real API integration (replace mock data)
4. ✅ Deploy to Vercel
5. ✅ Share with users!

## 💡 Pro Tips

- Use React DevTools extension for debugging
- Check browser console for any warnings
- Test on real mobile devices before deploying
- Use Lighthouse for performance audits

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Read `DEPLOYMENT.md` for deployment issues
- Review component code in `src/app/components/`
- Inspect element to debug CSS issues

---

**Happy Trading!** 📈🚀
