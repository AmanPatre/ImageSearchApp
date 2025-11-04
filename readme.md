# MERN + OAuth Image Search (UD Studios Internship Project)

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built to fulfill the UD Studios internship task. It's a real-world image search app that uses Google OAuth 2.0 for user authentication, pulls image data from the Unsplash API, and stores all search metadata in a MongoDB database.

---

## 🚀 Core Features

* **Secure OAuth Authentication:** Users must log in with their Google account to use the app. All sensitive routes and search functions are protected.
* **Live Image Search:** Integrates directly with the **Unsplash API** to fetch and display high-quality, high-resolution images.
* **Public Top Searches:** A non-protected module that aggregates and displays the top 5 most frequent search terms from *all* users.
* **Personal Search History:** A protected module that shows *only* the logged-in user's past search terms, complete with date and timestamp.
* **Modern Frontend:** Built with **Vite + React** and styled with **Tailwind CSS** for a responsive, clean, and fast user interface.
* **Image Multi-Select:** A "check-box" overlay on all images allows users to select multiple items, with a dynamic counter tracking the total.

---

## 🖼️ Visual Proof

| 1. Login Page | 2. Main Dashboard (After Search) |
| :---: | :---: |
| ![Login Page](https://github.com/user-attachments/assets/7244abd7-80ab-4c63-a201-b3db8aa20a4c) | ![Main Dashboard](https://github.com/user-attachments/assets/a3018655-521f-4a9f-8c14-e3c0de4cec64) |
| **3. Multi-Select Feature** | **4. Sidebar (Top Search & History)** |
| ![Multi-Select](https://github.com/user-attachments/assets/a2c7a7db-038f-4dbd-bed3-7c48472f4d2c) | ![Sidebar](https://github.com/user-attachments/assets/ae644b95-d05b-44b6-8963-13c06dee158e) |

---

## 🛠️ Tech Stack

| Area | Technology |
| :--- | :--- |
| **Frontend** | React.js (with Vite), Tailwind CSS, React Router v6, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | Passport.js (`passport-google-oauth20`), `express-session` |

---

## 📁 Folder Structure

The project uses a standard monorepo structure with two independent packages: `/client` and `/server`.
```
/ud-studios-internship-project
│
├── /client                 (Vite + React Frontend)
│   ├── /src
│   │   ├── /components    (Reusable UI components: Header, ImageGrid, etc.)
│   │   ├── /pages         (Main page components: LoginPage, DashboardPage)
│   │   ├── App.jsx        (Main router)
│   │   ├── main.jsx       (React entry point)
│   │   ├── index.css      (Tailwind directives)
│   │   └── vite.config.js (Vite config & proxy setup)
│   ├── package.json
│   └── .gitignore
│
└── /server                 (Express + Node.js Backend)
    ├── /controllers       (All business logic for routes)
    ├── /middlewares       (isLoggedIn auth check)
    ├── /models            (User.js & Search.js Mongoose schemas)
    ├── /routes            (API route definitions)
    ├── /services          (Passport.js configuration)
    ├── index.js           (Main server entry point)
    ├── package.json
    ├── .env.example       (Template for environment variables)
    └── .gitignore
```


## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### 1. Prerequisites

* Node.js (v18.x or later)
* MongoDB Atlas account (or a local MongoDB instance)
* Google Cloud Platform account
* Unsplash Developers account

### 2. Backend Setup (`/server`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create `.env` file:**
    Copy `.env.example` to a new file named `.env`. You must fill in all the values.

    ```env
    # MongoDB Connection String (from MongoDB Atlas)
    MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

    # Session Secret Key (can be any random, long string)
    COOKIE_KEY=YOUR_RANDOM_SESSION_SECRET_STRING

    # Google OAuth Credentials (from Google Cloud Console)
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

    # Unsplash API Key (from Unsplash Developers)
    UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY
    ```
4.  **Run the server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

### 3. Frontend Setup (`/client`)

1.  **Navigate to the client directory (in a new terminal):**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the client (Vite):**
    ```bash
    npm run dev
    ```
    The app will open automatically at `http://localhost:3000`. The Vite proxy (defined in `vite.config.js`) will handle all API requests to the backend.

---

## 🌐 API Endpoints & cURL Examples

Here is the full API documentation, including cURL examples.

### Testing Protected Routes

All protected routes require a session cookie. To get one for testing:
1.  Log in to the app through the browser (`http://localhost:3000`).
2.  Open your browser's **Developer Tools (F12)**.
3.  Go to the **Network** tab and click on any API request (e.g., `current_user`).
4.  Find the **Request Headers** section and copy the entire `Cookie` value (e.g., `session=ey...`).
5.  In the cURL examples, replace `YOUR_SESSION_COOKIE_VALUE` with this copied value.

---

### Authentication API

#### `GET /auth/google`
* **Description:** Initiates the Google OAuth login flow. This endpoint is meant to be used by the browser, not directly via cURL.
* **cURL Example:** (Browser-only redirect)
    ```bash
    # This route must be opened in a browser to work.
    # Open http://localhost:5000/auth/google
    ```

#### `GET /api/current_user`
* **Description:** (Protected) Returns the user object if logged in, or an empty response if not.
* **cURL Example:**
    ```bash
    curl -X GET http://localhost:5000/api/current_user \
         --cookie "session=YOUR_SESSION_COOKIE_VALUE"
    ```

#### `GET /api/logout`
* **Description:** (Protected) Logs out the user, destroys the session, and redirects to the homepage.
* **cURL Example:**
    ```bash
    curl -X GET http://localhost:5000/api/logout \
         --cookie "session=YOUR_SESSION_COOKIE_VALUE"
    ```

---

### Search API

#### `GET /api/top-searches`
* **Description:** (Public) Returns an array of the top 5 most searched terms across all users.
* **cURL Example:**
    ```bash
    curl -X GET http://localhost:5000/api/top-searches
    ```

#### `GET /api/history`
* **Description:** (Protected) Returns the personal search history (last 20) for the currently logged-in user.
* **cURL Example:**
    ```bash
    curl -X GET http://localhost:5000/api/history \
         --cookie "session=YOUR_SESSION_COOKIE_VALUE"
    ```

#### `POST /api/search`
* **Description:** (Protected) Submits a new search. Logs the term to history and returns results from Unsplash.
* **Body:** `{ "term": "your search term" }`
* **cURL Example:**
    ```bash
    curl -X POST http://localhost:5000/api/search \
         -H "Content-Type: application/json" \
         --cookie "session=YOUR_SESSION_COOKIE_VALUE" \
         -d '{"term": "nature"}'
    ```
