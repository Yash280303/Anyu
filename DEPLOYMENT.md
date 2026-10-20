# 🚀 Deployment Guide

## Step 1: Create GitHub Repository

```bash
# In the MyAnyu-Website folder
cd /home/yash/MyAnyu-Website

# Add all files
git add .

# Commit
git commit -m "Initial commit - Dating proposal website for Ananya"

# Create a new repository on GitHub
# Go to: https://github.com/new
# Repository name: myanu-website
# Make it Private (so only you can see it)
# Don't initialize with README

# Link to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/myanu-website.git

# Push
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your **myanu-website** repository
5. Settings:
   - Build command: *(leave empty)*
   - Publish directory: *(leave empty or put `.`)*
6. Click **"Deploy site"**
7. Wait 1-2 minutes
8. Your site is live! 🎉

### Option B: Manual Deploy (Drag & Drop)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the entire **MyAnyu-Website** folder into the upload area
4. Wait for deployment
5. Done! 🎉

## Step 3: Custom Domain (Optional)

If you want **myanu.com**:

1. Buy domain from Namecheap, GoDaddy, etc.
2. In Netlify: **Domain settings** → **Add custom domain**
3. Enter **myanu.com**
4. Update DNS settings (Netlify will guide you)
5. Wait for DNS propagation (up to 24 hours)

## Step 4: Get Your Link

After deployment, Netlify gives you a link like:
```
https://your-site-name.netlify.app
```

**Send this link to Ananya!** 💕

## Making Changes

```bash
# Make edits to files
# Then:
git add .
git commit -m "Fixed button alignment"
git push origin main

# Netlify auto-deploys in 1-2 minutes!
```

## ✅ Checklist

- [ ] Test locally: `python3 -m http.server 8000`
- [ ] All pages working
- [ ] Buttons not overlapping
- [ ] No button evades correctly
- [ ] Location selection works
- [ ] Celebration shows chosen location
- [ ] Git repo created
- [ ] Pushed to GitHub
- [ ] Deployed to Netlify
- [ ] Link tested
- [ ] Ready to send! 💕

## 🆘 Troubleshooting

**Problem: Buttons overlap**
- Check `styles.css` buttons-container styles
- Ensure No button has `position: relative`

**Problem: Page skips to wrong page**
- Check JavaScript event listeners
- Ensure claimBtn → showProposal
- Ensure yesBtnInitial → showDateLocation

**Problem: Netlify deploy fails**
- Ensure all files committed
- Check file names are correct
- Try manual deploy (drag & drop)

## 📞 Support

If something doesn't work, check:
1. Browser console (F12) for errors
2. Netlify deploy logs
3. File names match exactly

Good luck! 🎉💕
