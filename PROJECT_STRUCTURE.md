# Project Structure

Complete file structure and organization of the Mobile Trading Application.

## Root Directory

```
mobile-trading-app/
├── 📄 index.html                 # HTML entry point
├── 📄 package.json               # Dependencies and scripts
├── 📄 package-lock.json          # Locked dependency versions
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 tsconfig.node.json         # TypeScript config for Vite
├── 📄 vite.config.ts             # Vite bundler configuration
├── 📄 vercel.json                # Vercel deployment config
├── 📄 postcss.config.mjs         # PostCSS configuration
├── 📄 .gitignore                 # Git ignore rules
├── 📄 .npmrc                     # npm configuration
├── 📄 README.md                  # Main documentation
├── 📄 QUICKSTART.md              # Quick start guide
├── 📄 DEPLOYMENT.md              # Deployment instructions
├── 📄 BUILD_INSTRUCTIONS.md      # Build guide
├── 📄 PROJECT_STRUCTURE.md       # This file
├── 📄 ATTRIBUTIONS.md            # License attributions
└── 📁 guidelines/                # Development guidelines
```

## Source Code (`/src`)

### Main Entry Point

```
src/
├── 📄 main.tsx                   # React app entry point
└── 📁 app/                       # Application code
    └── 📄 App.tsx                # Main app component
```

### Components (`/src/app/components`)

All React components for the trading application:

```
src/app/components/
├── 📄 ButtonBlue.tsx             # UP trading button
├── 📄 ButtonBlueCSS.css          # UP button styles
├── 📄 ButtonRed.tsx              # DOWN trading button
├── 📄 ButtonRedCSS.css           # DOWN button styles
├── 📄 Header.tsx                 # App header with time mode selector
├── 📄 HeaderCSS.css              # Header styles
├── 📄 History.tsx                # Baccarat-style history grid
├── 📄 HistoryCSS.css             # History grid styles
├── 📄 TradingPanel.tsx           # Trading controls panel
├── 📄 TradingPanelCSS.css        # Trading panel styles
├── 📄 MarginSlider.tsx           # Custom margin slider
├── 📄 LeverageSelector.tsx       # Leverage selector
├── 📄 TPSLControl.tsx            # Take Profit/Stop Loss controls
├── 📄 WinToast.tsx               # Win notification toast
├── 📄 ComponentsShowcase.tsx     # Development component showcase
└── 📁 figma/                     # Figma-specific components
    └── 📄 ImageWithFallback.tsx  # Protected image component
```

### UI Components (`/src/app/components/ui`)

Reusable shadcn/ui components:

```
src/app/components/ui/
├── 📄 accordion.tsx              # Accordion component
├── 📄 alert-dialog.tsx           # Alert dialog
├── 📄 alert.tsx                  # Alert component
├── 📄 aspect-ratio.tsx           # Aspect ratio container
├── 📄 avatar.tsx                 # Avatar component
├── 📄 badge.tsx                  # Badge component
├── 📄 breadcrumb.tsx             # Breadcrumb navigation
├── 📄 button.tsx                 # Button component
├── 📄 calendar.tsx               # Calendar picker
├── 📄 card.tsx                   # Card container
├── 📄 carousel.tsx               # Carousel slider
├── 📄 chart.tsx                  # Chart component
├── 📄 checkbox.tsx               # Checkbox input
├── 📄 collapsible.tsx            # Collapsible section
├── 📄 command.tsx                # Command palette
├── 📄 context-menu.tsx           # Context menu
├── 📄 dialog.tsx                 # Dialog modal
├── 📄 drawer.tsx                 # Drawer component
├── 📄 dropdown-menu.tsx          # Dropdown menu
├── 📄 form.tsx                   # Form component
├── 📄 hover-card.tsx             # Hover card
├── 📄 input.tsx                  # Text input
├── 📄 input-otp.tsx              # OTP input
├── 📄 label.tsx                  # Form label
├── 📄 menubar.tsx                # Menu bar
├── 📄 navigation-menu.tsx        # Navigation menu
├── 📄 pagination.tsx             # Pagination controls
├── 📄 popover.tsx                # Popover component
├── 📄 progress.tsx               # Progress bar
├── 📄 radio-group.tsx            # Radio button group
├── 📄 resizable.tsx              # Resizable panels
├── 📄 scroll-area.tsx            # Scrollable area
├── 📄 select.tsx                 # Select dropdown
├── 📄 separator.tsx              # Visual separator
├── 📄 sheet.tsx                  # Sheet component
├── 📄 sidebar.tsx                # Sidebar navigation
├── 📄 skeleton.tsx               # Loading skeleton
├── 📄 slider.tsx                 # Slider input
├── 📄 sonner.tsx                 # Toast notifications
├── 📄 switch.tsx                 # Toggle switch
├── 📄 table.tsx                  # Table component
├── 📄 tabs.tsx                   # Tab navigation
├── 📄 textarea.tsx               # Textarea input
├── 📄 toggle.tsx                 # Toggle button
├── 📄 toggle-group.tsx           # Toggle button group
├── 📄 tooltip.tsx                # Tooltip component
├── 📄 use-mobile.ts              # Mobile detection hook
└── 📄 utils.ts                   # UI utilities
```

### Imported Components (`/src/imports`)

Figma-imported components and SVG assets:

