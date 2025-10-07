# MongoDB Setup Guide for Thatlytics

## Option 1: Local MongoDB Installation (Recommended for Development)

### Windows Installation:

1. **Download MongoDB Community Server:**
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows as your OS
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the downloaded MSI file
   - Follow the installation wizard
   - Choose "Complete" installation
   - Install MongoDB as a service (recommended)
   - Install MongoDB Compass (GUI tool) when prompted

3. **Verify Installation:**
   ```bash
   # Open Command Prompt or PowerShell and run:
   mongod --version
   ```

4. **Start MongoDB Service:**
   ```bash
   # MongoDB should start automatically as a service
   # If not, run:
   net start MongoDB
   ```

### Alternative: Using MongoDB with Docker

If you prefer Docker:

```bash
# Pull and run MongoDB container
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_DATABASE=thatlytics mongo:latest

# Or with Docker Compose (create docker-compose.yml):
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: thatlytics-mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: thatlytics
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## Option 2: MongoDB Atlas (Cloud - Free Tier Available)

### Steps:

1. **Create Account:**
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "Free" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Create cluster

3. **Set up Database Access:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"

4. **Set up Network Access:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development
   - For production, use specific IP addresses

5. **Get Connection String:**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Configuration for Your Project:

### Update .env file:

**For Local MongoDB:**
```env
PORT=3001
DATABASE_URL="mongodb://localhost:27017/thatlytics"
JWT_SECRET="your_super_secret_jwt_key_here_change_this_in_production"
```

**For MongoDB Atlas:**
```env
PORT=3001
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/thatlytics?retryWrites=true&w=majority"
JWT_SECRET="your_super_secret_jwt_key_here_change_this_in_production"
```

### Initialize Database:

```bash
# In your server directory
cd server
npx prisma db push
```

## Testing the Setup:

1. **Start your server:**
   ```bash
   npm run dev
   ```

2. **Check if connection works:**
   - Server should start without database connection errors
   - Check console for any Prisma connection messages

## MongoDB Tools (Optional but Helpful):

1. **MongoDB Compass** - GUI for viewing/managing data
   - Comes with MongoDB installation
   - Connect to: `mongodb://localhost:27017`

2. **Studio 3T** - Advanced MongoDB GUI (free version available)
   - Download from: https://studio3t.com/

3. **Command Line Tools:**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # List databases
   show dbs
   
   # Use your database
   use thatlytics
   
   # List collections
   show collections
   ```

## Troubleshooting:

### Common Issues:

1. **Connection Refused:**
   - Make sure MongoDB service is running
   - Check if port 27017 is available

2. **Authentication Failed:**
   - Check username/password in connection string
   - Verify database user permissions

3. **Network Timeout (Atlas):**
   - Check Network Access settings
   - Verify IP whitelist includes your current IP

### Check Connection:
```javascript
// Test connection in Node.js
const { MongoClient } = require('mongodb');

async function testConnection() {
  const client = new MongoClient('your_connection_string_here');
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await client.close();
  }
}

testConnection();
```

## Next Steps:

1. Choose your preferred MongoDB setup (local or Atlas)
2. Update the .env file with correct DATABASE_URL
3. Run `npx prisma db push` to sync schema
4. Start the development server with `npm run dev`
5. Test signup functionality at `http://localhost:3000/auth/signup`