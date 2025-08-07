---
layout: home

hero:
  name: "ACME API Platform"
  text: "v1.1.0 - Analytics Enhanced"
  tagline: "User management, payments, and powerful analytics capabilities"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: Analytics Guide
      link: /guides/analytics

features:
  - icon: 👥
    title: Enhanced User Management
    details: Improved user management with advanced profile features, session management, and enhanced role-based access control.
    
  - icon: 💳
    title: Advanced Payments
    details: Enhanced payment processing with refund management, payment methods storage, and improved subscription handling.
    
  - icon: 📊
    title: Analytics & Insights
    details: New comprehensive analytics API with event tracking, custom metrics, and detailed reporting capabilities.
    
  - icon: 🔐
    title: Improved Security
    details: Enhanced security with better rate limiting, session management, and improved API key controls.
---

## ACME API Platform v1.1.0 <span class="version-badge">Stable</span>

Welcome to v1.1.0 of the ACME API Platform! This release adds powerful analytics capabilities while maintaining full backward compatibility with v1.0.0.

::: tip 🚀 Recommended for Existing Integrations
This stable version is recommended for existing v1.0.0 users who want analytics capabilities without major breaking changes.
:::

### What's New in v1.1.0

#### 📊 Analytics API
- **Event Tracking**: Track custom events and user interactions
- **Real-time Metrics**: Monitor API usage and business metrics
- **Custom Reports**: Generate detailed analytics reports
- **Dashboard Data**: API endpoints for building custom dashboards
- **User Behavior**: Track user journeys and engagement

#### 👥 Enhanced User Management
- **Advanced Profiles**: Extended user profile fields and preferences
- **Session Management**: Better session tracking and management
- **Improved Permissions**: More granular role-based access control
- **User Preferences**: Customizable user settings and notifications

#### 💳 Payment Improvements
- **Payment Methods**: Store and manage customer payment methods
- **Enhanced Refunds**: Improved refund processing and tracking
- **Subscription Analytics**: Track subscription metrics and churn
- **Invoice Templates**: Customizable invoice layouts

### New API Endpoints

v1.1.0 adds these new endpoints:

```
# Analytics API (New!)
POST   /api/v1.1/analytics/events
GET    /api/v1.1/analytics/reports
GET    /api/v1.1/analytics/metrics
GET    /api/v1.1/analytics/dashboards

# Enhanced User Management
GET    /api/v1.1/users/{id}/sessions
DELETE /api/v1.1/users/{id}/sessions/{session_id}
PUT    /api/v1.1/users/{id}/preferences

# Payment Methods
GET    /api/v1.1/customers/{id}/payment-methods
POST   /api/v1.1/customers/{id}/payment-methods
DELETE /api/v1.1/customers/{id}/payment-methods/{pm_id}
```

### Analytics Quick Start

Start tracking events and gathering insights:

```javascript
// Track a custom event
await acme.analytics.track({
  event: 'product_purchased',
  user_id: 'usr_123',
  properties: {
    product_id: 'prod_456',
    category: 'software',
    amount: 29.99,
    currency: 'USD'
  }
});

// Get analytics reports
const report = await acme.analytics.getReport({
  type: 'revenue',
  date_range: 'last_30_days',
  group_by: 'day'
});

// Retrieve key metrics
const metrics = await acme.analytics.getMetrics({
  metrics: ['total_users', 'active_users', 'revenue'],
  period: 'today'
});
```

### Enhanced Payment Processing

New payment features in v1.1.0:

```javascript
// Store a payment method
const paymentMethod = await acme.customers.addPaymentMethod('cus_123', {
  type: 'card',
  card: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123'
  }
});

// Process payment with stored method
const payment = await acme.payments.create({
  amount: 2999,
  currency: 'USD',
  customer_id: 'cus_123',
  payment_method_id: paymentMethod.id
});

// Track subscription metrics
const subscriptionMetrics = await acme.analytics.getMetrics({
  metrics: ['mrr', 'churn_rate', 'ltv'],
  period: 'this_month'
});
```

### Backward Compatibility

v1.1.0 maintains full backward compatibility with v1.0.0:

- ✅ All v1.0.0 endpoints continue to work unchanged
- ✅ Existing SDKs are compatible  
- ✅ No breaking changes to existing functionality
- ✅ Same authentication and rate limiting

### Migration from v1.0.0

Upgrading from v1.0.0 to v1.1.0 is straightforward:

1. **Update SDK** (optional):
   ```bash
   npm install @acme/api-sdk@1.1
   ```

2. **Update Base URL** (optional for new features):
   ```javascript
   // Use v1.1 endpoints for new features
   const analytics = await fetch('https://api.acme.com/v1.1/analytics/metrics', {
     headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
   });
   ```

3. **Explore Analytics**:
   - Add event tracking to your application
   - Set up custom dashboards
   - Monitor key business metrics

### Performance Improvements

- 25% faster response times on user endpoints
- Improved database query optimization
- Enhanced caching for frequently accessed data
- Better error handling and logging

### SDK Updates

Updated SDKs with analytics support:

- **JavaScript**: `@acme/api-sdk@1.1.x`
- **Python**: `acme-api-python@1.1.x`
- **PHP**: `acme/api-php@1.1.x` (new!)

```python
# Python SDK with analytics
from acme_api import AcmeClient

client = AcmeClient(api_key='YOUR_API_KEY', version='v1.1')

# Track events
client.analytics.track({
    'event': 'user_signup',
    'user_id': 'usr_123',
    'properties': {
        'source': 'website',
        'plan': 'premium'
    }
})

# Get reports
report = client.analytics.get_report(
    type='engagement',
    date_range='last_7_days'
)
```

### What's Coming Next?

Looking ahead to v2.0.0:

- 🔔 **Real-time Notifications**: WebSocket and webhook support
- 🔐 **OAuth 2.0**: Advanced authentication options
- 🌐 **GraphQL**: Alternative API interface
- 📱 **Mobile SDKs**: Native iOS and Android support

### Resources

- [📊 Analytics Guide](/guides/analytics) - Complete analytics implementation guide
- [📚 API Reference](/api/) - Full v1.1.0 endpoint documentation
- [🔄 Migration Guide](/guides/migration-v11) - Upgrading from v1.0.0
- [💡 Best Practices](/guides/best-practices) - Optimization tips and patterns

---

*Ready to unlock powerful analytics? [Get started with v1.1.0](/getting-started) today!*