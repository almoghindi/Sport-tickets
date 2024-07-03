# Sport-tickets

Sport-tickets is a comprehensive platform designed for browsing, purchasing, and managing tickets for various sports events. The platform is built with a microservices architecture, utilizing modern technologies to ensure scalability, reliability, and maintainability.

## Overview

### Core Features

- **User Authentication**: Secure user registration and login.
- **Ticket Management**: Browse and manage sports event tickets.
- **Order Processing**: Create and manage orders for tickets.
- **Payment Handling**: Secure payment processing for ticket purchases.
- **AI Recommendations**: Personalized AI-driven ticket recommendations based on user activity.
- **Expiration Service**: Manages the expiration of unpaid orders.
- **Event Streaming**: Real-time updates and communication between microservices with Apache Kafka.
- **State Management**: Efficient state management using Redux.
- **Caching**: Enhanced performance through Redis caching.

### Technologies Used

- **Frontend**: Next.js, React, React Query, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **State Management**: Redux
- **Caching**: Redis
- **Event Streaming**: Apache Kafka
- **Payment Processing**: Stripe
- **Testing**: Jest, Supertest
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: Google Cloud
- **Continuous Development**: Skaffold
- **CI/CD**: GitHub Actions
- **Deployment**: DigitalOcean


### Microservices Architecture
The application is divided into several microservices, each responsible for a specific domain of the application:

#### Auth Service
Handles user registration, login, and authentication using JWTs. It ensures secure access to other services.

#### Tickets Service
Manages the lifecycle of tickets, including creation, updates, and retrieval. It allows users to browse available sports event tickets.

#### Orders Service
Processes orders by associating tickets with users and managing the order states (created, cancelled, completed).

#### Payments Service
Integrates with payment gateways to handle transactions securely. Ensures payments are processed before completing an order.

#### Expiration Service
Ensures unpaid orders are cancelled after a certain period, freeing up tickets for other users.

#### Kafka Service
Implements event streaming to ensure real-time communication between services, facilitating a responsive and cohesive system.

#### AI Recommendation Service
Uses AI to analyze user behavior and recommend the best tickets for each user based on their past activity.

#### Common Service
Deployed as a GitHub module for code reuse


### Event-Driven Architecture
The platform utilizes an event-driven architecture with Apache Kafka to enable real-time communication and updates between microservices. This ensures that all parts of the system stay in sync and respond to events as they occur, providing a seamless and responsive user experience.

### Server-Side Rendering
Next.js is used for server-side rendering (SSR) to enhance performance and SEO. This ensures fast initial load times and better indexing by search engines.


#### Installation

### 1. Clone the Repository:

```bash
git clone https://github.com/almoghindi/Sport-tickets.git
cd Sport-tickets
```

### 2. Install Dependencies:

```bash
cd auth && npm install
cd ../tickets && npm install
cd ../orders && npm install
cd ../payments && npm install
cd ../expiration && npm install
cd ../client && npm install
cd ../common && npm install
```

### 3. Set Up Environment Variables:
Create a .env file in each service's root directory and configure the required environment variables.

### 4. Start Development Servers:

```bash
npm run dev
```

### 5. Run with Docker and Kubernetes:
Ensure Docker and Kubernetes are installed and running. Use Skaffold to manage the development lifecycle:

```bash
skaffold dev
```

## Deplyoment

The project uses GitHub Actions for CI/CD, ensuring automated testing, building, and deployment to DigitalOcean.

## Media
#### Home Page:
Experience the welcoming home page where users are greeted with vibrant visuals and a simple interface to explore various sports events.

![Screenshot 2024-06-22 235031](https://github.com/almoghindi/Sport-tickets/assets/102804545/5d68cf17-f984-44cd-9d06-b2bced0cffd4)

#### Tickets Page:
Browse through an extensive list of available tickets with detailed filters to narrow down choices based on date, price range, and category.

![Screenshot 2024-06-26 162325](https://github.com/almoghindi/Sport-tickets/assets/102804545/25805887-0238-45a6-ac76-08be6d1c7c6b)


#### Order Completed Page:
See the confirmation page that assures users their ticket purchases were successful and provides details of the completed order.

![Screenshot 2024-06-23 001535](https://github.com/almoghindi/Sport-tickets/assets/102804545/64e756e6-c70c-4338-b228-33c0bc29240a)

#### Demo Video:

https://github.com/almoghindi/Sport-tickets/assets/102804545/47240b74-11e8-4871-9166-75b564801468
