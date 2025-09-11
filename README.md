# Playwright Automation Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for web application automation.

## Features

- **Cross-browser Testing**: Supports Chromium, Firefox, and WebKit
- **TypeScript Support**: Full TypeScript integration for better code quality
- **Parallel Execution**: Tests run in parallel for faster execution
- **Auto-waiting**: Built-in smart waiting mechanisms
- **HTML Reports**: Detailed test reports with screenshots and traces
- **CI/CD Ready**: Configured for continuous integration environments

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

### First-time Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohammedJafferAli/playwright-automation.git
   cd playwright_automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## Test Structure

```
tests/
├── AutoWaits.spec.ts          # Auto-waiting mechanisms and AJAX handling
├── Locators.spec.ts           # Element locator strategies
├── ParentChildLocator.spec.ts # Parent-child element relationships
└── UIElements1.spec.ts        # UI element interactions
```

## Running Tests

### 1. Run All Tests
```bash
npx playwright test
```

### 2. Run Tests in Specific Browser
```bash
# Chrome/Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# Safari/WebKit
npx playwright test --project=webkit
```

### 3. Run Specific Test File
```bash
npx playwright test tests/AutoWaits.spec.ts
```

### 4. Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### 5. Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### 6. Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### 7. Run Tests in Parallel
```bash
npx playwright test --workers=4
```

### 8. Run Tests with Specific Reporter
```bash
# HTML Report (default)
npx playwright test --reporter=html

# Line Reporter
npx playwright test --reporter=line

# JSON Reporter
npx playwright test --reporter=json
```

### 9. Run Tests with Tags/Grep
```bash
# Run tests matching pattern
npx playwright test --grep "Auto waiting"

# Run tests NOT matching pattern
npx playwright test --grep-invert "Alternative"
```

## Viewing Test Results

### HTML Report
After test execution, view the HTML report:
```bash
npx playwright show-report
```

### Trace Viewer
View detailed traces for failed tests:
```bash
npx playwright show-trace trace.zip
```

## Configuration

The framework is configured via `playwright.config.ts`:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled
- **Retries**: 2 retries on CI, 0 locally
- **Reporters**: HTML reporter with traces on first retry
- **Browsers**: Chromium, Firefox, WebKit

## Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test('test description', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toHaveText('Expected Text');
});
```

### Using Hooks
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});
```

## Best Practices

1. **Use Auto-waiting**: Playwright automatically waits for elements
2. **Prefer `expect()` assertions**: Use Playwright's built-in assertions
3. **Use Page Object Model**: Organize tests with page objects for maintainability
4. **Handle Dynamic Content**: Use proper waiting strategies for AJAX/dynamic content
5. **Cross-browser Testing**: Run tests across all configured browsers

## Troubleshooting

### Common Issues

1. **Browser not installed**
   ```bash
   npx playwright install chromium firefox webkit
   ```

2. **Tests timing out**
   - Increase timeout in `playwright.config.ts`
   - Use proper waiting strategies

3. **Element not found**
   - Verify locators using Playwright Inspector
   - Use `page.pause()` for debugging

### Debug Commands
```bash
# Open Playwright Inspector
npx playwright test --debug

# Generate test code
npx playwright codegen https://example.com

# Check Playwright version
npx playwright --version
```

## CI/CD Integration

The framework is configured for CI environments with:
- Retry mechanism (2 retries on CI)
- Single worker on CI
- Fail-fast on `test.only` usage

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: npm ci
- name: Install Playwright
  run: npx playwright install --with-deps
- name: Run tests
  run: npx playwright test
```

## Contributing

1. Follow TypeScript best practices
2. Add appropriate test descriptions
3. Use meaningful locators
4. Include proper assertions
5. Update documentation for new features

## Support

For issues and questions:
- Check Playwright documentation: https://playwright.dev
- Review test logs and HTML reports
- Use debug mode for troubleshooting
