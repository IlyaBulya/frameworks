# Frameworks Comparison

This repository contains implementations of the same Todo application using different JavaScript frameworks:

- Vue.js (Vue 3 + TypeScript)
- React (React + TypeScript)

Both implementations have the same functionality but use framework-specific patterns and approaches.

## Project Structure

```
frameworks/
├── .husky/                # Git hooks configuration
├── vue-app/               # Vue.js implementation
├── react-app/             # React implementation
├── biome.json             # Shared Biome configuration
├── lint-staged.config.cjs # Shared lint-staged configuration
└── package.json           # Root package.json with shared scripts
```

## Features

- Todo application with the same functionality implemented in multiple frameworks
- HTTP fetching from JSONPlaceholder API
- User interactions (add, toggle, delete todos)
- Comprehensive unit tests for both implementations
- Shared linting and formatting configuration using Biome
- Git hooks to ensure code quality on every commit
- Unified scripts to run tests, linting, and formatting for all implementations

## Application Features

Both implementations include:

- Fetching todos from an external API
- Adding new todos
- Toggling todo completion status
- Deleting todos
- Loading states and error handling
- Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run both applications in development mode:
   ```
   npm run dev:vue    # Run Vue app
   npm run dev:react  # Run React app
   ```

## Testing

Both applications include comprehensive tests for:

- User interactions (adding, toggling, and deleting todos)
- HTTP fetching with proper mocking
- Loading states and error handling

### Running Tests

```bash
# Run all tests
npm test

# Run tests for a specific app
npm run test:vue
npm run test:react
```

## Code Quality Tools

### Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Lint all code
npm run lint

# Format all code
npm run format

# Lint or format specific app
npm run lint:vue
npm run lint:react
npm run format:vue
npm run format:react
```

## Available Scripts

In the root directory, you can run:

### `npm test`

Runs tests for all implementations.

### `npm run lint`

Lints all implementations using Biome.

### `npm run format`

Formats all implementations using Biome.

## Individual App Scripts

Each app directory has its own scripts:

### Vue App

```
cd vue-app
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
npm run lint     # Lint code
npm run format   # Format code
```

### React App

```
cd react-app
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run tests
npm run lint     # Lint code
npm run format   # Format code
```

## Git Hooks

This project uses Husky for Git hooks:

- **pre-commit**: Runs tests and lint-staged to ensure code quality before committing

The pre-commit hook will:
1. Run tests to ensure all functionality works
2. Check and fix linting issues
3. Format code according to project standards