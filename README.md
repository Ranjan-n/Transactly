# Transactly

This site is live on :- https://transactly-ranjan.netlify.app/

## Project Overview

Transactly is a payment application designed to streamline financial transactions with a focus on user experience and security. Built using the MERN stack, it allows users to make and manage payments similar to a payment wallet in the Paytm application. The app features a user-friendly interface that ensures seamless navigation and efficient transaction handling. Users can authenticate securely, process payments quickly, and manage their transaction history effortlessly.

### Features

- **User Authentication**: Secure sign-up and login processes using JWT.
- **Payment Processing**: Enable users to send and receive payments quickly.

### Technology Stack

- **MongoDB**: NoSQL database for storing user data and transaction history.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, used to manage client transactions.
- **Express.js**: Web framework for building the backend API services.
- **React.js**: Front-end library for creating interactive user interfaces.
- **Node.js**: JavaScript runtime for the backend server.
- **Zod**: Schema validation library for ensuring data integrity.
- **TailwindCSS**: Utility-first CSS framework for styling.

### Setup and Installation

#### Clone the Repository

```bash
git clone https://github.com/Ranjan-n/Transactly.git
```

#### Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

##### Start the server:

```bash
node index.js
```

##### Backend .env Configuration:

```bash
JWT_SECRET=YourJWTSecret           # Secret key for signing JWT tokens
MONGO_URL=mongodb://localhost:27017/PaymentAPP # MongoDB connection string
SALT_ROUNDS=10                     # Number of salt rounds for password hashing
```

### OR

```bash
docker pull ranjann2004/transactly-backend
docker run -e JWT_SECRET=YourJWTSecret -e MONGO_URL=mongodb://localhost:27017/PaymentAPP -e SALT_ROUNDS=Number_of_salt_rounds_for_password_hashing -p 3000:3000 ranjann2004/transactly-backend
```

#### Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

##### Start the React app:

```bash
npm run dev
```

##### Frontend .env Configuration

```bash
VITE_BACKEND_URL=http://localhost:3000
```

### Future Enhancements

- Integration with additional payment gateways.
- Advanced reporting features for users.
- Enhanced security measures, such as two-factor authentication.
- Manage and view all client transactions efficiently.

### Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
