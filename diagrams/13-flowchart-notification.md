# Notification Delivery Flowchart

**Generated**: 2025-12-09T23:43:03.779Z
**Description**: Process flow for creating and delivering notifications with real-time and offline handling

## Diagram

```mermaid
flowchart TD
    Start([Trigger Event Occurs]) --> CreateNotif[Create Notification Object]
    CreateNotif --> SetFields[Set Fields:<br/>user, fromUser, type, message]
    SetFields --> SaveDB[(Save to Database)]
    SaveDB --> CheckOnline{Is User Online?}
    
    CheckOnline -->|No| LogOffline[Log: User Offline]
    LogOffline --> StoreOnly[Notification Stored Only]
    StoreOnly --> End([End])
    
    CheckOnline -->|Yes| GetSocketID[Get User's Socket ID]
    GetSocketID --> EmitEvent[Emit Socket.IO Event]
    EmitEvent --> SendPayload[Send Notification Payload]
    SendPayload --> LogSuccess[Log: Real-time Sent]
    LogSuccess --> UpdateUI[User's UI Updates]
    UpdateUI --> End
    
    SaveDB --> ErrorCheck{Save Error?}
    ErrorCheck -->|Yes| LogError[Log Error Message]
    LogError --> End
    ErrorCheck -->|No| CheckOnline
```

## Legend

- All notifications are saved to database first
- Real-time delivery only if user is online
- Offline users see notifications when they log in
- Error handling for database failures

## Notes

The system maintains a global onlineUsers object mapping user IDs to socket IDs for real-time delivery.
