output "front_url" {
  value = "http://localhost:${docker_container.frontend.ports[0].external}"
}

output "api_url" {
  value = "http://localhost:${docker_container.backend.ports[0].external}"
}
