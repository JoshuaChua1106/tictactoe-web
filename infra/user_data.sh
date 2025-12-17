#!/bin/bash
set -e

# Update system
yum update -y

# Install Docker
yum install -y docker

# Start Docker and enable on boot
systemctl start docker
systemctl enable docker

# Allow ec2-user to run docker without sudo
usermod -aG docker ec2-user

# Install Docker Compose (standalone binary)
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

# Verify installs (logged to cloud-init output)
docker --version
docker-compose --version

# Create app directory (empty for now)
mkdir -p /home/ec2-user/tictactoe
chown ec2-user:ec2-user /home/ec2-user/tictactoe
