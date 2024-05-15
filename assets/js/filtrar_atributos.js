document.addEventListener('DOMContentLoaded', function () {
    var variablesContainer = document.getElementById('variables_container');
    var registrosTable = document.getElementById('registros_table');
    var columnasAgregadas = {};
    var variablesSeleccionadas = []
    var filtro = [];
    var filtroSeleccionado = [];
    var filtroGBSeleccionado = [];
    var columnasSeleccionadas = {};

    variablesContainer.addEventListener('change', function (event) {
        if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {
            var label = variablesContainer.querySelector('label[for="' + event.target.id + '"]');
            var variableSeleccionada = label.textContent.trim();

            if (event.target.checked) {
                columnasSeleccionadas[variableSeleccionada] = true;
                var newColumnHeader = document.createElement('th');
                newColumnHeader.textContent = variableSeleccionada;
                registrosTable.querySelector('thead tr').appendChild(newColumnHeader);
                columnasAgregadas[variableSeleccionada] = newColumnHeader;
                variablesSeleccionadas.push(variableSeleccionada);
            } else {
                delete columnasSeleccionadas[variableSeleccionada];
                if (columnasAgregadas.hasOwnProperty(variableSeleccionada)) {
                    columnasAgregadas[variableSeleccionada].remove();
                    delete columnasAgregadas[variableSeleccionada];
                }
                var index = variablesSeleccionadas.indexOf(variableSeleccionada);
                if (index !== -1) {
                    variablesSeleccionadas.splice(index, 1);
                }
            }
        }
    });

    function procesarEventoAtributo(opcionesAtributo, atributo) {
        opcionesAtributo.addEventListener('change', function (event) {
            if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {
                var opcionSeleccionada = '';
                var label = opcionesAtributo.querySelector('label[for="' + event.target.id + '"]');
                if (label) {
                    opcionSeleccionada = label.textContent.trim();
                    var valor = opcionSeleccionada.substring(opcionSeleccionada.indexOf(':') + 1).trim();
                    var cadjson = "{[" + filtro + "]:" + encodeURIComponent(valor) + "}";
                }

                if (event.target.checked) {
                    if (!filtroSeleccionado.includes(cadjson)) {
                        filtroSeleccionado.push(cadjson);
                    }
                    console.log('Opción seleccionada:', opcionSeleccionada);
                } else {
                    var index = filtroSeleccionado.indexOf(cadjson);
                    if (index !== -1) {
                        filtroSeleccionado.splice(index, 1);
                    }
                    console.log('Opción deseleccionada:', opcionSeleccionada);
                }
                obtenerRegistros();
            }
        });
    }

    function obtenerRegistros() {
        var datos = {
            columnas: Object.keys(columnasSeleccionadas),
            filtro: filtroSeleccionado,
            groupby: filtroGBSeleccionado
        };

        fetch('controller/reportes.php?accion=mostrarConsulta&atributos=' + JSON.stringify(datos), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Hubo un problema al enviar la solicitud al servidor.');
                }
                return response.json();
            })
            .then(function (data) {
                llenarTabla(data);
            })
            .catch(function (error) {
                console.error('Error:', error.message);
            });
    }

    // Función para llenar la tabla con los registros recibidos
    function llenarTabla(registros) {
        var tbody = registrosTable.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            registrosTable.appendChild(tbody);
        }

        // Limpiar el cuerpo de la tabla antes de agregar nuevos registros
        tbody.innerHTML = '';

        registros.forEach(function (registro) {
            var tr = document.createElement('tr');

            for (var columna in columnasAgregadas) {
                var td = document.createElement('td');
                td.textContent = registro[columna];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    }
});
