# ACME API Platform - VitePress Versioning Plugin Test Project

This is a comprehensive test project demonstrating all features of the VitePress Versioning Plugin through realistic enterprise-level API documentation.

## Project Overview

The ACME API Platform is a fictional comprehensive API service offering:
- User Management API
- Payment Processing API  
- Data Analytics API
- Real-time Notifications API

## Features Demonstrated

### Version Management
- **v1.0.0**: Initial API release with basic user management and payments
- **v1.1.0**: Added analytics API and enhanced user management
- **v2.0.0**: Major overhaul with breaking changes, new authentication, and notifications

### Internationalization
- **English** (default): Complete documentation
- **Spanish**: Localized content with cultural adaptations
- **French**: Localized content following EU compliance requirements

### Plugin Features
- Version switcher component integration
- Sidebar versioning with different structures per version
- URL rewriting for clean, SEO-friendly URLs
- Locale-specific routing and content organization
- Comprehensive configuration demonstration

## Project Structure

```
test/
├── .vitepress/
│   ├── config.ts                    # Main VitePress configuration
│   ├── theme/
│   │   └── index.ts                 # Custom theme with VersionSwitcher
│   └── sidebars/
│       └── versioned/               # Version-specific sidebar configs
│           ├── v1.0.0.json
│           ├── v1.0.0-es.json
│           ├── v1.0.0-fr.json
│           ├── v1.1.0.json
│           ├── v1.1.0-es.json
│           ├── v1.1.0-fr.json
│           ├── v2.0.0.json
│           ├── v2.0.0-es.json
│           └── v2.0.0-fr.json
├── versions/
│   ├── v1.0.0/                     # Version 1.0.0 content
│   ├── v1.1.0/                     # Version 1.1.0 content
│   └── v2.0.0/                     # Version 2.0.0 content
├── es/                             # Spanish translations (latest)
├── fr/                             # French translations (latest)
├── index.md                        # Latest version homepage
├── getting-started.md
├── api/
├── guides/
└── troubleshooting/
```

## Running the Test Project

```bash
# Install dependencies (from repository root)
npm install

# Start development server
npm run test:dev

# Build the documentation
npm run test:build

# Preview the built documentation
npm run test:preview
```

## Content Scenarios

### Version Differences
- **Breaking Changes**: v2.0.0 introduces new authentication requiring migration
- **Feature Additions**: v1.1.0 adds analytics without breaking existing functionality
- **Deprecations**: Gradual deprecation of legacy endpoints across versions

### Localization Scenarios
- **Compliance**: French version includes GDPR-specific documentation
- **Cultural Adaptation**: Spanish version uses culturally appropriate examples
- **Technical Variations**: Different code examples per locale where relevant

## Configuration Examples

This project demonstrates:
- `defineVersionedConfig` function usage
- `VersionSwitcher` component integration
- Custom sidebar path resolvers
- URL rewriting processors
- Locale-specific rewrite handling
- Professional theme customization