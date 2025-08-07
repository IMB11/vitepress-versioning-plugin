# Migration Guide: v1.x to v2.0.0

This comprehensive guide will help you migrate from any v1.x version of the ACME API Platform to v2.0.0. The migration involves several breaking changes but provides significant improvements in security, performance, and functionality.

::: warning ⚠️ Breaking Changes
v2.0.0 includes breaking changes that require code updates. Plan for adequate testing time during your migration.
:::

## Overview of Changes

### Major Improvements in v2.0.0
- **JWT Authentication**: Modern token-based authentication
- **Real-time Notifications**: WebSocket and webhook support
- **GraphQL Support**: Efficient data querying
- **Enhanced Security**: OAuth 2.0, MFA, advanced permissions
- **Performance**: 40% faster response times
- **AI Analytics**: Machine learning powered insights

### Breaking Changes Summary
1. **Authentication System**: Migration from API keys to JWT tokens
2. **User API**: Field name changes and enhanced profile structure
3. **Payment API**: New payment method handling
4. **URL Structure**: Some endpoints have been reorganized
5. **Response Format**: Enhanced response structures

## Pre-Migration Checklist

Before starting your migration:

- [ ] **Backup your data** and test in sandbox environment first
- [ ] **Audit your current API usage** using our [Migration Analyzer Tool](/tools/migration-analyzer)
- [ ] **Review new features** you want to adopt in v2.0.0
- [ ] **Plan for testing** - allow 2-4 weeks for thorough testing
- [ ] **Coordinate with your team** on the migration timeline

## Step 1: Authentication Migration

### Old v1.x Authentication
```javascript
// v1.x - Simple API key authentication
const response = await fetch('https://api.acme.com/v1/users', {
  headers: {
    'Authorization': 'Bearer api_key_123456'
  }
});
```

### New v2.0.0 Authentication
```javascript
// v2.0.0 - JWT token authentication
// Step 1: Exchange API key for JWT tokens
const auth = await fetch('https://api.acme.com/v2/auth/token', {
  method: 'POST',
  headers: {
    'X-API-Key': 'api_key_123456',
    'Content-Type': 'application/json'
  }
});

const { access_token, refresh_token } = await auth.json();

// Step 2: Use JWT tokens for API calls
const response = await fetch('https://api.acme.com/v2/users', {
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'X-API-Key': 'api_key_123456'
  }
});
```

### Migration Strategy for Authentication
1. **Obtain JWT tokens** using your existing API key
2. **Update your application** to use JWT tokens
3. **Implement token refresh** logic for long-running applications
4. **Test thoroughly** before removing old authentication code

## Step 2: User API Migration

### Field Changes

| v1.x Field | v2.0.0 Field | Notes |
|------------|--------------|--------|
| `username` | `handle` | Renamed for consistency |
| `profile.preferences` | `preferences` | Moved to top level |
| `role` | `roles[]` | Now supports multiple roles |

### Code Migration Example

```javascript
// Before (v1.x)
const user = {
  username: "johndoe",
  profile: {
    preferences: {
      email_notifications: true
    }
  },
  role: "customer"
};

// After (v2.0.0) 
const user = {
  handle: "johndoe",
  preferences: {
    email_notifications: true
  },
  roles: ["customer"]
};
```

### User Creation Migration

```diff
// v1.x
- POST /v1/users
+ POST /v2/users

{
-  "username": "johndoe",
+  "handle": "johndoe",
-  "role": "customer"
+  "roles": ["customer"]
}
```

## Step 3: Payment API Migration

### Payment Method Changes

```javascript
// v1.x - Direct payment method specification
const payment = await acme.payments.create({
  amount: 2999,
  currency: 'USD',
  customer_id: 'cus_123',
  payment_method: 'card'  // ❌ No longer supported
});

// v2.0.0 - Payment method IDs
const payment = await acme.payments.create({
  amount: 2999,
  currency: 'USD',
  customer_id: 'cus_123',
  payment_method_id: 'pm_1234567890'  // ✅ New approach
});
```

### Migration Steps for Payments
1. **Create payment methods** for existing customers
2. **Update payment creation** to use payment method IDs
3. **Handle new webhook events** for enhanced payment tracking

## Step 4: Response Format Changes

### Enhanced Response Structure

```javascript
// v1.x Response
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com"
}

// v2.0.0 Response  
{
  "data": {
    "id": "usr_123", 
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z",
    "api_version": "v2.0.0"
  }
}
```

### Code Update Required

