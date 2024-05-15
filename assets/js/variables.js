document.addEventListener('DOMContentLoaded', function () {
    var sumaValoresContainer = document.getElementById('suma_valores_container');
    var variablesContainer = document.getElementById('variables_container');
    var filtrosContainer = document.getElementById('filtros_container');
    var opcionesFiltroContainer = document.getElementById('opcionesFiltro');
    var opcionesSumaValoresContainer = document.getElementById('sumaValoresModal');
    var registrosTable = document.getElementById('registros_table');

    var columnasAgregadas = {};
    var variablesSeleccionadas = [];
    var filtro = [];
    var filtroSeleccionado = [];
    var filtroGBSeleccionado = [];
    var columnasSeleccionadas = {};
    var columnaSeleccionada = null;
    var granularidadCheckbox = document.getElementById('granularidad');
    var registros = [];
    var registrosPorPagina = 100;
    var paginaActual = 1;
    var loading = false;

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
            if (granularidadCheckbox.checked) {
                obtenerRegistros();
            }
        }
    });

    var entero = 0;

filtrosContainer.addEventListener('change', function (event) {
    if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {
        var label = filtrosContainer.querySelector('label[for="' + event.target.id + '"]');
        filtro = label.textContent.trim();
        console.log('Elemento seleccionado:', filtro);

        if (event.target.checked) {
            entero = entero + 1; // Incrementar si el checkbox está marcado
            obtenerOpcionesFiltro(filtro);
            filtroSeleccionado[filtro] = true;

            // Verificar si la columna ya existe en la tabla
            if (!columnasAgregadas.hasOwnProperty(filtro)) {
                // Agregar la columna a la tabla
                columnasSeleccionadas[filtro] = true;
                var newColumnHeader = document.createElement('th');
                newColumnHeader.textContent = filtro;
                registrosTable.querySelector('thead tr').appendChild(newColumnHeader);
                columnasAgregadas[filtro] = newColumnHeader;
            }
        } else {
            if (entero > 0) { // Asegurarse de que entero no sea negativo
                entero = entero - 1; // Decrementar si el checkbox está desmarcado
                console.log('Elemento deseleccionado:', filtro);
                delete filtroSeleccionado[filtro];
               
                

                if (columnasAgregadas.hasOwnProperty(filtro)) {
                    // Verificar si la columna está seleccionada en el primer contenedor
                    const variableSeleccionada = filtro;
                    if (!variablesSeleccionadas.includes(variableSeleccionada)) {
                        // Solo eliminar si no está seleccionada en el primer contenedor
                        columnasAgregadas[filtro].remove();
                        delete columnasAgregadas[filtro];
                        delete columnasSeleccionadas[filtro];
                    }
                }
            }
        }

        console.log(entero);
        if (entero === 0) {
            console.log("Vacio");
            limpiarTabla();
        }
    }
});



    opcionesFiltroContainer.addEventListener('change', function (event) {
        if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox') {

            var opcionSeleccionada = '';


            var label = opcionesFiltroContainer.querySelector('label[for="' + event.target.id.replace(/"/g, '\\"') + '"]');

            console.log(label);

            if (label) {
                opcionSeleccionada = label.textContent.trim();
                var valor = opcionSeleccionada.substring(opcionSeleccionada.indexOf(':') + 1).trim();
                var cadjson = {};
                cadjson[filtro] = encodeURIComponent(valor.replace(/"/g, '\\"'));
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


    //////////////////////////Desmarcar Filtro Si no se selecciona nada en modal///////////////////////////////////
    var botonCerrar = document.querySelector('#filtrosModal .modal-footer button[data-dismiss="modal"]');
    botonCerrar.addEventListener('click', function () {
        console.log('Ventana cerrada');
        desmarcarSiNecesario();
    });

    function desmarcarSiNecesario() {
        if (!haySeleccion()) {
            desmarcarFiltro();
        }
    }

    function haySeleccion() {
        var checkboxes = opcionesFiltroContainer.querySelectorAll('input[type="checkbox"]:checked');
        return checkboxes.length > 0;
    }

    function desmarcarFiltro() {
        console.log('Elemento deseleccionado:', filtro);
        delete filtroSeleccionado[filtro];

        if (columnasAgregadas.hasOwnProperty(filtro)) {
            const variableSeleccionada = filtro;
            if (!variablesSeleccionadas.includes(variableSeleccionada)) {
                columnasAgregadas[filtro].remove();
                delete columnasAgregadas[filtro];
                delete columnasSeleccionadas[filtro];
            }
        }

        var checkboxesSeleccionados = filtrosContainer.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxesSeleccionados.length > 0) {
            var ultimoCheckboxSeleccionado = checkboxesSeleccionados[checkboxesSeleccionados.length - 1];
            ultimoCheckboxSeleccionado.checked = false;
        }
    }

    //////////////////////////Desmarcar Filtro Si no se selecciona nada en modal///////////////////////////////////

    function obtenerOpcionesFiltro(filtroSeleccionado) {
        fetch('controller/controlador.php?accion=mostrarOpcionesFiltros&opcion=' + filtroSeleccionado)
            .then(response => response.json())
            .then(data => mostrarOpcionesFiltro(data))
            .catch(error => console.error('Error al obtener las opciones:', error));
    }

    function mostrarOpcionesFiltro(opciones) {
        var opcionesFiltroDiv = document.getElementById('opcionesFiltro');
        opcionesFiltroDiv.innerHTML = '';

        var ulElement = document.createElement('ul');
        ulElement.classList.add('list-group');

        opciones.forEach(function (opcion) {
            var listItem = document.createElement('li');
            listItem.classList.add('list-group-item');

            var checkbox = document.createElement('input');
            checkbox.classList.add('form-check-input', 'me-1');
            checkbox.type = 'checkbox';
            checkbox.name = 'opciones_filtro[]';
            checkbox.value = Object.values(opcion);
            checkbox.id = Object.entries(opcion);

            var label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = Object.values(opcion);

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            ulElement.appendChild(listItem);
        });

        opcionesFiltroDiv.appendChild(ulElement);
    }

    function obtenerRegistros() {

        var datos = {
            columnas: Object.keys(columnasSeleccionadas),
            filtro: filtroSeleccionado,
            groupby: filtroGBSeleccionado
        };

        fetch('controller/controlador.php?accion=mostrarConsulta&atributos=' + JSON.stringify(datos), {
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
                console.log("Datos", data);
                llenarTabla(data);
            })
            .catch(function (error) {
                console.error('Error:', error.message);
            });
    }

    function limpiarTabla() {
        console.log("Limpiando la tabla de registros.");
        // Selecciona el cuerpo de la tabla de registros y lo vacía
        var registrosBody = document.getElementById('registros_body');
        registrosBody.innerHTML = '';
    }

    // Función para llenar la tabla con los registros recibidos//
    function llenarTabla(registros) {

        limpiarTabla();
        // Agregamos un event listener a los botones
        document.getElementById('exportar_excel').addEventListener('click', function () {
            // Creamos una hoja de cálculo de Excel
            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(registros);

            // Autoajustamos los anchos de columna
            var colWidths = getColWidths(registros);
            ws['!cols'] = colWidths;

            var headerCellStyle = {
                fill: {
                    fgColor: { rgb: "FF0000" } // Color de fondo rojo
                },
                font: { color: { rgb: "FFFFFF" } } // Color de texto blanco
            };
            Object.keys(ws).filter(key => key.startsWith('A')).forEach(key => {
                ws[key].s = headerCellStyle;
            });

            // Agregamos la hoja de datos al libro
            XLSX.utils.book_append_sheet(wb, ws, "Registros");

            // Convertimos el libro en un archivo binario
            var wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

            // Creamos un Blob y un enlace para descargar el archivo
            var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'registros.xlsx';
            a.click();
            console.log('Exportando a Excel...');
        });

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



        var registrosPorPagina = 50; // Número de registros a cargar por página
        var tbody = registrosTable.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            registrosTable.appendChild(tbody);
        }

        var desde = 0; // Índice inicial de los registros a mostrar
        var hasta = Math.min(desde + registrosPorPagina, registros.length); // Índice final de los registros a mostrar

        function cargarRegistros() {
            for (var i = desde; i < hasta; i++) {
                var tr = document.createElement('tr');
                var registro = registros[i];
                var columnas = Object.keys(registro);

                columnas.forEach(function (columna) {
                    var td = document.createElement('td');
                    var valor = registro[columna];
                    td.textContent = formatearValor(valor);
                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            }
            desde = hasta;
            hasta = Math.min(desde + registrosPorPagina, registros.length);
        }


        cargarRegistros();

        // Evento para cargar más registros cuando el usuario se desplace hacia abajo en la tabla
        registrosTable.addEventListener('scroll', function () {
            if (registrosTable.offsetHeight + registrosTable.scrollTop >= registrosTable.scrollHeight) {
                cargarRegistros();
            }
        });
    }



    // Función para cargar registros por página
    function cargarRegistros() {
        // Verificar si hay registros disponibles
        if (registros.length > 0) {
            var startIndex = (paginaActual - 1) * registrosPorPagina;
            var endIndex = startIndex + registrosPorPagina;
            var registrosPaginados = registros.slice(startIndex, endIndex);
            llenarTabla(registrosPaginados);
        } else {
            console.log("No hay registros disponibles para cargar.");
        }
    }

    // Función para detectar scroll al final de la página
    registrosTable.addEventListener('scroll', function () {

        var scrollTop = document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
            loading = true;
            // Cargar más registros
            paginaActual++;
            cargarRegistros();
            loading = false;
        }
    });

    // Llamada inicial para cargar registros
    cargarRegistros();

    // Otras funciones permanecen igual


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function formatearValor(valor) {
        if (valor instanceof Date) {
            return valor.toLocaleDateString();
        } else if (typeof valor === 'number') {
            return valor.toFixed(2);
        } else {
            return valor.toString();
        }
    }
    $('#suma').prop('disabled', true);

    sumaValoresContainer.addEventListener('change', function (event) {
        if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'checkbox' && event.target.checked) {
            var label = sumaValoresContainer.querySelector('label[for="' + event.target.id + '"]');
            columnaSeleccionada = label.textContent.trim();
            console.log('Columna seleccionada:', columnaSeleccionada);
            // Verificar si alguna de las respuestas seleccionadas es "cantidad_demanda" o "numero_partida"
            if (columnaSeleccionada.toLowerCase().includes("cantidad_demanda") || columnaSeleccionada.toLowerCase().includes("numero_partida")) {
                // Si alguna de las respuestas coincide, habilitar el campo de suma
                $('#suma').prop('disabled', false);
            } else {
                // Si ninguna de las respuestas coincide, deshabilitar el campo de suma
                $('#suma').prop('disabled', true);
            }
        }


    });

    opcionesSumaValoresContainer.addEventListener('change', function (event) {
        if (event.target && event.target.nodeName === 'INPUT' && event.target.type === 'radio') {
            var label = opcionesSumaValoresContainer.querySelector('label[for="' + event.target.id + '"]');
            var opcionSeleccionada = label.textContent.trim();
            var cadjson = "{[" + columnaSeleccionada + "]:" + encodeURIComponent(opcionSeleccionada) + "}";

            console.log(event.target.checked);

            if (event.target.checked) {
                if (!filtroGBSeleccionado.includes(cadjson)) {
                    filtroGBSeleccionado.push(cadjson);
                }
                console.log('Opción seleccionada:', opcionSeleccionada);
            } else {
                var index = filtroGBSeleccionado.indexOf(cadjson);
                if (index !== -1) {
                    filtroGBSeleccionado.splice(index, 1);
                }
                console.log('Opción deseleccionada:', opcionSeleccionada);
            }
            obtenerRegistros();
        }
    });

    //////////////////////////////////////////////////////granularidad1//////////////////////////////////////////////////////
    granularidadCheckbox.addEventListener('change', function () {
        // Deshabilitar o habilitar el campo de Suma de Valores según el estado del checkbox
        var sumaValoresInput = document.getElementById('search_suma_valores');
        sumaValoresInput.disabled = this.checked;

        // Deshabilitar o habilitar los elementos dinámicos agregados al campo de Suma de Valores
        var sumaValoresContainer = document.getElementById('suma_valores_container');
        var sumaValoresCheckboxes = sumaValoresContainer.getElementsByTagName('input');
        for (var i = 0; i < sumaValoresCheckboxes.length; i++) {
            sumaValoresCheckboxes[i].disabled = this.checked;
        }
        // Realizar la consulta si el checkbox está marcado
        if (this.checked) {

            if (Object.keys(columnasSeleccionadas).length > 0) {
                console.log("variables: " + Object.keys(columnasSeleccionadas));
                obtenerRegistros();
            } else {
                console.log("variables vacias");
            }
        } else {
            limpiarTabla();
        }
    });

});
