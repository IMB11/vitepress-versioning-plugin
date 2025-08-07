# Troubleshooting Guide

This comprehensive troubleshooting guide covers common issues, error codes, debugging techniques, and solutions for the ACME API Platform.

## Quick Diagnostic Tools

### API Health Check

First, verify that the API is operational:

```bash
# Check API status
curl -I https://api.acme.com/v2/health

# Expected response: HTTP/1.1 200 OK
```

### Authentication Test

Verify your API credentials:

```bash
curl -X GET https://api.acme.com/v2/account/me \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Common Error Codes

### Authentication Errors

#### 401 Unauthorized

**Causes:**
- Invalid or expired API key
- Missing Authorization header
- Incorrect token format

**Solutions:**
```bash
# Verify your API key format
echo "YOUR_API_KEY" | grep -E '^[a-zA-Z0-9_-]+$'

# Test with a fresh token
curl -X POST https://api.acme.com/v2/auth/token \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

#### 403 Forbidden

**Causes:**
- Insufficient permissions for the endpoint
- Account suspended or restricted
- IP address not whitelisted (enterprise accounts)

**Solutions:**
- Check your account permissions in the [dashboard](https://dashboard.acme.com)
- Verify IP whitelist settings
- Contact support if account appears suspended

### Rate Limiting Errors

#### 429 Too Many Requests

**Error Response:**
```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded",
    "retry_after": 60,
    "limit": 1000,
    "remaining": 0,
    "reset": 1640995200
  }
}
```

**Solutions:**

1. **Implement Exponential Backoff:**
```javascript
async function retryWithBackoff(apiCall, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.status === 429) {
        const retryAfter = error.headers['retry-after'] || Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

2. **Monitor Rate Limits:**
```javascript
// Check rate limit headers
const response = await fetch('/api/v2/users');
console.log('Rate Limit:', response.headers.get('X-RateLimit-Limit'));
console.log('Remaining:', response.headers.get('X-RateLimit-Remaining'));
console.log('Reset:', response.headers.get('X-RateLimit-Reset'));
```

3. **Optimize Requests:**
- Use pagination to reduce request size
- Implement local caching
- Batch multiple operations when possible
- Use GraphQL to reduce request count

### Validation Errors

#### 422 Unprocessable Entity

**Error Response:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": {
      "validation_errors": [
        {
          "field": "email",
          "message": "Email format is invalid",
          "code": "INVALID_FORMAT"
        },
        {
          "field": "phone",
          "message": "Phone number must be in E.164 format",
          "code": "INVALID_PHONE_FORMAT"
        }
      ]
    }
  }
}
```

**Common Validation Issues:**

1. **Email Format:**
```javascript
// Correct format
const validEmail = "user@example.com";

// Common mistakes
const invalidEmails = [
  "user@",           // Missing domain
  "@example.com",    // Missing local part
  "user.example.com" // Missing @ symbol
];
```

2. **Phone Number Format:**
```javascript
// Correct E.164 format
const validPhone = "+1-555-123-4567";

// Common mistakes
const invalidPhones = [
  "555-123-4567",    // Missing country code
  "1-555-123-4567",  // Missing + prefix
  "(555) 123-4567"   // Wrong format
];
```

## Network and Connectivity Issues

### DNS Resolution Problems

**Symptoms:**
- `ENOTFOUND` errors
- Connection timeouts
- Intermittent connectivity

**Solutions:**

1. **Test DNS Resolution:**
```bash
# Test DNS lookup
nslookup api.acme.com

# Test with different DNS servers
nslookup api.acme.com 8.8.8.8
```

2. **Check Network Connectivity:**
```bash
# Test HTTPS connectivity
curl -I https://api.acme.com/v2/health

# Test with verbose output
curl -v https://api.acme.com/v2/health
```

### SSL/TLS Certificate Issues

**Symptoms:**
- SSL certificate verification errors
- `CERT_UNTRUSTED` errors
- Handshake failures

**Solutions:**

1. **Verify Certificate:**
```bash
# Check certificate details
openssl s_client -connect api.acme.com:443 -servername api.acme.com

# Test with different TLS versions
curl --tlsv1.2 https://api.acme.com/v2/health
```

2. **Update Certificate Store:**
```bash
# Update system certificates (Ubuntu/Debian)
sudo apt-get update && sudo apt-get install ca-certificates

# Update certificates (macOS)
brew install ca-certificates
```

## SDK-Specific Issues

### JavaScript/Node.js

#### Common Issues

1. **Module Import Errors:**
```javascript
// ❌ Common mistake
import AcmeAPI from '@acme/api-sdk';

// ✅ Correct import
import { AcmeAPI } from '@acme/api-sdk';
```

2. **Async/Await Handling:**
```javascript
// ❌ Missing await
const user = acme.users.get('usr_123');
console.log(user.name); // undefined

// ✅ Proper async handling
const user = await acme.users.get('usr_123');
console.log(user.name); // Works correctly
```

3. **Environment Variables:**
```javascript
// ❌ Hardcoded API keys
const acme = new AcmeAPI({ apiKey: 'sk_live_123...' });

// ✅ Environment variables
const acme = new AcmeAPI({ apiKey: process.env.ACME_API_KEY });
```

### Python

#### Common Issues

1. **Import Errors:**
```python
# ❌ Common mistake
from acme_api import AcmeAPI

# ✅ Correct import
from acme_api import AcmeClient
```

2. **Exception Handling:**
```python
# ✅ Proper exception handling
try:
    user = client.users.get('usr_123')
except AcmeAPIError as e:
    print(f"API Error: {e.message}")
    print(f"Error Code: {e.code}")
    print(f"Request ID: {e.request_id}")
```

### PHP

#### Common Issues

1. **Namespace Issues:**
```php
<?php
// ❌ Missing namespace
$client = new AcmeClient($config);

// ✅ Correct namespace
use Acme\Api\AcmeClient;
$client = new AcmeClient($config);
```

2. **Error Handling:**
```php
<?php
try {
    $user = $client->users->get('usr_123');
} catch (AcmeApiException $e) {
    error_log("API Error: " . $e->getMessage());
    error_log("Error Code: " . $e->getCode());
}
```

## Performance Issues

### Slow Response Times

**Debugging Steps:**

1. **Measure Request Times:**
```bash
# Time a request
time curl -X GET https://api.acme.com/v2/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

2. **Check for Large Payloads:**
```javascript
// Use pagination for large datasets
const users = await acme.users.list({ 
  limit: 50,  // Smaller page sizes
  cursor: 'next_page_cursor'
});

// Use field selection in GraphQL
const query = `
  query GetUsers {
    users(limit: 50) {
      id name email  # Only fetch needed fields
    }
  }
`;
```

3. **Implement Caching:**
```javascript
// Simple in-memory cache
const cache = new Map();

async function getCachedUser(userId) {
  if (cache.has(userId)) {
    return cache.get(userId);
  }
  
  const user = await acme.users.get(userId);
  cache.set(userId, user);
  return user;
}
```

### Memory Issues

**For Large Data Processing:**

1. **Use Streaming for Large Datasets:**
```javascript
// Stream large user exports
const stream = await acme.users.exportStream({
  format: 'json',
  filters: { status: 'active' }
});

stream.on('data', (chunk) => {
  // Process chunk by chunk
  processUsers(JSON.parse(chunk));
});
```

2. **Implement Pagination:**
```javascript
async function processAllUsers() {
  let cursor = null;
  
  do {
    const response = await acme.users.list({
      limit: 100,
      cursor: cursor
    });
    
    // Process this batch
    await processBatch(response.data);
    
    cursor = response.pagination.next_cursor;
  } while (cursor);
}
```

## Webhook Issues

### Webhook Not Receiving Events

**Troubleshooting Steps:**

1. **Verify Webhook URL:**
```bash
# Test webhook endpoint accessibility
curl -X POST https://your-app.com/webhooks/acme \
  -H "Content-Type: application/json" \
  -d '{"test": "payload"}'
```

2. **Check Webhook Configuration:**
```javascript
// List configured webhooks
const webhooks = await acme.webhooks.list();
console.log('Configured webhooks:', webhooks);

// Test webhook delivery
await acme.webhooks.test('webhook_123');
```

3. **Validate Webhook Signatures:**
```javascript
// Verify webhook signature
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return signature === `sha256=${expectedSignature}`;
}
```

## Debugging Tools

### Enable Debug Logging

#### JavaScript/Node.js
```javascript
// Enable debug logging
const acme = new AcmeAPI({
  apiKey: process.env.ACME_API_KEY,
  debug: true,
  logLevel: 'debug'
});

