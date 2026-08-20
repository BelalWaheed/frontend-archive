# 💼 Belal Waheed — Portfolio

A modern, animated developer portfolio built with **React**, **Tailwind CSS**, **Framer Motion**, and **Material Tailwind**. Includes a fully working contact form using **Formspree**, smooth scroll-based animations, and responsive design.

## 🚀 Features

- ⚡ Animated sections on scroll (Framer Motion)
- 💬 Contact form powered by Formspree with toast notifications
- 🎨 Tailwind CSS custom themes and shadows
- 🌙 Dark-themed gradient layout
- 📱 Fully responsive on all screen sizes
- 🔗 Social media links and footer

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Formspree](https://formspree.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router](https://reactrouter.com/)

## 📂 Project Structure

```

src/
├── components/
│   └── Footer.jsx
│   └── Contact.jsx
│   └── Home.jsx
├── App.jsx
├── main.jsx
├── index.css
└── ...

```

## 📧 Setting up Formspree

1. Go to [https://formspree.io](https://formspree.io)
2. Create a form and copy the form ID (like `hola`)
3. In your component:
   ```js
   const [state, handleSubmit] = useForm("hola");
   ```

````

4. Done! Messages are now sent directly to your inbox.

> ✅ Tip: To reuse the form in the future, just paste the same form ID into any component.

## 🔧 Setup

```bash
# Clone the repo
git clone https://github.com/BelalWaheed/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the app
npm run dev
````

## 🖼️ Preview

![screenshot](https://i.ibb.co/0j4brtVY/me.jpg)

## 📃 License

This project is licensed for personal and portfolio use only.
