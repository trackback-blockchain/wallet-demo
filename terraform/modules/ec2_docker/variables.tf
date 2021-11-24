variable "key_name" {
  type    = string
  default = "ec2_key"
}


variable "git_token" {
  description = "git developer token"
  type    = string
}

variable "branch_name" {
  type = string
}

variable "cloud_watch_name" {
  type = string
}
