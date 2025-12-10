# Connection Status State Diagram

**Generated**: 2025-12-09T23:43:03.764Z
**Description**: State transitions for connection requests between users

## Diagram

```mermaid
stateDiagram-v2
    [*] --> pending : Send Connection Request
    pending --> accepted : Recipient Accepts
    pending --> rejected : Recipient Rejects
    accepted --> [*]
    rejected --> [*]
    
    note right of pending
        Waiting for recipient
        to respond
    end note
    
    note right of accepted
        Users are now connected
        Can message each other
    end note
    
    note right of rejected
        Connection declined
        Can send new request later
    end note
```

## Legend

- Initial state: pending (when request is sent)
- Terminal states: accepted or rejected
- No transitions from terminal states

## Notes

Once a connection is accepted or rejected, the state is final. Users can send new requests if rejected.
