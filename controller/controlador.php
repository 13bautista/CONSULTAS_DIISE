<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../model/conexion.php';
require_once '../model/modelo.php';

class Controlador
{
    private $conexion;
    private $modelo;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
        $this->modelo = new Modelo($conexion);
    }

    public function __destruct()
    {
        $this->conexion->close();
    }

    public function manejarSolicitud($accion)
    {
        switch ($accion) {
            case 'mostrarAtributos':
                $this->mostrarAtributos();
                break;
            case 'mostrarOpcionesFiltros':
                $this->mostrarOpcionesFiltros();
                break;
            case 'mostrarConsultaFiltros':
                $this->mostrarConsultaFiltros();
                break;
            case 'mostrarConsulta':
                $this->mostrarConsulta();
                break;
            case 'mostrarRegistros':
                $this->mostrarRegistros();
                break;
            default:
                // Acción por defecto
                echo "Acción inválida.";
                break;
        }
    }

    private function mostrarAtributos()
    {
        $atributos = $this->modelo->obtenerAtributos();

        if (empty($atributos)) {
            echo "No se encontraron atributos.";
            return;
        }

        echo json_encode($atributos);
    }

    private function mostrarOpcionesFiltros()
    {
        $opcion = $this->obtenerValorGET('opcion');

        if (empty($opcion)) {
            echo "Opción inválida.";
            return;
        }

        $opciones = $this->modelo->obtenerOpcionesFiltros($opcion);

        if (empty($opciones)) {
            echo "No se encontraron opciones.";
            return;
        }

        echo json_encode($opciones);
    }

    private function mostrarConsultaFiltros()
    {
        $atributos = $this->obtenerValorGET('atributos');

        if (empty($atributos)) {
            echo "Atributos inválidos.";
            return;
        }

        $valores = $this->modelo->obtenerConsultaFiltros($atributos);

        if (empty($valores)) {
            echo "No se encontraron valores.";
            return;
        }

        echo json_encode($valores);
    }

    private function mostrarRegistros()
    {
        $opcion = $this->obtenerValorGET('opcion');
        $atributosSeleccionados = json_decode($this->obtenerValorGET('atributos'), true);

        if (empty($opcion) || empty($atributosSeleccionados)) {
            echo "Parámetros inválidos.";
            return;
        }

        $registros = $this->modelo->obtenerRegistrosPorContrato($opcion);

        if (empty($registros)) {
            echo "No se encontraron registros.";
            return;
        }

        $resultados = array();
        foreach ($registros as $registro) {
            $resultado = array_intersect_key($registro, array_flip($atributosSeleccionados));
            $resultados[] = $resultado;
        }

        echo json_encode($resultados);
    }

    private function mostrarConsulta()
    {
        $atributos = $this->obtenerValorGET('atributos');

        if (empty($atributos)) {
            echo "Atributos inválidos.";
            return;
        }

        $valores = $this->modelo->obtenerConsulta($atributos);

        if (empty($valores)) {
            echo "No se encontraron valores.";
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
$controlador = new Controlador($conexion);
$controlador->manejarSolicitud($accion);
