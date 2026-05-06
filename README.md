[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23797609&assignment_repo_type=AssignmentRepo)

# News Aggregator API

A RESTful API for a personalized news aggregator built with Node.js and Express.js. The API allows users to register, log in, set news preferences (categories and keywords), and fetch personalized news articles from external sources. It also supports saving favorite articles and marking them as read.

## Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **User Preferences**: Store and retrieve user-specific news preferences.
- **Personalized News Feed**: Fetch articles from GNews API tailored to the user's saved preferences.
- **Article Management**: Save articles, mark them as read, or add them to favorites.
- **Search**: Search for specific news articles by keyword.
- **Caching**: In-memory caching for news fetches to minimize external API calls.
- **Testing**: Includes a suite of integration tests.

## Technologies

- **Node.js & Express.js**: Server and routing.
- **JSON / File System**: Lightweight data storage for users and articles.
- **JWT & bcrypt**: Authentication and security.
- **Axios**: HTTP client for external API requests.
- **Tap & Supertest**: Testing framework.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Set up the environment variables:
   Create a `.env` file in the root directory and add the following keys:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   NEWS_API_KEY=your_gnews_api_key_here
   ```

### Running the API

Start the development server:
```bash
npm start
```
The server will be available at `http://localhost:5000`.

### Testing

Run the test suite:
```bash
npm run test
```

## API Endpoints

### Authentication
- `POST /users/signup` - Register a new user
- `POST /users/login` - Log in and receive a JWT

### Preferences
- `GET /users/preferences` - Get user's news preferences (Requires Auth)
- `PUT /users/preferences` - Update preferences (Requires Auth)

### News
- `GET /news` - Fetch personalized news articles (Requires Auth)
- `GET /news/search/:keyword` - Search for specific news (Requires Auth)

### Articles Management
- `GET /articles` - Get all saved articles (Requires Auth)
- `POST /articles` - Save a new article (Requires Auth)
- `DELETE /articles/:id` - Remove a saved article (Requires Auth)
- `POST /articles/:id/read` - Mark an article as read (Requires Auth)
- `POST /articles/:id/favorite` - Mark an article as a favorite (Requires Auth)
- `GET /articles/read` - Get all read articles (Requires Auth)
- `GET /articles/favorites` - Get all favorite articles (Requires Auth)
