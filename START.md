# 🚀 Quick Start Guide

## Step 1: Open Command Prompt (CMD)

Press `Win + R`, type `cmd`, and press Enter.

## Step 2: Navigate to Project

```cmd
cd "C:\Users\USER\Desktop\Software Development\Projects\birthday 1\birthday-app"
```

## Step 3: Install Dependencies

```cmd
npm install
```

This will install all required packages. It may take 2-3 minutes.

## Step 4: Start the App

```cmd
npm run dev
```

## Step 5: Open in Browser

The app will automatically open at: **http://localhost:3000**

If it doesn't open automatically, manually visit: `http://localhost:3000`

---

## 🎯 What You Can Do

### As a User:
1. Visit the homepage
2. Click "Send a Gift Now"
3. Fill in the payment form
4. See the success page with confetti! 🎉

### As an Admin:
1. Click "Admin Login" in the navbar
2. Use these credentials:
   - **Email:** admin@example.com
   - **Password:** admin123
3. View the dashboard with all payments

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the command prompt window.

---

## ⚠️ Troubleshooting

### If npm commands don't work in PowerShell:

Use **Command Prompt (CMD)** instead of PowerShell.

### If port 3000 is already in use:

The app will automatically use port 3001 or another available port.

### If you see dependency errors:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 📱 Features to Test

- ✅ Dark/Light mode toggle
- ✅ Send a birthday gift
- ✅ View confetti animation
- ✅ Admin login
- ✅ View payment dashboard
- ✅ Responsive design (resize your browser)

Enjoy! 🎂
