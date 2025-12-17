terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

############################
# AMI (Amazon Linux 2023)
############################
data "aws_ami" "amazon_linux_x86" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }
}

############################
# Security Group
############################
resource "aws_security_group" "tictactoe_sg" {
  name        = "tictactoe-sg"
  description = "Allow SSH and HTTP"

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH (LOCK THIS DOWN)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["${var.ssh_allowed_ip}/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

############################
# EC2 Instance
############################
resource "aws_instance" "tictactoe_ec2" {
  ami           = data.aws_ami.amazon_linux_x86.id
  instance_type = "t3.nano"

  vpc_security_group_ids = [
    aws_security_group.tictactoe_sg.id
  ]

  # One-time machine setup ONLY
  user_data = file("${path.module}/user_data.sh")

  tags = {
    Name = "tictactoe-ec2"
  }
}

############################
# Outputs
############################
output "public_ip" {
  value = aws_instance.tictactoe_ec2.public_ip
}

output "ssh_command" {
  value = "ssh ec2-user@${aws_instance.tictactoe_ec2.public_ip}"
}
