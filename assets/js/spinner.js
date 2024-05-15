$('#filtrosModal').on('show.bs.modal', function (e) {
    $('#spinner').show(); // Mostrar el spinner cuando el modal se muestra
    
    // Crear un observador de mutaciones
    var observer = new MutationObserver(function(mutationsList, observer) {
        // Verificar si se han agregado nodos nuevos dentro de #opcionesFiltro
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Ocultar el spinner cuando se han agregado nodos nuevos
                $('#spinner').hide();
                // Desconectar el observador una vez que se han cargado los elementos
                observer.disconnect();
            }
        });
    });

    // Observar cambios en la estructura DOM dentro de #opcionesFiltro
    observer.observe(document.getElementById('opcionesFiltro'), { childList: true });
});
