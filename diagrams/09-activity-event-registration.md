# Event Registration Activity Diagram

**Generated**: 2025-12-09T23:43:03.767Z
**Description**: Workflow for viewing, creating, and registering for events with role-based access

## Diagram

```mermaid
flowchart TD
    Start([User Views Events]) --> CheckRole{Check User Role}
    CheckRole -->|Admin/Alumni| ShowCreate[Show Create Event Button]
    CheckRole -->|Student| ShowEvents[Show Event List]
    ShowCreate --> CreateChoice{Create New Event?}
    CreateChoice -->|Yes| FillForm[Fill Event Form]
    FillForm --> SubmitEvent[Submit Event]
    SubmitEvent --> SaveEvent[(Save to Database)]
    SaveEvent --> ShowEvents
    CreateChoice -->|No| ShowEvents
    
    ShowEvents --> FilterEvents{Filter Events?}
    FilterEvents -->|Yes| ApplyFilters[Apply Status/Date Filters]
    ApplyFilters --> DisplayEvents[Display Filtered Events]
    FilterEvents -->|No| DisplayEvents
    
    DisplayEvents --> SelectEvent[Select Event]
    SelectEvent --> ViewEventDetails[View Event Details]
    ViewEventDetails --> RegisterChoice{Want to Register?}
    RegisterChoice -->|No| End([End])
    RegisterChoice -->|Yes| CheckRegistered{Already Registered?}
    CheckRegistered -->|Yes| ShowMessage[Show Already Registered]
    ShowMessage --> End
    CheckRegistered -->|No| RegisterUser[Add to Registered Users]
    RegisterUser --> UpdateEvent[(Update Event Document)]
    UpdateEvent --> NotifyCreator[Notify Event Creator]
    NotifyCreator --> NotifyUser[Notify User]
    NotifyUser --> ShowSuccess[Show Success Message]
    ShowSuccess --> End
```

## Legend

- Shows different paths for different user roles
- Includes event creation and registration flows
- Demonstrates notification triggers

## Notes

Alumni and Admins can create events. All users can register for events. Duplicate registrations are prevented.
