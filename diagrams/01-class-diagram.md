# Alumni Management System - Class Diagram

**Generated**: 2025-12-09T23:43:03.758Z
**Description**: Complete data model showing all entities, their attributes, and relationships

## Diagram

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String name
        +String email
        +String password
        +String role
        +Date createdAt
        +Date updatedAt
        +matchPassword(password) Boolean
    }
    
    class Profile {
        +ObjectId _id
        +ObjectId user
        +String headline
        +String bio
        +String location
        +String[] skills
        +String profileImage
        +Object links
        +String currentRole
        +String company
        +Number yearsOfExperience
        +String industry
        +String batch
        +Boolean mentorShipInterest
        +String currentCourse
        +Number yearOfStudy
        +String[] interest
        +Date createdAt
        +Date updatedAt
    }

    
    class Event {
        +ObjectId _id
        +String title
        +String description
        +Date date
        +String time
        +String venue
        +ObjectId createdBy
        +String creatorRole
        +ObjectId[] registeredUsers
        +String status
        +String bannerImage
        +Date createdAt
        +Date updatedAt
    }
    
    class Job {
        +ObjectId _id
        +String title
        +String company
        +String description
        +String[] skillsRequired
        +String location
        +String type
        +ObjectId postedBy
        +ObjectId[] applicants
        +Boolean approved
        +Date createdAt
        +Date updatedAt
    }
    
    class Connection {
        +ObjectId _id
        +ObjectId requester
        +ObjectId recipient
        +String status
        +Date createdAt
        +Date updatedAt
    }
    
    class Message {
        +ObjectId _id
        +ObjectId sender
        +ObjectId receiver
        +String message
        +Boolean isRead
        +Date createdAt
        +Date updatedAt
    }

    
    class Notification {
        +ObjectId _id
        +ObjectId user
        +String message
        +String type
        +Boolean isRead
        +ObjectId fromUser
        +Date createdAt
        +Date updatedAt
    }
    
    class Announcement {
        +ObjectId _id
        +String title
        +String message
        +ObjectId createdBy
        +String creatorRole
        +String attachment
        +Date createdAt
        +Date updatedAt
    }
    
    %% Enumerations
    class UserRole {
        <<enumeration>>
        student
        alumni
        admin
    }
    
    class EventStatus {
        <<enumeration>>
        upcoming
        ongoing
        completed
    }
    
    class JobType {
        <<enumeration>>
        Full-time
        Part-time
        Internship
        Remote
    }
    
    class ConnectionStatus {
        <<enumeration>>
        pending
        accepted
        rejected
    }

    
    class NotificationType {
        <<enumeration>>
        connection_request
        connection_accepted
        event_registration
        new_job_posted
        announcement
    }
    
    %% Relationships
    User "1" -- "1" Profile : has
    User "1" -- "0..*" Event : creates
    User "1" -- "0..*" Job : posts
    User "0..*" -- "0..*" Event : registers
    User "0..*" -- "0..*" Job : applies
    User "1" -- "0..*" Connection : requests
    User "1" -- "0..*" Connection : receives
    User "1" -- "0..*" Message : sends
    User "1" -- "0..*" Message : receives
    User "1" -- "0..*" Notification : receives
    User "1" -- "0..*" Announcement : creates
    
    User ..> UserRole : uses
    Event ..> EventStatus : uses
    Job ..> JobType : uses
    Connection ..> ConnectionStatus : uses
    Notification ..> NotificationType : uses
```

## Legend

- Solid lines represent associations
- Dotted lines represent dependencies
- Cardinality shown as 1, 0..*, etc.

## Notes

This diagram represents the MongoDB schema structure with Mongoose models
