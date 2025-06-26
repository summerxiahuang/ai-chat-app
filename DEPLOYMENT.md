# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your AI Chat Application to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `ai-chat-app`
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### 2. Update Homepage URL

Edit `frontend/package.json` and replace `YOUR_USERNAME` with your actual GitHub username:

```json
"homepage": "https://YOUR_USERNAME.github.io/ai-chat-app"
```

### 3. Initialize Git and Push

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ai-chat-app.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

### 5. Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. You should see the workflow running
3. If prompted, click **Enable Actions**

## 🔄 Automatic Deployment

Once set up, your app will automatically deploy when you:

1. Push changes to the `main` branch
2. Create a pull request to `main`

The deployment process:
- Builds the React frontend
- Deploys to GitHub Pages
- Your app will be available at: `https://YOUR_USERNAME.github.io/ai-chat-app`

## 🌐 Backend Deployment

**Important**: GitHub Pages only hosts static files. Your backend needs to be deployed separately.

### Backend Options:

1. **Railway** (Recommended)
   - Free tier available
   - Easy deployment
   - Automatic HTTPS

2. **Render**
   - Free tier available
   - Good for Node.js apps

3. **Heroku**
   - Free tier discontinued
   - Paid plans available

4. **Vercel**
   - Free tier available
   - Great for Node.js

### Update Frontend API URL

After deploying your backend, update the API URL in your frontend:

```javascript
// In frontend/src/components/Chat.js
const API_URL = 'https://your-backend-url.com/api/chat';
```

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the frontend
cd frontend
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## 🔍 Troubleshooting

### Common Issues:

1. **404 Error on Refresh**
   - This is normal for React Router
   - GitHub Pages doesn't support client-side routing by default
   - Consider using HashRouter instead of BrowserRouter

2. **Build Fails**
   - Check GitHub Actions logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **API Calls Fail**
   - Check CORS settings in backend
   - Verify API URL is correct
   - Ensure backend is deployed and running

### Check Deployment Status:

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Check the logs for any errors

## 📱 Testing Your Deployment

1. Wait for GitHub Actions to complete (usually 2-3 minutes)
2. Visit your GitHub Pages URL
3. Test the chat functionality
4. Check browser console for any errors

## 🔄 Updating Your App

To update your deployed app:

```bash
# Make your changes
# Commit and push
git add .
git commit -m "Update app"
git push origin main

# GitHub Actions will automatically deploy the changes
```

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs
2. Verify all setup steps were completed
3. Ensure repository is public
4. Check that gh-pages branch was created

---

Your AI Chat App will be live at: `https://YOUR_USERNAME.github.io/ai-chat-app` 🎉 