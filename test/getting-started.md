# Getting Started with ACME API Platform

Welcome to the ACME API Platform! This guide will help you integrate our enterprise-grade APIs into your applications quickly and securely.

## Prerequisites

Before you begin, ensure you have:

- An active ACME API account ([Sign up here](https://dashboard.acme.com/signup))
- API credentials (API Key and Secret)
- Basic understanding of REST APIs and HTTP requests
- Your preferred programming language SDK or HTTP client

## Step 1: Authentication Setup

The ACME API Platform uses API key-based authentication for secure access to all endpoints.

### Obtaining Your API Credentials

1. Log into your [ACME Dashboard](https://dashboard.acme.com)
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New API Key**
4. Copy your API Key and Secret (store securely!)

::: warning 🔐 Security Best Practices
- Never expose your API credentials in client-side code
- Use environment variables to store sensitive information
- Rotate your API keys regularly
- Implement proper access controls in your applications
:::

### Authentication Headers

Include your API key in the `Authorization` header for all requests:

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## Step 2: Making Your First API Call

Let's start with a simple request to verify your authentication and get your account information.

### Using cURL

```bash
curl -X GET https://api.acme.com/v2/account/me \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Using JavaScript/Node.js

```javascript
const response = await fetch('https://api.acme.com/v2/account/me', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const accountInfo = await response.json();
console.log('Account Info:', accountInfo);
```

### Using Python

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.acme.com/v2/account/me', headers=headers)
account_info = response.json()
print('Account Info:', account_info)
```

### Expected Response

```json
{
  "id": "acc_1234567890",
  "name": "Your Company Name",
  "email": "admin@yourcompany.com",
  "plan": "enterprise",
  "created_at": "2024-01-15T10:30:00Z",
  "limits": {
    "requests_per_minute": 1000,
    "users": 10000,
    "notifications_per_month": 100000
  }
}
```

## Step 3: Installing SDKs

We provide official SDKs for popular programming languages to simplify integration:

### JavaScript/TypeScript

```bash
npm install @acme/api-sdk
```

```javascript
import { AcmeAPI } from '@acme/api-sdk';

const acme = new AcmeAPI({
  apiKey: process.env.ACME_API_KEY,
  environment: 'production' // or 'sandbox'
});

// Get account information
const account = await acme.account.get();
console.log(account);
```

### Python

```bash
pip install acme-api-python
```

```python
from acme_api import AcmeClient

client = AcmeClient(
    api_key=os.environ['ACME_API_KEY'],
    environment='production'  # or 'sandbox'
)

# Get account information
account = client.account.get()
print(account)
```

### PHP

```bash
composer require acme/api-php
```

```php
<?php
require_once 'vendor/autoload.php';

use Acme\Api\AcmeClient;

$client = new AcmeClient([
    'api_key' => $_ENV['ACME_API_KEY'],
    'environment' => 'production'
]);

// Get account information
$account = $client->account->get();
var_dump($account);
```

## Step 4: Core API Overview

The ACME API Platform consists of four main API categories:

### 👥 User Management API
- User registration and authentication
- Profile management and preferences
- Role-based access control (RBAC)
- Single Sign-On (SSO) integration

**Quick Example:**
```javascript
// Create a new user
const user = await acme.users.create({
  email: 'john.doe@example.com',
  name: 'John Doe',
  role: 'customer'
});
```

### 💳 Payments API
- Process payments and refunds
- Manage subscriptions and billing
- Handle multiple payment methods
- Generate invoices and receipts

**Quick Example:**
```javascript
// Process a payment
const payment = await acme.payments.create({
  amount: 2999, // $29.99 in cents
  currency: 'USD',
  customer_id: user.id,
  payment_method: 'card'
});
```

### 📊 Analytics API <span class="version-badge new-feature">New in v1.1.0</span>
- Track custom events and metrics
- Generate reports and insights
- Real-time dashboard data
- User behavior analytics

**Quick Example:**
```javascript
// Track a custom event
await acme.analytics.track({
  event: 'product_purchased',
  user_id: user.id,
  properties: {
    product_id: 'prod_123',
    amount: 29.99,
    category: 'software'
  }
});
```

### 🔔 Notifications API <span class="version-badge new-feature">New in v2.0.0</span>
- Send email, SMS, and push notifications
- Real-time messaging via WebSockets
- Webhook integrations
- Template management

**Quick Example:**
```javascript
// Send a notification
await acme.notifications.send({
  type: 'email',
  recipient: user.email,
  template: 'welcome',
  data: { name: user.name }
});
```

## Step 5: Environment Configuration

The ACME API Platform supports multiple environments for development and testing:

### Environment URLs

| Environment | Base URL | Purpose |
|------------|----------|---------|
| Production | `https://api.acme.com` | Live production traffic |
| Sandbox | `https://api-sandbox.acme.com` | Testing and development |
| Staging | `https://api-staging.acme.com` | Pre-production testing |

### Configuration Examples

**JavaScript/Node.js:**
```javascript
const config = {
  production: {
    baseURL: 'https://api.acme.com',
    apiKey: process.env.ACME_PROD_API_KEY
  },
  sandbox: {
    baseURL: 'https://api-sandbox.acme.com',
    apiKey: process.env.ACME_SANDBOX_API_KEY
  }
};

const acme = new AcmeAPI(config[process.env.NODE_ENV || 'sandbox']);
```

## Step 6: Error Handling

Proper error handling is crucial for robust applications. The ACME API uses standard HTTP status codes and provides detailed error responses.

### Standard Error Response Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is missing required parameters",
    "details": {
      "missing_fields": ["email", "name"]
    },
    "request_id": "req_1234567890"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 422 | Invalid request data |
| `SERVER_ERROR` | 500 | Internal server error |

### Error Handling Example

```javascript
try {
  const user = await acme.users.create(userData);
  console.log('User created:', user);
} catch (error) {
  if (error.status === 422) {
    console.error('Validation errors:', error.details.validation_errors);
  } else if (error.status === 429) {
    console.error('Rate limited. Retry after:', error.headers['retry-after']);
  } else {
    console.error('API Error:', error.message);
  }
}
```

## Next Steps

Now that you have the basics set up, explore these advanced topics:

- **[Authentication Guide](/guides/authentication)** - Deep dive into security best practices
- **[API Reference](/api/)** - Complete endpoint documentation
- **[Rate Limiting](/guides/rate-limiting)** - Understanding and handling API limits
- **[Webhooks](/guides/webhooks)** - Real-time event notifications
- **[SDKs & Libraries](/guides/sdks)** - Language-specific integration guides

## Need Help?

- 📚 **Documentation**: Comprehensive guides and API reference
- 💬 **Community**: Join our [Developer Forum](https://community.acme.com)
- 🎫 **Support**: Contact our [Support Team](mailto:support@acme.com)
- 🐛 **Issues**: Report bugs on [GitHub](https://github.com/acme/api-platform/issues)

---

*Ready to build something amazing? Let's get started with your first integration!* 🚀