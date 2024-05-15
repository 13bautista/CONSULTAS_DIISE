<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../model/conexion.php';
require_once '../model/reportesModel.php';

class Reportes
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function __destruct()
    {
        $this->conexion->close();
    }
    
    public function manejarSolicitud($accion)
    {
        switch ($accion) {
            case 'mostrarAtributos':
            $this->obtenerAtributos();
            break;
            case 'mostrarOpcionesCarteras':
            $this->obtenerOpcionesCarteras();
            break;
            case 'mostrarOpcionesProyectos':
            $this->obtenerOpcionesProyectos();
            break;
            case 'mostrarOpcionesEntidades':
            $this->obtenerOpcionesEntidades();
            break;
            case 'mostrarOpcionesNumeros':
            $this->obtenerOpcionesNumeros();
            break;
            case 'mostrarOpcionesDescripciones':
            $this->obtenerOpcionesDescripciones();
            break;
            case 'mostrarOpcionesVueltas':
            $this->obtenerOpcionesVueltas();
            break;
            case 'mostrarOpcionesAdjudicados':
            $this->obtenerOpcionesAdjudicados();
            break;
            case 'mostrarOpcionesProveedores':
            $this->obtenerOpcionesProveedores();
            break;
            case 'mostrarOpcionesContratos':
            $this->obtenerOpcionesContratos();
            break;
            case 'mostrarOpcionesPrecios':
            $this->obtenerOpcionesPrecios();
            break;
            case 'mostrarOpcionesCantidades':
            $this->obtenerOpcionesCantidades();
            break;
            case 'mostrarOpcionesSubpartidas':
            $this->obtenerOpcionesSubpartidas();
            break;
            case 'mostrarOpcionesMarcas':
            $this->obtenerOpcionesMarcas();
            break;
            case 'mostrarOpcionesModelos':
            $this->obtenerOpcionesModelos();
            break;
            case 'mostrarOpcionesSeries':
            $this->obtenerOpcionesSeries();
            break;
            case 'mostrarOpcionesClueses':
            $this->obtenerOpcionesClueses();
            break;
            case 'mostrarOpcionesSolicitudes':
            $this->obtenerOpcionesSolicitudes();
            break;
            case 'mostrarOpcionesEstatuss':
            $this->obtenerOpcionesEstatuss();
            break;
            case 'mostrarOpcionesAdquisiciones':
            $this->obtenerOpcionesAdquisiciones();
            break;
            case 'mostrarOpcionesVueltas':
            $this->obtenerOpcionesVueltas();
            break;
            case 'mostrarOpcionesAdquiridas':
            $this->obtenerOpcionesAdquiridas();
            break;
            case 'mostrarConsultaFiltros':
            $this->obtenerConsultaFiltros();
            break;
            case 'mostrarConsulta':
            $this->obtenerConsulta();
            break;
            case 'mostrarRegistros':
            $this->obtenerRegistros();
            break;
            default:
                // Acción por defecto
            echo "Acción inválida.";
            break;
        }
    }

    private function obtenerAtributos()
    {
        $modelo = new ReportesModel($this->conexion);
        $atributos = $modelo->obtenerAtributos();

        if (empty($atributos)) {
            echo "No se encontraron atributos.";
            return;
        }

        echo json_encode($atributos);
    }

    private function obtenerOpcionesCarteras()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesCarteras();

        if (empty($opciones)) {
            echo "No se encontraron opciones.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesProyectos()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesProyectos();

        if (empty($opciones)) {
            echo "No se encontraron opciones de proyectos.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesEntidades()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesEntidades();

        if (empty($opciones)) {
            echo "No se encontraron opciones de entidades.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesVueltas()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesVueltas();

        if (empty($opciones)) {
            echo "No se encontraron opciones de vueltas.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesNumeros()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesNumeros();

        if (empty($opciones)) {
            echo "No se encontraron opciones de numeros.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesDescripciones()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesDescripciones();

        if (empty($opciones)) {
            echo "No se encontraron opciones de descripcion.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesAdjudicados()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesAdjudicados();

        if (empty($opciones)) {
            echo "No se encontraron opciones de adjudicado.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesProveedores()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesProveedores();

        if (empty($opciones)) {
            echo "No se encontraron opciones de proveedor.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesContratos()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesContratos();

        if (empty($opciones)) {
            echo "No se encontraron opciones de contrato.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesPrecios()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesPrecios();

        if (empty($opciones)) {
            echo "No se encontraron opciones de precio.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesCantidades()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesCantidades();

        if (empty($opciones)) {
            echo "No se encontraron opciones de cantidad.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesSubpartidas()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesSubpartidas();

        if (empty($opciones)) {
            echo "No se encontraron opciones de subpartida.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesMarcas()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesMarcas();

        if (empty($opciones)) {
            echo "No se encontraron opciones de marca.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesModelos()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesModelos();

        if (empty($opciones)) {
            echo "No se encontraron opciones de modelo.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesSeries()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesSeries();

        if (empty($opciones)) {
            echo "No se encontraron opciones de serie.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesClueses()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesClueses();

        if (empty($opciones)) {
            echo "No se encontraron opciones de clues.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesSolicitudes()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesSolicitudes();

        if (empty($opciones)) {
            echo "No se encontraron opciones de solicitud.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesEstatuss()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesEstatuss();

        if (empty($opciones)) {
            echo "No se encontraron opciones de estatus.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesAdquisiciones()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesAdquisiciones();

        if (empty($opciones)) {
            echo "No se encontraron opciones de adquisicion.";
            return;
        }

        echo json_encode($opciones);
    }
    private function obtenerOpcionesAdquiridas()
    {
        $modelo = new ReportesModel($this->conexion);
        $opciones = $modelo->obtenerOpcionesAdquiridas();

        if (empty($opciones)) {
            echo "No se encontraron opciones de adquisicion.";
            return;
        }

        echo json_encode($opciones);
    }

    private function obtenerConsultaFiltros()
    {
        $atributos = $this->obtenerValorGET('atributos');
        if (empty($atributo) && empty($opcion)) {
            echo "Opción inválida.";
            return;
        }

        $modelo = new ReportesModel($this->conexion);
        $valores = $modelo->obtenerConsultaFiltros($atributos);

        if (empty($valores)) {
            echo "No se encontraron opciones.";
            return;
        }

        echo json_encode($valores);
    }

    private function obtenerRegistros()
    {
        $opcion = $this->obtenerValorGET('opcion');
        $atributosSeleccionados = json_decode($this->obtenerValorGET('atributos'), true);

        if (empty($opcion) || empty($atributosSeleccionados)) {
            echo "Parámetros inválidos.";
            return;
        }

        $modelo = new ReportesModel($this->conexion);
        $registros = $modelo->obtenerRegistrosPorContrato($opcion);

        if (empty($registros)) {
            echo "No se encontraron registros.";
            return;
        }

        $resultados = array();
        foreach ($registros as $registro) {
            $resultado = array();
            foreach ($atributosSeleccionados as $atributo) {
                if (isset($registro[$atributo])) {
                    $resultado[$atributo] = $registro[$atributo];
                }
            }
            $resultados[] = $resultado;
        }

        echo json_encode($resultados);
    }

    private function obtenerConsulta()
    {
        $atributos = $this->obtenerValorGET('atributos');
        if (empty($atributos) && empty($opcion)) {
            echo "Opción inválida.";
            return;
        }
        $modelo = new ReportesModel($this->conexion);
        $valores = $modelo->obtenerConsulta($atributos);

        if (empty($valores)) {
            echo "No se encontraron opciones.";
            return;
        }
        echo json_encode($valores);
    }

    private function obtenerValorGET($parametro)
    {
        return isset($_GET[$parametro]) ? $_GET[$parametro] : null;
    }
}

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
$controlador = new Reportes($conexion);
$controlador->manejarSolicitud($accion);
