# 🚀 Setup Instructions - Follow These Steps

## Step 1: Install Backend Dependencies

Open Terminal and run:

```bash
cd backend
npm install
```

## Step 2: Create Backend Environment File

Create a file named `.env` in the `backend` folder with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashionstore
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important:** If you're using MongoDB Atlas (cloud), replace `MONGODB_URI` with your Atlas connection string.

## Step 3: Make Sure MongoDB is Running

### Option A: Local MongoDB
- Make sure MongoDB is installed and running on your computer
- Start MongoDB service if needed

### Option B: MongoDB Atlas (Cloud - Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env` with your Atlas connection string

## Step 4: Seed the Database

```bash
cd backend
npm run seed
```

This will create:
- Admin user (admin@fashionstore.com / admin123)
- Regular user (user@fashionstore.com / user123)
- 10 sample products

## Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

**Keep this terminal open!**

## Step 6: Install Frontend Dependencies

Open a NEW terminal window and run:

```bash
cd frontend
npm install
```

## Step 7: Create Frontend Environment File

Create a file named `.env` in the `frontend` folder with this content:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 8: Start Frontend Server

```bash
cd frontend
npm run dev
```

You should see something like: `Local: http://localhost:5173/`

## Step 9: Open in Browser

1. Open your web browser
2. Go to: `http://localhost:5173`
3. You should see the landing page with countdown timer!

## Step 10: Test Login

1. Click "Shop Now" or go to `/login`
2. Try logging in with:
   - **Admin**: `admin@fashionstore.com` / `admin123`
   - **User**: `user@fashionstore.com` / `user123`

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] Backend `.env` file created
- [ ] MongoDB is running
- [ ] Database seeded successfully
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend `.env` file created
- [ ] Frontend server running
- [ ] Website opens in browser
- [ ] Can login successfully

## 🎯 What to Do Next

1. **Explore the website:**
   - Browse products by category (Men, Women, Kids)
   - View product details
   - Try searching for products

2. **Test as a customer:**
   - Add items to cart
   - Add items to wishlist
   - Go through checkout process

3. **Test as admin:**
   - Login as admin
   - Go to Admin Dashboard (`/admin`)
   - Add a new product
   - View and manage orders

## 🆘 Need Help?

If you encounter any errors:
1. Check the error message in the terminal
2. Make sure MongoDB is running
3. Make sure both servers are running
4. Check the `.env` files are created correctly
5. Read the full README.md for troubleshooting

---

**You're all set! Happy coding! 🎉**

