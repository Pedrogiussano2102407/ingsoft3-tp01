export function descuento(cantidad: number, esMayorista: boolean): number {
  if (cantidad <= 0) {
    return 0;
  }
  if (esMayorista && cantidad >= 100) {
    return 0.25;
  }
  if (esMayorista) {
    return 0.15;
  }
  if (cantidad >= 50) {
    return 0.1;
  }
  if (cantidad >= 10) {
    return 0.05;
  }
  return 0;
}