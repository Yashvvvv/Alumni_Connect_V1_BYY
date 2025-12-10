# Event Status State Diagram

**Generated**: 2025-12-09T23:43:03.765Z
**Description**: Lifecycle states of events from creation to completion

## Diagram

```mermaid
stateDiagram-v2
    [*] --> upcoming : Event Created
    upcoming --> ongoing : Event Starts
    ongoing --> completed : Event Ends
    completed --> [*]
    
    note right of upcoming
        Event scheduled
        Users can register
    end note
    
    note right of ongoing
        Event in progress
        Registration may be closed
    end note
    
    note right of completed
        Event finished
        Historical record
    end note
```

## Legend

- Linear progression through states
- Status typically updated manually by admin/creator
- Could be automated based on date/time

## Notes

Event status helps users identify which events they can register for and which have passed