// Custom logger
acme.on('request', (request) => {
  console.log('Request:', request);
});

acme.on('response', (response) => {
  console.log('Response:', response);
});
```

#### Python
```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

client = AcmeClient(
    api_key=os.environ['ACME_API_KEY'],
    debug=True
)
```

### Request Tracing

Include request IDs for support:

```javascript
try {
  const user = await acme.users.get('usr_123');
} catch (error) {
  console.error('Request failed');
  console.error('Request ID:', error.request_id);
  console.error('Error Code:', error.code);
  console.error('Message:', error.message);
}
```

## Getting Help

### Before Contacting Support

1. **Gather Information:**
   - Request ID from error responses
   - Exact error message and code
   - Steps to reproduce the issue
   - SDK version and programming language
   - Timestamp of the issue

2. **Check Status Page:**
   - Visit [status.acme.com](https://status.acme.com)
   - Check for ongoing incidents

3. **Search Documentation:**
   - Check this troubleshooting guide
   - Review API reference documentation
   - Search community forum

### Contact Support

- **Email**: [support@acme.com](mailto:support@acme.com)
- **Live Chat**: Available in your dashboard
- **Community Forum**: [community.acme.com](https://community.acme.com)
- **Emergency Support**: Available for Enterprise customers

### Support Information to Provide

```
Subject: [API Issue] Brief description

Account Details:
- Account ID: acc_123456
- Environment: production/sandbox
- API Version: v2.0.0

Issue Details:
- Error Code: VALIDATION_ERROR
- Request ID: req_abc123def456
- Timestamp: 2024-01-15T10:30:00Z
- Endpoint: POST /v2/users

Code Example:
[Include minimal code that reproduces the issue]

Expected vs Actual Behavior:
[Describe what you expected vs what actually happened]
```

---

*Still having issues? Our support team is here to help 24/7. [Contact support](mailto:support@acme.com) with your specific error details.*