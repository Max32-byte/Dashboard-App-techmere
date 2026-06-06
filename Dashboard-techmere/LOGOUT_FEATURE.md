# Logout Feature Implementation

This document describes the logout feature implementation for the Dashboard App.

## Features

1. **Login Page** (`src/pages/LoginPage.vue`)
   - User authentication form
   - Email and password input fields
   - Error handling and loading states

2. **Dashboard Page** (`src/pages/DashboardPage.vue`)
   - Protected page accessible only to authenticated users
   - Displays user information
   - Integration with navbar for logout

3. **Navbar Component** (`src/components/Navbar.vue`)
   - Displays user name
   - **Logout Button** - Main logout functionality
   - Handles session destruction and redirect to login

4. **Authentication Service** (`src/services/authAPI.ts`)
   - API calls to Laravel backend
   - Logout endpoint: `POST /api/logout`
   - Login endpoint: `POST /api/login`
   - User info endpoint: `GET /api/user`

5. **Authentication State** (`src/composables/useAuth.ts`)
   - Global authentication state management
   - User information storage
   - Session state management

## Logout Workflow

1. User clicks "Logout" button in navbar
2. Frontend sends `POST /api/logout` request to Laravel backend
3. Backend destroys the session
4. Frontend clears local authentication state
5. User is redirected to login page

## Backend Requirements

The Laravel backend needs to implement the following endpoints:

### Logout Endpoint
```
POST /api/logout
Headers:
  - Content-Type: application/json
  - X-Requested-With: XMLHttpRequest
Credentials: include (for session cookies)

Response: 200 OK
```

The backend should:
- Invalidate the user session
- Clear session data
- Return success response

### Login Endpoint
```
POST /api/login
Body: { email: string, password: string }

Response: 200 OK
{
  "user": {
    "id": number,
    "name": string,
    "email": string
  }
}
```

### User Endpoint
```
GET /api/user
Response: 200 OK
{
  "user": {
    "id": number,
    "name": string,
    "email": string
  }
}
```

## Environment Configuration

Create a `.env` file in the `Dashboard-techmere` directory:

```
VITE_API_URL=http://localhost:8000/api
```

## Usage

1. Build the application:
   ```bash
   cd Dashboard-techmere
   npm install
   npm run build
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Navigate to login page and authenticate

4. Click "Logout" button in navbar to logout

## Testing

The application includes:
- Form validation on login page
- Error handling for API calls
- Loading states during logout
- Automatic redirection after logout
