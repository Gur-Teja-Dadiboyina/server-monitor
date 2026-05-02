# 📊 Server Monitoring Dashboard (DevOps Project)

A real-time server monitoring system built with **Node.js, MySQL, AWS EC2, Docker, and Jenkins CI/CD**.  
It collects live CPU and Memory usage from servers and displays them in a dynamic dashboard with charts.

---

## 🚀 Live Project Overview

This project simulates a real-world **DevOps monitoring system** similar to tools like Prometheus + Grafana.

It uses:
- EC2 servers for deployment
- Agent-based monitoring
- REST API for metrics ingestion
- MySQL for data storage
- Chart.js for visualization
- PM2 for process management
- Docker + Jenkins for CI/CD

---

## 🧠 Architecture
GitHub Repository
↓
Jenkins CI/CD Pipeline
↓
Docker Image Build
↓
EC2 Web Server (Node.js App)
↓
MySQL EC2 Server (Database)
↓
Monitoring Agent (EC2)
↓
Real-Time Dashboard UI   


---

## ☁️ AWS Infrastructure

### 🖥️ web-server01 (EC2)
- Node.js application
- Express API
- Dashboard UI
- PM2 process manager
- Docker container support

### 🗄️ mysql-server01 (EC2)
- MySQL database
- Stores server metrics
- Stores server registry

---

## 📡 Features

### 📊 Real-Time Monitoring
- CPU usage tracking
- Memory usage tracking
- Live updating charts (auto-refresh every 5 seconds)

### 🖥️ Dashboard UI
- Server list view
- Individual server details
- Interactive charts (Chart.js)
- Metrics history table

### ⚙️ DevOps Features
- PM2 process manager (auto-restart on crash)
- Docker containerization
- Jenkins CI/CD pipeline
- AWS EC2 deployment (manual → CI/CD ready)

---

## 🧠 How It Works

1. EC2 agent collects system metrics (CPU, Memory)
2. Data is sent to Node.js API (`/api/metrics`)
3. API stores data in MySQL database
4. Frontend fetches latest metrics every 5 seconds
5. Chart.js renders real-time graphs

---

## 🗄️ Database Schema

### servers table
```sql
CREATE TABLE servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

metrics table

CREATE TABLE metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    server_id INT,
    cpu_usage FLOAT,
    memory_usage FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (server_id) REFERENCES servers(id)
);



🚀 Installation & Setup
1. Clone Repository

git clone https://github.com/YOUR_USERNAME/server-monitor.git
cd server-monitor


2. Install Dependencies

npm install

3. Configure Environment Variables

Create .env file:

DB_HOST=<mysql-ec2-private-ip>
DB_USER=devuser
DB_PASSWORD=dev123
DB_NAME=server_monitor
PORT=3000

4. Start Application (Production Mode)

pm2 start app.js --name server-monitor
pm2 save

📡 Monitoring Agent (EC2)

A lightweight Node.js agent runs on EC2 and collects:

* CPU usage
* Memory usage

It sends data to:

POST /api/metrics

🐳 Docker Setup
Build Image
docker build -t server-monitor .

Run Container
docker run -d -p 3000:3000 server-monitor

🔁 CI/CD Pipeline (Jenkins)
Pipeline stages:
1) GitHub checkout
2) Docker build image
3) Stop existing container
4) Deploy new container
5) Start application

📸 Screenshots
"C:\Users\gurud\OneDrive\Pictures\Screenshots 1\Screenshot 2026-05-02 144536.png"

🛠️ Tech Stack
Node.js
Express.js
MySQL
EJS
Chart.js
AWS EC2
Docker
Jenkins
PM2

🔥 Key Highlights
Real-time system monitoring
Agent-based architecture
Cloud deployment (AWS EC2)
CI/CD pipeline (Jenkins)
Containerized deployment (Docker)

🚀 Future Improvements
Multi-server auto discovery
Grafana integration
Alert system (CPU > threshold)
Kubernetes deployment
Centralized logging system

👨‍💻 Author

Built as a DevOps learning project to simulate real-world infrastructure monitoring systems used in production environments.

⭐ Goal of This Project

To replicate a simplified version of enterprise monitoring tools like:

Prometheus
Grafana
CloudWatch
