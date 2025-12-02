# 🎮 GAMEVAULT - Pre-owned Games Marketplace

A modern, pixel-style game marketplace built with Next.js 16, featuring a vermillion blaze color scheme and zero-config data storage. Buy and sell pre-owned games with ease!

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## ✨ Features

### 🛍️ Shopping Experience
- **Game Browsing**: Browse through a curated collection of pre-owned games
- **Advanced Search**: Search games by title, category, or seller
- **Smart Filtering**: Filter by category, platform, condition, and price range
- **Sorting Options**: Sort by price (low to high, high to low) or rating
- **Pagination**: Navigate through game listings with ease
- **Game Details**: Detailed game pages with full information
- **Shopping Cart**: Add games to cart and manage your selections
- **Checkout Process**: Smooth checkout experience

### 👤 User Features
- **User Authentication**: Sign up and login system
- **User Profiles**: Manage your account information
- **Order History**: View all your past orders
- **Order Tracking**: Track individual orders with order IDs
- **Sell Games**: List your own games for sale

### 🎨 Design & UI
- **Pixel Art Style**: Retro pixel-style design with Press Start 2P font
- **Vermillion Blaze Theme**: Eye-catching orange-red color scheme
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Smooth Animations**: Pixel-style hover effects and transitions

### 🔧 Admin Features
- **Admin Panel**: Manage game listings
- **Add/Edit Games**: Add new games or modify existing ones
- **Game Management**: Full CRUD operations for games

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository** (or navigate to the project directory):
```bash
cd nextjs
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to:
```
http://localhost:3000
```

**That's it! No database configuration, no accounts to create - just run and code!**

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.js            # Root layout with pixel font
│   │   ├── page.js              # Home page with game listings
│   │   ├── globals.css          # Global styles & theme
│   │   ├── about/               # About page
│   │   ├── admin/               # Admin panel
│   │   ├── cart/                # Shopping cart page
│   │   ├── checkout/            # Checkout page
│   │   ├── game/[id]/           # Individual game detail pages
│   │   ├── login/               # Login page
│   │   ├── signup/              # Sign up page
│   │   ├── orders/              # Order history page
│   │   ├── order/[id]/          # Individual order detail page
│   │   └── sell/                # Sell games page
│   ├── components/              # React components
│   │   ├── Navigation.js        # Main navigation bar
│   │   ├── Footer.js            # Footer component
│   │   ├── GameCard.js          # Game card component
│   │   ├── SearchBar.js         # Search bar component
│   │   └── FilterSidebar.js     # Filter sidebar component
│   ├── data/
│   │   └── games.json           # Game data (edit to add/modify games)
│   └── lib/                     # Utility functions
│       ├── games.js             # Game management utilities
│       ├── storage.js           # localStorage utilities
│       └── utils.js             # General utilities
├── public/                      # Static assets
│   ├── bg.jpg                   # Background image
│   └── ...
├── components.json              # shadcn/ui configuration
├── package.json                 # Dependencies
├── todo.md                      # Project todo list
└── README.md                    # This file
```

## 🎨 Color Scheme

The site uses a **Vermillion Blaze** color scheme:

- **Primary**: `#FF4500` (Orange Red)
- **Secondary**: `#FF6347` (Tomato)
- **Accent**: `#FF8C00` (Dark Orange)
- **Background**: `#0A0A0A` (Dark)
- **Cards**: `#1A0A0A` (Slightly lighter dark)
- **Text**: `#FFFFFF` (White) / `#CCCCCC` (Light Gray)

## 🔤 Typography

The site uses **Press Start 2P** - a pixel-style font from Google Fonts, giving it that retro gaming aesthetic.

## 💾 Data Storage

**No database setup required!** The app uses a simple, zero-config approach:

### 1. **JSON File** (`src/data/games.json`)
   - Stores all game listings
   - Edit this file to add, remove, or modify games
   - No database migrations or setup needed
   - Games are automatically loaded into localStorage on first visit

### 2. **localStorage** (Browser Storage)
   - **Shopping Cart**: Stores cart items
   - **User Session**: Stores logged-in user data
   - **Order History**: Stores completed orders
   - **Game Data**: Cached game listings from JSON

### Adding Games

To add more games, simply edit `src/data/games.json`:

```json
{
  "id": 25,
  "title": "Your Game Title",
  "description": "Game description",
  "price": 29.99,
  "originalPrice": 59.99,
  "discount": 50,
  "image": "https://example.com/game-image.jpg",
  "category": "Action",
  "platforms": ["PC", "PS5"],
  "rating": 4.5,
  "reviewCount": 1000,
  "condition": "Like New",
  "seller": "SellerName"
}
```

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **React**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) (Google Fonts)

## 📱 Pages & Routes

- `/` - Home page with game listings
- `/about` - About page
- `/game/[id]` - Individual game detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/login` - User login
- `/signup` - User registration
- `/orders` - Order history
- `/order/[id]` - Individual order details
- `/sell` - Sell your games
- `/admin` - Admin panel (game management)

## 🔑 Key Features Explained

### Search & Filter
- Search by game title, category, or seller name
- Filter by multiple criteria simultaneously
- Real-time filtering as you type

### Shopping Cart
- Add/remove items
- Persistent cart (saved in localStorage)
- Cart count badge in navigation

### User Authentication
- Simple email/password authentication
- Session management via localStorage
- Protected routes for authenticated users

### Order Management
- Complete order history
- Individual order tracking
- Order confirmation pages

### Admin Panel
- Add new games
- Edit existing games
- Delete games
- All changes persist to localStorage

## 🎯 Usage Examples

### Adding a Game (via Admin Panel)
1. Navigate to `/admin`
2. Fill in game details
3. Click "Add Game"
4. Game appears in listings immediately

### Purchasing a Game
1. Browse games on home page
2. Click on a game to view details
3. Click "Add to Cart"
4. Go to cart and proceed to checkout
5. Complete order

### Selling a Game
1. Navigate to `/sell`
2. Fill in game details
3. Submit listing
4. Your game appears in the marketplace

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Since your project is already on GitHub, deploying to Vercel is simple:

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "Add New Project"** and import your repository
3. **Vercel auto-detects Next.js** - no configuration needed!
4. **Click "Deploy"** and you're live in minutes!

**That's it!** Your site will be live at `your-project.vercel.app`

### Automatic Deployments

- ✅ Every push to `main` branch = Production deployment
- ✅ Every push to other branches = Preview deployment
- ✅ Free SSL certificate included
- ✅ Global CDN included

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Other Deployment Options

- **Netlify**: Similar to Vercel, great for Next.js
- **Railway**: Good for full-stack apps
- **AWS Amplify**: Enterprise-grade hosting
- **Self-hosted**: Docker, VPS, etc.

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- Uses Next.js 16 App Router
- Client components marked with `'use client'`
- Tailwind CSS for styling
- Consistent pixel-style design throughout

## 📝 Notes

- **Zero Configuration**: No database, no API setup - just JSON + localStorage
- **Local Development**: Perfect for learning and prototyping
- **Production Ready**: Can be easily extended with a backend API
- **Responsive**: Works on all device sizes
- **Accessible**: Semantic HTML and ARIA labels

## 🔮 Future Enhancements

Check `todo.md` for the complete list of planned features and improvements.

Some ideas:
- Backend API integration
- Real payment processing
- User reviews and ratings
- Wishlist functionality
- Email notifications
- Image upload for game listings

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own marketplace!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)

---

**Happy Gaming! 🎮**
