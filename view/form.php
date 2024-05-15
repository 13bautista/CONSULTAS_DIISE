<div class="card">
    <li class="list-group-item">
        <input id="granularidad" class="form-check-input" type="checkbox" value="" />
        <label for="granularidad">Granularidad 1</label>
    </li>
</div>

<div class="row">
    <div class="col-md-4">
        <div class="card" style="height: 400px;">
            <div class="card-body">
                <h5 class="card-title">Variables:</h5>
                <input type="text" id="search_variables" class="form-control" placeholder="Buscar...">
                <div id="variables_container" class="scrollable-list"></div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card" style="height: 400px;">
            <div class="card-body">
                <h5 class="card-title">Filtros:</h5>
                <input type="text" id="search_filtros" class="form-control" placeholder="Buscar...">
                <div id="filtros_container" class="scrollable-list"></div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card" style="height: 400px;">
            <div class="card-body">
                <h5 class="card-title">Suma de Valores:</h5>
                <input type="text" id="search_suma_valores" class="form-control" placeholder="Buscar...">
                <div id="suma_valores_container" class="scrollable-list"></div>
            </div>
        </div>
    </div>
</div>





<!-- Modales -->
<div class="modal fade" id="filtrosModal" tabindex="-1" role="dialog" aria-labelledby="filtrosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="sumaValoresModalLabel">Filtros</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Spinner -->
                <div id="spinner-container" class="d-flex justify-content-center">
                    <div id="spinner" class="spinner-border text-primary" role="status" style="display: none;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <!-- Campo de búsqueda -->
                <label for="filtro_busqueda">Filtro Busqueda:</label>
                <input type="text" id="filtro_busqueda" class="form-control" placeholder="Buscar...">

                <!-- Opciones de filtro con checkboxes -->
                <div id="opcionesFiltro" style="max-height: 50vh; overflow-y: auto;">
                    <!-- Aquí se cargarán las opciones de filtro -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
           
    </div>
</div>

<!-- Modal para Suma de Valores -->
<div class="modal fade" id="sumaValoresModal" tabindex="-1" role="dialog" aria-labelledby="sumaValoresModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="sumaValoresModalLabel">Opciones de Suma de Valores</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="opcionesAgrupado" class="modal-body">
                <!-- Opciones de suma de valores -->
                <div class="btn-group" role="group" aria-label="Opciones de Suma de Valores">
                    <input class="btn-check" type="radio" name="suma_opciones" id="conteo" autocomplete="off">
                    <label class="btn btn-outline-primary" for="conteo">Conteo</label>

                    <input class="btn-check" type="radio" name="suma_opciones" id="conteo_distinto" autocomplete="off">
                    <label class="btn btn-outline-primary" for="conteo_distinto">Conteo Distinto</label>

                    <input class="btn-check" type="radio" name="suma_opciones" id="suma" autocomplete="off">
                    <label class="btn btn-outline-primary" for="suma">Suma</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!-- Your Custom Scripts -->

<script src="assets/js/buscar_elementos.js"></script>
<script src="assets/js/cargar_atributos.js"></script>
<script src="assets/js/variables.js"></script>
<script src="assets/js/utileria.js"></script>
<script src="assets/js/desabilitador_de_casillas.js"></script>
<script src="assets/js/spinner.js"></script>
<script src="assets/js/cerrarmodals.js"></script>