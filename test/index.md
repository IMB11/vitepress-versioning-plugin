---
layout: home

hero:
  name: "ACME API Platform"
  text: "Enterprise-Grade API Suite"
  tagline: "Powerful, scalable APIs for user management, payments, analytics, and real-time notifications"
  image:
    src: /logo.svg
    alt: ACME API Platform
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: API Reference
      link: /api/
    - theme: alt
      text: View on GitHub
      link: https://github.com/acme/api-platform

features:
  - icon: 👥
    title: User Management API
    details: Complete user lifecycle management with authentication, authorization, profiles, and preferences. Supports SSO, MFA, and role-based access control.
    
  - icon: 💳
    title: Payment Processing
    details: Secure payment processing with support for multiple payment methods, subscriptions, invoicing, and comprehensive financial reporting.
    
  - icon: 📊
    title: Analytics & Insights
    details: Real-time analytics engine with customizable dashboards, event tracking, user behavior analysis, and business intelligence tools.
    
  - icon: 🔔
    title: Real-time Notifications
    details: Multi-channel notification system supporting email, SMS, push notifications, webhooks, and real-time messaging.
    
  - icon: 🔐
    title: Enterprise Security
    details: Bank-grade security with OAuth 2.0, API key management, rate limiting, encryption at rest and in transit, and audit logging.
    
  - icon: 🌍
    title: Global Scale
    details: Distributed across multiple regions with 99.99% uptime SLA, auto-scaling infrastructure, and CDN-powered content delivery.
---

## Latest Version: v2.0.0 <span class="version-badge">Current</span>

The ACME API Platform v2.0.0 introduces significant enhancements and new capabilities:

### 🚀 New Features
- **Enhanced Authentication**: New JWT-based authentication system with refresh tokens
- **Real-time Notifications API**: WebSocket and webhook support for instant updates  
- **Advanced Analytics**: Machine learning-powered insights and predictive analytics
- **GraphQL Support**: Query multiple resources efficiently with our new GraphQL endpoint

### ⚠️ Breaking Changes
- Authentication endpoints have been restructured (see [Migration Guide](/guides/migration-v2))
- User profile API now uses different field names for consistency
- Payment webhook payload structure has been updated

### 📈 Performance Improvements  
- 40% faster response times across all endpoints
- Improved rate limiting with burst capacity
- Enhanced caching strategies for better performance

---

## Quick Start

Get up and running with the ACME API Platform in minutes:

```bash
# Install the official SDK
npm install @acme/api-sdk

# Or use cURL directly
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.acme.com/v2/users/me
```

::: tip 💡 Need help choosing a version?
- **v2.0.0** (Current): Best for new projects with latest features
- **v1.1.0**: Stable with analytics support, recommended for existing integrations  
- **v1.0.0**: Legacy support, security updates only

Use the version switcher above to explore documentation for different API versions.
:::

## Enterprise Ready

Trusted by over 10,000 companies worldwide:

- **99.99% Uptime SLA** with global redundancy
- **SOC 2 Type II** and **ISO 27001** certified
- **24/7 Support** with dedicated account management
- **Comprehensive SDKs** for all major programming languages

---

## What's Next?

<div class="next-steps">

### For Developers
- [🚀 Getting Started Guide](/getting-started) - Set up your first API integration
- [📚 API Reference](/api/) - Comprehensive endpoint documentation
- [💡 Developer Guides](/guides/) - Best practices and advanced patterns

### For Product Managers  
- [📊 Analytics Dashboard](https://dashboard.acme.com) - Track API usage and performance
- [💼 Enterprise Features](/guides/enterprise) - Advanced security and compliance
- [🔧 Integration Examples](/guides/integrations) - Common use case implementations

### For DevOps Teams
- [⚙️ Infrastructure Guide](/guides/infrastructure) - Deployment and scaling best practices
- [🔍 Monitoring & Alerting](/guides/monitoring) - Observability and troubleshooting
- [🛡️ Security Guidelines](/guides/security) - Protect your API integrations

</div>

<style>
.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.next-steps h3 {
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  margin: 0.75rem 0;
  padding-left: 0;
}

.next-steps a {
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.next-steps a:hover {
  background: var(--vp-c-bg-soft);
}
</style>