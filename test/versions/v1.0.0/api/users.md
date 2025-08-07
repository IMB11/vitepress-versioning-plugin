# User Management API v1.0.0

The User Management API provides basic user lifecycle management including registration, authentication, and profile management.

::: warning 📅 Legacy Version
This is the legacy v1.0.0 API. For new projects, consider upgrading to [v2.0.0](/) which includes enhanced security and additional features.
:::

## Overview

| | |
|---|---|
| **Base URL** | `https://api.acme.com/v1/users` |
| **Authentication** | Required - API Key |
| **Rate Limits** | 100 requests/minute |

## User Object (v1.0.0)

```json
{
  "id": "usr_1234567890",
  "email": "john.doe@example.com", 
  "name": "John Doe",
  "username": "johndoe",
  "role": "customer",
  "status": "active",
  "email_verified": true,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
```

## Available Endpoints

### List Users

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <span class="api-url">/users</span>
</div>

Basic user listing with simple pagination.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Users per page (max 50, default 20) |
| `status` | string | Filter by status: `active`, `inactive` |

#### Example Request

```bash
curl -X GET "https://api.acme.com/v1/users?page=1&limit=20&status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Create User

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <span class="api-url">/users</span>
</div>

Create a new user account with basic information.

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address |
| `name` | string | Yes | User's full name |
| `username` | string | No | Username (auto-generated if not provided) |
| `role` | string | No | User role: `admin`, `customer` (default: `customer`) |

#### Example Request

```bash
curl -X POST "https://api.acme.com/v1/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "name": "Jane Smith",
    "role": "customer"
  }'
```

## Authentication (v1.0.0)

### Login

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <span class="api-url">/auth/login</span>
</div>

Simple email/password authentication returning a session token.

```bash
curl -X POST "https://api.acme.com/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "user_password"
  }'
```

**Response:**
```json
{
  "token": "session_abc123",
  "expires_in": 3600,
  "user": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Limitations in v1.0.0

- **No Advanced Roles**: Only `admin` and `customer` roles supported
- **Basic Authentication**: Only email/password, no OAuth or JWT
- **Limited Profile Data**: No custom fields or preferences
- **Simple Pagination**: Offset-based pagination only
- **No Session Management**: Basic session tokens only

## Migration to Newer Versions

### Upgrading to v1.1.0
- **Added**: User preferences and extended profiles
- **Added**: Session management endpoints
- **Backward Compatible**: All v1.0.0 endpoints continue to work

### Upgrading to v2.0.0
- **Breaking Changes**: New JWT authentication system
- **Enhanced**: Advanced role-based permissions
- **Added**: OAuth 2.0 support and SSO integration

See our [Migration Guide](/guides/migration-v2) for detailed upgrade instructions.

---

*This is legacy documentation for v1.0.0. For the latest features, see [v2.0.0 User API](/api/users).*