# Quick Deployment Guide

## For Frontend Demo (Netlify)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Select your `eduvisor` repository
5. Settings:
   - **Base directory**: `advisor-frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Deploy!

## For Full Stack (Railway + Netlify)

### Backend (Railway):
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. New Project → Deploy from GitHub
4. Select `eduvisor` repo
5. Settings:
   - **Root directory**: `advisor-backend`
   - **Build command**: `npm run build`
   - **Start command**: `npm start`
6. Add environment variables:
   - `MONGODB_URI` = Your MongoDB connection
   - `JWT_SECRET` = Any secure string
   - `NODE_ENV` = `production`

### Frontend (Netlify):
1. Same as above, but add environment variable:
   - `REACT_APP_API_URL` = Your Railway backend URL

## MongoDB Setup

For production, you can use:
- [MongoDB Atlas](https://cloud.mongodb.com) (Free tier available)
- [Railway MongoDB](https://railway.app/template/mongodb)

## Quick Demo URL

Once deployed, your app will be available at:
- Frontend: `https://your-app-name.netlify.app`
- Backend: `https://your-app-name.railway.app`
