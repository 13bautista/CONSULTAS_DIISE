$(document).ready(function () {
  cargarAtributos();

  function cargarAtributos() {
    $.ajax({
      url: 'controller/controlador.php',
      type: 'GET',
      dataType: 'json',
      data: { accion: 'mostrarAtributos' },
      success: function (data) {
        if (data && data.length > 0) {
          cargarOpciones(data, 'variables_container');
          cargarOpciones(data, 'filtros_container');
          $(document).trigger('elementos_cargados');
        }
      },
      error: function (xhr, status, error) {
        console.error('Error al cargar atributos:', error);
        alert('Ocurrió un error al cargar los atributos. Por favor, inténtelo de nuevo más tarde.');
      }
    });
  }

  function cargarOpciones(opciones, containerId) {
    var container = $('#' + containerId),
      checkbox;

    container.data('opciones', opciones);
    container.empty();

    $.each(opciones, function (index, opcion) {
      checkbox = $('<div class="form-check"><input type="checkbox" class="form-check-input" id="' + containerId + '_opcion_' + (index + 1) + '"><label class="form-check-label" for="' + containerId + '_opcion_' + (index + 1) + '">' + opcion + '</label></div>');
      container.append(checkbox);
    });
  }

  var opciones_suma_valores = [];

  function agregarASumaValores(opcion) {
    if (opciones_suma_valores.includes(opcion)) {
      opciones_suma_valores = opciones_suma_valores.filter(item => item !== opcion);
    } else {
      opciones_suma_valores.push(opcion);
    }
    cargarOpciones(opciones_suma_valores, 'suma_valores_container');
  }

  $('#variables_container').on('click', '.form-check-input', function () {
    var opcion = $(this).next('label').text();
    agregarASumaValores(opcion);
  });

  $('#filtros_container').on('change', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked')) {
      $('#filtrosModal').modal('show');
    }
  });

  $('#suma_valores_container').on('change', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked')) {
      $('#sumaValoresModal').modal('show');
    }
  });

});