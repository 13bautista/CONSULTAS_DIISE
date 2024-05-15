document.addEventListener('DOMContentLoaded', function () {

    cargarOpcionesAtributo('mostrarOpcionesCarteras', 'cartera', 'ID_CARTERA_INVERSION', 'ID_CARTERA_INVERSION');
    cargarOpcionesAtributo('mostrarOpcionesProyectos', 'proyecto', 'PROYECTO', 'PROYECTO');
    cargarOpcionesAtributo('mostrarOpcionesEntidades', 'entidad', 'ENTIDAD_FEDERATIVA', 'ENTIDAD_FEDERATIVA');
    cargarOpcionesAtributo('mostrarOpcionesVueltas', 'vuelta', 'VUELTA_PROCEDIMIENTO', 'VUELTA_PROCEDIMIENTO');
    cargarOpcionesAtributo('mostrarOpcionesNumeros', 'numero', 'NUMERO_PARTIDA', 'NUMERO_PARTIDA');
    cargarOpcionesAtributo('mostrarOpcionesAdjudicados', 'adjudicado', 'ADJUDICADO', 'ADJUDICADO');
    cargarOpcionesAtributo('mostrarOpcionesDescripciones', 'descripcion', 'DESCRIPCION_DETALLE_BIEN', 'DESCRIPCION_DETALLE_BIEN');
    cargarOpcionesAtributo('mostrarOpcionesEstatuss', 'estatus', 'ESTATUS', 'ESTATUS');

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

    /////////////////////////////////////////////////////
     // Botón para copiar  registros tabla  //
     document.getElementById('exportar_tabla').addEventListener('click', function () {
        var table = document.getElementById('registros_table');
        var textContent = table.innerText;
        var textArea = document.createElement('textarea');
        textArea.value = textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Contenido de la tabla copiado al portapapeles en formato de texto sin formato.');
    });


    // Botón para imprimir  registros tabla  //
    document.getElementById('imprimir').addEventListener('click', function () {
        // Abre una nueva ventana para imprimir solo la tabla
        var printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Tabla de Registros</title></head><body>');
        printWindow.document.write('<table>' + document.getElementById('registros_table').innerHTML + '</table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });

});
