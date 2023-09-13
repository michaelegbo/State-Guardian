
# Custom State Manager for Angular - STATE GUARDIAN

## Introduction

The Custom State Manager is designed by Michael Egbo to manage state, side effects, and more in Angular applications, ensuring a streamlined and efficient workflow.

## Features

### 1. State Management store

Track and modify different parts of your application state.

## dispatch:

Purpose: Used to dispatch an action to update the state.
When to Use: You use dispatch when you want to trigger a change in the application state. It's typically used when you need to update the state based on user interactions or other events.
Example: When a user logs in, you may dispatch an action to update the user's login status in the state.

## select:

Purpose: Used to select and observe specific parts of the application state.
When to Use: You use select when you want to "listen" to changes in a specific part of the state. It allows you to react to state changes and update your component's properties accordingly.
Example: You might use select to watch for changes in the user's login status or other parts of the state and take specific actions in response to those changes.

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


# State Guardian Library Documentation

State Guardian is a powerful state management library for Angular applications. It provides various features for managing application state, handling asynchronous effects, managing entities, normalizing data, caching, and more. This documentation will guide you through the installation and usage of State Guardian.

## Installation

To install the `state-guardian` library in your Angular project, follow these steps:

### Using npm

```bash
npm install state-guardian
```

### Using yarn

```bash
yarn add state-guardian
```

## Usage

### Import the `StateGuardianModule`

In your Angular application, you should import and add the `StateGuardianModule` to your application's module. Here's an example of how to do this:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StateGuardianModule } from 'state-guardian'; // Import the StateGuardianModule

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StateGuardianModule], // Add StateGuardianModule to your imports
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Using StateGuardian Services

Now that you have imported the `StateGuardianModule`, you can use StateGuardian services in your Angular components and services. Below are examples of how to use various features of State Guardian:


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

# Example use case below 

```typescript
import {
  CustomStore,
  EffectsService,
} from 'state-guardian';

interface User {
  id: number;
  username: string;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private store: CustomStore<{ user: User }>,
    private effectsService: EffectsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Watch for changes in the 'user' state and react accordingly
    this.store.select('user').subscribe((userState: User) => {
      this.isLoading = userState.isLoading;

      if (userState.isLoggedIn) {
        this.router.navigateByUrl('/home');
      }

      if (userState.error) {
        Swal.fire('Hi...', 'Kindly check your username or password', 'warning');
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      Swal.fire('Hi...', 'Kindly check your username or password', 'warning');
      return;
    }

    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.isLoading = true;

    this.effectsService.handleEffect(
      () => this.fakeLogin(credentials).pipe(take(1)),
      (response: User) => {
        localStorage.a = new Date();
        this.authService.setUserLoggedIn(true);
        this.userService.setToken(response.token);

        // Dispatch the updated user state to the store
        this.store.dispatch(() => ({ user: response }));

        logEvent(getAnalytics(), 'login', { method: 'Password' });
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        Swal.fire('Hi...', 'Kindly check your username or password', 'warning');
        logEvent(getAnalytics(), 'login_failed', { method: 'Password' });
        this.isLoading = false;
      }
    );
  }

  // Simulated login API call, replace with your actual login logic
  private fakeLogin(credentials: { email: string; password: string }) {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          const user: User = {
            id: 1,
            username: 'example_user',
            token: 'example_token',
          };
          observer.next(user);
        } else {
          observer.error('Invalid credentials');
        }
        observer.complete();
      }, 1000);
    });
  }
}
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
Package - https://www.npmjs.com/package/state-guardian

TO Contribute see - https://github.com/michaelegbo/State-Guardian