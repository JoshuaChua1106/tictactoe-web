variable "ssh_allowed_ip" {
  description = "Public IP allowed to SSH"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository in format: owner/repo"
  type        = string
}