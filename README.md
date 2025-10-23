# 🌌 TaskSpace: Your Mission Control for Daily Tasks

## ✨ Project Overview

**TaskSpace** is a modern, full-stack task management application designed to bring clarity and an intuitive, **space-themed UI** to your daily workflow. Inspired by mission control dashboards, TaskSpace helps you track your to-dos with precision, making task management less of a chore and more of a mission accomplished.

### 🛠️ Tech Stack

This project is built on the following technologies:

* **Frontend:** Next.js (React)
* **Backend:** Node.js (with Express.js)
* **Database:** MongoDB

---

## 🚀 Getting Started

This guide will get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your system:

* **Node.js & npm:** These are essential for running the JavaScript environment and managing dependencies. We recommend using the latest LTS version. If you don't have it, download it from the official [Node.js website](https://nodejs.org/).
    * *Verification:*
        ```bash
        node -v
        npm -v
        ```
* **MongoDB:** A running instance of MongoDB (either locally or a free cloud service like MongoDB Atlas) is required for data persistence.

### Installation & Setup

Follow these steps to set up the project locally:

1.  **Clone the Repository**
    Open your terminal, navigate to where you want to store the project, and run:
    ```bash
    git clone [Your Repository URL Here]
    cd task-space
    ```

2.  **Install Dependencies**
    Execute the following command in the project root directory. This uses **npm** to download all necessary frontend and backend packages:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (Crucial Step!)**
    You must create a `.env.local` file in the root of your project directory and add your MongoDB connection string.
    * Create the file:
        ```bash
        touch .env.local
        ```
    * Add your connection URL to the file:
        ```
        # Example: Replace <username>, <password>, and <cluster-url> with your details.
        MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/taskspace?retryWrites=true&w=majority"
        ```

---

## 💻 Usage (Launch Mission)

Once the project is set up and configured, you can launch the application with a single command.

1.  **Start the Development Server**
    This command compiles the Next.js application and starts the server in development mode.
    ```bash
    npm run dev
    ```

2.  **Access TaskSpace**
    The server will be running on port **3000** (default for Next.js).
    Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
    You should see the TaskSpace interface ready for launch!

---

## 🚧 Project Status: Under Development

**TaskSpace** is currently under active development. This initial push represents the core foundational structure. We are continuously working on new features, including:

* Task Filtering and Sorting
* User Authentication (Login/Signup)
* Improved Backend API resilience
