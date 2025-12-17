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

# Download Buildx binary (Hardcoded for x86_64 which matches standard EC2 instances)
mkdir -p /usr/local/lib/docker/cli-plugins

curl -L https://github.com/docker/buildx/releases/download/v0.19.3/buildx-v0.19.3.linux-amd64 \
  -o /usr/local/lib/docker/cli-plugins/docker-buildx

chmod +x /usr/local/lib/docker/cli-plugins/docker-buildx

# Verify installs (logged to cloud-init output)
docker --version
docker-compose --version
docker buildx version

# Create app directory (empty for now)
mkdir -p /home/ec2-user/tictactoe
chown ec2-user:ec2-user /home/ec2-user/tictactoe
