# Alumni Management System - UML Diagrams

**Generated**: 2025-12-09T23:43:03.784Z
**Project**: Alumni Management System
**Technology Stack**: Node.js, Express, MongoDB, Next.js, React, Socket.IO

## Overview

This directory contains comprehensive UML diagrams for the Alumni Management System, suitable for inclusion in project reports and technical documentation.

## Diagram Index

### 1. Structural Diagrams

#### [Class Diagram](01-class-diagram.md)
- **Type**: Class Diagram
- **Purpose**: Shows all data models, their attributes, and relationships
- **Key Elements**: User, Profile, Event, Job, Connection, Message, Notification, Announcement
- **Use Case**: Understanding the database schema and entity relationships

### 2. Behavioral Diagrams

#### [Use Case Diagram](02-use-case-diagram.md)
- **Type**: Use Case Diagram
- **Purpose**: Illustrates system functionality organized by user roles
- **Key Elements**: Student, Alumni, Admin actors with their respective use cases
- **Use Case**: Understanding what each user role can do in the system

#### [Login Sequence Diagram](03-sequence-login.md)
- **Type**: Sequence Diagram
- **Purpose**: Details the authentication flow
- **Key Elements**: User, Frontend, AuthController, Database, TokenGenerator
- **Use Case**: Understanding the login process and JWT token generation

#### [Connection Request Sequence Diagram](04-sequence-connection.md)
- **Type**: Sequence Diagram
- **Purpose**: Shows the complete flow of connection requests with real-time notifications
- **Key Elements**: Two users, Frontend, ConnectionController, Database, NotificationService, Socket.IO
- **Use Case**: Understanding how users connect and receive real-time updates

#### [Event Registration Sequence Diagram](05-sequence-event-registration.md)
- **Type**: Sequence Diagram
- **Purpose**: Illustrates event registration with bidirectional notifications
- **Key Elements**: Student, Frontend, EventController, Database, NotificationService, EventCreator
- **Use Case**: Understanding event registration workflow

#### [Connection State Diagram](06-state-connection.md)
- **Type**: State Diagram
- **Purpose**: Shows connection status lifecycle
- **Key Elements**: pending, accepted, rejected states
- **Use Case**: Understanding connection request states and transitions

#### [Event State Diagram](07-state-event.md)
- **Type**: State Diagram
- **Purpose**: Shows event lifecycle states
- **Key Elements**: upcoming, ongoing, completed states
- **Use Case**: Understanding event status progression

#### [Job Application Activity Diagram](08-activity-job-application.md)
- **Type**: Activity Diagram
- **Purpose**: Complete workflow for job applications
- **Key Elements**: Browse, filter, apply, notify
- **Use Case**: Understanding the student job application process

#### [Event Registration Activity Diagram](09-activity-event-registration.md)
- **Type**: Activity Diagram
- **Purpose**: Workflow for event creation and registration
- **Key Elements**: Role-based access, create event, register, notify
- **Use Case**: Understanding event management workflows

### 3. Architectural Diagrams

#### [Component Architecture Diagram](10-component-architecture.md)
- **Type**: Component Diagram
- **Purpose**: Shows system architecture and component dependencies
- **Key Elements**: Client Layer, API Layer, Business Logic, Data Access, External Services
- **Use Case**: Understanding the layered architecture and component interactions

#### [Deployment Diagram](11-deployment-diagram.md)
- **Type**: Deployment Diagram
- **Purpose**: Shows physical deployment topology
- **Key Elements**: Client Device, Frontend Server, Backend Server, Database Server
- **Use Case**: Understanding how the system is deployed and communication protocols

### 4. Detailed Flowcharts

#### [Authentication Flowchart](12-flowchart-authentication.md)
- **Type**: Flowchart
- **Purpose**: Step-by-step authentication process
- **Key Elements**: Validation, password hashing, token generation
- **Use Case**: Understanding detailed login logic and error handling

#### [Notification Delivery Flowchart](13-flowchart-notification.md)
- **Type**: Flowchart
- **Purpose**: Notification creation and delivery process
- **Key Elements**: Database storage, online check, Socket.IO emission
- **Use Case**: Understanding real-time and offline notification handling

#### [Connection Request Flowchart](14-flowchart-connection-request.md)
- **Type**: Flowchart
- **Purpose**: Detailed connection request process
- **Key Elements**: Validation, duplicate check, notification creation
- **Use Case**: Understanding connection request logic and edge cases

## How to View Diagrams

### Option 1: Markdown Viewer with Mermaid Support
- Use VS Code with the "Markdown Preview Mermaid Support" extension
- Use GitHub (renders Mermaid automatically)
- Use GitLab (renders Mermaid automatically)

### Option 2: Mermaid Live Editor
1. Visit https://mermaid.live
2. Copy the Mermaid code from any diagram file
3. Paste into the editor
4. Export as PNG, SVG, or PDF

### Option 3: Command Line Tools
```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Convert to PNG
mmdc -i 01-class-diagram.md -o class-diagram.png

# Convert to SVG
mmdc -i 01-class-diagram.md -o class-diagram.svg

# Convert to PDF
mmdc -i 01-class-diagram.md -o class-diagram.pdf
```

### Option 4: Online Converters
- https://mermaid.ink - Generate images from Mermaid code
- https://kroki.io - Universal diagram converter

## Diagram Conventions

### Colors and Styling
- **Blue**: Client-side components
- **Yellow**: API/Server components
- **Pink**: Business logic components
- **Green**: Data access components
- **Gray**: External services

### Notation
- **Solid lines**: Direct associations or calls
- **Dashed lines**: Dependencies or responses
- **Arrows**: Direction of relationship or data flow
- **Diamonds**: Decision points
- **Rectangles**: Processes or components
- **Cylinders**: Database operations

## System Overview

The Alumni Management System is a full-stack web application that connects students and alumni. Key features include:

- **User Management**: Registration, authentication, role-based access (Student, Alumni, Admin)
- **Profile Management**: Create and update profiles with skills, experience, and interests
- **Connection System**: Send and accept connection requests between users
- **Event Management**: Create, browse, and register for events
- **Job Board**: Post jobs (Alumni) and apply to jobs (Students)
- **Real-time Chat**: Direct messaging between connected users
- **Notifications**: Real-time notifications for connections, events, and jobs
- **Announcements**: System-wide announcements from admins and alumni

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express 5, JavaScript
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO for WebSocket communication
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **API**: RESTful API architecture

## Project Structure

```
alumni-management-system/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── utils/           # Helper functions
├── alumni_frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   └── lib/             # Utilities and API client
└── diagrams/            # This directory
```

## For Project Reports

These diagrams are designed to be professional and suitable for inclusion in:
- Major project reports
- Technical documentation
- System design documents
- Presentations
- Academic submissions

Each diagram includes:
- Clear title and description
- Generation timestamp
- Legend explaining notation
- Additional notes and context

## Maintenance

To regenerate all diagrams:
```bash
node generate-diagrams.js
```

This will analyze the current codebase and update all diagram files.

---

**Note**: These diagrams are automatically generated based on the current system implementation. They represent the actual structure and behavior of the Alumni Management System as of the generation date.
