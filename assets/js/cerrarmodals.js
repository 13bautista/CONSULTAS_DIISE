$(document).ready(function () {
    // Encuentra los botones de cierre de los modales
    var closeButton = $(".modal-header .close, .modal-footer button[data-dismiss='modal']");

    // Agrega un evento de clic a los botones de cierre
    closeButton.on("click", function () {
        // Cierra el modal manualmente
        $(this).closest(".modal").modal("hide");
    });
});
