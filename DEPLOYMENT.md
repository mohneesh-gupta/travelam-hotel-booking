# WanderLust Deployment Guide

## Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust`)
5. Replace `<password>` with your actual password

## Step 2: Deploy to Render

1. Push your code to GitHub (if not already done)
2. Go to [Render](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: wanderlust
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `SESSION_SECRET`: Any random secure string (e.g., `mySecureSecret123!@#`)
   - `NODE_ENV`: `production`
7. Click "Create Web Service"

## Step 3: Initialize Database (One-time)

After deployment, you need to seed the database:
1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: `node server/init/index.js`

Your app will be live at: `https://your-app-name.onrender.com`

## Important Notes
- Render free tier may spin down after inactivity (takes ~30 seconds to wake up)
- Make sure to use HTTPS URLs in production
- Keep your environment variables secure
