# IoT Logging System

## Backend Setup

1. **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create the PostgreSQL database:**  
    If PostgreSQL is not installed, install it first. Then create the database with the following commands:
    ```bash
    sudo -u postgres psql
    CREATE DATABASE iot_logging;
    CREATE USER iot_user WITH ENCRYPTED PASSWORD '1234';
    GRANT ALL PRIVILEGES ON DATABASE iot_logging TO iot_user;
    \q
    psql -U iot_user -d iot_logging
    ```

4. **Create your `.env` file and add the following content:**  
    ```bash
    PORT=5001
    DB_USER=iot_user
    DB_PASSWORD=1234
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=iot_logging
    ```

5. **Create database tables and default users:**  
    ```bash
    node init_db.js
    ```

6. **Start the backend:**
    ```bash
    node app.js
    ```

---

## Frontend Setup

1. **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend:**
    ```bash
    npm start
    ```

---

## Sending Data

1. **Sending Data via MQTT Client from Terminal:**
   ```bash
   mosquitto_pub -h localhost -t "iot/sensors" -m '{"sensor_id": "sensor1", "temperature": 22.5, "humidity": 60}'
