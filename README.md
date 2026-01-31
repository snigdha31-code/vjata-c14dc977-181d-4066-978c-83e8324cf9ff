# Full-Stack Task Management with RBAC & Audit Logging

## Setup Instructions
1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
Install dependencies:
```bash
npm install
Create .env in apps/api:
```
JWT_SECRET=super-secret-key
DB_PATH=./db.sqlite

## Run backend:

```bash
nx serve api
```

## Run frontend:

```bash
nx serve web
```

## Architecture Overview
  NX monorepo layout separates api (NestJS) and web (Angular)

  Shared libraries can store types, DTOs, and utility functions

  Modular design supports scaling and team development

## Data Model
  Users, Roles, Tasks, AuditLog entities

  ERD: Users ↔ Tasks (Many-to-One), AuditLog tracks user actions

  Roles: OWNER, ADMIN, VIEWER

## Access Control Implementation
  JWT authentication secures endpoints
  
  RolesGuard and @Roles decorator enforce permissions
  
  Task actions restricted based on role
  
  Audit logs accessible only to OWNER and ADMIN

## API Documentation
  POST /auth/login — login, returns JWT
  
  GET /tasks — list tasks
  
  POST /tasks — create task
  
  PATCH /tasks/:id/status — update task status
  
  DELETE /tasks/:id — delete task
  
  GET /audit-log — view audit logs (Owner/Admin)
  
  All protected endpoints require Authorization: Bearer <token>

## Future Considerations
  Task completion visualization (e.g., bar chart) 
  
  Dark/light mode toggle 
  
  Keyboard shortcuts for task action
  
  Add CSRF protection and rate limiting
  
  Role delegation and hierarchical RBAC
  
  Pagination and caching for efficient permission checks
  
  Multi-tenant support for organizational scaling
