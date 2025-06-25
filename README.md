# 💬 instaApp – Real-Time Chat Application

**instaApp** is a real-time chatting application built using **React**, **Firebase**, **Redux**, **Tailwind CSS**, and **React Router DOM**. It enables users to register, log in, and chat instantly through Firebase's Realtime Database.

---

## 🚀 Features

- 🔐 **User Authentication** – Register and login securely using Firebase Authentication.
- 💬 **Real-Time Messaging** – Send and receive messages instantly via Firebase Realtime Database.
- 🗂️ **State Management with Redux** – Manage global user and chat data efficiently.
- 🌐 **Client-Side Routing** – Navigate seamlessly using React Router DOM.
- 🎨 **Tailwind CSS Styling** – Clean and modern UI design with utility-first CSS.
- 📱 **Partial Responsiveness** – Core sections like login and chat screens are mobile-friendly.
- 🔓 **Logout Functionality** – Securely sign out from the session.

---

## 🛠️ Tech Stack

- **JavaScript (ES6+)**
- **React**
- **Redux Toolkit**
- **React Router DOM**
- **Firebase Auth + Realtime Database**
- **Tailwind CSS**

---

## 🧪 Functionality Checklist

- ✅ User registration/login using Firebase
- ✅ Message sending and receiving in real-time
- ✅ Message timestamps
- ✅ Logout functionality
- ✅ Protected routes
- ✅ Firebase session persistence
- ✅ Partial responsiveness for key components

---



## 📁 Folder Structure
src/
├── assets/               # Static files (e.g. images, icons)
├── components/           # Reusable UI and functional components
│   ├── Authentication/   # Login, SignUp, and related auth components
│   ├── EditProfile/      # Edit user details
│   ├── Feed/             # Central feed view
│   ├── FriendRequest/    # Handle friend requests
│   ├── Friends/          # List of friends
│   ├── Homepage/         # Dashboard/Homepage layout
│   ├── Message/          # Chat and messaging components
│   ├── Post/             # Post creation and display
│   ├── Profile/          # User profile view
│   ├── ProfilePage/      # Complete profile page
│   ├── Sidebar/          # Sidebar navigation
│   └── SuggestedUser/    # Suggested friends to follow
├── Pages/                # Route-based pages
│   ├── ForgotPassword/   # Password reset page
│   ├── Login/            # Login page
│   └── Registration/     # Sign up page
├── Slices/               # Redux slices for state management
├── Store.js              # Redux store configuration
├── App.js                # Route and layout setup
├── main.jsx              # React app entry point
├── App.css / index.css   # Global styles

## 📦 How to Run the Project Locally

### 1. Clone the Repository
bash:
git clone https://github.com/fatehajahan/InstaApp
and cd instaApp and then to Install Dependencies
bash: npm install
or you can also visit my hosted link - https://insta-app-omega.vercel.app/

## 📦 Images of my InstaApp
#### 🔐 Login Page
![alt text](image.png)

#### 💬 Chat Interface
![alt text](image-1.png)=

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
