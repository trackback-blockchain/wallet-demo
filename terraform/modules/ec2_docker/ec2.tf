data "aws_lb_target_group" "data_aws_alb_tg_wallet" {
  arn = "arn:aws:elasticloadbalancing:ap-southeast-2:533545012068:targetgroup/Wallet/e2f4cc93c2ea070d"
}

resource "aws_security_group" "aws_sg_wallet_demo" {
  name = "security_group for aws_sg_wallet_demo"

  ingress {
    description = "SSH from the internet"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "80 from the internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}



resource "aws_instance" "aws_instance_wallet_web" {
  ami                         = "ami-0567f647e75c7bc05"
  instance_type               = "t3.medium"
  vpc_security_group_ids      = [aws_security_group.aws_sg_wallet_demo.id]
  associate_public_ip_address = false
  key_name                    = var.key_name
  iam_instance_profile        = aws_iam_instance_profile.aws_iam_instance_profile_wallet_profile.id

  tags = {
    Name = "aws_instance_wallet_web"
  }

  root_block_device {
    volume_type = "gp2"
    volume_size = 30
  }

  user_data = <<-EOF
#!/bin/bash
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
chmod 666 /var/run/docker.sock
apt-get install -y git
usermod -aG docker ubuntu

# Install docker-compose
curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

cd /home/ubuntu

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
apt install -y unzip
unzip awscliv2.zip
sudo ./aws/install
apt install -y make

git clone --single-branch --branch ${var.branch_name} https://${var.git_token}@github.com/trackback-blockchain/wallet-demo.git
chown ubuntu:ubuntu -R wallet-demo

cd wallet-demo
make run

EOF

}

resource "aws_lb_target_group_attachment" "aws_tg_attach_wallet_demo" {
  target_group_arn = data.aws_lb_target_group.data_aws_alb_tg_wallet.arn
  target_id        = aws_instance.aws_instance_wallet_web.id
  port             = 80
}

output "aws_instance_wallet_web" {
  value = aws_instance.aws_instance_wallet_web
}

