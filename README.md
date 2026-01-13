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

### Infrastructure Setup

1. **Prerequisites:**
   - AWS CLI configured
   - Terraform installed
   - SSH key pair generated

2. **Generate SSH Key:**
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/tictactoe-ec2-key
   ```

3. **Configure variables:**
   Obtain your public IP Address with:
   ```
   curl ifconfig.me
   ```  
   
   Create `infra/terraform.tfvars`
   Set ssh_allowed_ip to your public IP (This only allows your IP to SSH to the EC2 environment):
   ```
   ssh_allowed_ip = "YOUR_IP_ADDRESS"
   ```

5. **Deploy infrastructure:**
   ```bash
   cd infra
   terraform init
   terraform plan
   terraform apply
   ```
## Application Deployment
### CI/CD
The application is supported by a simple CI/CD Pipeline (moreso CD :p), which will automatically deploy the application to AWS EC2, when a push is made to the master branch.
(All developmental work should be done on a dev branch and merged to master when it is ready for production)

### Manual deployment (Legacy)
You can also deploy the application to EC2 via a manual script which can be run with:
   ```bash
   ./deploy.sh
   ```
Note: This can only be done on the ssh_allowed_ip address.
