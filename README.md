
# Ticket Management System

This project is part of a technical assignment for the recruitment process at `<company>` (name to be updated later). It is designed to develop a ticket management system to handle support tickets efficiently, allowing users to create, update, and resolve tickets while tracking their status.

## Features

- **Ticket Creation**: Users can create support tickets with necessary details like title, description, priority, and category.
- **Ticket Management**: Tickets can be updated, prioritized, and tracked until resolution.
- **User Roles**: The system supports different roles such as users (who create tickets) and support agents (who handle tickets).
- **Search and Filter**: Search and filter options to quickly find and manage tickets.
- **Security**: Ensuring secure login and access control.

## Technologies Used

- **Frontend**: Angular for the user interface.
- **Backend**: ASP.NET Core for the server-side logic and APIs.
- **Database**: SQL Server for data storage.
- **Containerization**: Docker is used to package and deploy the application.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd TicketTable
   ```

3. Install dependencies:
   ```bash
   npm install  # For frontend dependencies (Angular)
   ```

4. Configure the connection strings in `appsettings.json` for development and production environments.

5. Run the application:
   ```bash
   dotnet run  # To run the backend
   ```

   For Angular:
   ```bash
   ng serve  # To run the frontend
   ```

## Docker Setup

To run the application inside Docker, follow these steps:

1. Build the Docker images:
   ```bash
   docker-compose build
   ```

2. Run the containers:
   ```bash
   docker-compose up
   ```

