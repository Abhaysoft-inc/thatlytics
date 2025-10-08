# Thatlytics

An open-source web analytics platform designed to track and visualize website traffic, user interactions, and performance metrics.

## 📊 Overview

Thatlytics provides a privacy-focused alternative to traditional analytics platforms, helping you understand your website's performance and user behavior without compromising user privacy.

## ✨ Features

- **Real-time Traffic Monitoring** – Track visitor activity as it happens
- **User Interaction Analytics** – Monitor clicks, scrolls, and engagement patterns
- **Performance Metrics** – Analyze page load times and overall site performance
- **Visual Dashboards** – Clear, intuitive data visualization
- **Privacy-Focused** – Respects user privacy while providing valuable insights
- **Open Source** – Fully transparent and customizable

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) → [Download here](https://nodejs.org/)
- **npm** or **yarn** – Package managers (npm comes with Node.js)
- **Git** – Version control system

## 📦 Installation

Follow these steps to set up Thatlytics locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhaysoft-inc/thatlytics.git
cd thatlytics
```

### 2️⃣ Install Dependencies

Install dependencies for **both** the server and client:

```bash
# For server
cd server
npm install

# For client
cd ../client
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory and add:

```bash
MONGO_URI=your_mongo_database_url
PORT=5000
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

Once running, open:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🎯 Usage

### 1. Add Tracking Script

Add the following script to your website’s HTML:

```html
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "http://localhost:3000/analytics.js?id=" + i;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "YOUR_TRACKING_ID");
</script>
```

### 2. View the Dashboard

Visit 👉 [http://localhost:3000/dashboard](http://localhost:3000/dashboard)  
Log in with your credentials to view real-time analytics, reports, and metrics.

### 3. Generate Reports

You can generate:

- Traffic reports
- User behavior analysis
- Performance metrics
- Custom date-range reports

---

## 🧩 Project Structure

```plaintext
thatlytics/
├── client/              # Frontend (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/              # Backend (Node.js/Express)
│   ├── src/
│   ├── models/
│   ├── routes/
│   └── package.json
├── .env.example         # Sample environment file
├── README.md            # Project documentation
└── LICENSE
```

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

```bash
# 1. Fork the repository
# 2. Create a new branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# 4. Commit
git commit -m "Add: your feature description"

# 5. Push and open a PR
git push origin feature/your-feature-name
```

Please refer to our **Contributing Guidelines** for details.

---

## 🐛 Bug Reports

If you discover a bug, please open an issue on GitHub and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 📧 Contact

For questions, suggestions, or support, reach out via **GitHub Issues**.

---

## 🙏 Acknowledgments

Thanks to all contributors who helped build **Thatlytics** 💙  
Inspired by privacy-first analytics platforms.  
Built with ❤️ for the developer community.

⭐ **If you find this project helpful, please consider giving it a star on GitHub!**
