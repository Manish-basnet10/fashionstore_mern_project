# FashionStore - Complete E-commerce Website

A fully functional Myntra-style clothing e-commerce website built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

### Frontend Features
- **Landing Page** with countdown timer and discount offers
- **Home Page** with hero section, categories, and featured products
- **Category Pages** for Men, Women, and Kids
- **Product Detail Page** with image gallery, size/color selection, reviews
- **Search Functionality** with auto-suggestions
- **Shopping Cart** with quantity management
- **Wishlist** for saving favorite items
- **Checkout Process** with address and payment simulation
- **User Profile** with order history
- **Admin Dashboard** for product and order management
- **Dark/Light Mode** toggle
- **Fully Responsive** design (mobile-first approach)

### Backend Features
- JWT-based authentication
- RESTful API endpoints
- MongoDB database with Mongoose
- File uploads with Multer
- Role-based access control (Admin/User)
- Protected routes
- Error handling middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
cd fashionstore
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashionstore
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Make sure MongoDB is running on your system:
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Update `MONGODB_URI` with your connection string

6. Seed the database with sample data (including admin user):
```bash
npm run seed
```

7. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is occupied)

## 🔑 Default Login Credentials

After running the seeder, you can use these credentials:

### Admin Account
- **Email**: `admin@fashionstore.com`
- **Password**: `admin123`

### Regular User Account
- **Email**: `user@fashionstore.com`
- **Password**: `user123`

## 📁 Project Structure

```
fashionstore/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, upload middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   ├── server.js        # Entry point
│   └── seeder.js        # Database seeder
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── package.json
│
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Search
- `GET /api/search?q=query` - Search products

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Wishlist (Protected)
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

### Admin Routes (Admin only)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

## 🎨 Color Scheme

- **Primary**: #FF3E6C (Pinkish Red)
- **Accent**: #FFD700 (Gold)
- **Background**: #FAFAFA (Light) / #1a1a1a (Dark)
- **Text**: #333333 (Dark Gray)

## 🚀 Usage

### As a Customer:
1. Browse products by category (Men, Women, Kids)
2. Search for specific products
3. View product details
4. Add items to cart or wishlist
5. Proceed to checkout
6. View order history in profile

### As an Admin:
1. Login with admin credentials
2. Access Admin Dashboard from user menu
3. Add/Edit/Delete products
4. View all orders and update order status
5. View statistics and user management

## 📝 Key Features Implementation

### Real-time Updates
- Cart and wishlist counts update immediately
- Products added by admin appear instantly on frontend
- Order status updates reflect immediately

### State Management
- React Context API for global state (auth, cart, wishlist)
- localStorage for guest users (cart/wishlist persistence)
- Automatic sync when user logs in

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile devices
- Touch-friendly buttons and inputs
- Optimized layouts for all screen sizes

## 🐛 Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: Make sure MongoDB is running and connection string is correct
- **Port Already in Use**: Change PORT in `.env` file
- **JWT Errors**: Ensure JWT_SECRET is set in `.env`

### Frontend Issues:
- **API Connection Error**: Check if backend is running and VITE_API_URL is correct
- **CORS Errors**: Backend CORS is enabled for all origins in development
- **Build Errors**: Delete `node_modules` and reinstall dependencies

## 📦 Production Deployment

### Backend:
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Set up proper MongoDB connection (MongoDB Atlas recommended)
4. Configure file storage (Cloudinary or AWS S3)
5. Use environment variables for sensitive data

### Frontend:
1. Update `VITE_API_URL` to production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to hosting service (Vercel, Netlify, etc.)

## 🔒 Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Admin routes are protected
- Input validation on both client and server
- CORS configured for API security

## 📚 Technologies Used

- **Frontend**: React.js, Vite, Tailwind CSS, React Router v6, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer
- **Tools**: Git, npm, Postman (for API testing)

## 🤝 Contributing

This is a beginner-friendly project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Learning Resources

- React Documentation: https://react.dev
- Express.js Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- Tailwind CSS Documentation: https://tailwindcss.com

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments (extensively documented for beginners)
- Check console logs for errors

---

**Happy Coding! 🚀**

