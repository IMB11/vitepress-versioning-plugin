# API Reference Overview

The ACME API Platform provides a comprehensive suite of RESTful APIs designed for enterprise-scale applications. All endpoints follow consistent patterns and return standardized responses.

## Base URL

```
https://api.acme.com/v2
```

## Authentication

All API requests require authentication using an API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

## API Categories

### 👥 [User Management API](/api/users)
Complete user lifecycle management including registration, authentication, profiles, and permissions.

**Key Endpoints:**
- `GET /users` - List users with filtering and pagination
- `POST /users` - Create new user accounts
- `GET /users/{id}` - Retrieve user details
- `PUT /users/{id}` - Update user information
- `DELETE /users/{id}` - Deactivate user accounts

### 💳 [Payments API](/api/payments)
Secure payment processing with support for multiple payment methods, subscriptions, and financial reporting.

**Key Endpoints:**
- `POST /payments` - Process one-time payments
- `GET /payments/{id}` - Retrieve payment details
- `POST /payments/{id}/refund` - Process refunds
- `GET /subscriptions` - Manage recurring subscriptions
- `POST /invoices` - Generate customer invoices

### 📊 [Analytics API](/api/analytics) <span class="version-badge new-feature">v1.1.0+</span>
Real-time analytics and business intelligence with custom event tracking and reporting.

**Key Endpoints:**
- `POST /analytics/events` - Track custom events
- `GET /analytics/reports` - Generate usage reports
- `GET /analytics/metrics` - Retrieve key metrics
- `GET /analytics/dashboards` - Dashboard data aggregation

### 🔔 [Notifications API](/api/notifications) <span class="version-badge new-feature">v2.0.0+</span>
Multi-channel notification system supporting email, SMS, push notifications, and real-time messaging.

**Key Endpoints:**
- `POST /notifications` - Send notifications
- `GET /notifications/{id}` - Check delivery status
- `POST /notifications/templates` - Manage templates
- `GET /notifications/history` - Delivery history

## Common Patterns

### Request Format

All requests should include appropriate headers:

```http
POST /api/v2/users HTTP/1.1
Host: api.acme.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
User-Agent: YourApp/1.0

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Response Format

All API responses follow a consistent structure:

```json
{
  "data": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "meta": {
    "request_id": "req_abcdef123456",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Pagination

List endpoints support cursor-based pagination for optimal performance:

```http
GET /users?limit=50&cursor=eyJpZCI6InVzcl8xMjM0NTY3ODkwIn0
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6InVzcl8wOTg3NjU0MzIxIn0",
    "limit": 50
  }
}
```

### Filtering and Sorting

Most list endpoints support filtering and sorting:

```http
GET /users?status=active&role=customer&sort=created_at:desc
```

**Common Parameters:**
- `status` - Filter by resource status
- `created_at[gte]` - Filter by creation date (greater than or equal)
- `created_at[lte]` - Filter by creation date (less than or equal)
- `sort` - Sort results (field:direction)
- `limit` - Number of results per page (max 100)

## Rate Limiting

API requests are subject to rate limiting based on your account plan:

| Plan | Requests per Minute | Burst Limit |
|------|-------------------|-------------|
| Starter | 100 | 200 |
| Professional | 1,000 | 2,000 |
| Enterprise | 10,000 | 20,000 |

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

When rate limits are exceeded, the API returns a `429 Too Many Requests` response:

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded",
    "retry_after": 60
  }
}
```

## Error Handling

The API uses conventional HTTP response codes and provides detailed error information:

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request format |
| 401 | Unauthorized - Invalid API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation errors |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": {
      "validation_errors": [
        {
          "field": "email",
          "message": "Email format is invalid"
        }
      ]
    },
    "request_id": "req_1234567890"
  }
}
```

## Data Types

### Common Field Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text value | `"John Doe"` |
| `integer` | Whole number | `12345` |
| `decimal` | Decimal number | `29.99` |
| `boolean` | True/false value | `true` |
| `datetime` | ISO 8601 timestamp | `"2024-01-15T10:30:00Z"` |
| `uuid` | Unique identifier | `"usr_1234567890"` |
| `email` | Email address | `"user@example.com"` |
| `url` | Valid URL | `"https://example.com"` |

### Identifier Patterns

All resource IDs follow consistent prefixes:

- Users: `usr_xxxxxxxxxx`
- Payments: `pay_xxxxxxxxxx`
- Subscriptions: `sub_xxxxxxxxxx`
- Notifications: `not_xxxxxxxxxx`
- Events: `evt_xxxxxxxxxx`

## Versioning

The ACME API Platform uses URL-based versioning. The current version is `v2`:

```
https://api.acme.com/v2/
```

### Version History

| Version | Status | Release Date | End of Life |
|---------|--------|--------------|-------------|
| v2.0.0 | Current | 2024-01-01 | - |
| v1.1.0 | Supported | 2023-06-01 | 2024-12-31 |
| v1.0.0 | Legacy | 2023-01-01 | 2024-06-30 |

## SDKs and Libraries

Official SDKs are available for popular programming languages:

- **JavaScript/TypeScript**: `@acme/api-sdk`
- **Python**: `acme-api-python`
- **PHP**: `acme/api-php`
- **Ruby**: `acme-api-ruby`
- **Java**: `com.acme.api-java`
- **C#/.NET**: `Acme.Api.NET`

## Testing

### Sandbox Environment

Use our sandbox environment for testing and development:

```
https://api-sandbox.acme.com/v2
```

The sandbox environment:
- Uses separate API keys (prefixed with `sk_test_`)
- Does not process real payments
- Provides realistic test data
- Mirrors production behavior exactly

### Test Data

The sandbox includes pre-populated test data:

- Test users with various roles and statuses
- Sample payment methods and transactions
- Mock analytics events and reports
- Test notification templates

## Support

- **Documentation**: [https://docs.acme.com](https://docs.acme.com)
- **API Status**: [https://status.acme.com](https://status.acme.com)
- **Developer Forum**: [https://community.acme.com](https://community.acme.com)
- **Support Email**: [support@acme.com](mailto:support@acme.com)

---

Ready to dive deeper? Explore the detailed documentation for each API category above.