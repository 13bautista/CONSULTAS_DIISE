
document.addEventListener('DOMContentLoaded', function () {
    // Función para deshabilitar el buscador y los elementos de filtros
    function deshabilitarFiltros() {
        // Deshabilitar el buscador de filtros
        $('#search_filtros').prop('disabled', true);
        // Deshabilitar los elementos de filtros
        $('#filtros_container input[type="checkbox"]').prop('disabled', true);
        // Deshabilitar los elementos de búsqueda asociados a filtros
        $('#search_filtros').next('.scrollable-list').find('input').prop('disabled', true);
    }


    // Función para deshabilitar la casilla de granularidad
    function deshabilitarGranularidad() {
        $('#granularidad').prop('disabled', true);
    }

    // Escuchar el evento personalizado para saber cuando los elementos están listos
    $(document).on('elementos_cargados', function () {
        // Deshabilitar los elementos una vez que se hayan cargado
        deshabilitarFiltros();
        deshabilitarGranularidad();
    });

    // Event listener para el cambio en el contenedor de filtros
    document.getElementById('filtros_container').addEventListener('change', function (event) {
        // Verificar si el elemento cambiado es una casilla de verificación en el contenedor de filtros y está marcada

    });

    // Habilitar campo de filtros al seleccionar una opción en variables
    $('#variables_container').on('change', 'input[type="checkbox"]', function () {
        // Verificar si al menos una opción de variables está seleccionada
        if ($('#variables_container input[type="checkbox"]:checked').length > 0) {
            // Habilitar el campo de filtros
            $('#search_filtros').prop('disabled', false);
            // Habilitar los elementos de búsqueda asociados a filtros
            $('#search_filtros').next('.scrollable-list').find('input').prop('disabled', false);
            // Habilitar la casilla de granularidad
            $('#granularidad').prop('disabled', false);
        } else {
            // Si ninguna opción de variables está seleccionada, deshabilitar el campo de filtros y los elementos de búsqueda asociados
            deshabilitarFiltros();
            deshabilitarGranularidad();
        }
    });
});
