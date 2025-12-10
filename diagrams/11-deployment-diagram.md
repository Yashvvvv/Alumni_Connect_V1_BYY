# System Deployment Diagram

**Generated**: 2025-12-09T23:43:03.776Z
**Description**: Physical deployment architecture showing servers, services, and communication protocols

## Diagram

```mermaid
graph TB
    subgraph "Client Device"
        Browser[Web Browser]
    end
    
    subgraph "Frontend Server"
        NextJS[Next.js Application<br/>Port 3000]
        StaticFiles[Static Assets<br/>CSS, JS, Images]
    end
    
    subgraph "Backend Server"
        NodeJS[Node.js Runtime]
        ExpressApp[Express Application<br/>Port 5000]
        SocketServer[Socket.IO Server<br/>WebSocket]
    end
    
    subgraph "Database Server"
        MongoDB[(MongoDB<br/>Port 27017)]
    end
    
    subgraph "External Services"
        JWT_Service[JWT Authentication]
    end
    
    Browser -->|HTTP/HTTPS| NextJS
    Browser -->|WebSocket| SocketServer
    NextJS --> StaticFiles
    NextJS -->|REST API Calls| ExpressApp
    
    ExpressApp --> NodeJS
    SocketServer --> NodeJS
    
    ExpressApp -->|Mongoose ODM| MongoDB
    ExpressApp --> JWT_Service
    
    style Browser fill:#e1f5ff
    style NextJS fill:#61dafb
    style ExpressApp fill:#90c53f
    style MongoDB fill:#4db33d
    style SocketServer fill:#010101,color:#fff
```

## Legend

- Client Device: User's web browser
- Frontend Server: Next.js application serving React UI
- Backend Server: Node.js with Express API and Socket.IO
- Database Server: MongoDB for data persistence
- Communication: HTTP/HTTPS for API, WebSocket for real-time features

## Notes

The system can be deployed on separate servers or containerized. Frontend and backend communicate via REST API. Real-time features use WebSocket protocol.
