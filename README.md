# Multivendor Project

## Project Description

This is a multivendor e-commerce platform where shopkeepers can register their stores and list their products for sale. The platform enables multiple vendors to manage their own inventories, while customers can browse and purchase products from various stores in a unified marketplace.

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **API Testing:** Postman
- **Version Control:** Git, GitHub

## Running Procedure

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd Multivendor
    ```

2. **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3. **Configure Environment Variables**
    - Create a `.env` file in the `backend` directory.
    - Add required variables (e.g., `MONGO_URI`, `JWT_SECRET`, etc.).

4. **Start the Backend Server**
    ```bash
    npm run dev
    ```

5. **Install Frontend Dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

6. **Configure Frontend Environment Variables**
    - Create a `.env` file in the `frontend` directory if needed.

7. **Start the Frontend Server**
    ```bash
    npm start
    ```

8. **Access the Application**
    - Open your browser and go to `http://localhost:3000`

9. **API Testing (Optional)**
    - Use Postman to test backend APIs.

---

**Note:**  
Make sure MongoDB is running locally or update the connection string in `.env` for remote databases.