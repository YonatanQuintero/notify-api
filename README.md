<p align="center">
  <a href="https://x.com/yonax73" target="blank"><img src="https://api.dicebear.com/9.x/bottts/svg?seed=notify-API" width="90" alt="avatar" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A flexible and extensible Notification REST API built with NestJS.</p>
    <p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://www.paypal.com/paypalme/yonax73" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://x.com/yonax73" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Notify API

A flexible and extensible Notification REST API built with NestJS. The service currently supports email notifications via SMTP and is designed to be easily integrated into your projects. Future versions will support additional channels like SMS and push notifications.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack & Framework](#technology-stack--framework)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Configure Environment Variables](#configure-environment-variables)
- [Running the Application](#running-the-application)
- [API Authentication & Security](#api-authentication--security)
- [SMTP & Email Configuration](#smtp--email-configuration)
- [Internationalization (i18n)](#internationalization-i18n)
- [Using the Endpoints](#using-the-apiv1notificationsemail-endpoints)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Testing](#testing)
- [Deployment](#deployment)
- [Resources & Support](#resources--support)
- [License](#license)

## Project Overview

The Notify API provides a RESTful interface for sending notifications. Initially focused on email notifications using SMTP, the project is designed for ease-of-use and future expansion to include additional channels.

## Technology Stack & Framework

- **Backend Framework:** NestJS
- **Programming Language:** TypeScript
- **Template Engine:** EJS (for HTML email templates)
- **Storage:** Redis (for queue management and caching)
- **Environments:** Development, Testing, Production (managed via .env files)

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/YonatanQuintero/notify-api.git
cd notify-api
```

### Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory (if not already present) and configure the following key settings:

```ini
# .env

PORT=3000
API_KEY=api-key-64-length
ENVIRONMENT=development
DEFAULT_LANG=en

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=smtp-user
SMTP_PASS=smtp-pass

COMPANY_NAME="My Company"
COMPANY_ICON_URL=https://my-company.com/icon.png
COMPANY_WEBSITE_URL=https://my-company.com
COMPANY_ADDRESS="The way to the heaven"

REDIS_URL=redis://localhost:6379/0
REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_DB=0
```

> **Note:** Ensure that sensitive credentials like API keys and SMTP passwords are kept secure.

## Running the Application

### Development Mode

Start the application in development mode:

```bash
npm run start
```

### Watch Mode

For automatic reload during development:

```bash
npm run start:dev
```

### Production Mode

Build and run in production mode:

```bash
npm run start:prod
```

## API Authentication & Security

- **API Key Authentication:**  
  Every request must include the API key in the header (`x-api-key`).  
  Example header:  
  ```
  x-api-key: your_api_key_here
  ```

- **Transport Security:**  
  The API should be deployed behind HTTPS (handled by your load balancer or API gateway).

## SMTP & Email Configuration

The service uses SMTP to send emails. Configure your SMTP details in the `.env` file:

- **SMTP_HOST:** Your SMTP server host.
- **SMTP_PORT:** SMTP port (commonly 587 for TLS).
- **SMTP_USER:** Your SMTP username.
- **SMTP_PASS:** Your SMTP password.

Emails are templated using EJS with HTML templates stored in the `templates/` directory. The email sending process includes a retry mechanism for handling transient errors.

## Internationalization (i18n)

- **Supported Languages:**  
  - English (`en`)
  - Spanish (`es`)

- **Language Selection:**  
  Determine the language via the `x-language` HTTP header. If not provided or unsupported, the default language (configured in `.env` as `DEFAULT_LANGUAGE`) is used.

- **Usage:**  
  Include error messages, system messages, and template strings that support translation using separate language resource files.

## Using the api/v1/notifications/email Endpoints

### Sample Request

Use the following example to send a notification using either cURL or HTTPie:

#### cURL Example

```bash
curl -X POST http://localhost:3000/api/v1/notifications/email/welcome \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -H "x-language: es" \
  -H "Accept: */*" \
  -d '{"to": ["email@example.com"], "username": "example"}'
```

#### HTTPie Example

```bash
http POST http://localhost:3010/api/v1/notifications/email/welcome \
  Content-Type:application/json \
  x-api-key:"your-secret-api-key" \
  x-language:es \
  Accept:'*/*' \
  to:='["email@example.com"]' \
  username="example"
```

## API Documentation (Swagger)

Detailed API documentation is available via Swagger. You can view it here:

[Swagger Docs](http://localhost:3000/docs)

> **Tip:** Replace `localhost:3000` with your deployed API domain if not running locally.

## Testing

Run tests to ensure everything is functioning correctly:

- **Unit Tests:**  
  ```bash
  npm run test:unit
  ```

- **End-to-End Tests:**  
  ```bash
  npm run test:e2e
  ```

- **Test Coverage:**  
  ```bash
  npm run test:cov:unit
  ```

## Deployment

When you're ready to deploy:

1. **Build for Production:**  
   Ensure your `.env` is set up correctly for production.

2. **Deployment Using Mau (Optional):**  
   Deploy your NestJS application with Mau on AWS:
   ```bash
   npm install -g mau
   mau deploy
   ```

3. **Further Steps:**  
   Review your deployment documentation for additional steps and configuration details specific to your production environment.

## Resources & Support

- **NestJS Documentation:** [NestJS Docs](https://docs.nestjs.com)
- **Contact me at:** yonax73@gmail.com

## License

Notify API is released under the [MIT License](LICENSE).