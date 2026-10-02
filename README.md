# Paradise Nursery

Paradise Nursery is an online plant shop built with React and Redux Toolkit.
Browse houseplants by category, add them to your cart, adjust quantities and see your total update live.

## Features
- Landing page with a "Get Started" button
- Plant catalogue: 3 categories, 6 plants each (image, name, price)
- "Add to Cart" button that disables once the plant is in the cart
- Navbar (Home, Plants, Cart) with a live cart count on every page
- Cart page: per-item subtotal, total amount, +/- quantity, delete, checkout ("Coming Soon") and continue shopping

## Run locally
```
npm create vite@latest paradise-nursery -- --template react
cd paradise-nursery
npm install @reduxjs/toolkit react-redux
# copy the files from src/ into your project's src/ folder
npm run dev
```
