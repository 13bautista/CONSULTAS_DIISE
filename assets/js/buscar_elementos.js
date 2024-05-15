$(document).ready(function () {

  // Función genérica para filtrar elementos
  function filtrarElementos(input, container, comparacion) {
    var valor = $(input).val().toLowerCase();
    $(container + ' .form-check').each(function () {
      $(this).toggle(comparacion($(this).text().toLowerCase(), valor));
    });
  }

  // Función para filtrar el modal
  function filtrarModal(input, container) {
    var valor = $(input).val().toLowerCase();
    $(container + ' li').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
    });
  }


  // Función de comparación para filtrar elementos por texto
  function compararTexto(elemento, valor) {
    return elemento.indexOf(valor) > -1;
  }

  // Eventos de búsqueda para diferentes contenedores
  $('#search_variables').on('keyup', function () {
    filtrarElementos(this, '#variables_container', compararTexto);
  });

  $('#search_filtros').on('keyup', function () {
    filtrarElementos(this, '#filtros_container', compararTexto);
  });

  $('#search_suma_valores').on('keyup', function () {
    filtrarElementos(this, '#suma_valores_container', compararTexto);
  });

  // Evento de cambio en el campo de búsqueda del modal de filtros
  $('#filtro_busqueda').on('keyup', function () {
    filtrarModal(this, '#opcionesFiltro');
  });

});