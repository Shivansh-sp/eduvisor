# Railway Deployment Guide

## Step-by-Step Railway Deployment

### 1. Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `eduvisor` repository

### 2. Configure Service
1. **IMPORTANT**: Set the **Root Directory** to `advisor-backend`
2. Railway will automatically detect it's a Node.js project
3. The build and start commands are already configured in `railway.json`

### 3. Environment Variables
Add these environment variables in Railway dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/advisor
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=5000
```

### 4. MongoDB Setup
For production, use MongoDB Atlas:
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string
4. Add to Railway environment variables

### 5. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get your backend URL (e.g., `https://your-app.railway.app`)

### 6. Update Frontend
1. In your frontend deployment (Netlify), add environment variable:
   - `REACT_APP_API_URL` = Your Railway backend URL

## Troubleshooting

### If deployment fails:
1. Check that Root Directory is set to `advisor-backend`
2. Verify all environment variables are set
3. Check Railway logs for specific errors
4. Ensure MongoDB connection string is correct

### Common Issues:
- **"No start command found"**: Make sure Root Directory is `advisor-backend`
- **Build fails**: Check that all dependencies are in package.json
- **Database connection fails**: Verify MongoDB URI is correct
