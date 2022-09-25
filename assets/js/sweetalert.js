// uso de libreria de alerta

export function alerta() {
  Swal.fire({
    title: "Lo Sentimos!",
    text: "no encontramos tu busqueda",
    icon: "warning",
    allowEnterKey: "true",
  });
}
