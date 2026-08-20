# Frontend Development Archive & Learning Monorepo

A centralized monorepo preserving foundational frontend engineering coursework, standalone mini-applications, responsive UI templates, and component architectures spanning HTML5, CSS3, JavaScript (ES6+), React 18, Redux Toolkit, and Next.js.

---

## Master Catalog & Project Index

### 1. Standalone Web Applications (`apps/`)

| Application | Core Tech Stack | Description | Location |
| :--- | :--- | :--- | :--- |
| **React Shopping Cart** | React 18, Redux Toolkit, React Router, Tailwind CSS | Full-scale e-commerce cart with inventory management, cart drawer, and tax calculation. | [`apps/react-shopping-cart/`](apps/react-shopping-cart/) |
| **Weather Dashboard** | Vanilla JS, OpenWeatherMap API, TimeZoneDB, Unsplash | Real-time weather forecasts, barometric metrics, dynamic photography, and timezone mapping. | [`apps/weather-app/`](apps/weather-app/) |
| **Currency Converter** | Vanilla JS, ExchangeRate-API, FlagsAPI, Bootstrap 5 | Real-time currency conversions, currency swap animations, and dynamic country flag icons. | [`apps/currency-converter/`](apps/currency-converter/) |
| **Meme Generator** | Vanilla JS, Imgflip REST API, Bootstrap 5 | Dynamic REST API meme explorer with live index lookups and responsive canvas rendering. | [`apps/meme-generator/`](apps/meme-generator/) |

---

### 2. Multi-Page & Responsive Templates (`templates/`)

| Template | Design System | Highlights | Location |
| :--- | :--- | :--- | :--- |
| **Chronos Luxury Watches** | Bootstrap 5, Custom Dark CSS | Modern product landing page with editorial photo galleries, interactive specs, and luxury palette. | [`templates/watches-luxury-landing/`](templates/watches-luxury-landing/) |
| **FreshBite Organic Delivery** | Multi-Page HTML5, Bootstrap 5 | Complete multi-page site (`index.html`, `products.html`, `about.html`, `contact.html`) with order forms. | [`templates/static-online-food/`](templates/static-online-food/) |

---

### 3. Foundational Learning Curriculum

```
frontend-archive/
├── apps/                       # Standalone applications (React Cart, Weather, Currency, Meme)
├── templates/                  # Full landing pages (Chronos Watches, FreshBite Food)
├── html/                       # Semantic HTML5 fundamentals, forms, and validation
├── css/                        # Responsive CSS3 layouts, Flexbox, Grid, and utility classes
├── js/                         # Core ES6+ JavaScript, DOM APIs, and utility scripts
├── react/                      # React component hierarchy, state hooks, and lecture builds
├── next/                       # Next.js page routing and SSR introduction
└── toolkit/                    # Redux Toolkit global state management starter
```

---

## Setup & Running Locally

### Static HTML / CSS / JS Projects
Open any project's `index.html` directly in a browser or launch with **VS Code Live Server**.

### React & Redux Toolkit Applications
```bash
# Navigate to the shopping cart app
cd apps/react-shopping-cart

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## Archival Status & Maintenance

This repository serves as a permanent educational archive and technical reference for foundational frontend milestones. Active production projects are developed in dedicated repositories.
