# React 18 & Redux Toolkit Shopping Cart

A full-featured client-side e-commerce shopping cart application built with React 18, Redux Toolkit, React Router v6, and Tailwind CSS.

## Architecture & Features
- **Global State with Redux Toolkit**: `productsSlice` manages inventory counts, cart mutations, quantity adjustments, tax calculations, and dynamic subtotals.
- **Client-Side Routing**: Multi-page routing with React Router (`/`, `/products`, `/cart`).
- **Inventory Bounds Control**: Prevents out-of-stock purchases and syncs available inventory with cart contents.
- **Responsive Dark Design**: Tailored slate dark UI with Tailwind CSS.

## Tech Stack
- React 18, Vite
- Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- React Router v6
- Tailwind CSS

## Quick Start
```bash
# Navigate to the app directory
cd apps/react-shopping-cart

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
