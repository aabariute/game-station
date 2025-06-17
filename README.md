## 🎮 GAME STATION

A fully featured eCommerce website built with **Next.js** and **Supabase**, offering a seamless shopping experience and modern admin/user features.

## ✨ Features

- 🔐 Authentication via **NextAuth.js**
- 📊 Admin dashboard with statistics & charts (via Recharts)
- 📦 Order, product, and user management
- 👤 User profile and order history
- 💳 Secure payments with **Stripe API**
- 🧾 Interactive multi-step checkout
- 🕹️ Product carousel using **Swiper.js**
- ⭐ Ratings & reviews system
- 🔍 Search functionality
- 🧮 Sorting, filtering & pagination
- 🌙 System dark/light mode support
- ...and more!

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Variables

This project requires several environment variables to function properly. Create a `.env` file in the root of the project and add the following variables:

```env title=".env.local"
NEXT_PUBLIC_SERVER_URL=""
SUPABASE_URL=""
SUPABASE_KEY=""
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_FACEBOOK_ID=""
AUTH_FACEBOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
```

Note: To get your SUPABASE_URL and SUPABASE_KEY, log in to [Supabase](https://supabase.com/) and create a new project. Go to Settings → API. There you will find your Project URL (used as SUPABASE_URL) and anon public key (used as SUPABASE_KEY).

### 🧪 Run the Project

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
