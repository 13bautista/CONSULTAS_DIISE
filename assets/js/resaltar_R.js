
    document.addEventListener("DOMContentLoaded", function() {
        // Función para resaltar el campo si al menos un checkbox está marcado
        function resaltarCampo(event) {
            var campo = event.target.closest(".card-body");
            if (campo && event.target.matches("input[type='checkbox']")) {
                if (event.target.checked) {
                    // Resaltar el campo seleccionado
                    campo.classList.add("resaltado");
                } else {
                    // Verificar si al menos un checkbox sigue marcado en el campo
                    var checkboxes = campo.querySelectorAll("input[type='checkbox']");
                    var alMenosUnCheckboxMarcado = Array.from(checkboxes).some(function(checkbox) {
                        return checkbox.checked;
                    });
                    // Si no hay ningún checkbox marcado, desmarcar el campo
                    if (!alMenosUnCheckboxMarcado) {
                        campo.classList.remove("resaltado");
                    }
                }
            }
        }

        // Agregar evento click al contenedor de los campos
        document.querySelector(".row").addEventListener("click", function(event) {
            // Si se hizo clic en un checkbox, resaltar o desmarcar el campo
            resaltarCampo(event);
        });
    });



   