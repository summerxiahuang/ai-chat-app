#!/bin/bash

# GitHub Pages Setup Script for AI Chat App

echo "🚀 Setting up GitHub Pages deployment..."

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get GitHub username
echo "📝 Please enter your GitHub username:"
read github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

# Update homepage in package.json
echo "🔧 Updating homepage URL in frontend/package.json..."
sed -i.bak "s/YOUR_USERNAME/$github_username/g" frontend/package.json
rm frontend/package.json.bak

echo "✅ Homepage URL updated to: https://$github_username.github.io/ai-chat-app"

# Initialize Git repository
echo "📁 Initializing Git repository..."
git init

# Add all files
echo "📦 Adding files to Git..."
git add .

# Make initial commit
echo "💾 Making initial commit..."
git commit -m "Initial commit: AI Chat Application"

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Name it: ai-chat-app"
echo "   - Make it public"
echo "   - Don't initialize with README"
echo ""
echo "2. Add remote and push:"
echo "   git remote add origin https://github.com/$github_username/ai-chat-app.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to repository Settings → Pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'gh-pages' branch"
echo ""
echo "4. Your app will be live at:"
echo "   https://$github_username.github.io/ai-chat-app"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 