```
src/imports/
├── 📄 LiveChart.tsx              # Base live chart component
├── 📄 LiveChartWithStates.tsx    # Live chart with state management
├── 📄 svg-2e5emr5g4w.ts          # SVG icon paths
├── 📄 svg-5hrd9x5luz.ts          # SVG icon paths
└── 📄 svg-8we49uz6px.ts          # SVG icon paths
```

### Styles (`/src/styles`)

Global styles and Tailwind configuration:

```
src/styles/
├── 📄 index.css                  # Main CSS entry (imports all)
├── 📄 tailwind.css               # Tailwind CSS imports
├── 📄 theme.css                  # Custom theme variables
└── 📄 fonts.css                  # Font imports
```

## Public Assets (`/public`)

Static assets served as-is:

```
public/
└── 📄 vite.svg                   # Favicon
```

## Build Output (`/dist`)

Generated after running `npm run build`:

```
dist/
├── 📄 index.html                 # Production HTML
├── 📄 vite.svg                   # Favicon
└── 📁 assets/
    ├── 📄 index-[hash].css       # Minified CSS
    └── 📄 index-[hash].js        # Minified JavaScript
```

**Note**: The `dist/` folder is git-ignored and created during build.

## Configuration Files

### TypeScript Configuration

- **tsconfig.json**: Main TypeScript config
  - Target: ES2020
  - Module: ESNext
  - Strict mode enabled
  - Path alias: `@` → `./src`

- **tsconfig.node.json**: Vite config TypeScript settings
  - For vite.config.ts compilation

### Vite Configuration

- **vite.config.ts**: Build tool configuration
  - React plugin
  - Tailwind CSS plugin
  - Path alias resolution
  - Development server settings

### Package Management

- **package.json**: Project metadata and dependencies
  - Scripts: dev, build, preview
  - 60+ dependencies
  - React 18.3.1
  - Vite 6.3.5
  - TypeScript 5.7.3

- **.npmrc**: npm configuration
  - Legacy peer deps handling
  - Engine strict disabled

### Deployment

- **vercel.json**: Vercel deployment settings
  - Build command
  - Output directory
  - SPA routing rules

- **postcss.config.mjs**: PostCSS configuration
  - Tailwind CSS processing

## File Counts

| Category | Count |
|----------|-------|
| Total TypeScript files | 85+ |
| React components | 60+ |
| CSS files | 10+ |
| Configuration files | 8 |
| Documentation files | 7 |
| SVG asset files | 3 |

## Key File Relationships

### Import Chain

```
index.html
  └── src/main.tsx
      └── src/app/App.tsx
          ├── ButtonBlue.tsx → ButtonBlueCSS.css
          ├── ButtonRed.tsx → ButtonRedCSS.css
          ├── Header.tsx → HeaderCSS.css
          ├── History.tsx → HistoryCSS.css
          ├── TradingPanel.tsx → TradingPanelCSS.css
          │   ├── MarginSlider.tsx
          │   ├── LeverageSelector.tsx
          │   └── TPSLControl.tsx
          ├── LiveChartWithStates.tsx
          │   └── LiveChart.tsx
          └── WinToast.tsx
```

### Style Chain

```
src/main.tsx
  └── src/styles/index.css
      ├── fonts.css (font imports)
      ├── tailwind.css (Tailwind directives)
      └── theme.css (custom CSS variables)
```

## Component Dependencies

### Trading Flow Components

1. **Header** → Time mode selection
2. **TradingPanel** → Trading controls
   - MarginSlider → Bet amount
   - LeverageSelector → Leverage level
   - TPSLControl → TP/SL settings
3. **ButtonBlue/ButtonRed** → Trade execution
4. **LiveChartWithStates** → Price display
5. **History** → Trade history
6. **WinToast** → Win notification

## File Naming Conventions

- **Components**: PascalCase (ButtonBlue.tsx)
- **CSS Modules**: Component name + CSS (ButtonBlueCSS.css)
- **Utilities**: camelCase (utils.ts)
- **Hooks**: use prefix (use-mobile.ts)
- **Types**: Defined inline or in component files
- **Constants**: UPPER_SNAKE_CASE (in files)

## Protected Files

**Do not modify**:
- `/src/app/components/figma/ImageWithFallback.tsx`
- SVG imports in `/src/imports/svg-*.ts`

## Generated Files (Git Ignored)

- `node_modules/` - Installed dependencies
- `dist/` - Build output
- `*.local` - Local environment files
- `.vscode/` - VS Code settings
- `.DS_Store` - macOS metadata

## Development Guidelines

See `/guidelines/Guidelines.md` for:
- Code style
- Component structure
- Best practices
- Contribution guidelines

## Documentation Files

| File | Purpose |
|------|---------|
| README.md | Main project documentation |
| QUICKSTART.md | Quick setup guide |
| DEPLOYMENT.md | Deployment instructions |
| BUILD_INSTRUCTIONS.md | Build process guide |
| PROJECT_STRUCTURE.md | This file |
| ATTRIBUTIONS.md | License information |

## Adding New Files

### New Component

1. Create in `/src/app/components/`
2. Follow PascalCase naming
3. Create separate CSS file if needed
4. Import in App.tsx or parent component

### New Style

1. Add to `/src/styles/` if global
2. Or create component-specific CSS file
3. Import in component or index.css

### New Asset

1. Add to `/public/` for static files
2. Reference with `/filename.ext` in code

---

**Last Updated**: January 16, 2026

This structure is optimized for:
- ✅ Vite build performance
- ✅ TypeScript type safety
- ✅ Component reusability
- ✅ Easy navigation
- ✅ Maintainability
