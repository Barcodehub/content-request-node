# Social Network Backend

## Description
This project is a robust backend for a social network, developed with Node.js and Express. It provides a RESTful API supporting functionalities such as user registration, authentication, posts, comments, likes, friend requests, and more.

## Características
- User registration and login with JWT
- Create, read, update, and delete posts
- Comment system for posts
- Like functionality for posts and comments
- Friend request system
- User search
- Privacy control for posts
- Personalized news feed

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing

# Set up environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  ```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/chatapp
  JWT_SECRET=your_jwt_secret
  ```
- Adjust the values according to your setup

# Iniciar el servidor:
  `npm run dev`

# API Usage:

You can view or download the API test file [here](pruebas-api.pdf).

