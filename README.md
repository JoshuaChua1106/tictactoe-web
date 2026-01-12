# TicTacToe Web Application

A real-time multiplayer TicTacToe game built with React frontend and Node.js backend using Socket.io.

## Prerequisites
- Node.js (v18+)
- npm

## Docker Compose

Run both backend and frontend together:
```bash
docker-compose up --build
```
This will start the frontend on port 80 and backend on port 3000.

## Manual Local Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Backend will run on port 3000.

## Manual Local Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on port 5173.

## Infrastructure

The `infra/` directory contains Terraform configuration for AWS deployment:

- **EC2 Instance**: t3.nano Amazon Linux 2023
- **Security Groups**: HTTP (port 80) and SSH access
- **Region**: ap-southeast-2 (Sydney)

### Infrastructure Setup and Deployment

1. **Prerequisites:**
   - AWS CLI configured
   - Terraform installed
   - SSH key pair generated

2. **Generate SSH Key:**
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/tictactoe-ec2-key
   ```

3. **Configure variables:**
   Obtain user's IP Address with:
   ```
   curl ifconfig.me
   ```  
   
   Create `infra/terraform.tfvars`, only allowing ssh_allowed_ip to ssh to EC2 environment:
   ```
   ssh_allowed_ip = "YOUR_IP_ADDRESS"
   ```

4. **Deploy:**
   ```bash
   cd infra
   terraform init
   terraform plan
   terraform apply
   ```

5. **Configure deploy script**
   Obtain EC2 IP Address:
   ```
   cd infra
   terraform output public_ip
   ```
   In deploy.sh, adjust IP="" variable with EC2 IP Address.
   
7. **Deploy application:**
   ```bash
   ./deploy.sh
   ```

The infrastructure automatically installs Docker and sets up the application using the provided user data script.
