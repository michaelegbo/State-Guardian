
# Custom State Manager for Angular - STATE GUARDIAN

## Introduction

The Custom State Manager is designed by Michael Egbo to manage state, side effects, and more in Angular applications, ensuring a streamlined and efficient workflow.

## Features

### 1. State Management

Track and modify different parts of your application state.

### 2. Effects Handling

Manage side effects like API calls.

### 3. Middleware Integration

Introduce custom behavior for actions, such as logging.

### 4. Entity Management

Efficiently handle collections of entities.

### 5. Data Normalization

Ensure consistent data structure and querying.

### 6. Error Handling

Gracefully manage errors and inform the state.

### 7. Caching

Store frequently accessed data to improve performance.

## Usage

### State Management

1. **Initialization**:

```typescript
const INITIAL_STATE: AppState = {
  user: { ... },
  books: [],
  ...
};
this.store.dispatch(() => INITIAL_STATE);
```

2. **Selection**:

```typescript
this.store.select('user').subscribe(userState => {
  this.currentUser = userState;
});
```

### Effects Handling

For login:

```typescript
const loginEffectConfig: EffectConfig = {
  apiCall: () => this.authService.login(credentials),
  successHandler: (response) => { return { user: { ...response, isLoggedIn: true } }; },
  errorHandler: (error) => { return { user: { error, isLoggedIn: false } }; }
};
this.effectsService.handleEffect(loginEffectConfig);
```

### Entity Management

- **Adding a new book**:

```typescript
const newBook: Book = { title: 'New Title', author: 'John Doe' };
const updatedBooks = this.entityService.addOne(this.books, newBook);
this.store.dispatch(() => { books: updatedBooks });
```

### Middleware Integration

Use the middleware to log actions:

```typescript
this.middlewareService.intercept('ADD_BOOK', newBook);
```

### Data Normalization

When fetching nested data, use normalization:

```typescript
const nestedBooks = [
  { id: 1, title: 'Title 1', author: { name: 'Author 1' } },
  { id: 2, title: 'Title 2', author: { name: 'Author 2' } }
];

const normalizedBooks = this.normalizationService.normalize(nestedBooks, 'id');
this.store.dispatch(() => { books: normalizedBooks });
```

### Caching

Cache data after fetching:

```typescript
this.cacheService.set('books', this.books);
```

Retrieve cached data:

```typescript
const cachedBooks = this.cacheService.get('books');
```

## Use Case: Book Management App

1. **Login**:
Use the `EffectsService` for login and set user tokens upon success.

2. **Fetch Books**:
After logging in, fetch the books. Use normalization to flatten the data and cache it for faster subsequent access.

3. **Manage Books**:
Add, update, or delete books using the `EntityManagementService`.

4. **Middleware**:
Log actions using the middleware, providing insights into the user's behavior.

---

This documentation gives a more in-depth overview of how to use the state manager and its features. Adjust paths, method names, and data structures to fit your actual implementation.

Author: Michael Egbo
Email: https://www.linkedin.com/in/michaelegbo/