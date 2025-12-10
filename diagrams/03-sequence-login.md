# User Login Sequence Diagram

**Generated**: 2025-12-09T23:43:03.760Z
**Description**: Detailed flow of user authentication process

## Diagram

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant AuthController
    participant Database
    participant TokenGenerator
    
    User->>Frontend: Enter email & password
    Frontend->>AuthController: POST /api/auth/login
    AuthController->>Database: findOne({ email })
    Database-->>AuthController: User document
    AuthController->>AuthController: matchPassword(password)
    alt Password Valid
        AuthController->>TokenGenerator: generateToken(userId, role)
        TokenGenerator-->>AuthController: JWT token
        AuthController-->>Frontend: { user, token }
        Frontend-->>User: Redirect to dashboard
    else Password Invalid
        AuthController-->>Frontend: 401 Invalid credentials
        Frontend-->>User: Show error message
    end
```

## Legend

- Solid arrows represent synchronous calls
- Dashed arrows represent responses
- alt blocks show conditional logic

## Notes

JWT tokens are used for session management with 45-day expiration
