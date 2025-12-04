# 🚀 Deploying to Vercel - Step by Step Guide

This guide will walk you through deploying your GAMEVAULT project to Vercel from GitHub.

## Prerequisites

✅ Your project is already uploaded to GitHub  
✅ You have a GitHub account  
✅ You have a Vercel account (or can create one for free)

---

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** to connect your GitHub account
4. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find your `nextjs` repository and click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js settings, but verify:

- **Framework Preset**: `Next.js` (should be auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

**Important Settings:**
- **Node.js Version**: Select `18.x` or `20.x` (recommended)
- **Environment Variables**: None needed for this project (since we use localStorage)

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, you'll see:
   - ✅ **Deployment successful!**
   - Your live URL (e.g., `your-project.vercel.app`)

### Step 5: Access Your Live Site

- Click on the deployment URL to visit your live site
- Share the URL with others!

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N` (first time) or `Y` (if redeploying)
- **Project name?** → Press Enter for default or enter custom name
- **Directory?** → `./` (press Enter)
- **Override settings?** → `N` (press Enter)

### Step 4: Production Deploy

For production deployment:

```bash
vercel --prod
```

---

## 🔧 Important Notes for Your Project

### 1. Build Settings

Your `package.json` already has the correct build script:
```json
"build": "next build"
```

Vercel will automatically:
- Run `npm install`
- Run `npm run build`
- Deploy the `.next` folder

### 2. Environment Variables

**You don't need any environment variables** for this project since:
- Games are stored in `games.json` (committed to repo)
- User data uses localStorage (client-side only)

### 3. File Structure

Make sure these files are in your GitHub repo:
- ✅ `package.json`
- ✅ `next.config.mjs`
- ✅ `src/` directory with all your code
- ✅ `public/` directory with images
- ✅ `components.json` (for shadcn/ui)

### 4. Node.js Version

Vercel supports Node.js 18+ by default. Your project uses:
- Next.js 16
- React 19
- Node.js 18+ (required)

---

## 🔄 Updating Your Deployment

### Automatic Updates (Recommended)

Once connected to GitHub, Vercel will **automatically deploy** when you:
- Push to `main` branch (production)
- Push to other branches (preview deployments)

### Manual Updates

1. **Via Dashboard**: Go to your project → Deployments → Redeploy
2. **Via CLI**: Run `vercel --prod` from your project directory
3. **Via GitHub**: Push new commits to trigger automatic deployment

---

## 🌐 Custom Domain (Optional)

### Step 1: Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Enter your domain name (e.g., `gamevault.com`)
3. Click **"Add"**

### Step 2: Configure DNS

Vercel will provide DNS records. Add them to your domain registrar:
- **A Record**: Point to Vercel's IP
- **CNAME Record**: Point to Vercel's domain

### Step 3: SSL Certificate

Vercel automatically provides SSL certificates (HTTPS) for all domains!

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Make sure all dependencies are in package.json
npm install
```

**Error: Build timeout**
```bash
# Solution: Check for large files or slow builds
# Consider adding .vercelignore for unnecessary files
```

**Error: Missing files**
```bash
# Solution: Ensure all source files are committed to GitHub
git add .
git commit -m "Add missing files"
git push
```

### Deployment Works But Site Shows Errors

1. **Check Browser Console**: Open DevTools (F12) → Console
2. **Check Vercel Logs**: Project → Deployments → Click deployment → View logs
3. **Verify Build Output**: Check if `npm run build` works locally

### localStorage Not Working

- **Note**: localStorage works client-side only
- Each user's data is stored in their browser
- This is expected behavior for this project

---

## 📊 Monitoring Your Deployment

### View Deployment Status

1. Go to your Vercel dashboard
2. Click on your project
3. See all deployments with:
   - ✅ Status (Ready, Building, Error)
   - 🌐 Preview URLs
   - 📅 Deployment time
   - 📝 Commit messages

### View Logs

1. Click on any deployment
2. View **Build Logs** and **Runtime Logs**
3. Debug any issues

---

## 🎯 Best Practices

### 1. Use Environment Variables for Sensitive Data

If you add API keys later:
```bash
# In Vercel Dashboard:
# Settings → Environment Variables
# Add: NEXT_PUBLIC_API_KEY = your_key
```

### 2. Enable Preview Deployments

- Every branch gets a preview URL
- Test changes before merging to main
- Share preview URLs for feedback

### 3. Set Up Notifications

- Get email notifications for deployments
- Connect Slack/Discord for team updates

### 4. Optimize Build Time

- Use `.vercelignore` to exclude unnecessary files
- Cache `node_modules` (Vercel does this automatically)

---

## 📝 Quick Checklist

Before deploying, ensure:

- [ ] All code is pushed to GitHub
- [ ] `package.json` has correct scripts
- [ ] `next.config.mjs` exists
- [ ] No build errors locally (`npm run build`)
- [ ] All dependencies are listed in `package.json`
- [ ] Public assets are in `public/` folder
- [ ] `.gitignore` excludes `node_modules` and `.next`

---

## 🚀 Quick Deploy Commands

```bash
# First time setup
vercel login
vercel

# Production deploy
vercel --prod

# View deployments
vercel ls

# View project info
vercel inspect
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## ✅ Success!

Once deployed, you'll have:
- 🌐 Live production URL
- 🔄 Automatic deployments on git push
- 📊 Analytics and monitoring
- 🔒 Free SSL certificate
- ⚡ Global CDN

**Your GAMEVAULT marketplace is now live! 🎮**


