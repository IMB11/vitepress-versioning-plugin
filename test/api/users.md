# User Management API

The User Management API provides comprehensive user lifecycle management including registration, authentication, profile management, and role-based access control.

## Overview

| | |
|---|---|
| **Base URL** | `https://api.acme.com/v2/users` |
| **Authentication** | Required - API Key |
| **Rate Limits** | 1000 requests/minute (Enterprise) |

## User Object

```json
{
  "id": "usr_1234567890",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "username": "johndoe",
  "avatar_url": "https://cdn.acme.com/avatars/usr_1234567890.jpg",
  "role": "customer",
  "status": "active",
  "email_verified": true,
  "phone": "+1-555-123-4567",
  "phone_verified": false,
  "profile": {
    "first_name": "John",
    "last_name": "Doe",
    "company": "Acme Corp",
    "timezone": "America/New_York",
    "language": "en",
    "preferences": {
      "email_notifications": true,
      "sms_notifications": false,
      "marketing_emails": true
    }
  },
  "metadata": {
    "source": "web_signup",
    "utm_campaign": "spring_2024"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "last_login": "2024-01-22T09:15:00Z"
}
```

## Endpoints

### List Users

Retrieve a paginated list of users with optional filtering and sorting.

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <span class="api-url">/users</span>
</div>

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of users to return (max 100, default 20) |
| `cursor` | string | Pagination cursor for the next page |
| `status` | string | Filter by user status: `active`, `inactive`, `suspended` |
| `role` | string | Filter by user role: `admin`, `customer`, `partner` |
| `email` | string | Filter by email address (exact match) |
| `created_at[gte]` | datetime | Filter users created after this date |
| `created_at[lte]` | datetime | Filter users created before this date |
| `sort` | string | Sort field and direction: `created_at:desc`, `name:asc`, `last_login:desc` |

#### Example Request

```bash
curl -X GET "https://api.acme.com/v2/users?status=active&role=customer&limit=50&sort=created_at:desc" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

#### Example Response

```json
{
  "data": [
    {
      "id": "usr_1234567890",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "role": "customer",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6InVzcl8wOTg3NjU0MzIxIn0",
    "limit": 50,
    "total_count": 1247
  }
}
```

### Create User

Create a new user account in the system.

<div class="api-endpoint">
  <span class="api-method post">POST</span>
  <span class="api-url">/users</span>
</div>

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address (must be unique) |
| `name` | string | Yes | User's full name |
| `username` | string | No | Unique username (auto-generated if not provided) |
| `password` | string | No | Password (required if email verification disabled) |
| `role` | string | No | User role (default: `customer`) |
| `phone` | string | No | Phone number in E.164 format |
| `profile` | object | No | Additional profile information |
| `metadata` | object | No | Custom metadata (key-value pairs) |
| `send_welcome_email` | boolean | No | Send welcome email (default: true) |

#### Example Request

```bash
curl -X POST "https://api.acme.com/v2/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "name": "Jane Smith",
    "username": "janesmith",
    "role": "customer",
    "phone": "+1-555-987-6543",
    "profile": {
      "first_name": "Jane",
      "last_name": "Smith",
      "company": "Smith Industries",
      "timezone": "America/Los_Angeles"
    },
    "metadata": {
      "source": "api_integration",
      "plan": "premium"
    }
  }'
```

#### Example Response

```json
{
  "data": {
    "id": "usr_0987654321",
    "email": "jane.smith@example.com",
    "name": "Jane Smith",
    "username": "janesmith",
    "role": "customer",
    "status": "active",
    "email_verified": false,
    "profile": {
      "first_name": "Jane",
      "last_name": "Smith",
      "company": "Smith Industries",
      "timezone": "America/Los_Angeles"
    },
    "created_at": "2024-01-22T15:30:00Z"
  }
}
```

### Get User

Retrieve a specific user by their ID.

<div class="api-endpoint">
  <span class="api-method get">GET</span>
  <span class="api-url">/users/{id}</span>
</div>

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID (e.g., `usr_1234567890`) |

#### Example Request

```bash
curl -X GET "https://api.acme.com/v2/users/usr_1234567890" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

