# Belal Waheed — Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Frontend Developer.

**[🌐 Live Demo](https://belalwaheed.vercel.app)** · **[📄 Resume](https://belalwaheed.vercel.app/resume)** · **[📧 Contact](mailto:belalwaheed000@gmail.com)**

---

## ✨ Features

- **Scroll-triggered animations** powered by Framer Motion
- **Earthy green dark theme** with custom design system
- **Fully responsive** — optimized for all screen sizes
- **Accessible UI** components built with Radix UI
- **Resume page** with downloadable PDF and print-friendly layout
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap
- **Blazing fast** — React 19 + Vite + React Compiler

## 🛠 Tech Stack

| Category          | Technologies                             |
| ----------------- | ---------------------------------------- |
| **Framework**     | React 19, TypeScript                     |
| **Styling**       | Tailwind CSS 4, class-variance-authority |
| **Animation**     | Framer Motion                            |
| **UI Primitives** | Radix UI (Tooltip, Slot)                 |
| **Icons**         | Lucide React                             |
| **Routing**       | React Router                             |
| **Build**         | Vite, React Compiler (Babel)             |
| **Deployment**    | Vercel                                   |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/BelalWaheed/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Layout
│   ├── sections/     # Hero, About, Projects, Skills, Contact
│   ├── ui/           # Button, Card, Badge, Input, Textarea
│   ├── SEO.tsx       # React 19 native metadata (OG, Twitter, canonical)
│   └── JsonLd.tsx    # Structured data (Person + WebSite schema)
├── lib/
│   ├── constants.ts  # Projects, skills, social links, profile & SEO config
│   ├── utils.ts      # cn() class-merge utility
│   └── useScrollAnimation.ts
├── pages/
│   ├── HomePage.tsx
│   └── ResumePage.tsx
└── types/
    └── index.ts      # TypeScript interfaces
public/
├── robots.txt
├── sitemap.xml
└── Belal_Waheed.pdf  # Downloadable resume
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Belal Waheed</strong>
</p>
