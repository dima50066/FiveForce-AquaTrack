# FiveForce-AquaTrack Backend

## Project Overview

**FiveForce-AquaTrack** is a backend application designed for tracking daily water consumption and user activities. The system provides functionalities for user registration, login, and management, alongside features to monitor daily and monthly water intake. It also integrates with Google OAuth for user authentication and supports Cloudinary for avatar image uploads.

## Features

- **User Management**: Registration, login, password reset, and profile updates.
- **Water Tracking**: Allows users to track their daily water intake, set daily goals, and get a summary of total water consumed.
- **Authentication**: Supports JWT-based authentication and Google OAuth.
- **Cloud Integration**: Uses Cloudinary for image uploads (if enabled).
- **API Documentation**: Automatically generated Swagger documentation for easy API interaction.

## Technologies

- **Node.js**: Backend server framework.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user and water data.
- **JWT & Cookie-Based Authentication**: Secure user sessions and refresh tokens.
- **Swagger/OpenAPI**: For API documentation and testing.
- **Cloudinary**: Image hosting service (optional feature for avatar uploads).
- **Google OAuth 2.0**: For authentication with Google accounts.

## Installation

### Prerequisites

Ensure that the following are installed on your local machine:

- **Node.js** (v18 or higher)
- **MongoDB** (local or remote instance)
- **Cloudinary Account** (if using Cloudinary for image storage)
- **Google Developer Console** credentials (if using Google OAuth)

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd FiveForce-AquaTrack/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables (refer to `.env.example`):

   ```
   PORT=5000
   MONGODB_USER=<your-mongodb-username>
   MONGODB_PASSWORD=<your-mongodb-password>
   MONGODB_URL=<your-mongodb-url>
   MONGODB_DB=<your-database-name>

   SMTP_HOST=<your-smtp-host>
   SMTP_PORT=<your-smtp-port>
   SMTP_USER=<your-smtp-user>
   SMTP_PASSWORD=<your-smtp-password>
   SMTP_FROM=<your-smtp-from-email>

   JWT_SECRET=<your-jwt-secret>

   APP_DOMAIN=<your-app-domain>

   CLOUD_NAME=<cloudinary-cloud-name>
   API_KEY=<cloudinary-api-key>
   API_SECRET=<cloudinary-api-secret>
   ENABLE_CLOUDINARY=true

   GOOGLE_AUTH_CLIENT_ID=<google-client-id>
   GOOGLE_AUTH_CLIENT_SECRET=<google-client-secret>
   ```

4. Run the server in development mode:

   ```bash
   npm run dev
   ```

5. The server will be available at `http://localhost:3000`.

## API Documentation

API documentation is available at `/api-docs`:

- **GET /users/register**: Register a new user.
- **POST /users/login**: Login with email and password.
- **POST /users/logout**: Logout and clear the session.
- **GET /users/current**: Retrieve the current user's profile.
- **PATCH /users/current**: Update user profile, including avatar.
- **GET /water**: Retrieve total water consumed for the day or month.
- **POST /water**: Log a new water intake.
- **DELETE /water/{id}**: Delete a water intake record.

## Environment Variables

The application uses environment variables to configure the server, database connection, and external services. The required variables include:

- `MONGODB_USER`, `MONGODB_PASSWORD`, `MONGODB_URL`, `MONGODB_DB`: MongoDB credentials and database details.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `APP_DOMAIN`: Your app's domain (for avatar URL).
- `CLOUD_NAME`, `API_KEY`, `API_SECRET`: Cloudinary credentials (if using Cloudinary for image storage).
- `GOOGLE_AUTH_CLIENT_ID`, `GOOGLE_AUTH_CLIENT_SECRET`: Google OAuth credentials.

## Development

### Running in Development Mode

To run the server in development mode with live-reloading, use:

```bash
npm run dev
```

This will start the server with `nodemon` and automatically reload the application on changes.

### Testing

For testing, use the following script (currently not specified):

```bash
npm test
```

### API Documentation Generation

To regenerate the API documentation using OpenAPI/Swagger:

```bash
npm run build-docs
```

The generated documentation will be available in the `backend/docs/swagger.json` file.

### Docker (optional)

To run the application in Docker (optional), ensure Docker is installed and then use the following commands:

1. Build the Docker image:

   ```bash
   docker build -t fiveforce-aquatrack-backend .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 fiveforce-aquatrack-backend
   ```

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Clone your fork.
3. Create a new branch for your feature or bugfix.
4. Submit a pull request for review.

## License

This project is licensed under the MIT License.
