#!/bin/bash
set -e

# Configuration
KEY="~/.ssh/tictactoe-ec2-key"
IP="16.176.229.51"
USER="ec2-user"
REMOTE_DIR="/home/ec2-user/tictactoe-web"

echo "Deploying TicTacToe to AWS EC2..."

# Use rsync instead of tar (better for exclusions)
echo "Syncing files..."
rsync -avz -e "ssh -i $KEY" \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='infra' \
    --exclude='deploy.sh' \
    --exclude='*.tar.gz' \
    --exclude='dist' \
    --exclude='.DS_Store' \
    ./ $USER@$IP:$REMOTE_DIR/

echo "Building and starting containers..."
ssh -i $KEY $USER@$IP << EOF
    cd /home/ec2-user/tictactoe-web
    docker-compose down || true
    docker-compose up -d --build
    echo "Deployment complete!"
    echo "App available at: http://$IP"
EOF

echo "Deploy script finished"