# Backend Deployment Guide for Render

## Prerequisites
- GitHub repository with backend code
- MongoDB Atlas account (for production database)
- Render account

## Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Whitelist all IPs (0.0.0.0/0) for Render

## Step 2: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `eduvisor-backend`
   - **Root Directory**: `advisor-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

## Step 3: Environment Variables
Add these environment variables in Render dashboard:
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A strong secret key (32+ characters)
- `PORT`: `10000` (Render will override this)

## Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your backend will be available at: `https://eduvisor-backend.onrender.com`

## Step 5: Update Frontend
Update your frontend's API URL to point to the deployed backend:
```javascript
const API_URL = 'https://eduvisor-backend.onrender.com/api';
```

## Health Check
Test your deployment:
```bash
curl https://eduvisor-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Advisor API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
