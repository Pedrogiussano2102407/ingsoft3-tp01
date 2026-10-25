variable "image_repo_backend" {
  type    = string
  default = "ghcr.io/pedrogiussano2102407/ingsoft3-tp01-backend"
}

variable "image_repo_frontend" {
  type    = string
  default = "ghcr.io/pedrogiussano2102407/ingsoft3-tp01-frontend"
}

# la imagen del TP7 (commit de v7.0.0)
variable "image_tag" {
  type    = string
  default = "sha-47327f08e08abd6cc4fdb4f1e3995bba335e9f26"
}

variable "front_port" {
  type    = number
  default = 3020
}

variable "api_port" {
  type    = number
  default = 3021
}

# sin default: es un secreto, entra por la variable de entorno TF_VAR_admin_key
variable "admin_key" {
  type      = string
  sensitive = true
}
