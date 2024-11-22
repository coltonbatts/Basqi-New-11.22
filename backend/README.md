# Basqi Backend

## Deployment Instructions for Render.com

1. Create a new Web Service on Render
2. Connect your repository
3. Use these settings:
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
4. Add environment variables in Render dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - STRIPE_SECRET_KEY
   - CORS_ORIGIN
   - NODE_ENV=production
   - PORT=8080