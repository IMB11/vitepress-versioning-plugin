---
layout: home

hero:
  name: "ACME API Platform"
  text: "v1.0.0 - Foundation Release"
  tagline: "Essential APIs for user management and payment processing"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: View Changelog
      link: /changelog

features:
  - icon: 👥
    title: User Management API
    details: Complete user registration, authentication, and basic profile management with role-based access control.
    
  - icon: 💳
    title: Payment Processing
    details: Secure payment processing with support for credit cards, basic subscriptions, and simple invoicing.
    
  - icon: 🔐
    title: Basic Security
    details: API key authentication with rate limiting and basic security measures for production use.
    
  - icon: 📚
    title: Developer Friendly
    details: RESTful API design with comprehensive documentation and SDK support for JavaScript and Python.
---

## ACME API Platform v1.0.0 <span class="version-badge">Legacy</span>

Welcome to the foundation release of the ACME API Platform. This version provides essential functionality for user management and payment processing.

::: warning 📅 Legacy Version
This is a legacy version of the ACME API Platform. While still supported with security updates, we recommend upgrading to [v2.0.0](/) for the latest features and improvements.

**End of Life**: June 30, 2024
:::

### Core Features

#### 👥 User Management
- User registration and authentication
- Basic profile management
- Simple role-based access (admin/customer)
- Email verification

#### 💳 Payment Processing  
- Credit card payment processing
- Basic subscription management
- Simple invoice generation
- Payment status tracking

#### 🔐 Security & Authentication
- API key-based authentication
- Basic rate limiting (100 req/min)
- HTTPS encryption
- Input validation

### API Endpoints

The v1.0.0 API includes these core endpoints:

```
# User Management
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}

# Authentication
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/verify-email

# Payments
POST   /api/v1/payments
GET    /api/v1/payments/{id}
POST   /api/v1/payments/{id}/refund

# Subscriptions
POST   /api/v1/subscriptions
GET    /api/v1/subscriptions/{id}
PUT    /api/v1/subscriptions/{id}
DELETE /api/v1/subscriptions/{id}
```

### Quick Start (v1.0.0)

Get started with the v1.0.0 API:

```bash
# Authenticate and get account info
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.acme.com/v1/account/me

# Create a user
curl -X POST https://api.acme.com/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }'

# Process a payment
curl -X POST https://api.acme.com/v1/payments \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2999,
    "currency": "USD",
    "customer_id": "usr_123",
    "payment_method": "card"
  }'
```

### SDK Support

Official SDKs available for v1.0.0:

- **JavaScript**: `@acme/api-sdk@1.x`
- **Python**: `acme-api-python@1.x`

```javascript
// JavaScript SDK v1.x
import { AcmeAPI } from '@acme/api-sdk';

const acme = new AcmeAPI({
  apiKey: 'YOUR_API_KEY',
  version: 'v1'
});

const user = await acme.users.create({
  email: 'user@example.com',
  name: 'John Doe'
});
```

### Limitations

Please be aware of these limitations in v1.0.0:

- **Analytics**: Not available (added in v1.1.0)
- **Real-time Notifications**: Not available (added in v2.0.0)
- **Advanced Authentication**: OAuth 2.0 not supported (added in v2.0.0)
- **Advanced Payment Features**: Marketplace payments not supported
- **Rate Limiting**: Basic limits only (100 req/min)

### Migration Path

Planning to upgrade? Here are the migration options:

- **To v1.1.0**: Adds analytics capabilities with minimal breaking changes
- **To v2.0.0**: Major upgrade with new authentication, notifications, and breaking changes

See our [Migration Guide](/guides/migration-v2) for detailed upgrade instructions.

### What's Next?

- [📚 Get Started](/getting-started) - Complete setup guide
- [🔗 API Reference](/api/) - Full endpoint documentation  
- [💡 Developer Guides](/guides/) - Integration examples and best practices
- [🚀 Upgrade to v2.0.0](/) - Latest features and improvements

---

*Need help with v1.0.0? [Contact our support team](mailto:support@acme.com) for assistance.*