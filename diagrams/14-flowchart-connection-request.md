# Connection Request Process Flowchart

**Generated**: 2025-12-09T23:43:03.782Z
**Description**: Detailed flow for sending connection requests with validation and notification

## Diagram

```mermaid
flowchart TD
    Start([User Clicks Connect]) --> GetRecipient[Get Recipient User ID]
    GetRecipient --> ValidateRecipient{Recipient Exists?}
    ValidateRecipient -->|No| Error1[Return 404 User Not Found]
    Error1 --> End([End])
    
    ValidateRecipient -->|Yes| CheckExisting[Query Existing Connections]
    CheckExisting --> ExistingFound{Connection Exists?}
    ExistingFound -->|Yes| Error2[Return 400 Already Connected]
    Error2 --> End
    
    ExistingFound -->|No| CreateConnection[Create Connection Document]
    CreateConnection --> SetRequester[Set Requester: Current User]
    SetRequester --> SetRecipient[Set Recipient: Target User]
    SetRecipient --> SetStatus[Set Status: pending]
    SetStatus --> SaveConnection[(Save to Database)]
    SaveConnection --> CreateNotif[Create Notification]
    CreateNotif --> SetNotifType[Type: connection_request]
    SetNotifType --> SetMessage[Message: X sent request]
    SetMessage --> SaveNotif[(Save Notification)]
    SaveNotif --> CheckRecipientOnline{Recipient Online?}
    
    CheckRecipientOnline -->|Yes| EmitSocket[Emit Socket.IO Event]
    EmitSocket --> RealTimeNotif[Real-time Notification]
    RealTimeNotif --> Success[Return 201 Success]
    
    CheckRecipientOnline -->|No| Success
    Success --> End
```

## Legend

- Validates recipient exists before creating connection
- Prevents duplicate connection requests
- Creates notification for recipient
- Delivers real-time notification if recipient is online

## Notes

The system checks for existing connections in both directions (A->B or B->A) to prevent duplicates.