```javascript
// Update your response handling
// Old way
const user = await response.json();
console.log(user.name);

// New way  
const result = await response.json();
console.log(result.data.name);
```

## Step 5: New Features Adoption

### Real-time Notifications

Take advantage of new notification capabilities:

```javascript
// Send multi-channel notifications
await acme.notifications.send({
  recipients: ['user@example.com'],
  channels: ['email', 'push'],
  template: 'welcome',
  data: { name: 'John Doe' }
});

// Real-time WebSocket connection
const ws = new WebSocket('wss://api.acme.com/v2/notifications');
ws.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  console.log('Real-time notification:', notification);
};
```

### GraphQL Support

Optimize data fetching with GraphQL:

```javascript
// REST (multiple requests)
const user = await acme.users.get('usr_123');
const payments = await acme.payments.list({ customer_id: 'usr_123' });
const analytics = await acme.analytics.getMetrics({ user_id: 'usr_123' });

// GraphQL (single request)
const result = await acme.graphql.query(`
  query GetUserDashboard($userId: ID!) {
    user(id: $userId) {
      id name email
      payments(limit: 5) { id amount status }
      analytics { totalSpent orderCount }
    }
  }
`, { userId: 'usr_123' });
```

## SDK Migration

### Update Your SDKs

```bash
# JavaScript/TypeScript
npm uninstall @acme/api-sdk@1.x
npm install @acme/api-sdk@2.x

# Python  
pip uninstall acme-api-python==1.*
pip install acme-api-python==2.*

# PHP
composer remove acme/api-php:^1.0
composer require acme/api-php:^2.0
```

### SDK Configuration Changes

```javascript
// v1.x SDK
const acme = new AcmeAPI({
  apiKey: 'your_api_key',
  version: 'v1'
});

// v2.0.0 SDK
const acme = new AcmeAPI({
  apiKey: 'your_api_key',
  version: 'v2',
  // New options
  autoRefreshTokens: true,
  retryFailedRequests: true,
  enableWebSockets: true
});
```

## Testing Your Migration

### Comprehensive Testing Checklist

- [ ] **Authentication flow** works with JWT tokens
- [ ] **User operations** handle new field names correctly
- [ ] **Payment processing** uses payment method IDs
- [ ] **Error handling** adapts to new response formats
- [ ] **Real-time features** function as expected
- [ ] **Performance** meets or exceeds v1.x benchmarks

### Sandbox Testing

Use our enhanced sandbox environment:

```javascript
// Point to v2.0.0 sandbox
const acme = new AcmeAPI({
  apiKey: 'sk_test_your_sandbox_key',
  baseURL: 'https://api-sandbox.acme.com/v2',
  version: 'v2'
});
```

## Rollback Plan

### Emergency Rollback Procedure

If you encounter critical issues:

1. **Revert authentication** to v1.x API keys
2. **Switch base URLs** back to v1.x endpoints
3. **Restore previous SDK versions**
4. **Contact support** immediately for assistance

### Gradual Migration Approach

Consider a phased rollout:

1. **Week 1**: Migrate authentication only
2. **Week 2**: Migrate user operations  
3. **Week 3**: Migrate payment operations
4. **Week 4**: Adopt new features and optimize

## Support During Migration

### Migration Assistance

- **Dedicated Migration Support**: [migration-support@acme.com](mailto:migration-support@acme.com)
- **Migration Consultation**: Schedule a call with our team
- **Community Forum**: Get help from other developers
- **Live Chat**: Available 24/7 during business hours

### Tools and Resources

- [Migration Analyzer Tool](/tools/migration-analyzer) - Analyze your current usage
- [Code Migration Templates](/tools/templates) - Ready-to-use code examples  
- [Migration Webinars](/events/migration) - Live Q&A sessions
- [Testing Checklist](/tools/testing-checklist) - Comprehensive testing guide

---

## Timeline Recommendations

| Migration Size | Recommended Timeline |
|----------------|---------------------|
| **Small projects** (< 10 endpoints) | 1-2 weeks |
| **Medium projects** (10-50 endpoints) | 3-4 weeks |
| **Large projects** (50+ endpoints) | 6-8 weeks |
| **Enterprise integrations** | 2-3 months |

## Post-Migration Optimization

After successful migration:

1. **Adopt new features** like real-time notifications
2. **Optimize with GraphQL** where appropriate
3. **Implement advanced security** features
4. **Monitor performance** improvements
5. **Collect feedback** from your team

---

*Need personalized migration assistance? [Contact our migration team](mailto:migration-support@acme.com) for dedicated support.*