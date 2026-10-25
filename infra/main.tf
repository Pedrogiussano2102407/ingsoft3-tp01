terraform {
  required_version = ">= 1.5"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "4.6.0"
    }
  }

  # el path del estado se pasa en el init (queda fuera del repo)
  backend "local" {}
}

# Docker Desktop en Windows se habla por named pipe
provider "docker" {
  host = "npipe:////./pipe/docker_engine"
}

resource "docker_network" "preprod" {
  name = "preprod"
}

resource "docker_volume" "mongo_data" {
  name = "preprod_mongo_data"
}

# keep_locally = true: al destruir, NO se borran las imagenes del daemon.
# Son las mismas que usan QA y PROD.
resource "docker_image" "mongo" {
  name         = "mongo:7"
  keep_locally = true
}

resource "docker_image" "backend" {
  name         = "${var.image_repo_backend}:${var.image_tag}"
  keep_locally = true
}

resource "docker_image" "frontend" {
  name         = "${var.image_repo_frontend}:${var.image_tag}"
  keep_locally = true
}

resource "docker_container" "mongo" {
  name    = "preprod-mongo"
  image   = docker_image.mongo.image_id
  restart = "unless-stopped"
  wait    = true

  networks_advanced {
    name = docker_network.preprod.name
  }

  volumes {
    volume_name    = docker_volume.mongo_data.name
    container_path = "/data/db"
  }

  healthcheck {
    test     = ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
    interval = "10s"
    timeout  = "5s"
    retries  = 5
  }
}

resource "docker_container" "backend" {
  name    = "preprod-backend"
  image   = docker_image.backend.image_id
  restart = "unless-stopped"
  wait    = true

  env = [
    "MONGO_STRING=mongodb://${docker_container.mongo.name}:27017/invento_preprod",
    "ADMIN_KEY=${var.admin_key}",
  ]

  networks_advanced {
    name = docker_network.preprod.name
  }

  ports {
    internal = 3001
    external = var.api_port
  }

  healthcheck {
    test     = ["CMD", "wget", "--spider", "-q", "http://localhost:3001/categories"]
    interval = "15s"
    timeout  = "5s"
    retries  = 5
  }
}

resource "docker_container" "frontend" {
  name    = "preprod-frontend"
  image   = docker_image.frontend.image_id
  restart = "unless-stopped"

  env = [
    "BACKEND_URL=http://${docker_container.backend.name}:3001",
  ]

  networks_advanced {
    name = docker_network.preprod.name
  }

  ports {
    internal = 3000
    external = var.front_port
  }
}

