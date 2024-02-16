# Bid-Taxi-Service with MongoDB

## Overview
Bid-Taxi-Service is a Node.js application designed to provide a platform for users to find the best taxi fares through competitive bidding. This README will guide you through the steps to run the application using Docker Compose.

## Prerequisites
Before proceeding, ensure you have the following installed:
- Docker
- Docker Compose

## Installation
1. Clone the repository:
   
2. Navigate to the project directory:
   ```
   cd bid-taxi-service
   ```

## Run the application
### Database
- Run the bellow command for database:
   ```
   docker-compose up --build
   ```
### Run the application in production
- Run the bellow command:
   
   ```
   docker run  -p 3000:3000 -e NODE_ENV=prod --network=bid-taxi-service-network --name bid-taxi-service bid-taxi-service
   ```
### Run the application in Develop

- To set the environment:

  - In Linux and Mac run:
   ```
      export NODE_ENV=dev
   ```
   - In windows run:
   ```
      set NODE_ENV=dev
   ```
- Run the bellow commands:
   ```
      npm install
   ```
   ```
      npm start
   ```
### Run the tests
- To set the environment:

   - In Linux and Mac run:
   ```
      export NODE_ENV=test
   ```
   - In windows run:
   ```
      set NODE_ENV=test
   ```
- Run the bellow commands:
   ```
   npm install
   ```
   ```
   npm run test
   ```

## Access the application:
   - The Swagger UI for API documentation is available at `http://localhost:3000/api-docs`.

   - Use the provided API endpoints to interact with the service as needed.

## Contributing
Contributions to this project are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve this service.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to adjust this README as needed to fit your specific application and deployment requirements.
