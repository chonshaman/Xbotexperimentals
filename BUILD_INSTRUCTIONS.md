# Build Instructions

Complete guide to building and deploying the Mobile Trading Application for production.

## Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control

Check versions:
```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
git --version   # Any recent version
```

## Initial Setup

### 1. Clone or Download Project

If you have the project as a zip file:
```bash
unzip mobile-trading-app.zip
cd mobile-trading-app
```

If cloning from Git:
```bash
git clone <repository-url>
cd mobile-trading-app
```

### 2. Install Dependencies

This will install all required packages (~200MB):

```bash
npm install
```

**Expected time**: 2-5 minutes depending on your internet speed.

**Troubleshooting**: If you encounter peer dependency warnings, they can be safely ignored. The `.npmrc` file is configured to handle this.

## Development Build

### Start Development Server

```bash
npm run dev
```

**Output**:
```
VITE v6.3.5  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
➜  press h + enter to show help
```

- Local URL works on your computer
- Network URL works on other devices on same WiFi
- Changes auto-reload (Hot Module Replacement)

### Development Features

- **Fast Refresh**: See changes instantly
- **Error Overlay**: Errors show in browser
- **Source Maps**: Debug original code
- **TypeScript Checking**: Real-time type errors

## Production Build

### Build for Deployment

```bash
npm run build
```

**What happens**:
1. TypeScript is compiled to JavaScript
2. Code is minified and optimized
3. Assets are hashed for caching
4. Output goes to `dist/` folder

**Expected output**:
```
vite v6.3.5 building for production...
✓ 1234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css     45.67 kB │ gzip: 12.34 kB
dist/assets/index-def456.js     234.56 kB │ gzip: 78.90 kB
✓ built in 12.34s
```

**Build time**: Usually 10-30 seconds.

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

This serves the `dist/` folder at `http://localhost:4173`

**Important**: Always preview before deploying to catch any build-specific issues.

## Build Output

After running `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html              # Main HTML file
├── vite.svg               # Favicon
└── assets/
    ├── index-[hash].css   # Minified styles
    └── index-[hash].js    # Minified JavaScript
```

**File sizes** (approximate):
- CSS: ~45 KB (12 KB gzipped)
- JavaScript: ~235 KB (79 KB gzipped)
- Total: ~280 KB (91 KB gzipped)

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Automatic builds on git push
- Global CDN
- Free SSL certificates
- Zero configuration
- Preview deployments for PRs

**Steps**:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy with one click

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: Static Hosting

The `dist/` folder can be deployed to any static host:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages
- DigitalOcean App Platform

**Basic steps**:
1. Run `npm run build`
2. Upload `dist/` folder contents
3. Configure SPA routing (redirect all routes to index.html)

## Build Optimization

### Analyze Bundle Size

To see what's in your bundle:

```bash
npm run build -- --mode analyze
```

This helps identify large dependencies.

### Reduce Bundle Size

If needed, optimize by:
1. Removing unused UI components
2. Code splitting with `React.lazy()`
3. Tree shaking unused exports
4. Compressing images

### Environment-Specific Builds

Create `.env` files for different environments:

**.env.development**:
```
VITE_API_URL=http://localhost:3000
```

**.env.production**:
```
VITE_API_URL=https://api.production.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Continuous Integration (CI)

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Upload dist
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Troubleshooting Builds

### Build Fails with TypeScript Errors

Check TypeScript:
```bash
npx tsc --noEmit
```

Fix errors and rebuild.

### Build Fails with Memory Error

Increase Node.js memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Build Succeeds but App is Broken

Common issues:

1. **Blank page**: Check browser console
2. **404 errors**: Configure SPA routing on host
3. **Missing styles**: Ensure CSS is imported in main.tsx
4. **API errors**: Check environment variables

### Build is Too Slow

Speed up builds:
```bash
# Clear cache
rm -rf node_modules/.vite

# Use pnpm (faster than npm)
npm install -g pnpm
pnpm install
pnpm build
```

## Build Verification Checklist

Before deploying, verify:

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` shows working app
- [ ] All pages load correctly
- [ ] Trading buttons work (UP/DOWN)
- [ ] Countdown timers function
- [ ] Animations are smooth
- [ ] Mobile responsive (320px - 440px)
- [ ] No console errors in browser
- [ ] Assets load correctly
- [ ] Icons and images display

## Production Environment Variables

Set these in your hosting platform:

| Variable | Value | Description |
|----------|-------|-------------|
| NODE_VERSION | 18 | Node.js version |
| BUILD_COMMAND | npm run build | Build command |
| OUTPUT_DIR | dist | Output directory |
| INSTALL_COMMAND | npm install | Install command |

## Performance Targets

After build, app should achieve:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Bundle Size**: < 300 KB (gzipped)
- **Lighthouse Score**: > 90

Test with:
```bash
npm run preview
# Then run Lighthouse in Chrome DevTools
```

## Deployment Checklist

Final checks before going live:

- [ ] Build completes successfully
- [ ] All tests pass (if you have tests)
- [ ] TypeScript has no errors
- [ ] ESLint has no errors (if configured)
- [ ] Preview build works correctly
- [ ] Mobile responsive tested
- [ ] Performance is acceptable
- [ ] Environment variables configured
- [ ] Domain/hosting configured
- [ ] SSL certificate active
- [ ] Analytics setup (optional)
- [ ] Error monitoring setup (optional)

## Post-Deployment

After deploying:

1. **Test on real devices**: iOS and Android
2. **Check all features**: Complete trading flow
3. **Monitor errors**: Use browser console
4. **Check analytics**: User behavior
5. **Performance monitoring**: Load times

## Support

For build issues:

1. Check [QUICKSTART.md](./QUICKSTART.md) for setup
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
3. Search GitHub issues
4. Contact support

---

**Ready to build?** Run `npm run build` and deploy to production! 🚀
