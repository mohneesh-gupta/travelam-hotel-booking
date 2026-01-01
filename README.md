# 🌍 Travelam

> *Discover. Explore. Stay. Repeat.*

![Wanderlust Banner](https://img.shields.io/badge/Project-Wanderlust-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?style=flat-square)

---

## 🧭 Overview

**Wanderlust** is a full-stack web application inspired by **Airbnb**, allowing users to explore, list, and book unique accommodations across the globe.  
Built with the **MERN-like architecture (MongoDB, Express, Node.js, and EJS)**, it delivers a seamless and intuitive user experience for both travelers and hosts.

---

## ✨ Features

- 🏡 **Property Listings** – Add, edit, or browse beautiful stays with rich details and images.  
- 🔍 **Smart Search & Filters** – Find stays by location, price, or availability.  
- 👤 **User Authentication** – Secure signup, login, and session management using Passport.js.  
- 💳 **Bookings & Payments** – Reserve properties and integrate payments using **Razorpay** or **Stripe**.  
- 📱 **Fully Responsive Design** – Optimized for both mobile and desktop views.  
- ⚙️ **Scalable Backend** – Built with modular architecture using Express.js and MongoDB.

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML, CSS, JavaScript, EJS Templates |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | Passport.js (Local Strategy) |
| **Payment Gateway** | Razorpay / Stripe (optional) |
| **Version Control** | Git & GitHub |
| **Deployment** | Render / Vercel / MongoDB Atlas |

---

## 🏗️ Project Architecture

<img width="1920" height="1080" alt="Screenshot 2025-09-19 075303" src="https://github.com/user-attachments/assets/05af50ff-c2e2-451e-9518-e25f6969664c" />
<img width="1920" height="1080" alt="Screenshot 2025-09-19 075336" src="https://github.com/user-attachments/assets/5eaf376e-947e-4f7a-8a02-d7d1738daee1" />
<img width="1920" height="1080" alt="Screenshot 2025-09-19 075343" src="https://github.com/user-attachments/assets/901bc752-1e67-4dc9-996d-3aad299dcdd3" />



# Project Structure

This project has been restructured into a Client-Server architecture.

## Structure

- **client/**: Contains the frontend code (Views, Public assets).
- **server/**: Contains the backend code (Express app, Models, Routes, Database logic).

## How to Run

1. Open your terminal.
2. Navigate to the `server` directory:
   ```bash
   cd server
   ```
3. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node app.js
   ```
   or if you use nodemon:
   ```bash
   nodemon app.js
   ```

The server will serve the frontend views from the `../client/views` directory.
>>>>>>> 6c72dc8 (final setup)
