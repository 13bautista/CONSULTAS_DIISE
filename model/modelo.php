<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once 'conexion.php'; // Verificar y corregir la ruta del archivo de conexión

class Modelo
{
    private $conexion;

    public function __construct(mysqli $conexion)
    {
        $this->conexion = $conexion;
    }

    private function ejecutarConsulta($query, $params = array())
    {
        $stmt = mysqli_prepare($this->conexion, $query);

        if ($stmt) {
            if (!empty($params)) {
                $types = str_repeat('s', count($params));
                mysqli_stmt_bind_param($stmt, $types, ...$params);
            }

            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (!$result) {
                throw new Exception('Consulta fallida: ' . mysqli_error($this->conexion));
            }
            mysqli_stmt_close($stmt);
            return $result;
        } else {
            throw new Exception('Error al preparar la consulta: ' . mysqli_error($this->conexion));
        }
    }

    public function obtenerAtributos()
    {
        $query = "SELECT COLUMN_NAME 
                  FROM INFORMATION_SCHEMA.COLUMNS 
                  WHERE TABLE_SCHEMA = ? 
                  AND TABLE_NAME = ? 
                  AND COLUMN_NAME NOT IN ('NUMERO_REGISTRO', 'ORDINARIO_DUPLICADO','ID','ID_ARCHIVO')";
        $params = [DBNAME, TBLNAME];
        $result = $this->ejecutarConsulta($query, $params);
        return array_column(mysqli_fetch_all($result, MYSQLI_ASSOC), 'COLUMN_NAME');
    }

    public function obtenerRegistrosPorContrato($contrato)
    {
        $query = "SELECT * FROM " . TBLNAME . " WHERE CONTRATO = ?";
        $params = [$contrato];
        $result = $this->ejecutarConsulta($query, $params);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function obtenerOpcionesFiltros($atributo)
    {
        $query = "SELECT DISTINCT $atributo FROM " . TBLNAME;
        $result = $this->ejecutarConsulta($query);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function obtenerConsultaFiltros($datos)
    {
        $datos = json_decode($datos, true);

        $columnas = implode(', ', array_keys($datos['columnas']));
        $filtro = $datos['filtro'];
        $opcionesFiltro = "'" . implode("', '", $datos['opcionesFiltro']) . "'";
        $where = "$filtro IN ($opcionesFiltro)";
        $query = "SELECT $columnas FROM " . TBLNAME . " WHERE $where";
        $result = $this->ejecutarConsulta($query);
        return mysqli_fetch_all($result, MYSQLI_ASSOC);
    }

    public function obtenerConsulta($atributos)
    {
        $datos = json_decode($atributos, true);

        if ($datos !== null) {
            $condiciones = [];
            $propiedadesValores = [];
            $columnas = implode(', ', $datos['columnas']);

            foreach ($datos['filtro'] as $filtro) {
                foreach ($filtro as $propiedad => $valor) {
                    if (!isset($propiedadesValores[$propiedad])) {
                        $propiedadesValores[$propiedad] = array();
                    }
                    $valor = is_numeric($valor) ? $valor : "'" . $valor . "'";
                    $propiedadesValores[$propiedad][] = $valor;
                }
            }

            $condiciones = array();
            foreach ($propiedadesValores as $propiedad => $valores) {
                $valoresCondicion = implode(',', $valores);
                $condiciones[] = "$propiedad IN ($valoresCondicion)";
            }
            $whereClause = implode(' AND ', $condiciones);
            $groupBy = '';
            if (!empty($datos['groupby'])) {
                $argsGroupBy = $datos['columnas'];
                $groupBy = " GROUP BY ";
                $reemplazoRealizado = false;
                foreach ($datos['groupby'] as $gb) {
                    preg_match('/\[([^\]]+)\]:([^;]+)/', $gb, $matches);
                    $nombreGroupBy = trim($matches[1]);
                    $valorGroupBy = trim($matches[2]);
                    $valorGroupBy = rtrim($valorGroupBy, '}');
                    if ($valorGroupBy === "Suma") {
                        $valorGroupBy = "SUM($nombreGroupBy)";
                    } elseif ($valorGroupBy === "Conteo Distinto") {
                        $valorGroupBy = "COUNT(DISTINCT $nombreGroupBy)";
                    } elseif ($valorGroupBy === "Conteo") {
                        $valorGroupBy = "COUNT($nombreGroupBy)";
                    }
                    array_walk_recursive($datos['columnas'], function (&$valor) use ($nombreGroupBy, $valorGroupBy) {
                        if ($valor === $nombreGroupBy) {
                            $valor = $valorGroupBy;
                            $reemplazoRealizado = true;
                        }
                    });
                    if ($reemplazoRealizado = false) {
                        array_unshift($datos['columnas'], $valorGroupBy);
                    }
                }
                $columnas = implode(', ', $datos['columnas']);

                $key = array_search($nombreGroupBy, $argsGroupBy);
                if ($key !== false) {
                    unset($argsGroupBy[$key]);
                    $colsGroupBy = implode(', ', $argsGroupBy);
                }
            }
            $query = "SELECT $columnas FROM " . TBLNAME;
            if (!empty($whereClause)) {
                $query .= " WHERE $whereClause";
            }
            if (!empty($colsGroupBy)) {
                $query .= $groupBy . $colsGroupBy;
            }
            $result = $this->ejecutarConsulta($query);
            return mysqli_fetch_all($result, MYSQLI_ASSOC);
        } else {
            return "Error: No se recibieron los parámetros GET.";
        }
    }
}
