# Deployment Guide for Vercel

This guide will walk you through deploying the Mobile Trading Application to Vercel.

## Prerequisites

Before deploying, ensure you have:
- A GitHub, GitLab, or Bitbucket account
- A Vercel account (free tier works fine)
- Node.js 18+ installed locally (for testing)

## Method 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method for most users.

### Step 1: Push Code to Git Repository

1. Create a new repository on GitHub/GitLab/Bitbucket
2. Initialize git in your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Push to your repository:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Vercel will automatically detect the Vite framework

### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## Method 2: Deploy via Vercel CLI

For advanced users who prefer command-line tools.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

From your project directory:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

The CLI will guide you through the setup and deploy your app.

## Method 3: One-Click Deploy

Use the deploy button in README.md to deploy with a single click.

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Environment Variables (If Needed)

If you add environment variables in the future:

1. Go to "Settings" → "Environment Variables"
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

### Continuous Deployment

Once connected, Vercel automatically:
- Deploys on every push to main branch (production)
- Creates preview deployments for pull requests
- Provides deployment URLs for each commit

## Build Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- Single Page Application (SPA) routing works correctly
- All routes redirect to index.html
- Vite framework is properly recognized

## Testing Before Deployment

Always test locally before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Troubleshooting

### Build Fails

**Issue**: Build fails on Vercel
**Solution**: 
1. Check the build logs in Vercel dashboard
2. Test `npm run build` locally
3. Ensure all dependencies are in `package.json`, not just devDependencies
4. Verify Node.js version compatibility

### 404 Errors

**Issue**: Routes return 404
**Solution**: 
- Ensure `vercel.json` includes the rewrite rule
- Check that SPA routing is enabled

### Blank Page

**Issue**: Site loads but shows blank page
**Solution**:
1. Check browser console for errors
2. Verify `index.html` is in root directory
3. Check that `/src/main.tsx` properly imports App
4. Ensure all CSS files are importing correctly

### Build Timeout

**Issue**: Build exceeds time limit
**Solution**:
- Optimize dependencies (remove unused packages)
- Consider upgrading Vercel plan for longer build times
- Check for infinite loops in build scripts

## Performance Optimization

After deployment, consider:

1. **Enable Analytics**: In Vercel dashboard → Analytics
2. **Speed Insights**: Monitor real user performance
3. **Image Optimization**: Use Vercel's image optimization if adding images
4. **Caching**: Vercel automatically caches static assets

## Monitoring

Monitor your deployment:
- **Deployment Logs**: View in Vercel dashboard
- **Runtime Logs**: Check for errors in Functions tab
- **Analytics**: Track user visits and performance

## Updating Your Deployment

To update your live site:

1. Make changes locally
2. Test with `npm run build && npm run preview`
3. Commit and push to main branch
4. Vercel automatically rebuilds and deploys

Or use CLI:
```bash
vercel --prod
```

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Production Checklist

Before going live:

- [ ] Test all trading flows (UP/DOWN buttons)
- [ ] Verify responsive design (320px - 440px)
- [ ] Check countdown timers work correctly
- [ ] Test all three time modes (30s, 60s, Price)
- [ ] Verify WIN toast displays properly
- [ ] Test on multiple mobile devices
- [ ] Check browser console for errors
- [ ] Verify all animations are smooth
- [ ] Test button states (normal, entry-locked, disabled)
- [ ] Ensure chart synchronization works

## Cost

This project is optimized for Vercel's **free tier**, which includes:
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Edge network

For high-traffic apps, consider upgrading to Pro tier.

---

**Ready to deploy?** Follow Method 1 above for the quickest deployment! 🚀
