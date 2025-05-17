# Click Fit 🏋️‍♂️

Welcome to **Click Fit**, a one-page responsive sports and fitness website developed as part of a full-stack developer task for On Wave Group.

---

## 🖼️ Screenshot

![Click Fit Screenshot](public/assets/screenshot.png)

## 🚀 Project Overview

**Click Fit** is a visually engaging, responsive sports-themed web application built using:

- **Frontend:** HTML5, CSS3, Bootstrap, JavaScript, jQuery, jQuery Plugins
- **Backend:** Node.js (Express.js)
- **Database:** MySQL

---

## 🌐 Features

- Responsive, clean, and attractive UI design
- Subtle UI animations to enhance user experience
- Drag & drop image upload or click-to-upload functionality
- Uploaded images are saved locally to `upload_images/` directory (no cloud services used)
- AJAX call on page load to fetch data from `http://numbersapi.com/1/30/date?json` and display it dynamically
- MySQL Script with:
  - Users table schema
  - Stored procedure `addUser` to insert a new user

---

## 📁 Project Structure

```
click-fit/
├── db/
├── public/
│   ├── assets/
│   └── index.html
│   └── style.css
│   └── script.js
├── upload_images/
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Setup Project (Local)

1. **Clone the repository**

   ```bash
   git clone https://github.com/WaqarAhmed3/click-fit.git
   cd click-fit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   node server.js
   ```

4. **Open browser at** [http://localhost:3000](http://localhost:3000)
