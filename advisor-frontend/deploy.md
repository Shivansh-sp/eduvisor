# Deployment Guide

## Production Deployment

### Frontend Deployment (Netlify)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Select your `eduvisor` repository

2. **Configure Build Settings**
   - **Base directory**: `advisor-frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

3. **Environment Variables**
   - `REACT_APP_API_URL`: Your backend API URL

4. **Deploy**
   - Click "Deploy site"
   - Your frontend will be available at `https://your-app-name.netlify.app`

### Backend Deployment (Railway)

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub account
   - New Project → Deploy from GitHub
   - Select `eduvisor` repository

2. **Configure Service**
   - **Root directory**: `advisor-backend`
   - **Build command**: `npm run build`
   - **Start command**: `npm start`

3. **Environment Variables**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secure random string for JWT signing
   - `NODE_ENV`: `production`

4. **Deploy**
   - Railway will automatically build and deploy
   - Your backend will be available at `https://your-app-name.railway.app`

### Database Setup

For production, use one of these MongoDB services:
- [MongoDB Atlas](https://cloud.mongodb.com) (Recommended - Free tier available)
- [Railway MongoDB](https://railway.app/template/mongodb)

### Full Stack Deployment

1. Deploy backend first to get the API URL
2. Update frontend environment variable with backend URL
3. Deploy frontend
4. Test the complete application

## Alternative Deployment Platforms

- **Vercel**: For frontend deployment
- **Render**: For both frontend and backend
- **Heroku**: For backend deployment
- **DigitalOcean**: For full-stack deployment
