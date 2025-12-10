# Authentication Process Flowchart

**Generated**: 2025-12-09T23:43:03.777Z
**Description**: Detailed step-by-step flow of user login with validation and token generation

## Diagram

```mermaid
flowchart TD
    Start([User Submits Login Form]) --> Receive[Receive Email & Password]
    Receive --> Validate{Validate Input}
    Validate -->|Invalid| Error1[Return 400 Bad Request]
    Error1 --> End([End])
    
    Validate -->|Valid| FindUser[Query Database for User]
    FindUser --> UserExists{User Found?}
    UserExists -->|No| Error2[Return 401 Invalid Credentials]
    Error2 --> End
    
    UserExists -->|Yes| GetUser[Retrieve User Document]
    GetUser --> HashPassword[Hash Entered Password]
    HashPassword --> Compare[Compare with Stored Hash]
    Compare --> Match{Passwords Match?}
    
    Match -->|No| Error3[Return 401 Invalid Credentials]
    Error3 --> End
    
    Match -->|Yes| GenerateToken[Generate JWT Token]
    GenerateToken --> CreatePayload[Create Payload:<br/>userId, role]
    CreatePayload --> SignToken[Sign with Secret Key]
    SignToken --> SetExpiry[Set 45-day Expiration]
    SetExpiry --> PrepareResponse[Prepare Response Object]
    PrepareResponse --> IncludeUser[Include User Data:<br/>id, name, email, role]
    IncludeUser --> IncludeToken[Include JWT Token]
    IncludeToken --> Success[Return 200 Success]
    Success --> End
```

## Legend

- Diamond shapes represent decision points
- Rectangles represent processes
- Rounded rectangles represent start/end
- Shows all error paths and validation steps

## Notes

Password comparison uses bcrypt. JWT tokens include user ID and role for authorization. Tokens expire after 45 days.