#### Example Response

```json
{
  "data": {
    "id": "usr_1234567890",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "username": "johndoe",
    "role": "customer",
    "status": "active",
    "email_verified": true,
    "phone": "+1-555-123-4567",
    "phone_verified": false,
    "profile": {
      "first_name": "John",
      "last_name": "Doe",
      "company": "Acme Corp",
      "timezone": "America/New_York"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-20T14:45:00Z",
    "last_login": "2024-01-22T09:15:00Z"
  }
}
```

### Update User

Update an existing user's information.

<div class="api-endpoint">
  <span class="api-method put">PUT</span>
  <span class="api-url">/users/{id}</span>
</div>

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID to update |

#### Request Body

All fields are optional - only include the fields you want to update:

| Field | Type | Description |
|-------|------|-------------|
| `email` | string | User's email address |
| `name` | string | User's full name |
| `username` | string | Username |
| `role` | string | User role |
| `phone` | string | Phone number |
| `profile` | object | Profile information (merged with existing) |
| `metadata` | object | Custom metadata (merged with existing) |

#### Example Request

```bash
curl -X PUT "https://api.acme.com/v2/users/usr_1234567890" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John A. Doe",
    "profile": {
      "company": "New Acme Corp",
      "preferences": {
        "email_notifications": false
      }
    }
  }'
```

### Delete User

Deactivate a user account (soft delete). The user data is preserved but the account becomes inactive.

<div class="api-endpoint">
  <span class="api-method delete">DELETE</span>
  <span class="api-url">/users/{id}</span>
</div>

::: warning ⚠️ Important
This action deactivates the user account but preserves all data for audit purposes. To permanently delete user data, contact support.
:::

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | User ID to deactivate |

#### Example Request

```bash
curl -X DELETE "https://api.acme.com/v2/users/usr_1234567890" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response

```json
{
  "data": {
    "id": "usr_1234567890",
    "status": "inactive",
    "deactivated_at": "2024-01-22T16:30:00Z"
  }
}
```

## User Roles

The system supports hierarchical role-based access control:

| Role | Permissions | Description |
|------|-------------|-------------|
| `admin` | Full system access | System administrators |
| `manager` | Manage team users and resources | Team/department managers |
| `customer` | Access own data and features | Regular customers |
| `partner` | Partner-specific resources | External partners |
| `readonly` | View-only access | Limited access users |

## User Status

| Status | Description |
|--------|-------------|
| `active` | User can log in and use the system |
| `inactive` | User account is deactivated |
| `suspended` | Temporarily suspended for policy violations |
| `pending` | Account created but email not verified |

## Error Codes

| Code | Description |
|------|-------------|
| `USER_NOT_FOUND` | User ID does not exist |
| `EMAIL_ALREADY_EXISTS` | Email address is already registered |
| `USERNAME_ALREADY_EXISTS` | Username is already taken |
| `INVALID_EMAIL_FORMAT` | Email format is invalid |
| `INVALID_PHONE_FORMAT` | Phone number format is invalid |
| `ROLE_NOT_ALLOWED` | Insufficient permissions to assign role |

## SDKs Examples

### JavaScript/TypeScript

```javascript
import { AcmeAPI } from '@acme/api-sdk';

const acme = new AcmeAPI({ apiKey: 'YOUR_API_KEY' });

// Create a user
const user = await acme.users.create({
  email: 'user@example.com',
  name: 'New User',
  role: 'customer'
});

// Get user by ID
const retrievedUser = await acme.users.get('usr_1234567890');

// List users with filters
const users = await acme.users.list({
  status: 'active',
  role: 'customer',
  limit: 50
});
```

### Python

```python
from acme_api import AcmeClient

client = AcmeClient(api_key='YOUR_API_KEY')

# Create a user
user = client.users.create({
    'email': 'user@example.com',
    'name': 'New User',
    'role': 'customer'
})

# Get user by ID
user = client.users.get('usr_1234567890')

# List users with filters
users = client.users.list(
    status='active',
    role='customer',
    limit=50
)
```

---

Need help with user management? Check out our [Authentication Guide](/guides/authentication) or [contact support](mailto:support@acme.com).