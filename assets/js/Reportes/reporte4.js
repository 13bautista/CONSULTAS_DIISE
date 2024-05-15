document.addEventListener('DOMContentLoaded', function () {

    cargarOpcionesAtributo('mostrarOpcionesCarteras', 'cartera', 'ID_CARTERA_INVERSION', 'ID_CARTERA_INVERSION');
    cargarOpcionesAtributo('mostrarOpcionesProyectos', 'proyecto', 'PROYECTO', 'PROYECTO');
    cargarOpcionesAtributo('mostrarOpcionesVueltas', 'vuelta', 'VUELTA_PROCEDIMIENTO', 'VUELTA_PROCEDIMIENTO');
    cargarOpcionesAtributo('mostrarOpcionesNumeros', 'numero', 'NUMERO_PARTIDA', 'NUMERO_PARTIDA');
    cargarOpcionesAtributo('mostrarOpcionesDescripciones', 'descripcion', 'DESCRIPCION_DETALLE_BIEN', 'DESCRIPCION_DETALLE_BIEN');
    cargarOpcionesAtributo('mostrarOpcionesSubpartidas', 'subpartida', 'NUMERO_SUBPARTIDA_BLOQUE', 'NUMERO_SUBPARTIDA_BLOQUE');
    cargarOpcionesAtributo('mostrarOpcionesSeries', 'serie', 'NUM_SERIE', 'NUM_SERIE');
    cargarOpcionesAtributo('mostrarOpcionesEstatuss', 'estatus', 'ESTATUS', 'ESTATUS'); 
    
    cargarOpcionesAtributo('mostrarOpcionesMarcas', 'marca', 'MARCA', 'MARCA');
    cargarOpcionesAtributo('mostrarOpcionesModelos', 'modelo', 'MODELO', 'MODELO');




    function cargarOpcionesAtributo(accion, containerId, valueField, textField) {
    
        fetch('controller/reportes.php?accion=' + accion)
            .then(response => response.json())
            .then(data => mostrarOpcionesAtributo(containerId, data, valueField, textField))
            .catch(error => console.error('Error al obtener las opciones de ' + accion + ':', error));
    }

    // Función para mostrar las opciones de cartera en la lista desplegable de checkbox
    // Corregir la función mostrarOpcionesAtributo para verificar si el contenedor existe antes de acceder a classList
    function mostrarOpcionesAtributo(containerId, opciones, valueField, textField) {
        var container = document.getElementById(containerId);
        if (container) {
            container.classList.add('dropdown-menu', 'scrollable-menu');

            opciones.forEach(function (opcion) {
                var listItem = document.createElement('li');
                listItem.className = 'dropdown-item';

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = opcion[valueField];
                checkbox.id = containerId + '_' + opcion[valueField];
                checkbox.className = 'form-check-input';

                var label = document.createElement('label');
                label.htmlFor = containerId + '_' + opcion[valueField];
                label.textContent = opcion[textField];

                listItem.appendChild(checkbox);
                listItem.appendChild(label);
                container.appendChild(listItem);
            });
        } else {
            console.error('El contenedor con ID', containerId, 'no se encontró en el DOM.');
        }
    }

});
