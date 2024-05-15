document.addEventListener('DOMContentLoaded', function () {
    // Obtener la referencia a la tabla de registros
    var registrosTable = document.getElementById('registros_table');

    // Variable para almacenar el campo previamente guardado
    var campoGuardado = null;

    // JSON para almacenar los datos seleccionados
    var json = {
        "columnas": [],
        "filtro": [],
        "groupby": []
    };

    // Función para agregar encabezados dinámicos a la tabla
    function agregarEncabezados() {
        var encabezadosRow = document.getElementById('registros_table').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
        encabezadosRow.innerHTML = ''; // Limpiar los encabezados existentes

        // Agregar encabezados basados en las columnas seleccionadas
        json.columnas.forEach(function (columna) {
            var th = document.createElement('th');
            th.textContent = columna;
            encabezadosRow.appendChild(th);
        });
    }

    // Obtener referencia a los botones desplegables
    var dropdownButtons = document.querySelectorAll('.dropdown-toggle');

    // Escuchar el evento de clic en cada botón desplegable
    dropdownButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var campo = this.getAttribute('data-campo'); // Obtener el nombre del campo asociado al botón desplegable

            // Verificar si ya se ha guardado el campo y si es el mismo
            if (campoGuardado !== campo) {
                console.log("Campo:", campo); // Imprimir el nombre del campo en la consola del navegador
                campoGuardado = campo; // Actualizar el campo guardado
            }

            var dropdownMenu = this.nextElementSibling; // Obtener referencia al menú desplegable asociado

            // Escuchar el evento de clic en cada elemento del menú desplegable
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(function (item) {
                item.querySelectorAll('.form-check-input').forEach(function (checkbox) {
                    checkbox.addEventListener('change', function () {
                        if (checkbox.checked) {
                            console.log("El checkbox está marcado.");
                            // Realiza alguna acción si el checkbox está marcado
                        } else {
                            console.log("El checkbox no está marcado.");
                            // Realiza alguna acción si el checkbox no está marcado
                        }
                    });

                    /*
                    if (checkbox.checked) {
                        console.log(checkbox)
                        var selectedText = this.textContent.trim(); // Obtener el texto del elemento seleccionado
                        console.log("Elemento seleccionado:", selectedText); // Imprimir el elemento seleccionado en la consola del navegador
                        actualizarJSON(campo, selectedText); // Actualizar el JSON con los datos seleccionados
                    }
                    */
                });
            });
        });
    });

    // Objeto para rastrear el estado de selección de cada campo
    var seleccionado = {};

    // Array para almacenar las columnas seleccionadas
    var columnas = [];

    // Función para actualizar el JSON con los datos seleccionados
    function actualizarJSON(campo, valor) {
        if (seleccionado[campo] === valor) {
            // Eliminar el filtro correspondiente al campo
            var filtroIndex = json.filtro.findIndex(function (item) {
                return Object.keys(item)[0] === campo;
            });
            if (filtroIndex !== -1) {
                json.filtro.splice(filtroIndex, 1);
            }
            seleccionado[campo] = null; // Actualizar el estado de selección del campo
        } else {
            // Agregar el filtro al JSON
            var filtroObj = {};
            filtroObj[campo] = valor;
            json.filtro.push(filtroObj);
            seleccionado[campo] = valor; // Actualizar el estado de selección del campo

            // Agregar el campo al array de columnas si no existe
            if (columnas.indexOf(campo) === -1) {
                columnas.push(campo);
            }
        }

        json.columnas = columnas; // Actualizar las columnas del JSON
        console.log(JSON.stringify(json, null, 2)); // Imprimir el JSON en la consola
        obtenerRegistros(); // Llamar a obtenerRegistros() después de que se haya actualizado el JSON
    }

    // Función para obtener registros del servidor
    function obtenerRegistros() {
        fetch('controller/controlador.php?accion=mostrarConsulta&atributos=' + JSON.stringify(json), {
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
                llenarTabla(data); // Llama a llenarTabla() en lugar de llenarTablas()
            })
            .catch(function (error) {
                console.error('Error:', error.message);
            });
    }






















    // Función para limpiar la tabla de registros
    function limpiarTabla() {
        console.log("Limpiando la tabla de registros.");
        var registrosBody = document.getElementById('registros_body');
        registrosBody.innerHTML = ''; // Vacía el contenido de la tabla

    }



    // Función para llenar la tabla con los registros recibidos
    function llenarTabla(registros) {
        limpiarTabla();
        agregarEncabezados();


        // Agregamos un event listener al botón de exportar a Excel
        document.getElementById('exportar_excel').addEventListener('click', function () {
            var wb = XLSX.utils.book_new(); // Creamos una hoja de cálculo de Excel
            var ws = XLSX.utils.json_to_sheet(registros);

            // Autoajustamos los anchos de columna
            var colWidths = getColWidths(registros);
            ws['!cols'] = colWidths;

            // Estilo para el encabezado de la hoja de cálculo
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

    // Función para dar formato al valor
    function formatearValor(valor) {
        return valor.toString(); // Aquí puedes aplicar el formato que desees al valor
    }

    // Función para obtener los anchos de columna para el autoajuste
    function getColWidths(data) {
        // Lógica para calcular los anchos de columna
        return [];
    }

    // Función para convertir datos a array buffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

});
