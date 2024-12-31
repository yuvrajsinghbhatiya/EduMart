# EDUMART: E-Commerce Platform for Students

**EDUMART** is a user-friendly e-commerce application tailored for students, built with the MERN stack (MongoDB, Express.js, React, Node.js), Redux Toolkit, and Material UI. It offers seamless features for users and admins.

---

## Features

### For Users:
- **Orders:** Place orders and view history.
- **Profile:** Manage email, username, and addresses.
- **Shopping Cart:** Add products, adjust quantities, and view totals.
- **Wishlist:** Add/remove products and annotate with notes.
- **Product Reviews:** Write, edit, and delete reviews with real-time updates.

### For Admins:
- **Product Management:** Add, edit, delete, or soft-delete products.
- **Order Management:** View and update orders.

### Security & Scalability:
- **Secure Authentication:** Login, signup, OTP, and password reset.
- **Scalable Design:** Built to handle growing demand.

---

## Setup Guide

### 1. Clone the Repository:
```bash
git clone https://github.com/yuvrajsinghbhatiya/Edumart
cd edumart
```

### 2. Install Dependencies:
- **Frontend:**
```bash
cd frontend
npm install
```
- **Backend:**
```bash
cd backend
npm install
```

### 3. Configure Environment Variables:
- **Backend:** Create a `.env` file in the `backend` directory with:
```bash
MONGO_URI="mongodb://localhost:27017/your-database"
ORIGIN="http://localhost:3000"
EMAIL="your-email@example.com"
PASSWORD="your-email-password"
SECRET_KEY="your-secret-key"
```
- **Frontend:** Create a `.env` file in the `frontend` directory with:
```bash
REACT_APP_BASE_URL="http://localhost:8000"
```

### 4. Seed Data:
```bash
cd backend
npm run seed
```

### 5. Run Development Servers:
- **Backend:**
```bash
cd backend
npm run dev
```
- **Frontend:**
```bash
cd frontend
npm start
```

### 6. Access Application:
- **Backend:** [http://localhost:8000](http://localhost:8000)
- **Frontend:** [http://localhost:3000](http://localhost:3000)

---

## Author
- [@Yuvraj](https://github.com/yuvrajsinghbhatiya)






