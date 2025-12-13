# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Set Up Backend

1. **Create `.env` file in backend folder:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashionstore
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

2. **Make sure MongoDB is running:**
   - Local: Start MongoDB service
   - Cloud: Use MongoDB Atlas connection string

3. **Seed the database:**
```bash
cd backend
npm run seed
```

4. **Start backend server:**
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 3: Set Up Frontend

1. **Create `.env` file in frontend folder:**
```env
VITE_API_URL=http://localhost:5000/api
```

2. **Start frontend server:**
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 4: Access the Application

1. Open browser: `http://localhost:5173`
2. You'll see the landing page with countdown timer
3. Click "Shop Now" to go to homepage

### Step 5: Login

**Admin Login:**
- Email: `admin@fashionstore.com`
- Password: `admin123`

**User Login:**
- Email: `user@fashionstore.com`
- Password: `user123`

## ✅ Verify Installation

- [x] Backend server running on port 5000
- [x] Frontend server running on port 5173
- [x] MongoDB connected
- [x] Database seeded with sample products
- [x] Can login with admin/user credentials
- [x] Can browse products
- [x] Can add items to cart

## 🎯 Next Steps

1. Explore the admin dashboard (`/admin`)
2. Add a new product through admin panel
3. Test the shopping cart and checkout flow
4. Try the wishlist feature
5. Test search functionality

## 🐛 Common Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`

**Port Already in Use:**
- Change PORT in backend `.env`
- Change Vite port: `npm run dev -- --port 3000`

**CORS Errors:**
- Backend CORS is configured for all origins in development
- Check if backend is running

**Module Not Found:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

**Need Help?** Check the full README.md for detailed documentation.

