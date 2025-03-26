# React + Vite

# E-Commerce Website

## Overview

This is a comprehensive eCommerce web application built with React.js and Firebase. Users can sign up or log in using email/password authentication or Google authentication. They can add products to their cart, mark items as favorites, and securely store all data in Firebase Firestore. The application also includes an Admin Panel for managing products, orders, and user data.

## Features

- User authentication (Email/Password & Google Sign-In)
- Add products to cart
- Mark products as favorites
- Firebase Firestore integration for data storage

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/Code-With-Ahmad/E-commerce-App-Reactjs/tree/main
cd your-repo-folder
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Firebase Configuration

To configure Firebase in your project, follow these steps:

- Create a .env file at the root level, alongside the src folder.
- Copy and paste the following code into the .env file:

```
VITE_FIREBASE_API_KEY = "your_api_key"
VITE_FIREBASE_Auth_Domain = "your_auth_domain"
VITE_FIREBASE_Project_ID = "your_project_id"
VITE_FIREBASE_Storge_Bucket = "your_storage_bucket"
VITE_FIREBASE_Message_Sender_Id = "your_sender_id"
VITE_FIREBASE_App_Id = "your_app_id"
VITE_FIREBASE_Measurement_Id = "your_measurement_id"
```

- Replace your\_\* placeholders with your actual Firebase project credentials.

This ensures secure and efficient integration of Firebase into your project.

### 4. Run the Project

```sh
npm run dev
```

## Technologies Used

- React.js
- Firebase (Authentication & Firestore)
- Tailwind CSS (For Styling)
- React Router
- Redux Toolkit (for state management)
- Axios (API Call)
- FakeStoreApi (for Products Data)

## Contribution

Feel free to fork and improve the project. If you find any issues, open an issue or submit a pull request.

## License

This project is open-source under the MIT License.
