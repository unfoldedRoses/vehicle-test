# 🚀 Octalogic Tech - Technical Test

Welcome! This repository contains my solutions for the Octalogic Tech technical assessment.

## 📌 Overview

This project demonstrates my full-stack development skills, covering SQL database management, backend API development, and frontend implementation.  It's a vehicle booking application where users can select a vehicle type, model, and date range for booking.

## 🛠 Tech Stack

*   **Frontend:** React.js (Material UI + Tailwind CSS for styling), Jest (for testing)
*   **Backend:** Node.js, Express.js,Sequelize (ORM)
*   **Database:** PostgreSQL
*   **Other Tools:** Git, Postman (for API testing), Swagger (for API documentation)

## 📋 Project Setup

### 🔧 Prerequisites

Make sure you have the following installed:

*   Node.js (LTS version recommended)
*   PostgreSQL (Preferred) or MySQL
*   Git

### 💻 Installation and Startup Steps

1.  **Clone the repository and checkout the release branch:**

    ```bash
    git clone [https://github.com/unfoldedRoses/vehicle-test](https://github.com/unfoldedRoses/vehicle-test)
    cd vehicle-test
    git checkout release/1.0.0 
    ```

2.  **Database Setup (Choose one):**

    *   **PostgreSQL (Recommended):**
        1.  Install PostgreSQL.
        2.  Create a database named `vehicle_booking` (or your preferred name).
        3.  Create a `.env` file in the `server` directory and add your database credentials:

            ```
            DATABASE_URL=postgres://user:password@host:port/database
            # Example:
            # DATABASE_URL=postgres://postgres:password@localhost:5432/vehicle_booking
            ```

        4.  **Import the SQL dump:** Import the provided SQL dump file (`vehicle_booking.dump`) into your PostgreSQL database. You can use `pg_restore` for this.

   

3.  **Backend Startup:**

    1.  Navigate to the server directory:

        ```bash
        cd server
        ```

    2.  Install server-side dependencies:

        ```bash
        npm install
        ```

    3.  **Import the SQL :** Import the provided SQL dump file (`vehicle_booking.sql`) into your PostgreSQL database. You can use `pg_restore` for this.

   4.  Start the backend server:

        ```bash
        npm start
        ```

        The backend should be running on port 3000 (or as configured in your `.env` file).

4.  **Frontend Startup:**

    1.  Navigate to the client directory:

        ```bash
        cd client
        ```

    2.  Install client-side dependencies:

        ```bash
        npm install
        ```

    3.  Start the frontend development server:

        ```bash
        npm start
        ```

        The frontend should be running on port 3000.

### 💾 SQL Dump Files

The repository includes SQL dump files for both PostgreSQL and MySQL:

*   `vehicle_booking.dump` (PostgreSQL)
*   `vehicle_booking.sql` (MySQL)

Use the appropriate file for your chosen database. These files contain the initial database schema and seed data.

## ⚙️ API Endpoints (Swagger Documentation)

The API documentation is available via Swagger UI. After starting the backend server, access the Swagger UI at:
http://localhost:3000/api/v1/vehicle/api-docs/

## Key Features and Enhancements

*   **Comprehensive Testing:**  The application includes extensive unit and integration tests for frontend, Jest and React Testing Library were used for frontend testing.
*   **Advanced Form Validation:**  Robust form validation is implemented using Formik to ensure data integrity and provide helpful feedback to the user.
*   **Improved UI/UX:**  Loading indicators are displayed during API calls, and error messages are more user-friendly.  Keyboard navigation is supported for improved accessibility.
*   **API Rate Limiting:**  Rate limiting has been added to API endpoints to prevent abuse and ensure availability.
*   **Database Optimization:**  An index was added to the `bookings` table to improve the performance of availability checks.
*   **Security:**  Parameterized queries are used throughout the backend to prevent SQL injection vulnerabilities.